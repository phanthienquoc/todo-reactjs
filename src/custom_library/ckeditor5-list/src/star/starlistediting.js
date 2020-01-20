/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list/starlistediting
 */

import ListCommand from '../listcommand';
import ListEditing from '../listediting';
import StarListCheckCommand from './starlistcheckcommand';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import {
	dataModelViewInsertion,
	dataModelViewTextInsertion,
	dataViewModelCheckmarkInsertion,
	mapModelToViewZeroOffsetPosition,
	modelViewChangeChecked,
	modelViewChangeType,
	modelViewInsertion
} from './starlistconverters';

/**
 * The engine of the to-do list feature. It handles creating, editing and removing to-do lists and their items.
 *
 * It registers the entire functionality of the {@link module:list/listediting~ListEditing list editing plugin} and extends
 * it with the `'starList'` command.
 *
 * @extends module:core/plugin~Plugin
 */
export default class StarListEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'StarListEditing';
	}

	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ListEditing ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const { editing, data, model } = editor;

		// Extend schema.
		model.schema.extend( 'listItem', {
			allowAttributes: [ 'starListChecked' ]
		} );

		// Disallow starListChecked attribute on other nodes than listItem with to-do listType.
		model.schema.addAttributeCheck( ( context, attributeName ) => {
			const item = context.last;

			if ( attributeName == 'starListChecked' && item.name == 'listItem' && item.getAttribute( 'listType' ) != 'star' ) {
				return false;
			}
		} );

		// Register commands.
		editor.commands.add( 'starList', new ListCommand( editor, 'star' ) );
		editor.commands.add( 'starListCheck', new StarListCheckCommand( editor ) );

		// Define converters.
		data.downcastDispatcher.on( 'insert:listItem', dataModelViewInsertion( model ), { priority: 'high' } );
		data.downcastDispatcher.on( 'insert:$text', dataModelViewTextInsertion, { priority: 'high' } );

		editing.downcastDispatcher.on(
			'insert:listItem',
			modelViewInsertion( model, listItem => this._handleCheckmarkChange( listItem ) ),
			{ priority: 'high' }
		);
		editing.downcastDispatcher.on(
			'attribute:listType:listItem',
			modelViewChangeType( listItem => this._handleCheckmarkChange( listItem ), editing.view )
		);
		editing.downcastDispatcher.on(
			'attribute:starListChecked:listItem',
			modelViewChangeChecked( listItem => this._handleCheckmarkChange( listItem ) )
		);

		editing.mapper.on( 'modelToViewPosition', mapModelToViewZeroOffsetPosition( editing.view, editing.mapper ) );

		data.upcastDispatcher.on( 'element:input', dataViewModelCheckmarkInsertion, { priority: 'high' } );

		// Jump at the end of the previous node on left arrow key press, when selection is after the checkbox.
		//
		// <blockquote><p>Foo</p></blockquote>
		// <ul><li><checkbox/>{}Bar</li></ul>
		//
		// press: `<-`
		//
		// <blockquote><p>Foo{}</p></blockquote>
		// <ul><li><checkbox/>Bar</li></ul>
		//
		// Note: When content language direction is RTL, the behaviour is mirrored.
		const localizedJumpOverCheckmarkKey = editor.locale.contentLanguageDirection === 'ltr' ? 'arrowleft' : 'arrowright';

		editor.keystrokes.set( localizedJumpOverCheckmarkKey, ( evt, stop ) => jumpOverCheckmarkOnSideArrowKeyPress( stop, model ) );

		// Toggle check state of selected to-do list items on keystroke.
		// editor.keystrokes.set( 'Ctrl+space', () => editor.execute( 'starListCheck' ) );

		// Remove `starListChecked` attribute when a host element is no longer a to-do list item.
		const listItemsToFix = new Set();

		this.listenTo( model, 'applyOperation', ( evt, args ) => {
			const operation = args[ 0 ];

			if ( operation.type == 'rename' && operation.oldName == 'listItem' ) {
				const item = operation.position.nodeAfter;

				if ( item.hasAttribute( 'starListChecked' ) ) {
					listItemsToFix.add( item );
				}
			} else if ( operation.type == 'changeAttribute' && operation.key == 'listType' && operation.oldValue === 'star' ) {
				for ( const item of operation.range.getItems() ) {
					if ( item.hasAttribute( 'starListChecked' ) && item.getAttribute( 'listType' ) !== 'star' ) {
						listItemsToFix.add( item );
					}
				}
			}
		} );

		model.document.registerPostFixer( writer => {
			let hasChanged = false;

			for ( const listItem of listItemsToFix ) {
				writer.removeAttribute( 'starListChecked', listItem );
				hasChanged = true;
			}

			listItemsToFix.clear();

			return hasChanged;
		} );
	}

	/**
	 * Handles the checkbox element change, moves the selection to the corresponding model item to make it possible
	 * to toggle the `starListChecked` attribute using the command, and restores the selection position.
	 *
	 * Some say it's a hack :) Moving the selection only for executing the command on a certain node and restoring it after,
	 * is not a clear solution. We need to design an API for using commands beyond the selection range.
	 * See https://github.com/ckeditor/ckeditor5/issues/1954.
	 *
	 * @private
	 * @param {module:engine/model/element~Element} listItem
	 */
	_handleCheckmarkChange( listItem ) {
		const editor = this.editor;
		const model = editor.model;
		const previousSelectionRanges = Array.from( model.document.selection.getRanges() );

		model.change( writer => {
			writer.setSelection( listItem, 'end' );
			editor.execute( 'starListCheck' );
			writer.setSelection( previousSelectionRanges );
		} );
	}
}

// Handles the left/right (LTR/RTL content) arrow key and moves the selection at the end of the previous block element
// if the selection is just after the checkbox element. In other words, it jumps over the checkbox element when
// moving the selection to the left/right (LTR/RTL).
//
// @private
// @param {Function} stopKeyEvent
// @param {module:engine/model/model~Model} model
function jumpOverCheckmarkOnSideArrowKeyPress( stopKeyEvent, model ) {
	const schema = model.schema;
	const selection = model.document.selection;

	if ( !selection.isCollapsed ) {
		return;
	}

	const position = selection.getFirstPosition();
	const parent = position.parent;

	if ( parent.name === 'listItem' && parent.getAttribute( 'listType' ) == 'star' && position.isAtStart ) {
		const newRange = schema.getNearestSelectionRange( model.createPositionBefore( parent ), 'backward' );

		if ( newRange ) {
			stopKeyEvent();
			model.change( writer => writer.setSelection( newRange ) );
		}
	}
}

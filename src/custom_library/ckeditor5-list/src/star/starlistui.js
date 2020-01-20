/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list/starlistui
 */

import { createUIComponent } from '../utils';
import todoListIcon from '../../theme/icons/todolist.svg';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

/**
 * The to-do list UI feature. It introduces the `'todoList'` button that
 * allows to convert elements to and from to-do list items and to indent or outdent them.
 *
 * @extends module:core/plugin~Plugin
 */
export default class StarListUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {
		const t = this.editor.t;

		createUIComponent( this.editor, 'starList', t( 'Star List' ), todoListIcon );
	}
}

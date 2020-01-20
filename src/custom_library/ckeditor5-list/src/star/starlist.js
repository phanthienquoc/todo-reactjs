/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list/dashlist
 */

import StarListEditing from './starlistediting';
import StarListUI from './starlistui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import './starlist.css';

/**
 * The to-do list feature.
 *
 * This is a "glue" plugin that loads the {@link module:list/starlistediting~StarListEditing to-do list editing feature}
 * and the {@link module:list/starlistui~StarListUI to-do list UI feature}.
 *
 * @extends module:core/plugin~Plugin
 */
export default class StarList extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ StarListEditing, StarListUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'StarList';
	}
}

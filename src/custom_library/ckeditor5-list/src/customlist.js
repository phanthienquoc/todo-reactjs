/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list/dashlist
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import StarListEditing from './star/starlistediting';
import DashListEditing from './dash/dashlistediting';
import StarListUI from './star/starlistui';
import DashListUI from './dash/dashlistui';

import './star/starlist.css';
import './dash/dashlist.css';

/**
 * The to-do list feature.
 *
 * This is a "glue" plugin that loads the {@link module:list/starlistediting~StarListEditing to-do list editing feature}
 * and the {@link module:list/starlistui~StarListUI to-do list UI feature}.
 *
 * @extends module:core/plugin~Plugin
 */
export default class CustomList extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ StarListEditing, StarListUI , DashListEditing, DashListUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'CustomList';
	}
}

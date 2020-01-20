/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list/dashlist
 */

import DashListEditing from './dashlistediting';
import DashListUI from './dashlistui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import './dashlist.css';

/**
 * The to-do list feature.
 *
 * This is a "glue" plugin that loads the {@link module:list/dashlistediting~DashListEditing to-do list editing feature}
 * and the {@link module:list/dashlistui~DashListUI to-do list UI feature}.
 *
 * @extends module:core/plugin~Plugin
 */
export default class DashList extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ DashListEditing, DashListUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'DashList';
	}
}

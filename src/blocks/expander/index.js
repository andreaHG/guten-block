/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Set default icon size equivalent to "Medium".
 */
export const DEFAULT_ICON_SIZE = 60;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Expander Card' ), // Block title.
	icon: {
		foreground: '#fff',
		background: '#8E2DE2',
		src: 'editor-expand',
	}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.,
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'card' ), __( 'expand' ), __( 'staff-member' ) ],
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };

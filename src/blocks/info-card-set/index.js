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
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Interactive Info Card Set' ), // Block title.
	icon: {
		foreground: '#fff',
		background: '#8E2DE2',
		src: 'info',
	}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.,
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'card' ), __( 'interactive' ), __( 'info-card-set' ) ],
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };

/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import * as expander from './blocks/expander';
import * as infoCard from './blocks/info-card';
import * as infoCardSet from './blocks/info-card-set';
/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = block => {
	if ( ! block ) {
		return;
	}

	const { name, category, settings } = block;

	registerBlockType( name, {
		category: category,
		...settings,
	} );
};

/**
 * Function to register blocks provided by AHG.
 */
export const registerAHGBlocks = () => {
	[ expander, infoCard, infoCardSet ].forEach( registerBlock );
};

registerAHGBlocks();

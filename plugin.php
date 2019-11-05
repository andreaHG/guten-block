<?php
/**
 * Plugin Name: Custom AHG Blocks 
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Custom Gutenberg blocks includes expander card, info card, and info card set
 * Author: Andrea Hernandez Guzman
 * Author URI: https://andreahg.me/
 * Version: 1.1.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

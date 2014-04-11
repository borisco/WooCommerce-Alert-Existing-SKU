<?php

/******************************
* script control
******************************/

function waes_admin_load_css() {
	wp_enqueue_style('waes_styles', plugin_dir_url( __FILE__ ) . 'css/style.css');
}	
add_action('admin_enqueue_scripts', 'waes_admin_load_css');

function waes_load_script( $hook ) {
	global $post;

	// Verify if we are Adding or Editing a product
	if ( $hook == 'post-new.php' || $hook == 'post.php' ) {
		// Verify if we are in Product Post Type
		if ( $post->post_type === 'product' ) {     

			wp_register_script( 'waes_script', plugin_dir_url( __FILE__ ).'js/waes-script.js', array('jquery') );
	        wp_localize_script( 'waes_script', 'waesAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' )));        

	        wp_enqueue_script( 'jquery' );
	        wp_enqueue_script( 'waes_script' );
		}
	}
}
add_filter('admin_enqueue_scripts', 'waes_load_script');
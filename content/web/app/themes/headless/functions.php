<?php
  function register_my_menus() {
    register_nav_menus(
    array(
      'primary-navigation' => __( 'Primary Navigation' ),
      'sidebar-navigation' => __( 'Sidebar Navigation' ),
      'footer-links' => __( 'Footer Links' ),
      'social' => __( 'Social' )
    )
    );
  }
  add_action( 'init', 'register_my_menus' );
  add_theme_support('post-thumbnails');

  add_filter('rest_url', function($url) {
    return str_replace(home_url( '/wp' ), site_url(), $url);
  });

  switch_theme('headless');
?>
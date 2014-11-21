# `easyLazyImages()`

A global method for configuring lazy-loaded images.

## Usage

`easyLazyImages` takes the following arguments:

 * **`load_at` (mixed)** - a unitless pixel width to lazy load images at or an array of strings representing named breakpoints for use with [`getActiveMQ`](https://github.com/easy-designs/easy-resize-watchers.js)
 * **`selector` (string, optional)** - an alternate selector to use for finding images to lazy-load (default: '[data-image-src]') *Note: The selected element must meet match the markup pattern*

This script assumes an element with the following attributes:

 * `data-imag-src` - The file path to the default image source
 * `data-image-alt` (optional) - The string value for the alt attribute of the lazy-loaded image (default: '')
 * `data-image-srcset` (optional) - The `srcset` attribute value you want to set for responsive images

For example:

	<div data-image-src="image.jpg"></div>

Or

	<div data-image-src="image.jpg"
	     data-image-alt="Some alternative text"></div>

To use the script, you simply call the method with the size you want to load the images at:

	window.easyLazyImages( 400 );

This would lazy load images at 400px or above.

If you are using named breakpoints via [`getActiveMQ()`](https://github.com/easy-designs/easy-resize-watchers.js), you can supply the named breakpoints in an array:

	window.easyLazyImages( ['break-3', 'break-4'] );

If any of these named breakpoints are employed, the images will be lazy-loaded.

If you want to configure a few different lazy-loaded scenarios, you can supply a second argument to refine the selector:

	window.easyLazyImages( ['break-3', 'break-4'], 'main [data-image-src]' );
 	window.easyLazyImages( ['break-4'], 'aside [data-image-src]' );

## Demo

See [this Codepen](http://codepen.io/aarongustafson/full/XJJoeR/) ([source](http://codepen.io/aarongustafson/pen/XJJoeR))
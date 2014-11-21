/*! Easy Lazy Images (c) Aaron Gustafson (@AaronGustafson). MIT License. https://github.com/easy-designs/easy-lazy-images.js */

/* easyLazyImages()
 * 
 * A global method for configuring lazy-loaded images.
 * 
 * Takes the following arguments:
 * 
 *  @arg load_at (mixed)
 *      a unitless pixel width to lazy load images at or
 *      an array of strings representing named breakpoints
 *      for use with getActiveMQ[1]
 *  @arg selector (string, optional)
 *      an alternate selector to use for finding images 
 *      to lazy-load (default: '[data-image-src]')
 *      Note: The selected element must meet match the 
 *      markup pattern
 * 
 * This script assumes an element with the following 
 * attributes:
 * 
 *  `data-imag-src`
 *      The file path to the default image source
 *  `data-image-alt` (optional)
 *      The string value for the alt attribute of the 
 *      lazy-loaded image (default: '')
 *  `data-image-srcset` (optional)
 *      The `srcset` attribute value you want to set 
 *      for responsive images
 * 
 * For example:
 * 
 *  <div data-image-src="image.jpg"></div>
 * 
 * Or
 * 
 *  <div data-image-src="image.jpg"
 *       data-image-alt="Some alternative text"></div>
 * 
 * To use the script, you simply call the method with the size you
 * want to load the images at:
 * 
 *  window.easyLazyImages( 400 );
 * 
 * This would lazy load images at 400px or above.
 * 
 * If you are using named breakpoints via `getActiveMQ()`[1], you 
 * can supply the named breakpoints in an array:
 * 
 *  window.easyLazyImages( ['break-3', 'break-4'] );
 * 
 * If any of these named breakpoints are employed, the images will 
 * be lazy-loaded.
 * 
 * If you want to configure a few different lazy-loaded scenarios,
 * you can supply a second argument to refine the selector:
 * 
 *  window.easyLazyImages( ['break-3', 'break-4'], 'main [data-image-src]' );
 *  window.easyLazyImages( ['break-4'], 'aside [data-image-src]' );
 * 
 * [1] https://github.com/easy-designs/easy-resize-watchers.js
 * 
 **/
(function(window){
    
    // Dependencies
    if ( ! ( 'watchResize' in window ) ||
         ! ( 'querySelectorAll' in document ) ){ return; }
    
    var $img = document.createElement('img'),
        src_attr = 'data-image-src',
        srcset_attr = 'data-image-srcset',
        alt_attr = 'data-image-alt',
        imaged_attr = 'data-image-loaded',
        default_selector = '[' + src_attr + ']',
        not_imaged = ':not([' + imaged_attr + '])';
    
    window.easyLazyImages = function( load_at, selector ){
        
        var current_size = 0;
        
        selector = selector || default_selector;
        
        // default to pixel values
        function getSize( size )
        {
            current_size = size;
        }
        function shouldLoad()
        {
            return current_size >= load_at;
        }
        
        // Support named breakpoints
        if ( load_at instanceof Array )
        {
            if ( ! ( 'getActiveMQ' in window ) )
            {
                console.log('easyLazyImages() requires getActiveMQ() to work with named breakpoints');
                return;
            }
            
            getSize = function(){
                current_size = window.getActiveMQ();
            };
            shouldLoad = function(){
                var i = load_at.length;
                while ( i-- )
                {
                    if ( current_size == load_at[i] )
                    {
                        return true;
                    }
                }
                return false;
            };
        }
        
        function createImage( $el )
        {
            var $lazy_img = $img.cloneNode( true ),
                src = $el.getAttribute( src_attr ),
                srcset = $el.getAttribute( srcset_attr ),
                alt = $el.getAttribute( alt_attr ) || '';
            
            $lazy_img.setAttribute( 'src', src );
            $lazy_img.setAttribute( 'alt', alt );
            
            if ( srcset )
            {
                $lazy_img.setAttribute( 'srcset', srcset );
            }
            
            return $lazy_img;
        }
        
        function addImage( $el )
        {
            $el.appendChild(
                createImage( $el )
            );
            $el.setAttribute( imaged_attr, '' );
        }
        
        // watch for size changes
        window.watchResize( getSize );
        window.watchResize(function(){
            
            // Don’t load if the necessary sizes aren’t met
            if ( ! shouldLoad() ){ return; }
            
            var $els = document.querySelectorAll( selector + not_imaged ),
                e = 0,
                e_len = $els.length,
                $el,
                $img;
            
            if ( ! e_len ) { return; }
            
            for ( ; e < e_len; e++ )
            {
                $el = $els[e];
                // only images with the data-image-src attribute
                if ( !! $el.getAttribute( src_attr ) )
                {
                    addImage( $el );
                }
            }
            
            $els = null;
            $el = null;
            
        });
        
    };
    
}(window));
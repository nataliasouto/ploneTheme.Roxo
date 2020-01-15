/**
 * Galleria PM3 Theme for use with collective.cover in Interlegis Portal Modelo 3.0 - 2015-05-15
 *
 * http://galleria.io
 * Licensed under the MIT license
 * https://raw.github.com/aino/galleria/master/LICENSE
 *
 */
(function($) {

/*global jQuery, Galleria */

$('.galleria').addClass('tema-pm3');

Galleria.addTheme({
    name: 'tema-pm3',
    author: 'Caio Viotti, http://caio.viotti.me',
    css: 'galleria.tema-pm3.css',
    defaults: {
        thumbnails: 'empty',
        showImagenav: true,
        imageCrop: 'landscape',
        fullscreenDoubleTap: false,
        idleMode: false,
        carousel: false,
        autoplay: true,
        _toggleInfo: false
    },
    init: function(options) {

        this.$('info').appendTo('.galleria-stage');
        this.$('thumbnails-container').appendTo('.galleria-stage');
        this.$('image-nav-right').append("<span><i class='icon-caret-right'></i></span>")
        this.$('image-nav-left').append("<span><i class='icon-caret-left'></i></span>")

        Galleria.requires(1.28, 'This theme requires Galleria 1.2.8 or later');

        // cache some stuff
        var touch = Galleria.TOUCH,
            click = touch ? 'touchstart' : 'click';

        // show loader & counter with opacity
        this.$('loader,counter').show().css('opacity', 0.4);

        // some stuff for non-touch browsers
        if (! touch ) {
            this.addIdleState( this.get('counter'), { opacity:0 });
        }

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }

        });

        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
            e.galleriaData.layer = rm_button(e.galleriaData);
        });

        if($('body').hasClass('template-compose')) {
            this.bind('data', function(e) {
                var self = this;
                $.each( self._data, function(i, data) {
                    self._data[i].layer = rm_button(data);
                });
            });
        }
        if($('body').hasClass('template-compose')) {
            this.bind('image', function(e) {
                $(e.imageTarget).prev().html(e.galleriaData.layer);
                $(e.imageTarget).prev().show();
                $(".tile-remove-item").click(function(e) {
                    e.preventDefault();
                    var uid = $(this).attr("data-uid");
                    var tile = $(this).parents('.tile');

                    tile.find('.loading-mask').addClass('show remove-tile');
                    var tile_type = "collective.cover.carousel";
                    var tile_id = tile.attr("id");
                    $.ajax({
                         url: "@@removeitemfromlisttile",
                         data: {'tile-type': tile_type, 'tile-id': tile_id, 'uid': uid},
                         success: function(info) {
                             $(tile).find('.galleria-inner').remove();
                             tile.html(info);
                             TitleMarkupSetup();
                             tile.find('.loading-mask').removeClass('show remove-tile');
                             return false;
                         }
                     });
                });
            });
        }
    }
});

}(jQuery));
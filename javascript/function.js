$(document).ready(function() {
    var $portletItem = $(".portletNavigationTree .portletItem"),
        $portletHeader = $(".portletNavigationTree .portletHeader");

    //Injects mobile menu button
    $("header").append("<div class='menu-button'><button><span class='hiddenStructure'>Mostrar ou Ocultar Menu</span><i class='icon-reorder'></i></button></div>");

    //Show menu on mobile menu button click
    $(".menu-button button").on( "click", function() {
        $(this).toggleClass("menuAtivo");
        $portletItem.slideUp(200);
        $portletHeader.removeClass("menuAtivo");
        $("#column-one").slideToggle();

    });
    //Collapse menu according to screen size
    $(window).resize(function() {
        if ($(window).width() < 753) {
            $portletHeader.unbind();
            $(".menu-button button").removeClass("menuAtivo")
            $portletItem.hide();
            $("#column-one").hide();
            $("#column-one").addClass("menuAtivo");
            $portletHeader.click(function(e) {
                e.preventDefault();
                $(this).toggleClass("menuAtivo");
                $(this).next().slideToggle();
            });
        } else {
            $portletHeader.unbind();
            $portletItem.show();
            $("#column-one").removeClass("menuAtivo")
            $("#column-one").show();
            $(".menu-button button").removeClass("menuAtivo")
            $("#column-one").css("display","table-cell");
        }
        navScrollWidth = $('nav ul')[0].scrollWidth - $('nav ul')[0].clientWidth;


    }).resize();

    if (Galleria.get().length !== 0) {
        Galleria.configure({wait: true});
    }

});

$(window).load(function() {
    /*
     * Confere se existe uma Galleria do Cover na página, e então carrega um novo tema.
     */
    if (Galleria.get().length !== 0) {
        if ($('.galleria-container').parent().hasClass('cover-carousel-tile')) {
            if (!$('body').hasClass('template-compose')) {
                //Unload e destruição da Galleria atual
                Galleria.unloadTheme();
                Galleria.get(0).destroy();
                //Reinicia a Galleria com o novo tema carregado
                Galleria.loadTheme('++theme++Azul/galleria-theme/galleria.tema-pm3.js');
                Galleria.run('.galleria', {
                    theme: 'tema-pm3'
                });
                //Configurações do tema
                Galleria.configure({
                    wait: true,
                    height: 0.666,
                    transition: 'fade',
                    transition_speed: 500,
                    imageCrop: 'landscape',
                    showImagenav: true,
                    fullscreenDoubleTap: false,
                    idleMode: false,
                });
            }
        }
    }
});

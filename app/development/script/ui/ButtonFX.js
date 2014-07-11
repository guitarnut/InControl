UI.ButtonFX = (function () {

    var OPACITY_OFF = 0.6;

    function init(c) {
        var $element = $(c);

        $element.stop().css('opacity', OPACITY_OFF);

        $element.hover(
            function () {
                $(this).stop().fadeTo('fast', 1);
            }, function () {
                $(this).stop().fadeTo('fast', OPACITY_OFF);
            });
    }

    // button stays highlighted after one click
    function oneClick(c) {
        var $element = $(c);

        $element.click(function () {
            cleanup($(this));
        })
    }

    function cleanup(c) {
        var $element = $(c);

        // prevent memory leaks, etc
        $element.stop().unbind('mouseenter mouseleave');
    }

    return {
        init: init,
        oneClick: oneClick,
        cleanup: cleanup
    }

})();
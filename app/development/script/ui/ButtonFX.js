UI.ButtonFX = (function () {

    var OPACITY_OFF = 0.6;

    function init(c) {
        var $element = $(c);
        $element.stop().css('opacity', OPACITY_OFF);

        $element.hover(
            function () {
                if ($(this).css('opacity') >= OPACITY_OFF)$(this).stop().fadeTo('fast', 1);
            }, function () {
                if ($(this).css('opacity') >= OPACITY_OFF)$(this).stop().fadeTo('fast', OPACITY_OFF);
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

    function setState(e, d) {
        // allows you to set the state of the button after it fades in
        if (d) {
            setTimeout(function () {
                setInitialState(e);
            }, d)
        } else {
            setInitialState(e);
        }
    }

    function setInitialState(e) {
        e.stop().fadeTo('fast', OPACITY_OFF);
    }

    return {
        init: init,
        oneClick: oneClick,
        cleanup: cleanup,
        setState: setState,
        opacity: function() {
            return OPACITY_OFF;
        }
    }

})();
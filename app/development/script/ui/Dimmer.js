UI.Dimmer = (function() {

    // set 'er up
    var $dimmer = $('#dimmer');

    $dimmer.css({
        position: 'fixed',
        'z-index': 1,
        width: '100%',
        'background-color': '#000',
        top: 0,
        left: 0,
        display: 'none'
    });

    // keep it fullscreen
    window.onresize = function() {
        resizeDimmer();
    };

    // set initial size to full screen
    resizeDimmer();

    function resizeDimmer() {
        $dimmer.css({'height': window.innerHeight + 'px'});
    }

    function show(o) {
        var opacity = o || 1;
        $dimmer.fadeTo(500, opacity);
    }

    function hide(delay) {
        var d = delay || 0;

        $dimmer.delay(d).fadeTo(500, 0, function () {
            $(this).hide();
        });
    }

    function contract(p) {
        var centerAdjust = (100 - p)/2;
        $dimmer.css({'left': centerAdjust + '%', 'width': p + '%'});
    }

    function reset() {
        $dimmer.css({'left': '0', 'width': '100%'});
    }

    function destroy() {
        $dimmer.hide();
    }

    return {
        show: show,
        hide: hide,
        contract: contract,
        reset: reset,
        destroy: destroy
    }

})();
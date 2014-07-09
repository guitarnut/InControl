STARZ.Game = (function () {
    var START_DELAY = 2000;

    var $readyPrompt = $('#ready'),
        $completePrompt = $('#complete'),
        $dimmer = $('#dimmer');

    document.addEventListener('gameEvent', handleGameEvent);

    window.onresize = function() {
        resizeDimmer();
    };

    function init() {
        $readyPrompt.fadeTo('fast', 1);
        $completePrompt.hide();

        resizeDimmer();

        // overlay to dim the background
        $dimmer.fadeTo('fast', 0.75);

        setTimeout(startLevel, START_DELAY);

        STARZ.TVManager.build('.tvScreen');
    }

    function startLevel() {
        $readyPrompt.fadeTo('fast', 0, function () {
            $(this).hide();
        });

        STARZ.TVManager.start();
    }

    function endLevel() {
        $completePrompt.delay(2000).fadeTo('fast', 1);

        // hide bg overlay
        $dimmer.delay(2000).fadeTo('fast', 0, function () {
            $(this).hide();
        });
    }

    function handleGameEvent(e) {
        switch (e.detail) {
            case 'roundComplete':
                endLevel();
                break;
        }
    }

    function resizeDimmer() {
        $dimmer.css({'height': window.innerHeight + 'px'});
    }

    return {
        init: init
    }

})();
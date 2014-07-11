STARZ.Game = (function () {
    var START_DELAY = 2000;

    var $readyPrompt = $('#ready'),
        $completePrompt = $('#complete');

    document.addEventListener('gameEvent', handleGameEvent);

    function init() {
        $readyPrompt.fadeTo('fast', 1);
        $completePrompt.hide();

        // overlay to dim the background
        UI.Dimmer.reset();
        UI.Dimmer.show(0.4);

        setTimeout(startLevel, START_DELAY);

        STARZ.TVManager.build('.tvScreen');
        STARZ.SoundManager.stop();
    }

    function startLevel() {
        $readyPrompt.fadeTo('fast', 0, function () {
            $(this).hide();
        });

        STARZ.SoundManager.playMusic('music2');
        STARZ.TVManager.start();
    }

    function endLevel() {
        $completePrompt.delay(2000).fadeTo('fast', 1);

        // hide bg overlay
        UI.Dimmer.hide(1000);
        STARZ.SoundManager.stop();
    }

    function handleGameEvent(e) {
        switch (e.detail) {
            case 'roundComplete':
                endLevel();
                break;
        }
    }

    return {
        init: init
    }

})();
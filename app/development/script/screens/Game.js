STARZ.Game = (function() {
    var START_DELAY = 2000;

    var $readyPrompt = $('#ready'),
        $completePrompt = $('#complete');

    document.addEventListener('gameEvent', handleGameEvent);

    function init() {
        $readyPrompt.show();
        $completePrompt.hide();
        setTimeout(startLevel, START_DELAY);
        STARZ.TVManager.build('.tvScreen');
    }

    function startLevel() {
        $readyPrompt.hide();
        STARZ.TVManager.start();
    }

    function endLevel() {
        $completePrompt.show();
    }

    function handleGameEvent(e) {
        switch(e.detail) {
            case 'roundComplete':
                endLevel();
                break;
        }
    }

    return {
        init: init
    }

})();
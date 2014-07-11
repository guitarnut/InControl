STARZ.Title = (function() {

    function init() {
        // reset all scores, values, etc
        STARZ.GameStatusManager.reset();
        STARZ.SoundManager.playMusic('music1');

        UI.Dimmer.hide();
    }

    return {
        init: init
    }

})();
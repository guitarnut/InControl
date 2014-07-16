STARZ.Title = (function() {

    function init() {
        // reset all scores, values, etc
        STARZ.GameStatusManager.reset();
        STARZ.SoundManager.playMusic(0);

        UI.Dimmer.hide();
        UI.ToggleButton.init('#volumeToggle', '[data-toggle-on]', '[data-toggle-off]', STARZ.SoundManager.toggle, true);

        $('.toggleButton').fadeTo('fast', 1);
    }

    return {
        init: init
    }

})();
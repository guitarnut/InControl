STARZ.Title = (function() {

    function init() {
        // reset all scores, values, etc
        STARZ.GameStatusManager.reset();
        STARZ.SoundManager.playMusic(0);

        UI.Dimmer.hide();
        UI.ToggleButton.init('#volumeToggle', '[data-toggle-on]', '[data-toggle-off]', STARZ.SoundManager.toggle, true);

        $('.toggleButton').fadeTo('fast', 1);

        UI.VideoPlayer.playVideo("http://www.starz.com/videos/html5/the_white_queen_27014.mp4");
    }

    return {
        init: init
    }

})();
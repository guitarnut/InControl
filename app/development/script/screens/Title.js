STARZ.Title = (function() {

    var $titleImage,
        $buttonPlay,
        $buttonInstructions,
        toggleButton;

    function init() {
        // reset all scores, values, etc
        STARZ.GameStatusManager.reset();
        STARZ.SoundManager.playMusic(0);
        UI.Dimmer.hide();

        // only do this once
        if(!toggleButton) {
            toggleButton = '#volumeToggle';
            UI.ToggleButton.init(toggleButton, '[data-toggle-on]', '[data-toggle-off]', STARZ.SoundManager.toggle, true);
        }

        // get stuff, store stuff, animate stuff
        $titleImage = $titleImage || $('#titleImage');
        $buttonPlay = $buttonPlay || $('#titlePlay');
        $buttonInstructions = $buttonInstructions || $('#titleInstructions');

        TweenLite.from($titleImage,3, {'opacity': 0});
        TweenLite.from($buttonPlay, 0.5, {'opacity': 0, x: '-100px', delay: 2.5});
        TweenLite.from($buttonInstructions, 0.5, {'opacity': 0, x: '100px', delay: 2.5});

        $('.toggleButton').fadeTo('fast', 1);

        //UI.VideoPlayer.playVideo("http://www.starz.com/videos/html5/the_white_queen_27014.mp4");
    }

    return {
        init: init
    }

})();
STARZ.InControl = (function () {

    var dataTotal = 0,
        dataMax = 2;

    function init() {
        // reset all user stats;
        STARZ.GameStatusManager.reset();

        // setup data and listeners
        setupGameData();

        // load tv images
        preloadTVImages();
    }

    // load game data, startup
    function setupGameData() {
        // only run it the first time we play
        if (dataTotal === 0) {

            // music setup
            STARZ.SoundManager.init('audio');
            STARZ.SoundManager.addMusic('title');
            STARZ.SoundManager.addMusic('gameplay');
            STARZ.SoundManager.addFX('bonus');
            STARZ.SoundManager.addFX('hurry');
            STARZ.SoundManager.addFX('locked');
            STARZ.SoundManager.addFX('broken');
            STARZ.SoundManager.addFX('correct');
            STARZ.SoundManager.addFX('incorrect');

            // button setup
            UI.ButtonFX.init('.button1');

            STARZ.ScreenManager.showScreen('#loading');
            STARZ.JSONLoader.load('data/images.json', tvDataLoaded, gameError);
            STARZ.JSONLoader.load('data/quiz.json', quizDataLoaded, gameError);
        } else {
            STARZ.ScreenManager.showScreen('#titleScreen');
        }
    }

    function tvDataLoaded(d) {
        STARZ.TVManager.data(d);
        dataItemLoaded();
    }

    function quizDataLoaded(d) {
        STARZ.QuizManager.data(d);
        dataItemLoaded();
    }

    function dataItemLoaded() {
        dataTotal++;
        checkStatus();
    }

    function checkStatus() {
        if (dataTotal === dataMax) {
            bindMethods();
            STARZ.ScreenManager.showScreen('#titleScreen');
        }
    }

    // store methods you'd like to call when specific screens load
    function bindMethods() {
        // reset game
        STARZ.ScreenManager.bindMethod('#titleScreen', STARZ.Title.init);

        // instructions
        STARZ.ScreenManager.bindMethod('#instructionsScreen', STARZ.Instructions.init);

        // setup quiz questions
        STARZ.ScreenManager.bindMethod('#triviaScreen', STARZ.Quiz.init);

        // setup game screen
        STARZ.ScreenManager.bindMethod('#gameplayScreen', STARZ.Game.init);

        // setup summary screen
        STARZ.ScreenManager.bindMethod('#summaryScreen', STARZ.Summary.init);
    }

    // universal error handler. call this from anywhere in the app if a crash occurs
    function gameError(e) {
        // handle fatal error
        if (e) {
            console.log('Error: ' + e);
        }
        console.log('Game crashed.')
    }

    function preloadTVImages() {
        var images = ['black', 'complete', 'bonus_1', 'bonus_2', 'broken', 'image', 'starz'],
            totals = [1, 1, 1, 1, 4, 8, 14];

        for (var i = 0; i < images.length; i++) {
            var img = images[i];

            // are there more than one of this image?
            if (totals[i] > 1) {
                // yes? load them incrementally using the convention 'file_1'
                for (var j = 1; j <= totals[i]; j++) {
                    loadImage(img + '_' + j);
                }
            } else {
                // no? then load it as is.
                loadImage(img);
            }
        }

    }

    function loadImage(img) {
        //console.log('loading ' + img);
        var a = new Image();
        a.src = 'img/tv/' + img + '.jpg';
        a.onload = function () {
            //console.log('image loaded');
        };
    }

    return {
        init: init,
        error: gameError
    }

})();

STARZ.InControl.init();
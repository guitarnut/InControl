STARZ.InControl = (function() {

    var dataTotal = 0,
        dataMax = 2;

    function init() {
        // video setup
        UI.VideoPlayer.init('[data-video]', '#closeVideo');

        // reset all user stats;
        STARZ.GameStatusManager.reset();

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

        // setup data and listeners
        loadGameData();
    }

    // load game data, startup
    function loadGameData() {
        if(dataTotal === 0) {
            STARZ.ScreenManager.showScreen('#loading');
            STARZ.JSONLoader.load('data/images.json', tvDataLoaded, gameError);
            STARZ.JSONLoader.load('data/quiz.json', quizDataLoaded, gameError);
        } else {
            STARZ.ScreenManager.showScreen('#titleScreen');
        }
    }

    function tvDataLoaded(d) {
        STARZ.TVManager.data(d);
        dataTotal++;
        checkStatus();
    }

    function quizDataLoaded(d) {
        STARZ.QuizManager.data(d);
        dataTotal++;
        checkStatus();
    }

    function checkStatus() {
        if(dataTotal === dataMax) {
            bindMethods();
            STARZ.ScreenManager.showScreen('#titleScreen');
            //UI.VideoPlayer.playVideo("http://www.starz.com/videos/html5/the_white_queen_27014.mp4");
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
        if(e) {
            console.log('Error: ' + e);
        }
        console.log('Game crashed.')
    }

    return {
        init: init,
        error: gameError
    }

})();

STARZ.InControl.init();
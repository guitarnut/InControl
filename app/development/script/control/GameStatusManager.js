STARZ.GameStatusManager = (function () {

    var gameData;

    // start listening for score events
    addListeners();

    function storeData(k, v) {
        switch (k) {
            case 'score':
                gameData.score += v;
                break;
            case 'bonus':
                gameData.score += v;
                break;
            case 'correct':
                gameData.correct++;
                gameData.score += STARZ.Scores.Correct;
                break;
            case 'incorrect':
                gameData.incorrect++;
                gameData.score += STARZ.Scores.Incorrect;
                break;
            case 'channels':
                gameData.channels++;
                gameData.score += STARZ.Scores.Channel;
                if (gameData.channels > 100)STARZ.EventDispatcher.fire('achievementEvent', STARZ.Achievement.Clicks);
                break;
            case 'completedTV':
                gameData.completedTV++;
                gameData.score += STARZ.Scores.CompletedTV;
                if (gameData.completedTV > 20)STARZ.EventDispatcher.fire('achievementEvent', STARZ.Achievement.SavedTV);
                break;
            case 'brokenTV':
                gameData.brokenTV++;
                gameData.score += STARZ.Scores.BrokenTV;
                if (gameData.brokenTV > 10)STARZ.EventDispatcher.fire('achievementEvent', STARZ.Achievement.BrokenTV);
                break;
            case 'achievement':
                // check for duplicates
                if (gameData.achievements.indexOf(v) === -1)gameData.achievements.push(v);
                break;
        }
    }

    function getData() {
        return gameData;
    }

    function reset() {
        gameData = {
            'score': 0,
            'correct': 0,
            'incorrect': 0,
            'completedTV': 0,
            'channels': 0,
            'brokenTV': 0,
            'achievements': [],
            'currentRound': 0,
            'totalRounds': 3
        }
    }

    // capture stats and scoring events
    function addListeners() {
        document.addEventListener('tvEvent', handleEvent);
        document.addEventListener('quizEvent', handleEvent);
        document.addEventListener('gameEvent', handleEvent);
        document.addEventListener('achievementEvent', handleEvent);
    }

    function handleEvent(e) {
        var event = e.type,
            detail = e.detail;

        switch (event) {
            case 'gameEvent':
                if (detail === 'roundComplete')gameData.currentRound++;
                break;
            case 'tvEvent':
                if (detail === 'complete')STARZ.GameStatusManager.store('completedTV');
                if (detail === 'broken')STARZ.GameStatusManager.store('brokenTV');
                if (detail === 'channel')STARZ.GameStatusManager.store('channels');
                if (detail.type === 'bonus')STARZ.GameStatusManager.store('bonus', detail.value);
                break;
            case 'quizEvent':
                if (detail === 'correct')STARZ.GameStatusManager.store('correct');
                if (detail === 'incorrect')STARZ.GameStatusManager.store('incorrect');
                break;
            case 'achievementEvent':
                storeData('achievement', detail);
                break;
        }
    }

    return {
        reset: reset,
        store: storeData,
        data: getData
    }

})();
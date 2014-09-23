STARZ.Summary = (function() {

    var $broken,
        $completed,
        $score,
        $correct,
        $bonusCount,
        $incorrect,
        $achievements;

    var data;

    function init() {
        // if they got this far, the game is over
        STARZ.EventDispatcher.fire('achievementEvent', STARZ.Achievement.GameComplete);

        $broken = $broken || $('[data-stat-broken]');
        $completed = $completed || $('[data-stat-completed]');
        $score = $score || $('[data-stat-score]');
        $bonusCount = $bonusCount || $('[data-stat-bonuscount]');
        $correct = $correct || $('[data-stat-correct]');
        $incorrect = $incorrect || $('[data-stat-incorrect]');
        $achievements = $achievements || $('#achievements');

        STARZ.SoundManager.playMusic(0);

        data = STARZ.GameStatusManager.data();

        setText();

        UI.Dimmer.contract(80);
        UI.Dimmer.show(0.4);
    }

    function setText() {
        $broken.text(data.brokenTV);
        //$completed.text(data.completedTV);
        $score.text(data.score);
        $bonusCount.text(data.bonusCount);
        $correct.text(data.correct);
        //$incorrect.text(data.incorrect);

        // populate achievements list
        var html = '';
        $achievements.empty();

        for(var i = 0; i < data.achievements.length; i++) {
            html += '<span class="achievement">'+ data.achievements[i].name + ' - ' + data.achievements[i].detail + '</span><br>';
        }

        $(html).appendTo($achievements);
    }

    return {
        init: init
    }

})();
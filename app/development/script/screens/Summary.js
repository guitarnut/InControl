STARZ.Summary = (function() {

    var $broken,
        $completed,
        $channels,
        $score,
        $correct,
        $incorrect,
        $achievements;

    var data;

    function init() {
        // if they got this far, the game is over
        STARZ.EventDispatcher.fire('achievementEvent', STARZ.Achievement.GameComplete);

        $broken = $broken || $('[data-stat-broken]');
        $completed = $completed || $('[data-stat-completed]');
        $channels = $channels || $('[data-stat-channels]');
        $score = $score || $('[data-stat-score]');
        $correct = $correct || $('[data-stat-correct]');
        $incorrect = $incorrect || $('[data-stat-incorrect]');
        $achievements = $achievements || $('#achievements');

        data = STARZ.GameStatusManager.data();

        setText();
    }

    function setText() {
        $broken.text(data.brokenTV);
        $completed.text(data.completedTV);
        $channels.text(data.channels);
        $score.text(data.score);
        $correct.text(data.correct);
        $incorrect.text(data.incorrect);

        // populate achievements list
        var html = '';
        $achievements.empty();

        for(var i = 0; i < data.achievements.length; i++) {
            html += '<span class="achievement"><strong class="ltBlue">'+ data.achievements[i].name + '</strong><br><em>' + data.achievements[i].detail + '</em></span><br>';
        }

        $(html).appendTo($achievements);
    }

    return {
        init: init
    }

})();
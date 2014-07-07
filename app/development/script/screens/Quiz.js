STARZ.Quiz = (function () {

    var $play = $('[data-screen="#gameplayScreen"]'),
        $summary = $('[data-screen="#summaryScreen"]');

    function init() {
        // if they've reached level three, change which button shows by assigning the 'next' class to it
        var d = STARZ.GameStatusManager.data();

        $play.addClass('next');
        $summary.removeClass('next');

        if (d.currentRound === d.totalRounds) {
            $play.removeClass('next');
            $summary.addClass('next');
        }

        buildQuiz();
    }

    function buildQuiz() {
        STARZ.QuizManager.build('span');
    }

    return {
        init: init
    }

})();
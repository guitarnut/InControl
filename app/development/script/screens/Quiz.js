STARZ.Quiz = (function () {

    var data,
        quizRoundData,
        questionsComplete,
        questionsTotal,
        $play = $('[data-screen="#gameplayScreen"]'),
        $summary = $('[data-screen="#summaryScreen"]'),
        $nextQuestion = $('[data-method="nextQuestion"]');

    // track every time a question is answered
    document.addEventListener('quizEvent', handleEvent);

    // bind method to this button
    $nextQuestion.click(function () {
        buildQuiz();
    });

    function init() {
        // setup buttons
        $nextQuestion.addClass('next');
        $play.removeClass('next');
        $summary.removeClass('next');

        STARZ.SoundManager.playMusic(0);

        // if they've reached level three, change which button shows by assigning the 'next' class to it
        data = data || STARZ.GameStatusManager.data();

        // get data specific to this round
        quizRoundData = STARZ.QuizManager.questions();

        switch (data.currentRound) {
            case 1:
                questionsTotal = quizRoundData[0].round1;
                break;
            case 2:
                questionsTotal = quizRoundData[0].round2;
                break;
            case 3:
                questionsTotal = quizRoundData[0].round3;
                break;
            default:
                questionsTotal = quizRoundData[0].round1;
                break;
        }

        questionsComplete = 0;

        UI.Dimmer.contract(80);
        UI.Dimmer.show(0.4);

        buildQuiz();
    }

    // every time a question is answered, check the total and show the appropriate button
    function handleEvent() {
        questionsComplete++;

        // we're done with this quiz
        if (questionsComplete === questionsTotal) {
            //console.log(data.currentRound +', '+ data.totalRounds);
            // all questions answered, and it's the final round
            if (data.currentRound === data.totalRounds) {
                //console.log('done');
                // this determines which button will show when the user finishes the quiz question
                $nextQuestion.removeClass('next');
                $summary.addClass('next');
            } else {
                // all questions answered, but there's another round of gameplay
                $nextQuestion.removeClass('next');
                $play.addClass('next');
            }
        }
    }

    function buildQuiz() {
        // specify the element that will hold quiz questions (div, span, p, etc);
        STARZ.QuizManager.build('span');
    }

    return {
        init: init
    }

})();
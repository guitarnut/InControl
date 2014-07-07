STARZ.QuizManager = (function () {

    var quizData,
        currentQuestion = 0,
        $parentContainer = $('#triviaScreen'),
        $questionText,
        $questionAnswersContainer,
        $questionAnswers,
        $questionFeedback,
        $nextButtonOptions,
        $nextButton,
        totalAnswers,
        completedAnswers;

    function storeData(d) {
        quizData = d;
    }

    // accepts the page element that you'd like to use for the questions
    function createQuestion(el) {
        // cleanup existing content
        cleanup();

        // store the page elements for the quiz
        $questionText = $questionText || $('[data-question]:eq(0)');
        $questionAnswersContainer = $questionAnswersContainer || $('[data-answers]:eq(0)');
        $questionFeedback = $questionFeedback || $('[data-feedback]:eq(0)');
        $nextButtonOptions = $nextButtonOptions || $parentContainer.find('.buttonOptions');

        // hide all the options
        $nextButtonOptions.hide();

        // this button may change, so we'll always look for a new instance
        $nextButton = $parentContainer.find('.next');

        var q = quizData.questions[currentQuestion];
        $questionText.text(q.question);

        // build question answers
        for (var i = 0; i < q.answers.length; i++) {
            var answer = q.answers[i].answer;
            var correct = q.answers[i].correct;

            // keep track of the total right answers
            if (correct === 1)totalAnswers++;

            var html = '<' + el + '  class="lightMargin hotspot border1" data-answer data-correct="' + correct + '">' + answer + '</' + el + '>';
            $(html).appendTo($questionAnswersContainer);
        }

        $questionAnswers = $('[data-answer]');

        $questionAnswers.click(function () {
            var $this = $(this);
            var correct = $this.attr('data-correct');

            if (correct === '1') {
                STARZ.EventDispatcher.fire('achievementEvent', STARZ.Achievement.RightAnswer);
                $this.addClass('correct');
                // keep track of the user's progress
                completedAnswers++;
                // prompt for more answers if there are multiple correct ones
                if ((totalAnswers > 1) && (totalAnswers > completedAnswers))$questionFeedback.text('Keep going, there are more correct answers.');
            } else {
                STARZ.EventDispatcher.fire('achievementEvent', STARZ.Achievement.WrongAnswer);
                $this.addClass('incorrect');
                // no second chances if you get one wrong
                complete(q.incorrect, 'incorrect');
            }

            // all correct answers selected
            if (completedAnswers === totalAnswers) {
                complete(q.correct, 'correct');
            }
        });

        currentQuestion++;

        // prevent index error
        if (currentQuestion === quizData.questions.length)currentQuestion = 0;
    }

    // remove listeners, reset values, empty content
    function cleanup() {
        totalAnswers = 0;
        completedAnswers = 0;

        // remove styling
        $('[data-answer]').removeClass('correct incorrect');

        // remove old content
        if ($questionText) {
            $questionText.empty();
            $questionAnswers.remove();
            $questionFeedback.empty();
        }
    }

    // question is done
    function complete(t, c) {
        // remove listeners
        if ($questionAnswers != undefined) $questionAnswers.unbind('click');

        $questionFeedback.text(t);
        $nextButton.show();

        STARZ.EventDispatcher.fire('quizEvent', c);
    }

    return {
        data: storeData,
        build: createQuestion
    }

})();


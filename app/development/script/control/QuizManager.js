STARZ.QuizManager = (function () {

    var quizData,
        currentQuestion = 0,
        $parentContainer = $('#triviaScreen'),
        $questionText,
        $questionAnswersContainer,
        $questionAnswers,
        $questionFeedback,
        $leftImage,
        $rightImage,
        $nextButtonOptions,
        $nextButton,
        totalAnswers,
        completedAnswers;

    function storeData(d) {
        quizData = d;
    }

    // accepts the page element that you'd like to use for the questions
    function createQuestion(el) {
        // remove button FX to keep buttons hidden
        UI.ButtonFX.cleanup('.buttonOptions');

        // cleanup existing content
        cleanup();

        // store the page elements for the quiz
        $questionText = $questionText || $('[data-question]:eq(0)');
        $questionAnswersContainer = $questionAnswersContainer || $('[data-answers]:eq(0)');
        $questionFeedback = $questionFeedback || $('[data-feedback]:eq(0)');
        $nextButtonOptions = $nextButtonOptions || $parentContainer.find('.buttonOptions');
        $leftImage = $leftImage || $('#triviaImageLeft');
        $rightImage = $rightImage || $('#triviaImageRight');

        // hide all the options
        $nextButtonOptions.hide();

        // get the images for this particular quiz
        var imageLeft = quizData.questions[currentQuestion].brandImageLeft,
            imageRight = quizData.questions[currentQuestion].brandImageRight;

        // populate the images
        addBrandingImages($leftImage, imageLeft);
        addBrandingImages($rightImage, imageRight);

        var q = quizData.questions[currentQuestion];
        $questionText.html(q.question);

        // build question answers
        for (var i = 0; i < q.answers.length; i++) {
            var answer = q.answers[i].answer;
            var correct = q.answers[i].correct;

            // keep track of the total right answers
            if (correct === 1)totalAnswers++;

            var html = '<' + el + '  class="lightMargin hotspot triviaButton default" data-answer data-correct="' + correct + '">' + answer + '</' + el + '>';
            $(html).appendTo($questionAnswersContainer);
        }

        // animate in buttons
        animateButtons('.triviaButton');

        // add button FX to new instances
        UI.ButtonFX.init('.triviaButton');
        UI.ButtonFX.oneClick('.triviaButton');

        $questionAnswers = $('[data-answer]');

        $questionAnswers.click(function () {
            var $this = $(this);
            $this.unbind('click');
            var correct = $this.attr('data-correct');

            $this.removeClass('default');

            if (correct === '1') {
                STARZ.EventDispatcher.fire('achievementEvent', STARZ.Achievement.RightAnswer);
                $this.addClass('correct');
                // keep track of the user's progress
                completedAnswers++;
                // prompt for more answers if there are multiple correct ones
                if ((totalAnswers > 1) && (totalAnswers > completedAnswers))$questionFeedback.text('Keep going, there are more correct answers.');
                STARZ.SoundManager.playFX(4);
            } else {
                STARZ.EventDispatcher.fire('achievementEvent', STARZ.Achievement.WrongAnswer);
                $this.addClass('incorrect');
                // no second chances if you get one wrong
                complete(q.incorrect, 'incorrect');
                STARZ.SoundManager.playFX(5);
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

    // populate the left and right images
    function addBrandingImages(el, src) {
        el.empty();

        if (src != "") {
            $('<img src="img/branding/' + src + '" class="imgResponsive">').appendTo(el);
            el.show();
        } else {
            el.hide();
        }
    }

    function animateButtons(b) {
        var count = 1,
            delay = .400;

        $(b).each(function () {
            var $this = $(this);
            TweenLite.from($this, .25, {'y': 30, 'opacity': 0, delay: count * delay});
            count++;
            UI.ButtonFX.setState($this, count * delay * 1000);
        });
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

        STARZ.EventDispatcher.fire('quizEvent', c);

        // cleanup bindings
        UI.ButtonFX.cleanup('.triviaButton');

        // add button FX to next button
        UI.ButtonFX.init('.buttonOptions');

        // this must happen after the event is fired
        // this button will change, so we'll always look for a new instance
        $nextButton = $parentContainer.find('.next');

        // animate it in
        $nextButton.fadeTo('slow', 1);
        TweenLite.from($nextButton, .25, {'x': 100})
    }

    return {
        data: storeData,
        build: createQuestion,
        questions: function () {
            // stores how many questions each round has
            return quizData.sets;
        }
    }

})();
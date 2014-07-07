STARZ.Timer = (function () {

    var TIMER_RANGE = 3;

    var TVTimer = function (el) {
        var TIMER_SPEED = Math.round(Math.random() * TIMER_RANGE) + 1;

        var $el = el,
            timerTween,
            timerCompleteMethod,
            alertInterval;

        function start() {
            if (timerTween) {
                // if we paused an existing tween
                timerTween.play();
            } else {
                // if we're starting a new tween
                timerTween = new TweenLite($el, TIMER_SPEED, {width: '80%', ease: Linear.easeNone, onComplete: timerComplete});
                //timerTween.progress() = 0.8;
            }
        }

        function stop() {
            if (timerTween)timerTween.pause();
        }

        function restart() {
            if (timerTween)timerTween.restart();
        }

        function reset() {
            // reset the tween var so we know to start from scratch
            timerTween = null;
            $el.css('width', '0');
        }

        // call a method when the timer reaches a certain point
        function setAlert(t, m) {
            alertInterval = setInterval(function () {
                if (timerTween) {
                    if (timerTween.progress() >= t) {
                        m();
                    }
                }
            }, 1000);
        }

        function timerComplete() {
            clearInterval(alertInterval);
            timerCompleteMethod();
        }

        function setCompleteCallback(m) {
            timerCompleteMethod = m;
        }

        return {
            start: start,
            stop: stop,
            reset: reset,
            restart: restart,
            complete: setCompleteCallback,
            alert: setAlert
        }
    };

    function createTimer(el) {
        return TVTimer(el);
    }

    return {
        create: createTimer
    }

})();
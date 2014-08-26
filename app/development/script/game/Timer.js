STARZ.Timer = (function () {

    var TIMER_RANGE = 15;

    var TVTimer = function (el) {
        var TIMER_SPEED = Math.round(Math.random() * TIMER_RANGE) + TIMER_RANGE;

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
            if (alertInterval)clearInterval(alertInterval);
        }

        // call a method when the timer reaches a certain point
        function setAlert(t, m) {
            alertInterval = setInterval(function () {
                if (timerTween) {
                    if (timerTween.progress() >= t) {
                        m();
                        clearInterval(alertInterval);
                    }
                }
            }, 1000);
        }

        function timerComplete() {
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
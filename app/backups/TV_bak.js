STARZ.TV = (function () {

    // tv set class object
    var TVSet = function (data) {
        var TWEEN_SPEED = 1,
            CHANNEL_INTERVAL,
            CHANNEL_SPEED = 1000;

        var el = data.el,
            images = data.images,
            starzImage = data.starzImage,
            finalImage = data.finalImage,
            brokenImage = data.brokenImage,
            bonusImageObject = data.bonusImage,
            bonusValue = 0,
            broken = false,
            finalClick = false,
            paused = false,
            currentImage = '',
            timer = STARZ.Timer.create(el.children('.timer:eq(0)')),
            alert = el.children('.alert:eq(0)'),
            alertIcon = alert.children('.animate:eq(0)'),
            bonus = el.children('.bonus:eq(0)'),
            bonusIcon = bonus.children('.animate:eq(0)');

        function tvReady() {
            // get everything ready, but don't add click events or start the timer
            resetTimer();
            changeScreenImage();

            // reset any css transformations
            el.removeClass('broken1');
            el.removeClass('broken2');
            el.removeClass('broken3');
            el.removeClass('broken4');

            broken = false;
            finalClick = false;
            paused = false;
            alert.hide();
            bonus.hide();
        }

        function start() {
            // when time runs out, break the tv set
            timer.complete(smash);

            // set a warning when the timer is close to done
            timer.alert('0.7', showAlert);

            // add the bonus image if it exists, and setup an event for when it's clicked
            if (bonusImageObject != null) {
                // determine where it will be placed in the image array
                var index = Math.floor(Math.random() * (images.length - 1));
                images.splice(index, 0, bonusImageObject.image);

                // store the bonusValue value
                bonusValue = bonusImageObject.value;
            }

            // store the final image
            images.push(starzImage);

            startTimer();

            el.click(function () {
                handleClick();
            })
        }

        function changeScreenImage() {
            // screen image is random.  it may take two or ten+ clicks to get to the STARZ image
            //timer.restart();
            //hideAlert();

            var imgIndex = Math.floor(Math.random() * images.length);

            if (imgIndex === images.length) imgIndex--;

            if (images[imgIndex] === currentImage) {
                // prevents showing the same image twice
                changeScreenImage();
            } else {
                currentImage = images[imgIndex];
                if (currentImage === starzImage) finalClick = true;
                el.css({'background-image': 'url(img/tv/' + currentImage + ')'});
            }

        }

        function showAlert() {
            alert.fadeTo('fast', 1);
            new TweenLite(alertIcon, TWEEN_SPEED, {width: '100%', rotation: '360', ease: Quad.easeOut});
        }

        function hideAlert() {
            alert.fadeTo('slow', 0, function () {
                $(this).hide();
            });
            new TweenLite(alertIcon, TWEEN_SPEED, {width: '50%', rotation: '0', ease: Quad.easeOut});
        }

        function showBonus() {
            bonus.fadeTo('fast', 1);
            new TweenLite(bonusIcon, TWEEN_SPEED, {width: '100%', ease: Quad.easeOut, onComplete: hideBonus});
        }

        function hideBonus() {
            bonus.fadeTo('slow', 0, function () {
                $(this).hide();
            });
            new TweenLite(bonusIcon, TWEEN_SPEED, {width: '50%', ease: Quad.easeOut});
        }

        function handleClick() {
            if (!paused) {
                // check to see if it's a starz original, otherwise keep cycling through images
                if (finalClick) {
                    complete();
                } else {
                    // store the number of clicks
                    STARZ.EventDispatcher.fire('tvEvent', 'channel');

                    if (bonusImageObject) {
                        // check to see if it's a bonus
                        if (currentImage === bonusImageObject.image) {
                            STARZ.EventDispatcher.fire('tvEvent', {'type': 'bonus', 'value': bonusValue});
                            showBonus();
                        }
                    }

                    //changeScreenImage();
                }
            }
        }

        function resetTimer() {
            timer.reset();
        }

        function startTimer() {
            paused = false;
            timer.start();

            CHANNEL_INTERVAL = setInterval()
        }

        function pauseTimer() {
            paused = true;
            timer.stop();
        }

        function smash() {
            cleanupTV();
            broken = true;

            // css transform
            var broken = Math.floor(Math.random() * 4);

            switch (broken) {
                case 0:
                    el.addClass('broken1');
                    break;
                case 1:
                    el.addClass('broken2');
                    break;
                case 2:
                    el.addClass('broken3');
                    break;
                case 3:
                    el.addClass('broken4');
                    break;
                default:
                    el.addClass('broken1');
                    break;
            }

            el.css({'background-image': 'url(img/tv/' + brokenImage + ')'});
            STARZ.EventDispatcher.fire('tvEvent', 'broken');
        }

        function complete() {
            timer.stop();
            cleanupTV();
            el.css({'background-image': 'url(img/tv/' + finalImage + ')'});
            STARZ.EventDispatcher.fire('tvEvent', 'complete');
        }

        function cleanupTV() {
            timer.reset();
            hideAlert();
            removeClick();
        }

        function removeClick() {
            el.unbind('click');
        }

        return {
            init: tvReady,
            start: start,
            pause: pauseTimer
        }

    };

    // create tv method
    function createTV(data) {
        return TVSet(data);
    }

    return {
        create: createTV
    }

})();
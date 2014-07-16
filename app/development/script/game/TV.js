STARZ.TV = (function () {

    // tv set class object
    var TVSet = function (data) {
        var TWEEN_SPEED = .5,
            CHANNEL_INTERVAL,
            CHANNEL_SPEED = Math.round(Math.random()*4000)+2000;

        var el = data.el,
            images = data.images,
            starzImage = data.starzImage,
            finalImage = data.finalImage,
            brokenImage = data.brokenImage,
            bonusImageObject = data.bonusImage,
            bonusValue = 0,
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

            // store the final image
            images.push(starzImage);

            // set the initial image
            changeScreenImage();

            // reset any css transformations
            el.removeClass('broken1');
            el.removeClass('broken2');
            el.removeClass('broken3');
            el.removeClass('broken4');

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

            startTimer();

            el.click(function () {
                handleClick();
            })
        }

        function changeScreenImage() {
            // screen image is random.
            var imgIndex = Math.floor(Math.random() * images.length);

            if (imgIndex === images.length) imgIndex--;

            if (images[imgIndex] === currentImage) {
                // prevents showing the same image twice
                changeScreenImage();
            } else {
                currentImage = images[imgIndex];
                el.css({'background-image': 'url(img/tv/' + currentImage + ')'});
            }

        }

        function showAlert() {
            alert.fadeTo('fast', 1);
            new TweenLite(alertIcon, TWEEN_SPEED, {width: '70%', rotation: '360', ease: Quad.easeOut});
        }

        function hideAlert() {
            alert.fadeTo('slow', 0, function () {
                $(this).hide();
            });
            new TweenLite(alertIcon, TWEEN_SPEED, {width: '20%', rotation: '0', ease: Quad.easeOut});
        }

        function showBonus() {
            bonus.fadeTo('fast', 1);
            new TweenLite(bonusIcon, TWEEN_SPEED, {width: '70%', ease: Quad.easeOut, onComplete: hideBonus});
            STARZ.SoundManager.playFX(0);
        }

        function hideBonus() {
            bonus.fadeTo('slow', 0, function () {
                $(this).hide();
            });
            new TweenLite(bonusIcon, TWEEN_SPEED, {width: '20%', ease: Quad.easeOut});
        }

        function handleClick() {
            if (!paused) {
                // check to see if it's a starz original, otherwise keep cycling through images
                if (currentImage === starzImage) {
                    complete();
                } else {
                    if (bonusImageObject) {
                        // check to see if it's a bonus
                        if (currentImage === bonusImageObject.image) {
                            STARZ.EventDispatcher.fire('tvEvent', {'type': 'bonus', 'value': bonusValue});
                            showBonus();
                            changeScreenImage();
                        }
                    }
                }
            }
        }

        function resetTimer() {
            timer.reset();
        }

        function startTimer() {
            paused = false;
            timer.start();

            startChangingChannels();
        }

        function pauseTimer() {
            paused = true;
            timer.stop();

            stopChangingChannels();
        }

        function startChangingChannels() {
            // start cycling through images
            CHANNEL_INTERVAL = setInterval(changeScreenImage, CHANNEL_SPEED);
        }

        function stopChangingChannels() {
            // stop cycling through images
            clearInterval(CHANNEL_INTERVAL);
        }

        function smash() {
            cleanupTV();

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
            STARZ.SoundManager.playFX(0);
        }

        function complete() {
            timer.stop();
            stopChangingChannels();
            cleanupTV();
            el.css({'background-image': 'url(img/tv/' + finalImage + ')'});
            STARZ.EventDispatcher.fire('tvEvent', 'complete');
            STARZ.SoundManager.playFX(1);
        }

        function cleanupTV() {
            timer.reset();
            stopChangingChannels();
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
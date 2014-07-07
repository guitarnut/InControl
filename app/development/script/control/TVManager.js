STARZ.TVManager = (function () {

    var BONUS_FREQUENCY = 3;

    var imageData,
        tvSets = [],
        brokenCount,
        completeCount;

    function storeData(d) {
        imageData = d;
    }

    function createTVs(el) {
        if (tvSets.length < 1) {
            $(el).each(function () {
                // build the object
                var data = {
                    'el': $(this),
                    'starzImage': pickImage(imageData.starz),
                    'images': createImagesArray(imageData.generic),
                    'brokenImage': pickImage(imageData.broken),
                    'bonusImage': pickBonusImage(imageData.bonus),
                    'finalImage': imageData.finalImage
                };

                var tv = STARZ.TV.create(data);
                document.addEventListener('tvEvent', handleTVEvent);
                tvSets.push(tv);
            });
        }

        tvReady();
    }

    // set the initial image, reset the timer, prep for gameplay
    function tvReady() {
        // reset level counters
        brokenCount = 0;
        completeCount = 0;

        for (var i = 0; i < tvSets.length; i++) {
            tvSets[i].init();
        }
    }

    function startTVs() {
        for (var i = 0; i < tvSets.length; i++) {
            tvSets[i].start();
        }
    }

    function pauseTVs() {
        for (var i = 0; i < tvSets.length; i++) {
            tvSets[i].pause();
        }
    }

    function pickImage(imgArray) {
        // randomly select which original will appear on the tv
        var n = Math.floor(Math.random() * imgArray.length);

        // prevent exceeding the array index
        if (n === imgArray.length) n--;

        return imgArray[n].image;
    }

    function pickBonusImage(imgArray) {
        // random chance for a bonus image is determined
        if (Math.ceil(Math.random() * BONUS_FREQUENCY) === BONUS_FREQUENCY) {
            // randomly select which original will appear on the tv
            var n = Math.floor(Math.random() * imgArray.length);

            // prevent exceeding the array index
            if (n === imgArray.length) n--;

            // return the bonus image and it's value
            return {
                'image': imgArray[n].image,
                'value': imgArray[n].value
            };

        } else {
            // no soup for you
            return null;
        }
    }

    function createImagesArray(imgCollection) {
        var keys = Object.keys(imgCollection);
        var imgArray = [];

        for (var i = 0; i < keys.length; i++) {
            imgArray.push(imgCollection[keys[i]].image);
        }

        return imgArray;
    }

    // tracks the status of all the tvs, fires event to end the level
    function handleTVEvent(e) {
        switch (e.detail) {
            case 'broken':
                brokenCount++;
                break;
            case 'complete':
                completeCount++;
                break;
        }

        if ((brokenCount + completeCount) === tvSets.length) {
            STARZ.EventDispatcher.fire('gameEvent', 'roundComplete');
        }

    }

    return {
        data: storeData,
        build: createTVs,
        pause: pauseTVs,
        start: startTVs
    }

})();
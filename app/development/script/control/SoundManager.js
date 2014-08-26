STARZ.SoundManager = (function () {

    var mute = false,
        audio,
        fx = [],
        music = [],
        currentMusic,
        filesLoaded = 0,
        totalFiles = 0,
        $loadText = $('#loading').find('.loadStatus');

    function init(a) {
        audio = document.getElementById(a);
        audio.style.display = "none";
    }

    function addFX(f) {
        storeAudio(f, fx);
    }

    function addMusic(m) {
        // storeAudio(m, music);
    }

    function storeAudio(file, array) {
        totalFiles++;
        var instance = document.getElementById(file);
        instance.preload = "auto";
        array.push(instance);
        // instance.addEventListener('canplaythrough', audioLoaded);
    }

    function audioLoaded() {
        filesLoaded++;
        $loadText.text('Loading ' + filesLoaded + ' of ' + totalFiles + ' audio files.');
        if (filesLoaded === totalFiles) {
            STARZ.EventDispatcher.fire('audioloaded');
        }
    }

    function playFX(s) {
        if (!mute) {
            fx[s].load();
            fx[s].play();
        }
    }

    function playMusic(s) {
        /*
        if (currentMusic)currentMusic.pause();
        currentMusic = music[s];

        if (!mute) {
            music[s].load();
            music[s].play();
        }
        */
    }

    function stop() {
        // if (currentMusic)currentMusic.pause();
    }

    function toggle(m) {
        mute = m || !mute;

        if (mute) {
            stop();
        } else {
            // if (currentMusic)currentMusic.play();
        }
    }

    function pause() {
        mute = true;
        stop();
    }

    function resume() {
        mute = false;
        // if (currentMusic)currentMusic.play();
    }

    return {
        init: init,
        addFX: addFX,
        addMusic: addMusic,
        playFX: playFX,
        playMusic: playMusic,
        stop: stop,
        toggle: toggle,
        pause: pause,
        resume: resume
    }

})();
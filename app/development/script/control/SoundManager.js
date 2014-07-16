STARZ.SoundManager = (function () {

    var mute = false,
        audio,
        fx = [],
        music = [],
        currentMusic;

    function init(a) {
        audio = document.getElementById(a);
        audio.style.display = "none";
    }

    function addFX(f) {
        fx.push(document.getElementById(f));
    }

    function addMusic(m) {
        music.push(document.getElementById(m));
    }

    function playFX(s) {
        if (!mute) {
            fx[s].load();
            fx[s].play();
        }
    }

    function playMusic(s) {
        if (currentMusic)currentMusic.pause();
        currentMusic = music[s];

        if (!mute) {
            music[s].load();
            music[s].play();
        }
    }

    function stop() {
        if (currentMusic)currentMusic.pause();
    }

    function toggle() {
        mute = !mute;

        if (mute) {
            stop();
        } else {
            if (currentMusic)currentMusic.play();
        }
    }

    return {
        init: init,
        addFX: addFX,
        addMusic: addMusic,
        playFX: playFX,
        playMusic: playMusic,
        stop: stop,
        toggle: toggle
    }

})();
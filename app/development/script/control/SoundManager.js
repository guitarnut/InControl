STARZ.SoundManager = (function () {

    var audio,
        fx,
        music,
        path,
        fileType = '.wav';
    //'audio/demo.wav'

    function init(a, p) {
        path = p;

        audio = document.getElementById(a);
        audio.style.display = "none";
        audio.innerHTML = '<audio id="fx"></audio><audio id="music" loop></audio>';

        fx = document.getElementById('fx');
        music = document.getElementById('music');
    }

    function playFX(s) {
        fx.src = path + s + fileType;
        fx.play();
    }

    function playMusic(s) {
        music.src = path + s + fileType;
        music.play();
    }

    function stop() {
        music.pause();
        fx.pause();
    }

    return {
        init: init,
        playFX: playFX,
        playMusic: playMusic,
        stop: stop
    }

})();
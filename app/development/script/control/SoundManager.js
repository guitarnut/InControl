STARZ.SoundManager = (function () {

    var snd = 'audio/demo.wav';

    function init() {
    }

    function play(s) {
        switch(s) {
            case 'win':
                snd = '';
                break;
        }
        console.log('Playing sound ' + s)
    }

    return {
        init: init,
        play: play
    }

})();
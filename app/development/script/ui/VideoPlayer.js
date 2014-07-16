UI.VideoPlayer = (function () {
    // adds the STARZ video player and libraries to a document
    var $video,
        $close,
        trys = 0,
        initialized = false;

    var libSrc = 'http://assets.starz.com/starzvideoplayer/v1-patch30/JsLib/starzVideoPlayer2.js';

    function init(e, c) {
        if (!initialized) {
            initialized = true;

            $video = $(e);
            $close = $(c);

            // create the library script tag
            var vLib = document.createElement('script');
            vLib.type = 'text/javascript';
            vLib.async = true;
            vLib.src = libSrc;

            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(vLib, s);

            // close button
            $close.click(function () {
                close();
            });

            $video.hide();
        }
    }

    function playVideo(v) {
        if (typeof starzVideoPlayer2 === 'undefined') {
            setTimeout(function () {
                trys++;

                if (trys === 3) {
                    error();
                } else {
                    playVideo(v);
                }
            }, 500);
        } else {
            _options = {
                src: v,
                ccUri: "",
                poster: "img/poster.jpg",
                width: 533,
                height: 300,
                autoPlay: true
            };

            starzVideoPlayer2.init(_options, false);
            $video.show();
            STARZ.SoundManager.pause();
        }
    }

    function close() {
        starzVideoPlayer2.stop();
        $video.hide();
        STARZ.SoundManager.resume();
    }

    function error() {
        // handle video error
        console.log('error');
    }

    return {
        init: init,
        playVideo: playVideo,
        close: close
    }

})();
UI.VideoPlayer = (function () {
    // adds the STARZ video player and libraries to a document

    var libSrc = 'http://assets.starz.com/starzvideoplayer/v1-patch30/JsLib/starzVideoPlayer2.js',
        videoContainer = '<div class="videoWrapper"><div id="StarzVideoPlayer" ><div id="StarzVideoPlayerFallback"></div></div></div>';

    function init() {
        // add the player div
        var b = document.getElementsByTagName('body')[0];
        b.innerHTML += videoContainer;

        // create the library script tag
        var vLib = document.createElement('script');
        vLib.type = 'text/javascript';
        vLib.async = true;
        vLib.src = libSrc;

        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(vLib, s);

        setTimeout(showVideo, 1000);
    }

    function playVideo(v) {

    }

    function close() {

    }

    function showVideo() {
        _options = {
            src: "http://www.starz.com/videos/html5/the_white_queen_27014.mp4",
            ccUri: "",
            poster: "http://assets.starz.com/starzvideoplayer/v1-Patch30/Assets/starz_darkBkgd_685x385.jpg",
            width: 533,
            height: 300,
            autoPlay: true
        };

        starzVideoPlayer2.init(_options, false);
    }

    function VideoTimeUpdate() {
        if (_myPlayer) {
            if (_myPlayer.currentTime() > 5) {
                if (_myPlayer.currentTime() > _myPlayer.duration() - .1) {
                    _myPlayer.pause();
                }
            }
        }
    }

    function hideVideo() {
        $video.html("");
        _myPlayer = null;
    }

    return {
        init: init,
        playVideo: playVideo,
        close: close
    }

})();
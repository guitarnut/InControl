UI.Navigation = (function() {

    // handle all screen-to-screen nav with the data-screen attribute
    $('[data-screen]').click(function() {
        var s = $(this).attr('data-screen');
        var e = new CustomEvent('navEvent', {'detail': s});
        document.dispatchEvent(e);
    });

})();
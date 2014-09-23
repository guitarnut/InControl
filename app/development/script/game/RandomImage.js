// requires jquery

function RandomImage(el) {
    var $el = $(el),
        _images = [];

    $el.children('img').each(function() {
        _images.push($(this));
        hideAll();
    });

    function pickImage() {
        hideAll();
        var n = Math.floor(Math.round(Math.random()*_images.length));
        _images[n].show();
    }

    function hideAll() {
        for(var i = 0; i < _images.length; i++) {
            _images[i].hide();
        }
    }

    return {
        pick: pickImage
    }
}
STARZ.Instructions = (function() {

    var instructions;

    function init() {


        if(!instructions) {
            setupUI();
        } else {
            instructions.reset();
        }
    }

    function setupUI() {
        instructions = UI.Slideshow.build('#instructions', '.wrapper', '.item', '.prev', '.next');
    }

    return {
        init: init
    }

})();
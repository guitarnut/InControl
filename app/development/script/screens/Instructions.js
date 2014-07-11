STARZ.Instructions = (function() {

    var instructions;

    function init() {
        UI.Dimmer.contract(80);
        UI.Dimmer.show(0.4);

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
STARZ.Title = (function() {

    function init() {
        // reset all scores, values, etc
        STARZ.GameStatusManager.reset();

        UI.Dimmer.hide();
    }

    return {
        init: init
    }

})();
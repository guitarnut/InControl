STARZ.EventDispatcher = (function() {

    // accepts event type and details object
    // use this for app-wide events you'd like to capture on the document level
    function fireEvent(e, o) {
        document.dispatchEvent(new CustomEvent(e, {'detail': o}));
    }

    return {
        fire: fireEvent
    }

})();
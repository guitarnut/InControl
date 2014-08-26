
STARZ.EventDispatcher = (function() {

    // accepts event type and details object
    // use this for app-wide events you'd like to capture on the document level
    function fireEvent(e, o) {
        // IE Workaround
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent(e, true, false, o);

        document.dispatchEvent(event);
        //document.dispatchEvent(new CustomEvent(e, {'detail': o}));
    }

    return {
        fire: fireEvent
    }

})();
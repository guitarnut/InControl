STARZ.JSONLoader = (function() {

    // accepts a file path, success callback, and error callback
    function loadJSON(u, s, e) {
        $.ajax({
            url: u,
            data: "json",
            success: dataLoaded,
            error: dataError
        });

        // send the data back to the caller
        function dataLoaded(d) {
            s(d);
        }

        // send the error message back to the caller
        function dataError(error) {
            e(error.status + ', ' + u + ' ' + error.statusText);
        }
    }

    return {
        load: loadJSON
    }

})();
STARZ.ScreenManager = (function() {

    var TRANSITION_SPEED = 500;
    var currentScreen,
        screenMethods = {
            'methods': []
        };

    // handle all screen-to-screen nav with the data-screen attribute
    $('[data-screen]').click(function() {
        var s = $(this).attr('data-screen');
        showScreen(s);
    });

    function showScreen(s) {
        if(!currentScreen) {
            show(s);
        } else {
            currentScreen.stop().fadeTo(TRANSITION_SPEED, 0, function() {
                currentScreen.hide();
                show(s);
            })
        }
    }

    function show(s) {
        currentScreen = $(s);
        checkForScreenMethod(s);
        currentScreen.stop().fadeTo(TRANSITION_SPEED, 1);
    }

    // store methods that you'd like to run when a screen shows
    // for example, call the quiz manager when the quiz screen shows
    function bindMethod(k, m, a) {
        var o = {
            'screen': k,
            'method': m,
            'argument': a
        };

        screenMethods.methods.push(o);
    }

    // look for a method for a particular screen
    function checkForScreenMethod(s) {
        for(var i = 0; i < screenMethods.methods.length; i++) {
            if(screenMethods.methods[i].screen === s) {
                screenMethods.methods[i].method(screenMethods.methods[i].argument);
                break;
            }
        }
    }

    return {
        showScreen: showScreen,
        bindMethod: bindMethod
    }

})();
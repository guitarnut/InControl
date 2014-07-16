UI.ToggleButton = (function () {

    function init(e, a, b, fa, fb, initialState) {
        // accepts a parent element, an 'on' element, an 'off' element, and a separate or single method for the on and off elements.
        var $element = $(e),
            $toggleOn = $element.find($(a)),
            $toggleOff = $element.find($(b)),
            toggleOnMethod = fa,
            toggleOffMethod;

        toggleOffMethod = ((initialState = undefined) ? toggleOffMethod = fb : (initialState = fb)&&(toggleOffMethod = toggleOnMethod));

        $element.data('toggle', initialState);
        $toggleOff.hide();
        $element.fadeTo('fast', 1);

        $element.click(function () {
            var $this = $(this);

            if ($this.data('toggle')) {
                toggleOnMethod();
                $toggleOn.hide();
                $toggleOff.show();
                $this.data('toggle', false);
            } else {
                toggleOffMethod();
                $toggleOn.show();
                $toggleOff.hide();
                $this.data('toggle', true);
            }
        })
    }

    return {
        init: init
    }

})();
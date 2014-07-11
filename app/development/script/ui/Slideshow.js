UI.Slideshow = (function () {

    function init(p, w, c, prev, next) {
        return new Instance(p, w, c, prev, next);
    }

    // slideshow instance
    var Instance = function (p, w, c, prev, next) {
        var $parent, $wrapper, $containers, $prev, $next, count, animating;

        $parent = $(p);
        $wrapper = $parent.find(w + ':eq(0)');
        $containers = $wrapper.children(c);
        $prev = $parent.find(prev + ':eq(0)');
        $next = $parent.find(next + ':eq(0)');

        setupCSS();
        setupButtons();
        reset();

        function setupCSS() {
            var maxHeight = 0;

            $containers.each(function () {
                var $this = $(this);
                $this.css({'width': $parent.width() + 'px', 'display': 'block', 'float': 'left', 'height': $this.height() + 'px'});

                if ($this.height() > maxHeight)maxHeight = $this.height();
            });

            $wrapper.css({'width': ($containers.length * $parent.width) + 'px', 'height': maxHeight + 'px', 'position': 'absolute', 'overflow': 'hidden', 'top': 0, 'left': 0});

            $next.css({'position': 'absolute', 'z-index': '1000', 'right': '5%', 'top': '50%', 'margin-top': '-' + $next.height() / 2 + 'px'});
            $prev.css({'position': 'absolute', 'z-index': '1000', 'left': '5%', 'top': '50%', 'margin-top': '-' + $next.height() / 2 + 'px'});
        }

        function setupButtons() {
            $prev.click(function () {
                animate(-1);
            });

            $next.click(function () {
                animate(1);
            })
        }

        function animate(v) {
            if (!animating) {
                animating = true;
                var $i = $($containers[count]);

                $i.fadeTo('fast', 0, function () {
                    count += v;

                    if (count < 0) count = $containers.length - 1;
                    if (count === $containers.length) count = 0;

                    $i.hide();

                    var $j = $($containers[count]);

                    $j.fadeTo('fast', 1, function () {
                        if (count === 0)$prev.fadeTo('fast', 0, function () {
                            $prev.hide();
                        });
                        if (count === $containers.length - 1)$next.fadeTo('fast', 0, function () {
                            $next.hide();
                        });
                        if (count > 0)$prev.fadeTo('fast', 0.8);
                        if (count < $containers.length - 1)$next.fadeTo('fast', 0.8);

                        animating = false;
                    })
                });
            }
        }

        function reset() {
            $prev.hide();
            $next.hide();
            $containers.hide();

            animating = true;
            count = 0;

            var $j = $($containers[count]);

            $j.fadeTo('fast', 1, function() {
                animating = false;
                $next.fadeTo('fast', 1);
            });
        }

        return {
            reset: reset
        }
    };

    return {
        build: init
    }

})();
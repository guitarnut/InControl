var STARZ = STARZ || {};
STARZ.Achievement = {}, STARZ.Achievement.SavedTV = {name: "Screen Saver", detail: "Save at least 20 TVs."}, STARZ.Achievement.BrokenTV = {name: "It Was Working a Minute Ago...", detail: "Break at least 10 TVs."}, STARZ.Achievement.RightAnswer = {name: "Head of the Class", detail: "Answer at least one quiz question correctly."}, STARZ.Achievement.WrongAnswer = {name: "Studying is Overrated", detail: "Answer at least one quiz question incorrectly."}, STARZ.Achievement.Clicks = {name: "I Can't Feel My Fingers", detail: "Change 100 channels or more."}, STARZ.Achievement.GameComplete = {name: "Control Freak", detail: "Complete the InControl Game."}, STARZ.GameStatusManager = function () {
    function a(a, b) {
        switch (a) {
            case"score":
                f.score += b;
                break;
            case"correct":
                f.correct++, f.score += STARZ.Scores.Correct;
                break;
            case"incorrect":
                f.incorrect++, f.score += STARZ.Scores.Incorrect;
                break;
            case"channels":
                f.channels++, f.score += STARZ.Scores.Channel, f.channels > 100 && STARZ.EventDispatcher.fire("achievementEvent", STARZ.Achievement.Clicks);
                break;
            case"completedTV":
                f.completedTV++, f.score += STARZ.Scores.CompletedTV, f.completedTV > 20 && STARZ.EventDispatcher.fire("achievementEvent", STARZ.Achievement.SavedTV);
                break;
            case"brokenTV":
                f.brokenTV++, f.score += STARZ.Scores.BrokenTV, f.brokenTV > 10 && STARZ.EventDispatcher.fire("achievementEvent", STARZ.Achievement.BrokenTV);
                break;
            case"achievement":
                -1 === f.achievements.indexOf(b) && f.achievements.push(b)
        }
    }

    function b() {
        return f
    }

    function c() {
        f = {score: 0, correct: 0, incorrect: 0, completedTV: 0, channels: 0, brokenTV: 0, achievements: [], currentRound: 0, totalRounds: 2}
    }

    function d() {
        document.addEventListener("tvEvent", e), document.addEventListener("quizEvent", e), document.addEventListener("gameEvent", e), document.addEventListener("achievementEvent", e)
    }

    function e(b) {
        var c = b.type, d = b.detail;
        switch (c) {
            case"gameEvent":
                "roundComplete" === d && f.currentRound++;
                break;
            case"tvEvent":
                "complete" === d && STARZ.GameStatusManager.store("completedTV"), "broken" === d && STARZ.GameStatusManager.store("brokenTV"), "channel" === d && STARZ.GameStatusManager.store("channels");
                break;
            case"quizEvent":
                "correct" === d && STARZ.GameStatusManager.store("correct"), "incorrect" === d && STARZ.GameStatusManager.store("incorrect");
                break;
            case"achievementEvent":
                a("achievement", d)
        }
    }

    var f;
    return d(), {reset: c, store: a, data: b}
}(), STARZ.QuizManager = function () {
    function a(a) {
        e = a
    }

    function b(a) {
        c(), f = f || $("[data-question]:eq(0)"), g = g || $("[data-answers]:eq(0)"), i = i || $("[data-feedback]:eq(0)"), j = j || o.find(".buttonOptions"), j.hide(), console.log(j), k = o.find(".next");
        var b = e.questions[n];
        f.text(b.question);
        for (var p = 0; p < b.answers.length; p++) {
            var q = b.answers[p].answer, r = b.answers[p].correct;
            1 === r && l++;
            var s = "<" + a + ' data-answer data-correct="' + r + '">' + q + "</" + a + ">";
            $(s).appendTo(g)
        }
        h = $("[data-answer]"), h.click(function () {
            var a = $(this), c = a.attr("data-correct");
            "1" === c ? (STARZ.EventDispatcher.fire("achievementEvent", STARZ.Achievement.RightAnswer), a.addClass("correct"), m++, l > 1 && l > m && i.text("Keep going, there are more correct answers.")) : (STARZ.EventDispatcher.fire("achievementEvent", STARZ.Achievement.WrongAnswer), a.addClass("incorrect"), d(b.incorrect, "incorrect")), m === l && d(b.correct, "correct")
        }), n++, n === e.questions.length && (n = 0)
    }

    function c() {
        l = 0, m = 0, $("[data-answer]").removeClass("correct incorrect"), f && (f.empty(), h.remove(), i.empty())
    }

    function d(a, b) {
        void 0 != h && h.unbind("click"), i.text(a), k.show(), STARZ.EventDispatcher.fire("quizEvent", b)
    }

    var e, f, g, h, i, j, k, l, m, n = 0, o = $("#triviaScreen");
    return{data: a, build: b}
}(), STARZ.ScreenManager = function () {
    function a(a) {
        e ? e.stop().fadeTo(f, 0, function () {
            e.hide(), b(a)
        }) : b(a)
    }

    function b(a) {
        e = $(a), d(a), e.stop().fadeTo(f, 1)
    }

    function c(a, b, c) {
        var d = {screen: a, method: b, argument: c};
        g.methods.push(d)
    }

    function d(a) {
        for (var b = 0; b < g.methods.length; b++)if (g.methods[b].screen === a) {
            g.methods[b].method(g.methods[b].argument);
            break
        }
    }

    var e, f = 500, g = {methods: []};
    return $("[data-screen]").click(function () {
        var b = $(this).attr("data-screen");
        a(b)
    }), {showScreen: a, bindMethod: c}
}(), STARZ.SoundManager = function () {
    function a() {
    }

    function b(a) {
        switch (a) {
            case"win":
                c = ""
        }
        console.log("Playing sound " + a)
    }

    var c = "audio/demo.wav";
    return{init: a, play: b}
}(), STARZ.TVManager = function () {
    function a(a) {
        i = a
    }

    function b(a) {
        l.length < 1 && $(a).each(function () {
            var a = {el: $(this), starzImage: f(i.starz), images: g(i.generic), brokenImage: f(i.broken), finalImage: i.finalImage}, b = STARZ.TV.create(a);
            document.addEventListener("tvEvent", h), l.push(b)
        }), c()
    }

    function c() {
        j = 0, k = 0;
        for (var a = 0; a < l.length; a++)l[a].init()
    }

    function d() {
        for (var a = 0; a < l.length; a++)l[a].start()
    }

    function e() {
        for (var a = 0; a < l.length; a++)l[a].pause()
    }

    function f(a) {
        var b = Math.floor(Math.random() * a.length);
        return b === a.length && b--, a[b].image
    }

    function g(a) {
        for (var b = Object.keys(a), c = [], d = 0; d < b.length; d++)c.push(a[b[d]].image);
        return c
    }

    function h(a) {
        switch (a.detail) {
            case"broken":
                j++;
                break;
            case"complete":
                k++
        }
        j + k === l.length && STARZ.EventDispatcher.fire("gameEvent", "roundComplete")
    }

    var i, j, k, l = [];
    return{data: a, build: b, pause: e, start: d}
}(), STARZ.Scores = {}, STARZ.Scores.CompletedTV = 1e3, STARZ.Scores.BrokenTV = -500, STARZ.Scores.Correct = 500, STARZ.Scores.Channel = 10, STARZ.Scores.Incorrect = -250, STARZ.TV = function () {
    function a(a) {
        return b(a)
    }

    var b = function (a) {
        function b() {
            h(), d(), u = !1, v = !1, w = !1, z.hide()
        }

        function c() {
            y.complete(k), y.alert("0.7", e), q.push(r), i(), p.click(function () {
                g()
            })
        }

        function d() {
            y.restart(), f();
            var a = Math.floor(Math.random() * q.length);
            a === q.length && a--, q[a] === x ? d() : (x = q[a], x === r && (v = !0), p.css({"background-image": "url(img/tv/" + x + ")"}))
        }

        function e() {
            z.fadeTo("fast", 1), new TweenLite(A, o, {width: "100%", rotation: "360", ease: Quad.easeOut})
        }

        function f() {
            z.fadeTo("slow", 0), new TweenLite(A, o, {width: "50%", rotation: "0", ease: Quad.easeOut})
        }

        function g() {
            w || (v ? l() : (STARZ.EventDispatcher.fire("tvEvent", "channel"), d()))
        }

        function h() {
            y.reset()
        }

        function i() {
            w = !1, y.start()
        }

        function j() {
            w = !0, y.stop()
        }

        function k() {
            m(), u = !0, p.css({"background-image": "url(img/tv/" + t + ")"}), STARZ.EventDispatcher.fire("tvEvent", "broken")
        }

        function l() {
            y.stop(), m(), p.css({"background-image": "url(img/tv/" + s + ")"}), STARZ.EventDispatcher.fire("tvEvent", "complete")
        }

        function m() {
            y.reset(), f(), n()
        }

        function n() {
            p.unbind("click")
        }

        var o = 1, p = a.el, q = a.images, r = a.starzImage, s = a.finalImage, t = a.brokenImage, u = !1, v = !1, w = !1, x = "", y = STARZ.Timer.create(p.children(".timer:eq(0)")), z = p.children(".alert:eq(0)"), A = z.children(".animate:eq(0)");
        return{init: b, start: c, pause: j}
    };
    return{create: a}
}(), STARZ.Timer = function () {
    function a(a) {
        return c(a)
    }

    var b = 3, c = function (a) {
        function c() {
            j ? j.play() : j = new TweenLite(n, m, {width: "80%", ease: Linear.easeNone, onComplete: h})
        }

        function d() {
            j && j.pause()
        }

        function e() {
            j && j.restart()
        }

        function f() {
            j = null, n.css("width", "0")
        }

        function g(a, b) {
            l = setInterval(function () {
                j && j.progress() >= a && b()
            }, 1e3)
        }

        function h() {
            clearInterval(l), k()
        }

        function i(a) {
            k = a
        }

        var j, k, l, m = Math.round(Math.random() * b) + 1, n = a;
        return{start: c, stop: d, reset: f, restart: e, complete: i, alert: g}
    };
    return{create: a}
}(), STARZ.Game = function () {
    function a() {
        f.show(), g.hide(), setTimeout(b, e), STARZ.TVManager.build(".tvScreen")
    }

    function b() {
        f.hide(), STARZ.TVManager.start()
    }

    function c() {
        g.show()
    }

    function d(a) {
        switch (a.detail) {
            case"roundComplete":
                c()
        }
    }

    var e = 2e3, f = $("#ready"), g = $("#complete");
    return document.addEventListener("gameEvent", d), {init: a}
}(), STARZ.GameOver = function () {
    function a() {
    }

    return{init: a}
}(), STARZ.Instructions = function () {
    function a() {
    }

    return{init: a}
}(), STARZ.Quiz = function () {
    function a() {
        var a = STARZ.GameStatusManager.data();
        c.addClass("next"), d.removeClass("next"), a.currentRound === a.totalRounds && (c.removeClass("next"), d.addClass("next")), b()
    }

    function b() {
        STARZ.QuizManager.build("li")
    }

    var c = $('[data-screen="#gameplayScreen"]'), d = $('[data-screen="#summaryScreen"]');
    return{init: a}
}(), STARZ.Summary = function () {
    function a() {
        STARZ.EventDispatcher.fire("achievementEvent", STARZ.Achievement.GameComplete), c = c || $("[data-stat-broken]"), d = d || $("[data-stat-completed]"), e = e || $("[data-stat-channels]"), f = f || $("[data-stat-score]"), g = g || $("[data-stat-correct]"), h = h || $("[data-stat-incorrect]"), i = i || $("#achievements"), j = STARZ.GameStatusManager.data(), b()
    }

    function b() {
        c.text(j.brokenTV), d.text(j.completedTV), e.text(j.channels), f.text(j.score), g.text(j.correct), h.text(j.incorrect);
        var a = "";
        i.empty();
        for (var b = 0; b < j.achievements.length; b++)a += '<li class="achievement">' + j.achievements[b].name + "<br>" + j.achievements[b].detail + "</li>";
        "" === a && (a = '<li class="achievementFail">None</li>'), $(a).appendTo(i)
    }

    var c, d, e, f, g, h, i, j;
    return{init: a}
}(), STARZ.Title = function () {
    function a() {
        STARZ.GameStatusManager.reset()
    }

    return{init: a}
}(), STARZ.EventDispatcher = function () {
    function a(a, b) {
        document.dispatchEvent(new CustomEvent(a, {detail: b}))
    }

    return{fire: a}
}(), STARZ.JSONLoader = function () {
    function a(a, b, c) {
        function d(a) {
            b(a)
        }

        function e(b) {
            c(b.status + ", " + a + " " + b.statusText)
        }

        $.ajax({url: a, data: "json", success: d, error: e})
    }

    return{load: a}
}(), STARZ.InControl = function () {
    function a() {
        STARZ.GameStatusManager.reset(), STARZ.SoundManager.init(), b()
    }

    function b() {
        0 === h ? (STARZ.ScreenManager.showScreen("#loading"), STARZ.JSONLoader.load("data/images.json", c, g), STARZ.JSONLoader.load("data/quiz.json", d, g)) : STARZ.ScreenManager.showScreen("#titleScreen")
    }

    function c(a) {
        STARZ.TVManager.data(a), h++, e()
    }

    function d(a) {
        STARZ.QuizManager.data(a), h++, e()
    }

    function e() {
        h === i && (f(), STARZ.ScreenManager.showScreen("#titleScreen"))
    }

    function f() {
        STARZ.ScreenManager.bindMethod("#titleScreen", STARZ.Title.init), STARZ.ScreenManager.bindMethod("#triviaScreen", STARZ.Quiz.init), STARZ.ScreenManager.bindMethod("#gameplayScreen", STARZ.Game.init), STARZ.ScreenManager.bindMethod("#summaryScreen", STARZ.Summary.init)
    }

    function g(a) {
        a && console.log("Error: " + a), console.log("Game crashed.")
    }

    var h = 0, i = 2;
    return{init: a, error: g}
}(), STARZ.InControl.init();
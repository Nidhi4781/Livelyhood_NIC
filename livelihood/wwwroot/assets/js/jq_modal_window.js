try {
    jQuery = require("jquery");
    console.log("using nodejs")
} catch (t) {
    t && console.log("using browser")
} ! function (t) {
    function e(e, n) {
        let o = t(e);
        o.fadeOut(n.speed, function () {
            o.remove()
        })
    }
    t.xPrompt = function (n, o) {
        let p = t.extend({}, t.xPrompt.defaults, n),
            a = t("<div />"),
            c = t("<button />"),
            s = {
                header: "prompt",
                type: "text",
                speed: "fast",
                placeholder: "cannot be empty",
                cBtn: "Cancel",
                sBtn: "Approve",
                error: "Please enter Remarks",
                isCanEmpty: "false"
            };
        o || "function" != typeof p || (o = p, p = {});
        for (const t in s) p[t] || (p[t] = s[t]);
        try {
            t("body").append(a.clone().addClass("pt-Mask").append(a.clone().addClass("pt").append(a.clone().addClass("pt-Center pt-Head").html(p.header), a.clone().addClass("pt-Body").append(t("<textarea></textarea>", {
                type: p.type,
                class: "pt-Input form-control",
                placeholder: p.placeholder,
                isCanEmpty: p.isCanEmpty
            }), t("<small />", {
                class: "pt-Error"
            })), a.clone().addClass("pt-Footer").append(c.clone().attr({
                type: "button",
                id: "pt-Cancel",
                class: "pt-Btn"
            }).text(p.cBtn), c.clone().attr({
                type: "button",
                id: "pt-Submit",
                class: "pt-Btn pt-Right"
            }).text(p.sBtn))))), t(".pt-Mask").fadeIn(p.speed), t("#pt-Cancel").off().on("click", function () {
                e(".pt-Mask", p)
            }), t("#pt-Submit").off().on("click", function () {
                let n = t(".pt-Input").val();

                if (t(".pt-Input").attr("isCanEmpty") == "true") {
                    (o(n), e(".pt-Mask", p))
                }
                else {
                    n && "" !== n ? (o(n), e(".pt-Mask", p)) : t(".pt-Error").text(p.error)
                }
            })
        } catch (t) {
            if (t) return console.log(t)
        }
    }, t.xPromptQ = function (n, o) {
        let p = t.extend({}, t.xPromptQ.defaults, n),
            a = t("<div />"),
            c = t("<button />"),
            s = {
                header: "prompt",
                speed: "fast",
                cBtn: "Cancel",
                sBtn: "Submit"
            };
        o || "function" != typeof p || (o = p, p = {});
        for (const t in s) p[t] || (p[t] = s[t]);
        try {
            t("body").append(a.clone().addClass("ptQ-Mask").append(a.clone().addClass("ptQ").append(a.clone().addClass("pt-Center pt-Head").html(p.header), a.clone().addClass("ptQ-Footer").append(c.clone().attr({
                type: "button",
                id: "ptQ-Cancel",
                class: "pt-Btn"
            }).text(p.cBtn), c.clone().attr({
                type: "button",
                id: "ptQ-Submit",
                class: "pt-Btn pt-Right"
            }).text(p.sBtn))))), t(".ptQ-Mask").fadeIn(p.speed), t("#ptQ-Cancel").off().on("click", function () {
                o(!1), e(".ptQ-Mask", p)
            }), t("#ptQ-Submit").off().on("click", function () {
                o(!0), e(".ptQ-Mask", p)
            })
        } catch (t) {
            if (t) return console.log(t)
        }
    }
}(jQuery);
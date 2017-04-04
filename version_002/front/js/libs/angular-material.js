/*!
 * Angular Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.0.0
 */
!function (e, t, n) {
    "use strict";
    !function () {
        t.module("ngMaterial", ["ng", "ngAnimate", "ngAria", "material.core", "material.core.gestures", "material.core.layout", "material.core.theming.palette", "material.core.theming", "material.core.animate", "material.components.autocomplete", "material.components.bottomSheet", "material.components.backdrop", "material.components.button", "material.components.card", "material.components.checkbox", "material.components.content", "material.components.chips", "material.components.dialog", "material.components.datepicker", "material.components.divider", "material.components.fabActions", "material.components.fabShared", "material.components.fabSpeedDial", "material.components.fabToolbar", "material.components.fabTrigger", "material.components.gridList", "material.components.icon", "material.components.list", "material.components.menu", "material.components.input", "material.components.menuBar", "material.components.progressCircular", "material.components.progressLinear", "material.components.radioButton", "material.components.select", "material.components.showHide", "material.components.sidenav", "material.components.slider", "material.components.sticky", "material.components.subheader", "material.components.swipe", "material.components.switch", "material.components.tabs", "material.components.toast", "material.components.toolbar", "material.components.tooltip", "material.components.virtualRepeat", "material.components.whiteframe"])
    }(), function () {
        function e(e, t) {
            if (t.has("$swipe")) {
                var n = "You are using the ngTouch module. \nAngular Material already has mobile click, tap, and swipe support... \nngTouch is not supported with Angular Material!";
                e.warn(n)
            }
        }

        function n(e, t) {
            e.decorator("$$rAF", ["$delegate", o]), t.theme("default").primaryPalette("indigo").accentPalette("pink").warnPalette("deep-orange").backgroundPalette("grey")
        }

        function o(e) {
            return e.throttle = function (t) {
                var n, o, r, i;
                return function () {
                    n = arguments, i = this, r = t, o || (o = !0, e(function () {
                        r.apply(i, Array.prototype.slice.call(n)), o = !1
                    }))
                }
            }, e
        }

        t.module("material.core", ["ngAnimate", "material.core.animate", "material.core.layout", "material.core.gestures", "material.core.theming"]).config(n).run(e), e.$inject = ["$log", "$injector"], n.$inject = ["$provide", "$mdThemingProvider"]
    }(), function () {
        function e(e) {
            function t(e) {
                return n ? "webkit" + e.charAt(0).toUpperCase() + e.substring(1) : e
            }

            var n = /webkit/i.test(e.vendorPrefix);
            return {
                KEY_CODE: {
                    COMMA: 188,
                    ENTER: 13,
                    ESCAPE: 27,
                    SPACE: 32,
                    PAGE_UP: 33,
                    PAGE_DOWN: 34,
                    END: 35,
                    HOME: 36,
                    LEFT_ARROW: 37,
                    UP_ARROW: 38,
                    RIGHT_ARROW: 39,
                    DOWN_ARROW: 40,
                    TAB: 9,
                    BACKSPACE: 8,
                    DELETE: 46
                },
                CSS: {
                    TRANSITIONEND: "transitionend" + (n ? " webkitTransitionEnd" : ""),
                    ANIMATIONEND: "animationend" + (n ? " webkitAnimationEnd" : ""),
                    TRANSFORM: t("transform"),
                    TRANSFORM_ORIGIN: t("transformOrigin"),
                    TRANSITION: t("transition"),
                    TRANSITION_DURATION: t("transitionDuration"),
                    ANIMATION_PLAY_STATE: t("animationPlayState"),
                    ANIMATION_DURATION: t("animationDuration"),
                    ANIMATION_NAME: t("animationName"),
                    ANIMATION_TIMING: t("animationTimingFunction"),
                    ANIMATION_DIRECTION: t("animationDirection")
                },
                MEDIA: {
                    xs: "(max-width: 599px)",
                    "gt-xs": "(min-width: 600px)",
                    sm: "(min-width: 600px) and (max-width: 959px)",
                    "gt-sm": "(min-width: 960px)",
                    md: "(min-width: 960px) and (max-width: 1279px)",
                    "gt-md": "(min-width: 1280px)",
                    lg: "(min-width: 1280px) and (max-width: 1919px)",
                    "gt-lg": "(min-width: 1920px)",
                    xl: "(min-width: 1920px)"
                },
                MEDIA_PRIORITY: ["xl", "gt-lg", "lg", "gt-md", "md", "gt-sm", "sm", "gt-xs", "xs"]
            }
        }

        t.module("material.core").factory("$mdConstant", e), e.$inject = ["$sniffer"]
    }(), function () {
        function e(e, n) {
            function o() {
                return [].concat(E)
            }

            function r() {
                return E.length
            }

            function i(e) {
                return E.length && e > -1 && e < E.length
            }

            function a(e) {
                return e ? i(u(e) + 1) : !1
            }

            function d(e) {
                return e ? i(u(e) - 1) : !1
            }

            function c(e) {
                return i(e) ? E[e] : null
            }

            function s(e, t) {
                return E.filter(function (n) {
                    return n[e] === t
                })
            }

            function l(e, n) {
                return e ? (t.isNumber(n) || (n = E.length), E.splice(n, 0, e), u(e)) : -1
            }

            function m(e) {
                p(e) && E.splice(u(e), 1)
            }

            function u(e) {
                return E.indexOf(e)
            }

            function p(e) {
                return e && u(e) > -1
            }

            function h() {
                return E.length ? E[0] : null
            }

            function f() {
                return E.length ? E[E.length - 1] : null
            }

            function g(e, o, r, a) {
                r = r || b;
                for (var d = u(o); ;) {
                    if (!i(d))return null;
                    var c = d + (e ? -1 : 1), s = null;
                    if (i(c) ? s = E[c] : n && (s = e ? f() : h(), c = u(s)), null === s || c === a)return null;
                    if (r(s))return s;
                    t.isUndefined(a) && (a = c), d = c
                }
            }

            var b = function () {
                return !0
            };
            e && !t.isArray(e) && (e = Array.prototype.slice.call(e)), n = !!n;
            var E = e || [];
            return {
                items: o,
                count: r,
                inRange: i,
                contains: p,
                indexOf: u,
                itemAt: c,
                findBy: s,
                add: l,
                remove: m,
                first: h,
                last: f,
                next: t.bind(null, g, !1),
                previous: t.bind(null, g, !0),
                hasPrevious: d,
                hasNext: a
            }
        }

        t.module("material.core").config(["$provide", function (t) {
            t.decorator("$mdUtil", ["$delegate", function (t) {
                return t.iterator = e, t
            }])
        }])
    }(), function () {
        function e(e, n, o) {
            function r(e) {
                var n = u[e];
                t.isUndefined(n) && (n = u[e] = i(e));
                var o = h[n];
                return t.isUndefined(o) && (o = a(n)), o
            }

            function i(t) {
                return e.MEDIA[t] || ("(" !== t.charAt(0) ? "(" + t + ")" : t)
            }

            function a(e) {
                var t = p[e];
                return t || (t = p[e] = o.matchMedia(e)), t.addListener(d), h[t.media] = !!t.matches
            }

            function d(e) {
                n.$evalAsync(function () {
                    h[e.media] = !!e.matches
                })
            }

            function c(e) {
                return p[e]
            }

            function s(t, n) {
                for (var o = 0; o < e.MEDIA_PRIORITY.length; o++) {
                    var r = e.MEDIA_PRIORITY[o];
                    if (p[u[r]].matches) {
                        var i = m(t, n + "-" + r);
                        if (t[i])return t[i]
                    }
                }
                return t[m(t, n)]
            }

            function l(n, o, r) {
                var i = [];
                return n.forEach(function (n) {
                    var a = m(o, n);
                    t.isDefined(o[a]) && i.push(o.$observe(a, t.bind(void 0, r, null)));
                    for (var d in e.MEDIA)a = m(o, n + "-" + d), t.isDefined(o[a]) && i.push(o.$observe(a, t.bind(void 0, r, d)))
                }), function () {
                    i.forEach(function (e) {
                        e()
                    })
                }
            }

            function m(e, t) {
                return f[t] || (f[t] = e.$normalize(t))
            }

            var u = {}, p = {}, h = {}, f = {};
            return r.getResponsiveAttribute = s, r.getQuery = c, r.watchResponsiveAttributes = l, r
        }

        t.module("material.core").factory("$mdMedia", e), e.$inject = ["$mdConstant", "$rootScope", "$window"]
    }(), function () {
        function o(o, i, a, d, c, s, l, m, u) {
            function p(e) {
                return e[0] || e
            }

            var h = s.startSymbol(), f = s.endSymbol(), g = "{{" === h && "}}" === f, b = function (e, n, o) {
                var r = !1;
                if (e && e.length) {
                    var i = u.getComputedStyle(e[0]);
                    r = t.isDefined(i[n]) && (o ? i[n] == o : !0)
                }
                return r
            }, E = {
                dom: {}, now: e.performance ? t.bind(e.performance, e.performance.now) : Date.now || function () {
                    return (new Date).getTime()
                }, clientRect: function (e, t, n) {
                    var o = p(e);
                    t = p(t || o.offsetParent || document.body);
                    var r = o.getBoundingClientRect(), i = n ? t.getBoundingClientRect() : {
                        left: 0,
                        top: 0,
                        width: 0,
                        height: 0
                    };
                    return {left: r.left - i.left, top: r.top - i.top, width: r.width, height: r.height}
                }, offsetRect: function (e, t) {
                    return E.clientRect(e, t, !0)
                }, nodesToArray: function (e) {
                    e = e || [];
                    for (var t = [], n = 0; n < e.length; ++n)t.push(e.item(n));
                    return t
                }, scrollTop: function (e) {
                    e = t.element(e || o[0].body);
                    var r = e[0] == o[0].body ? o[0].body : n, i = r ? r.scrollTop + r.parentElement.scrollTop : 0;
                    return i || Math.abs(e[0].getBoundingClientRect().top)
                }, findFocusTarget: function (e, n) {
                    function o(e, n) {
                        var o, r = e[0].querySelectorAll(n);
                        if (r && r.length) {
                            var i = /\s*\[?([\-a-z]*)\]?\s*/i, a = i.exec(n), d = a ? a[1] : null;
                            r.length && t.forEach(r, function (e) {
                                e = t.element(e);
                                var n = e[0].getAttribute(d), r = n && E.validateScope(e) ? e.scope().$eval(n) !== !1 : !0;
                                r && (o = e)
                            })
                        }
                        return o
                    }

                    var r, i = "[md-autofocus]";
                    return r = o(e, n || i), r || n == i || (r = o(e, "[md-auto-focus]"), r || (r = o(e, i))), r
                }, disableScrollAround: function (e, n) {
                    function r(e) {
                        function n(e) {
                        }

                        function r(e) {
                            e.preventDefault()
                        }

                        e = t.element(e || d)[0];
                        var i = 50, a = t.element('<div class="md-scroll-mask" style="z-index: ' + i + '">  <div class="md-scroll-mask-bar"></div></div>');
                        return e.appendChild(a[0]), a.on("wheel", r), a.on("touchmove", r), o.on("keydown", n), function () {
                            a.off("wheel"), a.off("touchmove"), a[0].parentNode.removeChild(a[0]), o.off("keydown", n), delete E.disableScrollAround._enableScrolling
                        }
                    }

                    function i() {
                        var e = d.parentNode, t = e.getAttribute("style") || "", n = d.getAttribute("style") || "", o = E.scrollTop(d), r = d.clientWidth;
                        return d.scrollHeight > d.clientHeight + 1 && (a(d, {
                            position: "fixed",
                            width: "100%",
                            top: -o + "px"
                        }), a(e, {overflowY: "scroll"})), d.clientWidth < r && a(d, {overflow: "hidden"}), function () {
                            d.setAttribute("style", n), e.setAttribute("style", t), d.scrollTop = o, e.scrollTop = o
                        }
                    }

                    function a(e, t) {
                        for (var n in t)e.style[n] = t[n]
                    }

                    if (E.disableScrollAround._count = E.disableScrollAround._count || 0, ++E.disableScrollAround._count, E.disableScrollAround._enableScrolling)return E.disableScrollAround._enableScrolling;
                    e = t.element(e);
                    var d = o[0].body, c = i(), s = r(n);
                    return E.disableScrollAround._enableScrolling = function () {
                        --E.disableScrollAround._count || (c(), s(), delete E.disableScrollAround._enableScrolling)
                    }
                }, enableScrolling: function () {
                    var e = this.disableScrollAround._enableScrolling;
                    e && e()
                }, floatingScrollbars: function () {
                    if (this.floatingScrollbars.cached === n) {
                        var e = t.element('<div style="width: 100%; z-index: -1; position: absolute; height: 35px; overflow-y: scroll"><div style="height: 60px;"></div></div>');
                        o[0].body.appendChild(e[0]), this.floatingScrollbars.cached = e[0].offsetWidth == e[0].childNodes[0].offsetWidth, e.remove()
                    }
                    return this.floatingScrollbars.cached
                }, forceFocus: function (t) {
                    var n = t[0] || t;
                    document.addEventListener("click", function r(e) {
                        e.target === n && e.$focus && (n.focus(), e.stopImmediatePropagation(), e.preventDefault(), n.removeEventListener("click", r))
                    }, !0);
                    var o = document.createEvent("MouseEvents");
                    o.initMouseEvent("click", !1, !0, e, {}, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), o.$material = !0, o.$focus = !0, n.dispatchEvent(o)
                }, createBackdrop: function (e, t) {
                    return a(E.supplant('<md-backdrop class="{0}">', [t]))(e)
                }, supplant: function (e, t, n) {
                    return n = n || /\{([^\{\}]*)\}/g, e.replace(n, function (e, n) {
                        var o = n.split("."), r = t;
                        try {
                            for (var i in o)o.hasOwnProperty(i) && (r = r[o[i]])
                        } catch (a) {
                            r = e
                        }
                        return "string" == typeof r || "number" == typeof r ? r : e
                    })
                }, fakeNgModel: function () {
                    return {
                        $fake: !0, $setTouched: t.noop, $setViewValue: function (e) {
                            this.$viewValue = e, this.$render(e), this.$viewChangeListeners.forEach(function (e) {
                                e()
                            })
                        }, $isEmpty: function (e) {
                            return 0 === ("" + e).length
                        }, $parsers: [], $formatters: [], $viewChangeListeners: [], $render: t.noop
                    }
                }, debounce: function (e, t, o, r) {
                    var a;
                    return function () {
                        var d = o, c = Array.prototype.slice.call(arguments);
                        i.cancel(a), a = i(function () {
                            a = n, e.apply(d, c)
                        }, t || 10, r)
                    }
                }, throttle: function (e, t) {
                    var n;
                    return function () {
                        var o = this, r = arguments, i = E.now();
                        (!n || i - n > t) && (e.apply(o, r), n = i)
                    }
                }, time: function (e) {
                    var t = E.now();
                    return e(), E.now() - t
                }, valueOnUse: function (e, t, n) {
                    var o = null, r = Array.prototype.slice.call(arguments), i = r.length > 3 ? r.slice(3) : [];
                    Object.defineProperty(e, t, {
                        get: function () {
                            return null === o && (o = n.apply(e, i)), o
                        }
                    })
                }, nextUid: function () {
                    return "" + r++
                }, validateScope: function (e) {
                    var n = e && t.isDefined(e.scope());
                    return n || l.warn("element.scope() is not available when 'debug mode' == false. @see https://docs.angularjs.org/guide/production!"), n
                }, disconnectScope: function (e) {
                    if (e && e.$root !== e && !e.$$destroyed) {
                        var t = e.$parent;
                        e.$$disconnected = !0, t.$$childHead === e && (t.$$childHead = e.$$nextSibling), t.$$childTail === e && (t.$$childTail = e.$$prevSibling), e.$$prevSibling && (e.$$prevSibling.$$nextSibling = e.$$nextSibling), e.$$nextSibling && (e.$$nextSibling.$$prevSibling = e.$$prevSibling), e.$$nextSibling = e.$$prevSibling = null
                    }
                }, reconnectScope: function (e) {
                    if (e && e.$root !== e && e.$$disconnected) {
                        var t = e, n = t.$parent;
                        t.$$disconnected = !1, t.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = t, n.$$childTail = t) : n.$$childHead = n.$$childTail = t
                    }
                }, getClosest: function (e, n, o) {
                    if (e instanceof t.element && (e = e[0]), n = n.toUpperCase(), o && (e = e.parentNode), !e)return null;
                    do if (e.nodeName === n)return e; while (e = e.parentNode);
                    return null
                }, elementContains: function (n, o) {
                    var r = e.Node && e.Node.prototype && Node.prototype.contains, i = r ? t.bind(n, n.contains) : t.bind(n, function (e) {
                        return n === o || !!(16 & this.compareDocumentPosition(e))
                    });
                    return i(o)
                }, extractElementByName: function (e, n, o, r) {
                    function i(e) {
                        return a(e) || (o ? d(e) : null)
                    }

                    function a(e) {
                        if (e)for (var t = 0, o = e.length; o > t; t++)if (e[t].nodeName.toLowerCase() === n)return e[t];
                        return null
                    }

                    function d(e) {
                        var t;
                        if (e)for (var n = 0, o = e.length; o > n; n++) {
                            var r = e[n];
                            if (!t)for (var a = 0, d = r.childNodes.length; d > a; a++)t = t || i([r.childNodes[a]])
                        }
                        return t
                    }

                    var c = i(e);
                    return !c && r && l.warn(E.supplant("Unable to find node '{0}' in element '{1}'.", [n, e[0].outerHTML])), t.element(c || e)
                }, initOptionalProperties: function (e, n, o) {
                    o = o || {}, t.forEach(e.$$isolateBindings, function (r, i) {
                        if (r.optional && t.isUndefined(e[i])) {
                            var a = t.isDefined(n[r.attrName]);
                            e[i] = t.isDefined(o[i]) ? o[i] : a
                        }
                    })
                }, nextTick: function (e, t, n) {
                    function o() {
                        var e = n && n.$$destroyed, t = e ? [] : r.queue, o = e ? null : r.digest;
                        r.queue = [], r.timeout = null, r.digest = !1, t.forEach(function (e) {
                            e()
                        }), o && d.$digest()
                    }

                    var r = E.nextTick, a = r.timeout, c = r.queue || [];
                    return c.push(e), null == t && (t = !0), r.digest = r.digest || t, r.queue = c, a || (r.timeout = i(o, 0, !1))
                }, processTemplate: function (e) {
                    return g ? e : e && t.isString(e) ? e.replace(/\{\{/g, h).replace(/}}/g, f) : e
                }, getParentWithPointerEvents: function (e) {
                    for (var t = e.parent(); b(t, "pointer-events", "none");)t = t.parent();
                    return t
                }, getNearestContentElement: function (e) {
                    for (var t = e.parent()[0]; t && t !== m[0] && t !== document.body && "MD-CONTENT" !== t.nodeName.toUpperCase();)t = t.parentNode;
                    return t
                }, hasComputedStyle: b
            };
            return E.dom.animator = c(E), E
        }

        var r = 0;
        t.module("material.core").factory("$mdUtil", o), o.$inject = ["$document", "$timeout", "$compile", "$rootScope", "$$mdAnimate", "$interpolate", "$log", "$rootElement", "$window"], t.element.prototype.focus = t.element.prototype.focus || function () {
                return this.length && this[0].focus(), this
            }, t.element.prototype.blur = t.element.prototype.blur || function () {
                return this.length && this[0].blur(), this
            }
    }(), function () {
        function e(e, n, o) {
            function r(e, o, r) {
                var i = t.element(e)[0] || e;
                !i || i.hasAttribute(o) && 0 !== i.getAttribute(o).length || c(i, o) || (r = t.isString(r) ? r.trim() : "", r.length ? e.attr(o, r) : n.warn('ARIA: Attribute "', o, '", required for accessibility, is missing on node:', i))
            }

            function i(t, n, o) {
                e(function () {
                    r(t, n, o())
                })
            }

            function a(e, t) {
                i(e, t, function () {
                    return d(e)
                })
            }

            function d(e) {
                return e.text().trim()
            }

            function c(e, t) {
                function n(e) {
                    var t = e.currentStyle ? e.currentStyle : o.getComputedStyle(e);
                    return "none" === t.display
                }

                var r = e.hasChildNodes(), i = !1;
                if (r)for (var a = e.childNodes, d = 0; d < a.length; d++) {
                    var c = a[d];
                    1 === c.nodeType && c.hasAttribute(t) && (n(c) || (i = !0))
                }
                return i
            }

            return {expect: r, expectAsync: i, expectWithText: a}
        }

        t.module("material.core").service("$mdAria", e), e.$inject = ["$$rAF", "$log", "$window"]
    }(), function () {
        function e(e, n, o, r, i, a) {
            this.compile = function (d) {
                var c = d.templateUrl, s = d.template || "", l = d.controller, m = d.controllerAs, u = t.extend({}, d.resolve || {}), p = t.extend({}, d.locals || {}), h = d.transformTemplate || t.identity, f = d.bindToController;
                return t.forEach(u, function (e, n) {
                    t.isString(e) ? u[n] = o.get(e) : u[n] = o.invoke(e)
                }), t.extend(u, p), c ? u.$template = n.get(c, {cache: a}).then(function (e) {
                    return e.data
                }) : u.$template = e.when(s), e.all(u).then(function (e) {
                    var n, o = h(e.$template, d), a = d.element || t.element("<div>").html(o.trim()).contents(), c = r(a);
                    return n = {
                        locals: e, element: a, link: function (o) {
                            if (e.$scope = o, l) {
                                var r = i(l, e, !0);
                                f && t.extend(r.instance, e);
                                var d = r();
                                a.data("$ngControllerController", d), a.children().data("$ngControllerController", d), m && (o[m] = d), n.controller = d
                            }
                            return c(o)
                        }
                    }
                })
            }
        }

        t.module("material.core").service("$mdCompiler", e), e.$inject = ["$q", "$http", "$injector", "$compile", "$controller", "$templateCache"]
    }(), function () {
        function n() {
        }

        function o(n, o, r) {
            function i(e) {
                return function (t, n) {
                    n.distance < this.state.options.maxDistance && this.dispatchEvent(t, e, n)
                }
            }

            function a(e, t, n) {
                var o = h[t.replace(/^\$md./, "")];
                if (!o)throw new Error("Failed to register element with handler " + t + ". Available handlers: " + Object.keys(h).join(", "));
                return o.registerElement(e, n)
            }

            function c(e, o) {
                var r = new n(e);
                return t.extend(r, o), h[e] = r, g
            }

            var s = navigator.userAgent || navigator.vendor || e.opera, m = s.match(/ipad|iphone|ipod/i), u = s.match(/android/i), p = "undefined" != typeof e.jQuery && t.element === e.jQuery, g = {
                handler: c,
                register: a,
                isHijackingClicks: (m || u) && !p && !f
            };
            if (g.isHijackingClicks) {
                var b = 6;
                g.handler("click", {
                    options: {maxDistance: b},
                    onEnd: i("click")
                }), g.handler("focus", {
                    options: {maxDistance: b}, onEnd: function (e, t) {
                        function n(e) {
                            var t = ["INPUT", "SELECT", "BUTTON", "TEXTAREA", "VIDEO", "AUDIO"];
                            return "-1" != e.getAttribute("tabindex") && !e.hasAttribute("DISABLED") && (e.hasAttribute("tabindex") || e.hasAttribute("href") || -1 != t.indexOf(e.nodeName))
                        }

                        t.distance < this.state.options.maxDistance && n(e.target) && (this.dispatchEvent(e, "focus", t), e.target.focus())
                    }
                }), g.handler("mouseup", {
                    options: {maxDistance: b},
                    onEnd: i("mouseup")
                }), g.handler("mousedown", {
                    onStart: function (e) {
                        this.dispatchEvent(e, "mousedown")
                    }
                })
            }
            return g.handler("press", {
                onStart: function (e, t) {
                    this.dispatchEvent(e, "$md.pressdown")
                }, onEnd: function (e, t) {
                    this.dispatchEvent(e, "$md.pressup")
                }
            }).handler("hold", {
                options: {maxDistance: 6, delay: 500}, onCancel: function () {
                    r.cancel(this.state.timeout)
                }, onStart: function (e, n) {
                    return this.state.registeredParent ? (this.state.pos = {
                        x: n.x,
                        y: n.y
                    }, void(this.state.timeout = r(t.bind(this, function () {
                        this.dispatchEvent(e, "$md.hold"), this.cancel()
                    }), this.state.options.delay, !1))) : this.cancel()
                }, onMove: function (e, t) {
                    e.preventDefault();
                    var n = this.state.pos.x - t.x, o = this.state.pos.y - t.y;
                    Math.sqrt(n * n + o * o) > this.options.maxDistance && this.cancel()
                }, onEnd: function () {
                    this.onCancel()
                }
            }).handler("drag", {
                options: {minDistance: 6, horizontal: !0, cancelMultiplier: 1.5},
                onStart: function (e) {
                    this.state.registeredParent || this.cancel()
                },
                onMove: function (e, t) {
                    var n, o;
                    e.preventDefault(), this.state.dragPointer ? this.dispatchDragMove(e) : (this.state.options.horizontal ? (n = Math.abs(t.distanceX) > this.state.options.minDistance, o = Math.abs(t.distanceY) > this.state.options.minDistance * this.state.options.cancelMultiplier) : (n = Math.abs(t.distanceY) > this.state.options.minDistance, o = Math.abs(t.distanceX) > this.state.options.minDistance * this.state.options.cancelMultiplier), n ? (this.state.dragPointer = d(e), l(e, this.state.dragPointer), this.dispatchEvent(e, "$md.dragstart", this.state.dragPointer)) : o && this.cancel())
                },
                dispatchDragMove: o.throttle(function (e) {
                    this.state.isRunning && (l(e, this.state.dragPointer), this.dispatchEvent(e, "$md.drag", this.state.dragPointer))
                }),
                onEnd: function (e, t) {
                    this.state.dragPointer && (l(e, this.state.dragPointer), this.dispatchEvent(e, "$md.dragend", this.state.dragPointer))
                }
            }).handler("swipe", {
                options: {minVelocity: .65, minDistance: 10}, onEnd: function (e, t) {
                    var n;
                    Math.abs(t.velocityX) > this.state.options.minVelocity && Math.abs(t.distanceX) > this.state.options.minDistance ? (n = "left" == t.directionX ? "$md.swipeleft" : "$md.swiperight", this.dispatchEvent(e, n)) : Math.abs(t.velocityY) > this.state.options.minVelocity && Math.abs(t.distanceY) > this.state.options.minDistance && (n = "up" == t.directionY ? "$md.swipeup" : "$md.swipedown", this.dispatchEvent(e, n))
                }
            })
        }

        function r(e) {
            this.name = e, this.state = {}
        }

        function i() {
            function n(e, n, o) {
                o = o || u;
                var r = new t.element.Event(n);
                r.$material = !0, r.pointer = o, r.srcEvent = e, t.extend(r, {
                    clientX: o.x,
                    clientY: o.y,
                    screenX: o.x,
                    screenY: o.y,
                    pageX: o.x,
                    pageY: o.y,
                    ctrlKey: e.ctrlKey,
                    altKey: e.altKey,
                    shiftKey: e.shiftKey,
                    metaKey: e.metaKey
                }), t.element(o.target).trigger(r)
            }

            function o(t, n, o) {
                o = o || u;
                var r;
                "click" === n || "mouseup" == n || "mousedown" == n ? (r = document.createEvent("MouseEvents"), r.initMouseEvent(n, !0, !0, e, t.detail, o.x, o.y, o.x, o.y, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, t.button, t.relatedTarget || null)) : (r = document.createEvent("CustomEvent"), r.initCustomEvent(n, !0, !0, {})), r.$material = !0, r.pointer = o, r.srcEvent = t, o.target.dispatchEvent(r)
            }

            var i = "undefined" != typeof e.jQuery && t.element === e.jQuery;
            return r.prototype = {
                options: {},
                dispatchEvent: i ? n : o,
                onStart: t.noop,
                onMove: t.noop,
                onEnd: t.noop,
                onCancel: t.noop,
                start: function (e, n) {
                    if (!this.state.isRunning) {
                        var o = this.getNearestParent(e.target), r = o && o.$mdGesture[this.name] || {};
                        this.state = {
                            isRunning: !0,
                            options: t.extend({}, this.options, r),
                            registeredParent: o
                        }, this.onStart(e, n)
                    }
                },
                move: function (e, t) {
                    this.state.isRunning && this.onMove(e, t)
                },
                end: function (e, t) {
                    this.state.isRunning && (this.onEnd(e, t), this.state.isRunning = !1)
                },
                cancel: function (e, t) {
                    this.onCancel(e, t), this.state = {}
                },
                getNearestParent: function (e) {
                    for (var t = e; t;) {
                        if ((t.$mdGesture || {})[this.name])return t;
                        t = t.parentNode
                    }
                    return null
                },
                registerElement: function (e, t) {
                    function n() {
                        delete e[0].$mdGesture[o.name], e.off("$destroy", n)
                    }

                    var o = this;
                    return e[0].$mdGesture = e[0].$mdGesture || {}, e[0].$mdGesture[this.name] = t || {}, e.on("$destroy", n), n
                }
            }, r
        }

        function a(e, n) {
            function o(e) {
                var t = !e.clientX && !e.clientY;
                t || e.$material || e.isIonicTap || s(e) || (e.preventDefault(), e.stopPropagation())
            }

            function r(e) {
                var t = 0 === e.clientX && 0 === e.clientY;
                t || e.$material || e.isIonicTap || s(e) ? (g = null, "label" == e.target.tagName.toLowerCase() && (g = {
                    x: e.x,
                    y: e.y
                })) : (e.preventDefault(), e.stopPropagation(), g = null)
            }

            function i(e, t) {
                var o;
                for (var r in h)o = h[r], o instanceof n && ("start" === e && o.cancel(), o[e](t, u))
            }

            function a(e) {
                if (!u) {
                    var t = +Date.now();
                    p && !c(e, p) && t - p.endTime < 1500 || (u = d(e), i("start", e))
                }
            }

            function m(e) {
                u && c(e, u) && (l(e, u), i("move", e))
            }

            function f(e) {
                u && c(e, u) && (l(e, u), u.endTime = +Date.now(), i("end", e), p = u, u = null)
            }

            document.contains || (document.contains = function (e) {
                return document.body.contains(e)
            }), !b && e.isHijackingClicks && (document.addEventListener("click", r, !0), document.addEventListener("mouseup", o, !0), document.addEventListener("mousedown", o, !0), document.addEventListener("focus", o, !0), b = !0);
            var E = "mousedown touchstart pointerdown", v = "mousemove touchmove pointermove", M = "mouseup mouseleave touchend touchcancel pointerup pointercancel";
            t.element(document).on(E, a).on(v, m).on(M, f).on("$$mdGestureReset", function () {
                p = u = null
            })
        }

        function d(e) {
            var t = m(e), n = {startTime: +Date.now(), target: e.target, type: e.type.charAt(0)};
            return n.startX = n.x = t.pageX, n.startY = n.y = t.pageY, n
        }

        function c(e, t) {
            return e && t && e.type.charAt(0) === t.type
        }

        function s(e) {
            return g && g.x == e.x && g.y == e.y
        }

        function l(e, t) {
            var n = m(e), o = t.x = n.pageX, r = t.y = n.pageY;
            t.distanceX = o - t.startX, t.distanceY = r - t.startY, t.distance = Math.sqrt(t.distanceX * t.distanceX + t.distanceY * t.distanceY), t.directionX = t.distanceX > 0 ? "right" : t.distanceX < 0 ? "left" : "", t.directionY = t.distanceY > 0 ? "down" : t.distanceY < 0 ? "up" : "", t.duration = +Date.now() - t.startTime, t.velocityX = t.distanceX / t.duration, t.velocityY = t.distanceY / t.duration
        }

        function m(e) {
            return e = e.originalEvent || e, e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e
        }

        var u, p, h = {}, f = !1, g = null, b = !1;
        t.module("material.core.gestures", []).provider("$mdGesture", n).factory("$$MdGestureHandler", i).run(a), n.prototype = {
            skipClickHijack: function () {
                return f = !0
            }, $get: ["$$MdGestureHandler", "$$rAF", "$timeout", function (e, t, n) {
                return new o(e, t, n)
            }]
        }, o.$inject = ["$$MdGestureHandler", "$$rAF", "$timeout"], a.$inject = ["$mdGesture", "$$MdGestureHandler"]
    }(), function () {
        function e() {
            function e(e) {
                function n(e) {
                    return c.optionsFactory = e.options, c.methods = (e.methods || []).concat(a), s
                }

                function o(e, t) {
                    return d[e] = t, s
                }

                function r(t, n) {
                    if (n = n || {}, n.methods = n.methods || [], n.options = n.options || function () {
                                return {}
                            }, /^cancel|hide|show$/.test(t))throw new Error("Preset '" + t + "' in " + e + " is reserved!");
                    if (n.methods.indexOf("_options") > -1)throw new Error("Method '_options' in " + e + " is reserved!");
                    return c.presets[t] = {
                        methods: n.methods.concat(a),
                        optionsFactory: n.options,
                        argOption: n.argOption
                    }, s
                }

                function i(n, o) {
                    function r(e) {
                        return e = e || {}, e._options && (e = e._options), m.show(t.extend({}, l, e))
                    }

                    function i(e) {
                        return m.destroy(e)
                    }

                    function a(t, n) {
                        var r = {};
                        return r[e] = u, o.invoke(t || function () {
                                return n
                            }, {}, r)
                    }

                    var s, l, m = n(), u = {hide: m.hide, cancel: m.cancel, show: r, destroy: i};
                    return s = c.methods || [], l = a(c.optionsFactory, {}), t.forEach(d, function (e, t) {
                        u[t] = e
                    }), t.forEach(c.presets, function (e, n) {
                        function o(e) {
                            this._options = t.extend({}, r, e)
                        }

                        var r = a(e.optionsFactory, {}), i = (e.methods || []).concat(s);
                        if (t.extend(r, {$type: n}), t.forEach(i, function (e) {
                                o.prototype[e] = function (t) {
                                    return this._options[e] = t, this
                                }
                            }), e.argOption) {
                            var d = "show" + n.charAt(0).toUpperCase() + n.slice(1);
                            u[d] = function (e) {
                                var t = u[n](e);
                                return u.show(t)
                            }
                        }
                        u[n] = function (n) {
                            return arguments.length && e.argOption && !t.isObject(n) && !t.isArray(n) ? (new o)[e.argOption](n) : new o(n)
                        }
                    }), u
                }

                var a = ["onHide", "onShow", "onRemove"], d = {}, c = {presets: {}}, s = {
                    setDefaults: n,
                    addPreset: r,
                    addMethod: o,
                    $get: i
                };
                return s.addPreset("build", {methods: ["controller", "controllerAs", "resolve", "template", "templateUrl", "themable", "transformTemplate", "parent"]}), i.$inject = ["$$interimElement", "$injector"], s
            }

            function o(e, o, r, i, a, d, c, s, l, m, u) {
                return function () {
                    function p(e) {
                        e = e || {};
                        var t = new b(e || {}), n = !e.skipHide && M.length ? E.hide() : o.when(!0);
                        return n["finally"](function () {
                            M.push(t), t.show()["catch"](function (e) {
                                return e
                            })
                        }), t.deferred.promise
                    }

                    function h(e, t) {
                        function r(n) {
                            return n.remove(e, !1, t || {})["catch"](function (e) {
                                return e
                            }), n.deferred.promise
                        }

                        if (!M.length)return o.when(e);
                        if (t = t || {}, t.closeAll) {
                            var i = o.all(M.reverse().map(r));
                            return M = [], i
                        }
                        if (t.closeTo !== n)return o.all(M.splice(t.closeTo).map(r));
                        var a = M.pop();
                        return r(a)
                    }

                    function f(e, t) {
                        var n = M.shift();
                        return n ? (n.remove(e, !0, t || {})["catch"](function (e) {
                            return e
                        }), n.deferred.promise) : o.when(e)
                    }

                    function g(e) {
                        var n = e ? null : M.shift(), r = t.element(e).length ? t.element(e)[0].parentNode : null;
                        if (r) {
                            var i = M.filter(function (e) {
                                var t = e.options.element[0];
                                return t === r
                            });
                            i.length > 0 && (n = i[0], M.splice(M.indexOf(n), 1))
                        }
                        return n ? n.remove(v, !1, {$destroy: !0}) : o.when(v)
                    }

                    function b(u) {
                        function p() {
                            return o(function (e, t) {
                                function n(e) {
                                    C.deferred.reject(e), t(e)
                                }

                                g(u).then(function (t) {
                                    A = b(t, u), T = $(A, u, t.controller).then(e, n)
                                }, n)
                            })
                        }

                        function h(e, n, r) {
                            function i(e) {
                                C.deferred.resolve(e)
                            }

                            function a(e) {
                                C.deferred.reject(e)
                            }

                            return A ? (u = t.extend(u || {}, r || {}), u.cancelAutoHide && u.cancelAutoHide(), u.element.triggerHandler("$mdInterimElementRemove"), u.$destroy === !0 ? y(u.element, u).then(function () {
                                n && a(e) || i(e)
                            }) : (o.when(T)["finally"](function () {
                                y(u.element, u).then(function () {
                                    n && a(e) || i(e)
                                }, a)
                            }), C.deferred.promise)) : o.when(!1)
                        }

                        function f(e) {
                            return e = e || {}, e.template && (e.template = s.processTemplate(e.template)), t.extend({
                                preserveScope: !1,
                                cancelAutoHide: t.noop,
                                scope: e.scope || i.$new(e.isolateScope),
                                onShow: function (e, t, n) {
                                    return c.enter(t, n.parent)
                                },
                                onRemove: function (e, t) {
                                    return t && c.leave(t) || o.when()
                                }
                            }, e)
                        }

                        function g(e) {
                            var t = e.skipCompile ? null : l.compile(e);
                            return t || o(function (t) {
                                    t({
                                        locals: {}, link: function () {
                                            return e.element
                                        }
                                    })
                                })
                        }

                        function b(e, n) {
                            t.extend(e.locals, n);
                            var o = e.link(n.scope);
                            return n.element = o, n.parent = v(o, n), n.themable && m(o), o
                        }

                        function v(n, o) {
                            var r = o.parent;
                            if (r = t.isFunction(r) ? r(o.scope, n, o) : t.isString(r) ? t.element(e[0].querySelector(r)) : t.element(r), !(r || {}).length) {
                                var i;
                                return d[0] && d[0].querySelector && (i = d[0].querySelector(":not(svg) > body")), i || (i = d[0]), "#comment" == i.nodeName && (i = e[0].body), t.element(i)
                            }
                            return r
                        }

                        function M() {
                            var e, o = t.noop;
                            u.hideDelay && (e = a(E.hide, u.hideDelay), o = function () {
                                a.cancel(e)
                            }), u.cancelAutoHide = function () {
                                o(), u.cancelAutoHide = n
                            }
                        }

                        function $(e, n, r) {
                            var i = n.onShowing || t.noop, a = n.onComplete || t.noop;
                            return i(n.scope, e, n, r), o(function (t, i) {
                                try {
                                    o.when(n.onShow(n.scope, e, n, r)).then(function () {
                                        a(n.scope, e, n), M(), t(e)
                                    }, i)
                                } catch (d) {
                                    i(d.message)
                                }
                            })
                        }

                        function y(e, n) {
                            var o = n.onRemoving || t.noop;
                            return r(function (t, i) {
                                try {
                                    var a = r.when(n.onRemove(n.scope, e, n) || !0);
                                    o(e, a), 1 == n.$destroy ? t(e) : a.then(function () {
                                        !n.preserveScope && n.scope && n.scope.$destroy(), t(e)
                                    }, i)
                                } catch (d) {
                                    i(d.message)
                                }
                            })
                        }

                        var C, A, T = o.when(!0);
                        return u = f(u), C = {options: u, deferred: o.defer(), show: p, remove: h}
                    }

                    var E, v = !1, M = [];
                    return E = {show: p, hide: h, cancel: f, destroy: g, $injector_: u}
                }
            }

            return e.$get = o, o.$inject = ["$document", "$q", "$$q", "$rootScope", "$timeout", "$rootElement", "$animate", "$mdUtil", "$mdCompiler", "$mdTheming", "$injector"], e
        }

        t.module("material.core").provider("$$interimElement", e)
    }(), function () {
        !function () {
            function e(e) {
                function a(e) {
                    return e.replace(c, "").replace(s, function (e, t, n, o) {
                        return o ? n.toUpperCase() : n
                    })
                }

                var c = /^((?:x|data)[\:\-_])/i, s = /([\:\-\_]+(.))/g, l = ["", "xs", "gt-xs", "sm", "gt-sm", "md", "gt-md", "lg", "gt-lg", "xl"], m = ["layout", "flex", "flex-order", "flex-offset", "layout-align"], u = ["show", "hide", "layout-padding", "layout-margin"];
                t.forEach(l, function (n) {
                    t.forEach(m, function (t) {
                        var o = n ? t + "-" + n : t;
                        e.directive(a(o), r(o))
                    }), t.forEach(u, function (t) {
                        var o = n ? t + "-" + n : t;
                        e.directive(a(o), i(o))
                    })
                }), e.directive("mdLayoutCss", n).directive("ngCloak", o("ng-cloak")).directive("layoutWrap", i("layout-wrap")).directive("layoutNoWrap", i("layout-no-wrap")).directive("layoutFill", i("layout-fill")).directive("layoutLtMd", d("layout-lt-md", !0)).directive("layoutLtLg", d("layout-lt-lg", !0)).directive("flexLtMd", d("flex-lt-md", !0)).directive("flexLtLg", d("flex-lt-lg", !0)).directive("layoutAlignLtMd", d("layout-align-lt-md")).directive("layoutAlignLtLg", d("layout-align-lt-lg")).directive("flexOrderLtMd", d("flex-order-lt-md")).directive("flexOrderLtLg", d("flex-order-lt-lg")).directive("offsetLtMd", d("flex-offset-lt-md")).directive("offsetLtLg", d("flex-offset-lt-lg")).directive("hideLtMd", d("hide-lt-md")).directive("hideLtLg", d("hide-lt-lg")).directive("showLtMd", d("show-lt-md")).directive("showLtLg", d("show-lt-lg"))
            }

            function n() {
                return {
                    restrict: "A", priority: "900", compile: function (e, n) {
                        return A.enabled = !1, t.noop
                    }
                }
            }

            function o(e) {
                return ["$timeout", function (n) {
                    return {
                        restrict: "A", priority: -10, compile: function (o) {
                            return A.enabled ? (o.addClass(e), function (t, o) {
                                n(function () {
                                    o.removeClass(e)
                                }, 10, !1)
                            }) : t.noop
                        }
                    }
                }]
            }

            function r(e) {
                function n(t, n, o) {
                    var r = a(n, e, o), i = o.$observe(o.$normalize(e), r);
                    r(u(e, o, "")), t.$on("$destroy", function () {
                        i()
                    })
                }

                return ["$mdUtil", "$interpolate", "$log", function (o, r, i) {
                    return f = o, g = r, b = i, {
                        restrict: "A", compile: function (o, r) {
                            var i;
                            return A.enabled && (c(e, r, o, b), s(e, u(e, r, ""), l(o, e, r)), i = n), i || t.noop
                        }
                    }
                }]
            }

            function i(e) {
                function n(t, n) {
                    n.addClass(e)
                }

                return ["$mdUtil", "$interpolate", "$log", function (o, r, i) {
                    return f = o, g = r, b = i, {
                        restrict: "A", compile: function (o, r) {
                            var i;
                            return A.enabled && (s(e, u(e, r, ""), l(o, e, r)), n(null, o), i = n), i || t.noop
                        }
                    }
                }]
            }

            function a(e, n) {
                var o;
                return function (r) {
                    var i = s(n, r || "");
                    t.isDefined(i) && (o && e.removeClass(o), o = i ? n + "-" + i.replace(v, "-") : n, e.addClass(o))
                }
            }

            function d(e) {
                var n = e.split("-");
                return ["$log", function (o) {
                    return o.warn(e + "has been deprecated. Please use a `" + n[0] + "-gt-<xxx>` variant."), t.noop
                }]
            }

            function c(e, t, n, o) {
                var r, i, a, d = n[0].nodeName.toLowerCase();
                switch (e.replace(E, "")) {
                    case"flex":
                        ("md-button" == d || "fieldset" == d) && (i = "<" + d + " " + e + "></" + d + ">", a = "https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers", r = "Markup '{0}' may not work as expected in IE Browsers. Consult '{1}' for details.", o.warn(f.supplant(r, [i, a])))
                }
            }

            function s(e, n, o) {
                var r = n;
                if (!m(n)) {
                    switch (e.replace(E, "")) {
                        case"layout":
                            p(n, $) || (n = $[0]);
                            break;
                        case"flex":
                            p(n, M) || isNaN(n) && (n = "");
                            break;
                        case"flex-offset":
                        case"flex-order":
                            (!n || isNaN(+n)) && (n = "0");
                            break;
                        case"layout-align":
                            var i = h(n);
                            n = f.supplant("{main}-{cross}", i);
                            break;
                        case"layout-padding":
                        case"layout-margin":
                        case"layout-fill":
                        case"layout-wrap":
                        case"layout-no-wrap":
                            n = ""
                    }
                    n != r && (o || t.noop)(n)
                }
                return n
            }

            function l(e, t, n) {
                return function (e) {
                    m(e) || (n[n.$normalize(t)] = e)
                }
            }

            function m(e) {
                return (e || "").indexOf(g.startSymbol()) > -1
            }

            function u(e, t, n) {
                var o = t.$normalize(e);
                return t[o] ? t[o].replace(v, "-") : n || null
            }

            function p(e, t, n) {
                e = n && e ? e.replace(v, n) : e;
                var o = !1;
                return e && t.forEach(function (t) {
                    t = n ? t.replace(v, n) : t, o = o || t === e
                }), o
            }

            function h(e) {
                var t, n = {main: "start", cross: "stretch"};
                return e = e || "", (0 == e.indexOf("-") || 0 == e.indexOf(" ")) && (e = "none" + e), t = e.toLowerCase().trim().replace(v, "-").split("-"), t.length && "space" === t[0] && (t = [t[0] + "-" + t[1], t[2]]), t.length > 0 && (n.main = t[0] || n.main), t.length > 1 && (n.cross = t[1] || n.cross), y.indexOf(n.main) < 0 && (n.main = "start"), C.indexOf(n.cross) < 0 && (n.cross = "stretch"), n
            }

            var f, g, b, E = /(-gt)?-(sm|md|lg)/g, v = /\s+/g, M = ["grow", "initial", "auto", "none", "noshrink", "nogrow"], $ = ["row", "column"], y = ["", "start", "center", "end", "stretch", "space-around", "space-between"], C = ["", "start", "center", "end", "stretch"], A = {
                enabled: !0,
                breakpoints: []
            };
            e(t.module("material.core.layout", ["ng"]))
        }()
    }(), function () {
        function e(e, n) {
            function o(e) {
                return e && "" !== e
            }

            var r, i = [], a = {};
            return r = {
                notFoundError: function (t) {
                    e.error("No instance found for handle", t)
                }, getInstances: function () {
                    return i
                }, get: function (e) {
                    if (!o(e))return null;
                    var t, n, r;
                    for (t = 0, n = i.length; n > t; t++)if (r = i[t], r.$$mdHandle === e)return r;
                    return null
                }, register: function (e, n) {
                    function o() {
                        var t = i.indexOf(e);
                        -1 !== t && i.splice(t, 1)
                    }

                    function r() {
                        var t = a[n];
                        t && (t.resolve(e), delete a[n])
                    }

                    return n ? (e.$$mdHandle = n, i.push(e), r(), o) : t.noop
                }, when: function (e) {
                    if (o(e)) {
                        var t = n.defer(), i = r.get(e);
                        return i ? t.resolve(i) : a[e] = t, t.promise
                    }
                    return n.reject("Invalid `md-component-id` value.")
                }
            }
        }

        t.module("material.core").factory("$mdComponentRegistry", e),
            e.$inject = ["$log", "$q"]
    }(), function () {
        !function () {
            function e(e) {
                function n(e) {
                    return e.hasClass("md-icon-button") ? {
                        isMenuItem: e.hasClass("md-menu-item"),
                        fitRipple: !0,
                        center: !0
                    } : {isMenuItem: e.hasClass("md-menu-item"), dimBackground: !0}
                }

                return {
                    attach: function (o, r, i) {
                        return i = t.extend(n(r), i), e.attach(o, r, i)
                    }
                }
            }

            t.module("material.core").factory("$mdButtonInkRipple", e), e.$inject = ["$mdInkRipple"]
        }()
    }(), function () {
        !function () {
            function e(e) {
                function n(n, o, r) {
                    return e.attach(n, o, t.extend({center: !0, dimBackground: !1, fitRipple: !0}, r))
                }

                return {attach: n}
            }

            t.module("material.core").factory("$mdCheckboxInkRipple", e), e.$inject = ["$mdInkRipple"]
        }()
    }(), function () {
        !function () {
            function e(e) {
                function n(n, o, r) {
                    return e.attach(n, o, t.extend({center: !1, dimBackground: !0, outline: !1, rippleSize: "full"}, r))
                }

                return {attach: n}
            }

            t.module("material.core").factory("$mdListInkRipple", e), e.$inject = ["$mdInkRipple"]
        }()
    }(), function () {
        function e(e, n) {
            return {
                controller: t.noop, link: function (t, o, r) {
                    r.hasOwnProperty("mdInkRippleCheckbox") ? n.attach(t, o) : e.attach(t, o)
                }
            }
        }

        function n(e) {
            function n(n, r, i) {
                return r.controller("mdNoInk") ? t.noop : e.instantiate(o, {$scope: n, $element: r, rippleOptions: i})
            }

            return {attach: n}
        }

        function o(e, n, o, r, i, a) {
            this.$window = r, this.$timeout = i, this.$mdUtil = a, this.$scope = e, this.$element = n, this.options = o, this.mousedown = !1, this.ripples = [], this.timeout = null, this.lastRipple = null, a.valueOnUse(this, "container", this.createContainer), this.$element.addClass("md-ink-ripple"), (n.controller("mdInkRipple") || {}).createRipple = t.bind(this, this.createRipple), (n.controller("mdInkRipple") || {}).setColor = t.bind(this, this.color), this.bindEvents()
        }

        function r(e, n) {
            (e.mousedown || e.lastRipple) && (e.mousedown = !1, e.$mdUtil.nextTick(t.bind(e, n), !1))
        }

        function i() {
            return {controller: t.noop}
        }

        t.module("material.core").factory("$mdInkRipple", n).directive("mdInkRipple", e).directive("mdNoInk", i).directive("mdNoBar", i).directive("mdNoStretch", i);
        var a = 450;
        e.$inject = ["$mdButtonInkRipple", "$mdCheckboxInkRipple"], n.$inject = ["$injector"], o.$inject = ["$scope", "$element", "rippleOptions", "$window", "$timeout", "$mdUtil"], o.prototype.color = function (e) {
            function n() {
                var e = o.options && o.options.colorElement ? o.options.colorElement : [], t = e.length ? e[0] : o.$element[0];
                return t ? o.$window.getComputedStyle(t).color : "rgb(0,0,0)"
            }

            var o = this;
            return t.isDefined(e) && (o._color = o._parseColor(e)), o._color || o._parseColor(o.inkRipple()) || o._parseColor(n())
        }, o.prototype.calculateColor = function () {
            return this.color()
        }, o.prototype._parseColor = function (e, t) {
            function n(e) {
                var t = "#" === e[0] ? e.substr(1) : e, n = t.length / 3, o = t.substr(0, n), r = t.substr(n, n), i = t.substr(2 * n);
                return 1 === n && (o += o, r += r, i += i), "rgba(" + parseInt(o, 16) + "," + parseInt(r, 16) + "," + parseInt(i, 16) + ",0.1)"
            }

            function o(e) {
                return e.replace(")", ", 0.1)").replace("(", "a(")
            }

            return t = t || 1, e ? 0 === e.indexOf("rgba") ? e.replace(/\d?\.?\d*\s*\)\s*$/, (.1 * t).toString() + ")") : 0 === e.indexOf("rgb") ? o(e) : 0 === e.indexOf("#") ? n(e) : void 0 : void 0
        }, o.prototype.bindEvents = function () {
            this.$element.on("mousedown", t.bind(this, this.handleMousedown)), this.$element.on("mouseup touchend", t.bind(this, this.handleMouseup)), this.$element.on("mouseleave", t.bind(this, this.handleMouseup)), this.$element.on("touchmove", t.bind(this, this.handleTouchmove))
        }, o.prototype.handleMousedown = function (e) {
            if (!this.mousedown)if (e.hasOwnProperty("originalEvent") && (e = e.originalEvent), this.mousedown = !0, this.options.center)this.createRipple(this.container.prop("clientWidth") / 2, this.container.prop("clientWidth") / 2); else if (e.srcElement !== this.$element[0]) {
                var t = this.$element[0].getBoundingClientRect(), n = e.clientX - t.left, o = e.clientY - t.top;
                this.createRipple(n, o)
            } else this.createRipple(e.offsetX, e.offsetY)
        }, o.prototype.handleMouseup = function () {
            r(this, this.clearRipples)
        }, o.prototype.handleTouchmove = function () {
            r(this, this.deleteRipples)
        }, o.prototype.deleteRipples = function () {
            for (var e = 0; e < this.ripples.length; e++)this.ripples[e].remove()
        }, o.prototype.clearRipples = function () {
            for (var e = 0; e < this.ripples.length; e++)this.fadeInComplete(this.ripples[e])
        }, o.prototype.createContainer = function () {
            var e = t.element('<div class="md-ripple-container"></div>');
            return this.$element.append(e), e
        }, o.prototype.clearTimeout = function () {
            this.timeout && (this.$timeout.cancel(this.timeout), this.timeout = null)
        }, o.prototype.isRippleAllowed = function () {
            var e = this.$element[0];
            do {
                if (!e.tagName || "BODY" === e.tagName)break;
                if (e && t.isFunction(e.hasAttribute)) {
                    if (e.hasAttribute("disabled"))return !1;
                    if ("false" === this.inkRipple() || "0" === this.inkRipple())return !1
                }
            } while (e = e.parentNode);
            return !0
        }, o.prototype.inkRipple = function () {
            return this.$element.attr("md-ink-ripple")
        }, o.prototype.createRipple = function (e, n) {
            function o(e) {
                return e ? e.replace("rgba", "rgb").replace(/,[^\),]+\)/, ")") : "rgb(0,0,0)"
            }

            function r(e, t, n) {
                return e ? Math.max(t, n) : Math.sqrt(Math.pow(t, 2) + Math.pow(n, 2))
            }

            if (this.isRippleAllowed()) {
                var i = this, d = t.element('<div class="md-ripple"></div>'), c = this.$element.prop("clientWidth"), s = this.$element.prop("clientHeight"), l = 2 * Math.max(Math.abs(c - e), e), m = 2 * Math.max(Math.abs(s - n), n), u = r(this.options.fitRipple, l, m), p = this.calculateColor();
                d.css({
                    left: e + "px",
                    top: n + "px",
                    background: "black",
                    width: u + "px",
                    height: u + "px",
                    backgroundColor: o(p),
                    borderColor: o(p)
                }), this.lastRipple = d, this.clearTimeout(), this.timeout = this.$timeout(function () {
                    i.clearTimeout(), i.mousedown || i.fadeInComplete(d)
                }, .35 * a, !1), this.options.dimBackground && this.container.css({backgroundColor: p}), this.container.append(d), this.ripples.push(d), d.addClass("md-ripple-placed"), this.$mdUtil.nextTick(function () {
                    d.addClass("md-ripple-scaled md-ripple-active"), i.$timeout(function () {
                        i.clearRipples()
                    }, a, !1)
                }, !1)
            }
        }, o.prototype.fadeInComplete = function (e) {
            this.lastRipple === e ? this.timeout || this.mousedown || this.removeRipple(e) : this.removeRipple(e)
        }, o.prototype.removeRipple = function (e) {
            var t = this, n = this.ripples.indexOf(e);
            0 > n || (this.ripples.splice(this.ripples.indexOf(e), 1), e.removeClass("md-ripple-active"), 0 === this.ripples.length && this.container.css({backgroundColor: ""}), this.$timeout(function () {
                t.fadeOutComplete(e)
            }, a, !1))
        }, o.prototype.fadeOutComplete = function (e) {
            e.remove(), this.lastRipple = null
        }
    }(), function () {
        !function () {
            function e(e) {
                function n(n, o, r) {
                    return e.attach(n, o, t.extend({center: !1, dimBackground: !0, outline: !1, rippleSize: "full"}, r))
                }

                return {attach: n}
            }

            t.module("material.core").factory("$mdTabInkRipple", e), e.$inject = ["$mdInkRipple"]
        }()
    }(), function () {
        t.module("material.core.theming.palette", []).constant("$mdColorPalette", {
            red: {
                50: "#ffebee",
                100: "#ffcdd2",
                200: "#ef9a9a",
                300: "#e57373",
                400: "#ef5350",
                500: "#f44336",
                600: "#e53935",
                700: "#d32f2f",
                800: "#c62828",
                900: "#b71c1c",
                A100: "#ff8a80",
                A200: "#ff5252",
                A400: "#ff1744",
                A700: "#d50000",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 A100",
                contrastStrongLightColors: "400 500 600 700 A200 A400 A700"
            },
            pink: {
                50: "#fce4ec",
                100: "#f8bbd0",
                200: "#f48fb1",
                300: "#f06292",
                400: "#ec407a",
                500: "#e91e63",
                600: "#d81b60",
                700: "#c2185b",
                800: "#ad1457",
                900: "#880e4f",
                A100: "#ff80ab",
                A200: "#ff4081",
                A400: "#f50057",
                A700: "#c51162",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 A100",
                contrastStrongLightColors: "500 600 A200 A400 A700"
            },
            purple: {
                50: "#f3e5f5",
                100: "#e1bee7",
                200: "#ce93d8",
                300: "#ba68c8",
                400: "#ab47bc",
                500: "#9c27b0",
                600: "#8e24aa",
                700: "#7b1fa2",
                800: "#6a1b9a",
                900: "#4a148c",
                A100: "#ea80fc",
                A200: "#e040fb",
                A400: "#d500f9",
                A700: "#aa00ff",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 A100",
                contrastStrongLightColors: "300 400 A200 A400 A700"
            },
            "deep-purple": {
                50: "#ede7f6",
                100: "#d1c4e9",
                200: "#b39ddb",
                300: "#9575cd",
                400: "#7e57c2",
                500: "#673ab7",
                600: "#5e35b1",
                700: "#512da8",
                800: "#4527a0",
                900: "#311b92",
                A100: "#b388ff",
                A200: "#7c4dff",
                A400: "#651fff",
                A700: "#6200ea",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 A100",
                contrastStrongLightColors: "300 400 A200"
            },
            indigo: {
                50: "#e8eaf6",
                100: "#c5cae9",
                200: "#9fa8da",
                300: "#7986cb",
                400: "#5c6bc0",
                500: "#3f51b5",
                600: "#3949ab",
                700: "#303f9f",
                800: "#283593",
                900: "#1a237e",
                A100: "#8c9eff",
                A200: "#536dfe",
                A400: "#3d5afe",
                A700: "#304ffe",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 A100",
                contrastStrongLightColors: "300 400 A200 A400"
            },
            blue: {
                50: "#e3f2fd",
                100: "#bbdefb",
                200: "#90caf9",
                300: "#64b5f6",
                400: "#42a5f5",
                500: "#2196f3",
                600: "#1e88e5",
                700: "#1976d2",
                800: "#1565c0",
                900: "#0d47a1",
                A100: "#82b1ff",
                A200: "#448aff",
                A400: "#2979ff",
                A700: "#2962ff",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 400 A100",
                contrastStrongLightColors: "500 600 700 A200 A400 A700"
            },
            "light-blue": {
                50: "#e1f5fe",
                100: "#b3e5fc",
                200: "#81d4fa",
                300: "#4fc3f7",
                400: "#29b6f6",
                500: "#03a9f4",
                600: "#039be5",
                700: "#0288d1",
                800: "#0277bd",
                900: "#01579b",
                A100: "#80d8ff",
                A200: "#40c4ff",
                A400: "#00b0ff",
                A700: "#0091ea",
                contrastDefaultColor: "dark",
                contrastLightColors: "600 700 800 900 A700",
                contrastStrongLightColors: "600 700 800 A700"
            },
            cyan: {
                50: "#e0f7fa",
                100: "#b2ebf2",
                200: "#80deea",
                300: "#4dd0e1",
                400: "#26c6da",
                500: "#00bcd4",
                600: "#00acc1",
                700: "#0097a7",
                800: "#00838f",
                900: "#006064",
                A100: "#84ffff",
                A200: "#18ffff",
                A400: "#00e5ff",
                A700: "#00b8d4",
                contrastDefaultColor: "dark",
                contrastLightColors: "700 800 900",
                contrastStrongLightColors: "700 800 900"
            },
            teal: {
                50: "#e0f2f1",
                100: "#b2dfdb",
                200: "#80cbc4",
                300: "#4db6ac",
                400: "#26a69a",
                500: "#009688",
                600: "#00897b",
                700: "#00796b",
                800: "#00695c",
                900: "#004d40",
                A100: "#a7ffeb",
                A200: "#64ffda",
                A400: "#1de9b6",
                A700: "#00bfa5",
                contrastDefaultColor: "dark",
                contrastLightColors: "500 600 700 800 900",
                contrastStrongLightColors: "500 600 700"
            },
            green: {
                50: "#e8f5e9",
                100: "#c8e6c9",
                200: "#a5d6a7",
                300: "#81c784",
                400: "#66bb6a",
                500: "#4caf50",
                600: "#43a047",
                700: "#388e3c",
                800: "#2e7d32",
                900: "#1b5e20",
                A100: "#b9f6ca",
                A200: "#69f0ae",
                A400: "#00e676",
                A700: "#00c853",
                contrastDefaultColor: "dark",
                contrastLightColors: "600 700 800 900",
                contrastStrongLightColors: "600 700"
            },
            "light-green": {
                50: "#f1f8e9",
                100: "#dcedc8",
                200: "#c5e1a5",
                300: "#aed581",
                400: "#9ccc65",
                500: "#8bc34a",
                600: "#7cb342",
                700: "#689f38",
                800: "#558b2f",
                900: "#33691e",
                A100: "#ccff90",
                A200: "#b2ff59",
                A400: "#76ff03",
                A700: "#64dd17",
                contrastDefaultColor: "dark",
                contrastLightColors: "700 800 900",
                contrastStrongLightColors: "700 800 900"
            },
            lime: {
                50: "#f9fbe7",
                100: "#f0f4c3",
                200: "#e6ee9c",
                300: "#dce775",
                400: "#d4e157",
                500: "#cddc39",
                600: "#c0ca33",
                700: "#afb42b",
                800: "#9e9d24",
                900: "#827717",
                A100: "#f4ff81",
                A200: "#eeff41",
                A400: "#c6ff00",
                A700: "#aeea00",
                contrastDefaultColor: "dark",
                contrastLightColors: "900",
                contrastStrongLightColors: "900"
            },
            yellow: {
                50: "#fffde7",
                100: "#fff9c4",
                200: "#fff59d",
                300: "#fff176",
                400: "#ffee58",
                500: "#ffeb3b",
                600: "#fdd835",
                700: "#fbc02d",
                800: "#f9a825",
                900: "#f57f17",
                A100: "#ffff8d",
                A200: "#ffff00",
                A400: "#ffea00",
                A700: "#ffd600",
                contrastDefaultColor: "dark"
            },
            amber: {
                50: "#fff8e1",
                100: "#ffecb3",
                200: "#ffe082",
                300: "#ffd54f",
                400: "#ffca28",
                500: "#ffc107",
                600: "#ffb300",
                700: "#ffa000",
                800: "#ff8f00",
                900: "#ff6f00",
                A100: "#ffe57f",
                A200: "#ffd740",
                A400: "#ffc400",
                A700: "#ffab00",
                contrastDefaultColor: "dark"
            },
            orange: {
                50: "#fff3e0",
                100: "#ffe0b2",
                200: "#ffcc80",
                300: "#ffb74d",
                400: "#ffa726",
                500: "#ff9800",
                600: "#fb8c00",
                700: "#f57c00",
                800: "#ef6c00",
                900: "#e65100",
                A100: "#ffd180",
                A200: "#ffab40",
                A400: "#ff9100",
                A700: "#ff6d00",
                contrastDefaultColor: "dark",
                contrastLightColors: "800 900",
                contrastStrongLightColors: "800 900"
            },
            "deep-orange": {
                50: "#fbe9e7",
                100: "#ffccbc",
                200: "#ffab91",
                300: "#ff8a65",
                400: "#ff7043",
                500: "#ff5722",
                600: "#f4511e",
                700: "#e64a19",
                800: "#d84315",
                900: "#bf360c",
                A100: "#ff9e80",
                A200: "#ff6e40",
                A400: "#ff3d00",
                A700: "#dd2c00",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 400 A100 A200",
                contrastStrongLightColors: "500 600 700 800 900 A400 A700"
            },
            brown: {
                50: "#efebe9",
                100: "#d7ccc8",
                200: "#bcaaa4",
                300: "#a1887f",
                400: "#8d6e63",
                500: "#795548",
                600: "#6d4c41",
                700: "#5d4037",
                800: "#4e342e",
                900: "#3e2723",
                A100: "#d7ccc8",
                A200: "#bcaaa4",
                A400: "#8d6e63",
                A700: "#5d4037",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200",
                contrastStrongLightColors: "300 400"
            },
            grey: {
                50: "#fafafa",
                100: "#f5f5f5",
                200: "#eeeeee",
                300: "#e0e0e0",
                400: "#bdbdbd",
                500: "#9e9e9e",
                600: "#757575",
                700: "#616161",
                800: "#424242",
                900: "#212121",
                1000: "#000000",
                A100: "#ffffff",
                A200: "#eeeeee",
                A400: "#bdbdbd",
                A700: "#616161",
                contrastDefaultColor: "dark",
                contrastLightColors: "600 700 800 900"
            },
            "blue-grey": {
                50: "#eceff1",
                100: "#cfd8dc",
                200: "#b0bec5",
                300: "#90a4ae",
                400: "#78909c",
                500: "#607d8b",
                600: "#546e7a",
                700: "#455a64",
                800: "#37474f",
                900: "#263238",
                A100: "#cfd8dc",
                A200: "#b0bec5",
                A400: "#78909c",
                A700: "#455a64",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300",
                contrastStrongLightColors: "400 500"
            }
        })
    }(), function () {
        function e(e) {
            function o(e, t) {
                return t = t || {}, m[e] = a(e, t), E
            }

            function r(e, n) {
                return a(e, t.extend({}, m[e] || {}, n))
            }

            function a(e, t) {
                var n = T.filter(function (e) {
                    return !t[e]
                });
                if (n.length)throw new Error("Missing colors %1 in palette %2!".replace("%1", n.join(", ")).replace("%2", e));
                return t
            }

            function c(e, n) {
                if (u[e])return u[e];
                n = n || "default";
                var o = "string" == typeof n ? u[n] : n, r = new s(e);
                return o && t.forEach(o.colors, function (e, n) {
                    r.colors[n] = {name: e.name, hues: t.extend({}, e.hues)}
                }), u[e] = r, r
            }

            function s(e) {
                function n(e) {
                    if (e = 0 === arguments.length ? !0 : !!e, e !== o.isDark) {
                        o.isDark = e, o.foregroundPalette = o.isDark ? f : h, o.foregroundShadow = o.isDark ? g : b;
                        var n = o.isDark ? A : C, r = o.isDark ? C : A;
                        return t.forEach(n, function (e, t) {
                            var n = o.colors[t], i = r[t];
                            if (n)for (var a in n.hues)n.hues[a] === i[a] && (n.hues[a] = e[a])
                        }), o
                    }
                }

                var o = this;
                o.name = e, o.colors = {}, o.dark = n, n(!1), $.forEach(function (e) {
                    var n = (o.isDark ? A : C)[e];
                    o[e + "Palette"] = function (r, i) {
                        var a = o.colors[e] = {name: r, hues: t.extend({}, n, i)};
                        return Object.keys(a.hues).forEach(function (e) {
                            if (!n[e])throw new Error("Invalid hue name '%1' in theme %2's %3 color %4. Available hue names: %4".replace("%1", e).replace("%2", o.name).replace("%3", r).replace("%4", Object.keys(n).join(", ")))
                        }), Object.keys(a.hues).map(function (e) {
                            return a.hues[e]
                        }).forEach(function (t) {
                            if (-1 == T.indexOf(t))throw new Error("Invalid hue value '%1' in theme %2's %3 color %4. Available hue values: %5".replace("%1", t).replace("%2", o.name).replace("%3", e).replace("%4", r).replace("%5", T.join(", ")))
                        }), o
                    }, o[e + "Color"] = function () {
                        var t = Array.prototype.slice.call(arguments);
                        return console.warn("$mdThemingProviderTheme." + e + "Color() has been deprecated. Use $mdThemingProviderTheme." + e + "Palette() instead."), o[e + "Palette"].apply(o, t)
                    }
                })
            }

            function p(e, o) {
                function r(e) {
                    return e === n || "" === e ? !0 : i.THEMES[e] !== n
                }

                function i(t, o) {
                    o === n && (o = t, t = n), t === n && (t = e), i.inherit(o, o)
                }

                return i.inherit = function (n, i) {
                    function a(e) {
                        if (e) {
                            r(e) || o.warn("Attempted to use unregistered theme '" + e + "'. Register it with $mdThemingProvider.theme().");
                            var t = n.data("$mdThemeName");
                            t && n.removeClass("md-" + t + "-theme"), n.addClass("md-" + e + "-theme"), n.data("$mdThemeName", e), d && n.data("$mdThemeController", d)
                        }
                    }

                    var d = i.controller("mdTheme"), c = n.attr("md-theme-watch");
                    if ((M || t.isDefined(c)) && "false" != c) {
                        var s = e.$watch(function () {
                            return d && d.$mdTheme || ("default" == v ? "" : v)
                        }, a);
                        n.on("$destroy", s)
                    } else {
                        var l = d && d.$mdTheme || ("default" == v ? "" : v);
                        a(l)
                    }
                }, i.THEMES = t.extend({}, u), i.defaultTheme = function () {
                    return v
                }, i.registered = r, i.generateTheme = d, i
            }

            m = {}, u = {};
            var E, v = "default", M = !1;
            return t.extend(m, e), p.$inject = ["$rootScope", "$log"], E = {
                definePalette: o,
                extendPalette: r,
                theme: c,
                setDefaultTheme: function (e) {
                    v = e
                },
                alwaysWatchTheme: function (e) {
                    M = e
                },
                generateThemesOnDemand: function (e) {
                    w = e
                },
                $get: p,
                _LIGHT_DEFAULT_HUES: C,
                _DARK_DEFAULT_HUES: A,
                _PALETTES: m,
                _THEMES: u,
                _parseRules: i,
                _rgba: l
            }
        }

        function o(e, t, n) {
            return {
                priority: 100, link: {
                    pre: function (o, r, i) {
                        var a = {
                            $setTheme: function (t) {
                                e.registered(t) || n.warn("attempted to use unregistered theme '" + t + "'"), a.$mdTheme = t
                            }
                        };
                        r.data("$mdThemeController", a), a.$setTheme(t(i.mdTheme)(o)), i.$observe("mdTheme", a.$setTheme)
                    }
                }
            }
        }

        function r(e) {
            return e
        }

        function i(e, n, o) {
            c(e, n), o = o.replace(/THEME_NAME/g, e.name);
            var r = [], i = e.colors[n], a = new RegExp(".md-" + e.name + "-theme", "g"), d = new RegExp("('|\")?{{\\s*(" + n + ")-(color|contrast)-?(\\d\\.?\\d*)?\\s*}}(\"|')?", "g"), s = /'?"?\{\{\s*([a-zA-Z]+)-(A?\d+|hue\-[0-3]|shadow)-?(\d\.?\d*)?(contrast)?\s*\}\}'?"?/g, u = m[i.name];
            return o = o.replace(s, function (t, n, o, r, i) {
                return "foreground" === n ? "shadow" == o ? e.foregroundShadow : e.foregroundPalette[o] || e.foregroundPalette[1] : (0 === o.indexOf("hue") && (o = e.colors[n].hues[o]), l((m[e.colors[n].name][o] || "")[i ? "contrast" : "value"], r))
            }), t.forEach(i.hues, function (t, n) {
                var i = o.replace(d, function (e, n, o, r, i) {
                    return l(u[t]["color" === r ? "value" : "contrast"], i)
                });
                if ("default" !== n && (i = i.replace(a, ".md-" + e.name + "-theme.md-" + n)), "default" == e.name) {
                    var c = /((?:(?:(?: |>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)+) )?)((?:(?:\w|\.|-)+)?)\.md-default-theme((?: |>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)*)/g;
                    i = i.replace(c, function (e, t, n, o) {
                        return e + ", " + t + n + o
                    })
                }
                r.push(i)
            }), r
        }

        function a(e) {
            function n(e) {
                var n = e.contrastDefaultColor, o = e.contrastLightColors || [], r = e.contrastStrongLightColors || [], i = e.contrastDarkColors || [];
                "string" == typeof o && (o = o.split(" ")), "string" == typeof r && (r = r.split(" ")), "string" == typeof i && (i = i.split(" ")), delete e.contrastDefaultColor, delete e.contrastLightColors, delete e.contrastStrongLightColors, delete e.contrastDarkColors, t.forEach(e, function (a, d) {
                    function c() {
                        return "light" === n ? i.indexOf(d) > -1 ? E : r.indexOf(d) > -1 ? M : v : o.indexOf(d) > -1 ? r.indexOf(d) > -1 ? M : v : E
                    }

                    if (!t.isObject(a)) {
                        var l = s(a);
                        if (!l)throw new Error("Color %1, in palette %2's hue %3, is invalid. Hex or rgb(a) color expected.".replace("%1", a).replace("%2", e.name).replace("%3", d));
                        e[d] = {value: l, contrast: c()}
                    }
                })
            }

            var o = document.head, r = o ? o.firstElementChild : null, i = e.has("$MD_THEME_CSS") ? e.get("$MD_THEME_CSS") : "";
            if (r && 0 !== i.length) {
                t.forEach(m, n);
                var a = i.split(/\}(?!(\}|'|"|;))/).filter(function (e) {
                    return e && e.length
                }).map(function (e) {
                    return e.trim() + "}"
                }), c = new RegExp("md-(" + $.join("|") + ")", "g");
                $.forEach(function (e) {
                    k[e] = ""
                }), a.forEach(function (e) {
                    for (var t, n = (e.match(c), 0); t = $[n]; n++)if (e.indexOf(".md-" + t) > -1)return k[t] += e;
                    for (n = 0; t = $[n]; n++)if (e.indexOf(t) > -1)return k[t] += e;
                    return k[y] += e
                }), w || t.forEach(u, function (e) {
                    p[e.name] || d(e.name)
                })
            }
        }

        function d(e) {
            var t = u[e], n = document.head, o = n ? n.firstElementChild : null;
            p[e] || ($.forEach(function (e) {
                for (var r = i(t, e, k[e]); r.length;) {
                    var a = r.shift();
                    if (a) {
                        var d = document.createElement("style");
                        d.setAttribute("md-theme-style", ""), d.appendChild(document.createTextNode(a)), n.insertBefore(d, o)
                    }
                }
            }), t.colors.primary.name == t.colors.accent.name && console.warn("$mdThemingProvider: Using the same palette for primary and accent. This violates the material design spec."), p[t.name] = !0)
        }

        function c(e, t) {
            if (!m[(e.colors[t] || {}).name])throw new Error("You supplied an invalid color palette for theme %1's %2 palette. Available palettes: %3".replace("%1", e.name).replace("%2", t).replace("%3", Object.keys(m).join(", ")))
        }

        function s(e) {
            if (t.isArray(e) && 3 == e.length)return e;
            if (/^rgb/.test(e))return e.replace(/(^\s*rgba?\(|\)\s*$)/g, "").split(",").map(function (e, t) {
                return 3 == t ? parseFloat(e, 10) : parseInt(e, 10)
            });
            if ("#" == e.charAt(0) && (e = e.substring(1)), /^([a-fA-F0-9]{3}){1,2}$/g.test(e)) {
                var n = e.length / 3, o = e.substr(0, n), r = e.substr(n, n), i = e.substr(2 * n);
                return 1 === n && (o += o, r += r, i += i), [parseInt(o, 16), parseInt(r, 16), parseInt(i, 16)]
            }
        }

        function l(e, n) {
            return e ? (4 == e.length && (e = t.copy(e), n ? e.pop() : n = e.pop()), n && ("number" == typeof n || "string" == typeof n && n.length) ? "rgba(" + e.join(",") + "," + n + ")" : "rgb(" + e.join(",") + ")") : "rgb('0,0,0')"
        }

        t.module("material.core.theming", ["material.core.theming.palette"]).directive("mdTheme", o).directive("mdThemable", r).provider("$mdTheming", e).run(a);
        var m, u, p = {}, h = {
            name: "dark",
            1: "rgba(0,0,0,0.87)",
            2: "rgba(0,0,0,0.54)",
            3: "rgba(0,0,0,0.26)",
            4: "rgba(0,0,0,0.12)"
        }, f = {
            name: "light",
            1: "rgba(255,255,255,1.0)",
            2: "rgba(255,255,255,0.7)",
            3: "rgba(255,255,255,0.3)",
            4: "rgba(255,255,255,0.12)"
        }, g = "1px 1px 0px rgba(0,0,0,0.4), -1px -1px 0px rgba(0,0,0,0.4)", b = "", E = s("rgba(0,0,0,0.87)"), v = s("rgba(255,255,255,0.87)"), M = s("rgb(255,255,255)"), $ = ["primary", "accent", "warn", "background"], y = "primary", C = {
            accent: {
                "default": "A200",
                "hue-1": "A100",
                "hue-2": "A400",
                "hue-3": "A700"
            }, background: {"default": "A100", "hue-1": "300", "hue-2": "800", "hue-3": "900"}
        }, A = {background: {"default": "800", "hue-1": "600", "hue-2": "300", "hue-3": "900"}};
        $.forEach(function (e) {
            var t = {"default": "500", "hue-1": "300", "hue-2": "800", "hue-3": "A100"};
            C[e] || (C[e] = t), A[e] || (A[e] = t)
        });
        var T = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "A100", "A200", "A400", "A700"], w = !1;
        e.$inject = ["$mdColorPalette"], o.$inject = ["$mdTheming", "$interpolate", "$log"], r.$inject = ["$mdTheming"];
        var k = {};
        a.$inject = ["$injector"]
    }(), function () {
        function e(e, n, o, r, i) {
            var a;
            return a = {
                translate3d: function (e, t, n, o) {
                    function r(n) {
                        return i(e, {
                            to: n || t,
                            addClass: o.transitionOutClass,
                            removeClass: o.transitionInClass
                        }).start()
                    }

                    return i(e, {from: t, to: n, addClass: o.transitionInClass}).start().then(function () {
                        return r
                    })
                }, waitTransitionEnd: function (e, t) {
                    var i = 3e3;
                    return n(function (n, a) {
                        function d(t) {
                            t && t.target !== e[0] || (t && o.cancel(c), e.off(r.CSS.TRANSITIONEND, d), n())
                        }

                        t = t || {};
                        var c = o(d, t.timeout || i);
                        e.on(r.CSS.TRANSITIONEND, d)
                    })
                }, calculateZoomToOrigin: function (n, o) {
                    function r() {
                        var e = n ? n.parent() : null, t = e ? e.parent() : null;
                        return t ? a.clientRect(t) : null
                    }

                    var i = o.element, d = o.bounds, c = "translate3d( {centerX}px, {centerY}px, 0 ) scale( {scaleX}, {scaleY} )", s = t.bind(null, e.supplant, c), l = s({
                        centerX: 0,
                        centerY: 0,
                        scaleX: .5,
                        scaleY: .5
                    });
                    if (i || d) {
                        var m = i ? a.clientRect(i) || r() : a.copyRect(d), u = a.copyRect(n[0].getBoundingClientRect()), p = a.centerPointFor(u), h = a.centerPointFor(m);
                        l = s({
                            centerX: h.x - p.x,
                            centerY: h.y - p.y,
                            scaleX: Math.round(100 * Math.min(.5, m.width / u.width)) / 100,
                            scaleY: Math.round(100 * Math.min(.5, m.height / u.height)) / 100
                        })
                    }
                    return l
                }, toCss: function (e) {
                    function n(e, n, r) {
                        t.forEach(n.split(" "), function (e) {
                            o[e] = r
                        })
                    }

                    var o = {}, i = "left top right bottom width height x y min-width min-height max-width max-height";
                    return t.forEach(e, function (e, a) {
                        if (!t.isUndefined(e))if (i.indexOf(a) >= 0)o[a] = e + "px"; else switch (a) {
                            case"transition":
                                n(a, r.CSS.TRANSITION, e);
                                break;
                            case"transform":
                                n(a, r.CSS.TRANSFORM, e);
                                break;
                            case"transformOrigin":
                                n(a, r.CSS.TRANSFORM_ORIGIN, e)
                        }
                    }), o
                }, toTransformCss: function (e, n, o) {
                    var i = {};
                    return t.forEach(r.CSS.TRANSFORM.split(" "), function (t) {
                        i[t] = e
                    }), n && (o = o || "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important", i.transition = o), i
                }, copyRect: function (e, n) {
                    return e ? (n = n || {}, t.forEach("left top right bottom width height".split(" "), function (t) {
                        n[t] = Math.round(e[t])
                    }), n.width = n.width || n.right - n.left, n.height = n.height || n.bottom - n.top, n) : null
                }, clientRect: function (e) {
                    var n = t.element(e)[0].getBoundingClientRect(), o = function (e) {
                        return e && e.width > 0 && e.height > 0
                    };
                    return o(n) ? a.copyRect(n) : null
                }, centerPointFor: function (e) {
                    return e ? {x: Math.round(e.left + e.width / 2), y: Math.round(e.top + e.height / 2)} : {x: 0, y: 0}
                }
            }
        }

        t.module("material.core").factory("$$mdAnimate", ["$q", "$timeout", "$mdConstant", "$animateCss", function (t, n, o, r) {
            return function (i) {
                return e(i, t, n, o, r)
            }
        }])
    }(), function () {
        t.version.minor >= 4 ? t.module("material.core.animate", []) : !function () {
            function e(e) {
                return e.replace(/-[a-z]/g, function (e) {
                    return e.charAt(1).toUpperCase()
                })
            }

            var n = t.forEach, o = t.isDefined(document.documentElement.style.WebkitAppearance), r = o ? "-webkit-" : "", i = (o ? "webkitTransitionEnd " : "") + "transitionend", a = (o ? "webkitAnimationEnd " : "") + "animationend", d = ["$document", function (e) {
                return function () {
                    return e[0].body.clientWidth + 1
                }
            }], c = ["$$rAF", function (e) {
                return function () {
                    var t = !1;
                    return e(function () {
                        t = !0
                    }), function (n) {
                        t ? n() : e(n)
                    }
                }
            }], s = ["$q", "$$rAFMutex", function (e, o) {
                function r(e) {
                    this.setHost(e), this._doneCallbacks = [], this._runInAnimationFrame = o(), this._state = 0
                }

                var i = 0, a = 1, d = 2;
                return r.prototype = {
                    setHost: function (e) {
                        this.host = e || {}
                    }, done: function (e) {
                        this._state === d ? e() : this._doneCallbacks.push(e)
                    }, progress: t.noop, getPromise: function () {
                        if (!this.promise) {
                            var t = this;
                            this.promise = e(function (e, n) {
                                t.done(function (t) {
                                    t === !1 ? n() : e()
                                })
                            })
                        }
                        return this.promise
                    }, then: function (e, t) {
                        return this.getPromise().then(e, t)
                    }, "catch": function (e) {
                        return this.getPromise()["catch"](e)
                    }, "finally": function (e) {
                        return this.getPromise()["finally"](e)
                    }, pause: function () {
                        this.host.pause && this.host.pause()
                    }, resume: function () {
                        this.host.resume && this.host.resume()
                    }, end: function () {
                        this.host.end && this.host.end(), this._resolve(!0)
                    }, cancel: function () {
                        this.host.cancel && this.host.cancel(), this._resolve(!1)
                    }, complete: function (e) {
                        var t = this;
                        t._state === i && (t._state = a, t._runInAnimationFrame(function () {
                            t._resolve(e)
                        }))
                    }, _resolve: function (e) {
                        this._state !== d && (n(this._doneCallbacks, function (t) {
                            t(e)
                        }), this._doneCallbacks.length = 0, this._state = d)
                    }
                }, r
            }];
            t.module("material.core.animate", []).factory("$$forceReflow", d).factory("$$AnimateRunner", s).factory("$$rAFMutex", c).factory("$animateCss", ["$window", "$$rAF", "$$AnimateRunner", "$$forceReflow", "$$jqLite", "$timeout", function (t, d, c, s, l, m) {
                function u(o, d) {
                    var s = [], l = M(o);
                    d.transitionStyle && s.push([r + "transition", d.transitionStyle]), d.keyframeStyle && s.push([r + "animation", d.keyframeStyle]), d.delay && s.push([r + "transition-delay", d.delay + "s"]), d.duration && s.push([r + "transition-duration", d.duration + "s"]);
                    var u = d.keyframeStyle || d.to && (d.duration > 0 || d.transitionStyle), f = !!d.addClass || !!d.removeClass, y = u || f;
                    $(o, !0), E(o, d);
                    var C, A, T = !1;
                    return {
                        close: t.close, start: function () {
                            function t() {
                                return T ? void 0 : (T = !0, C && A && o.off(C, A), p(o, d), b(o, d), n(s, function (t) {
                                    l.style[e(t[0])] = ""
                                }), u.complete(!0), u)
                            }

                            var u = new c;
                            return g(function () {
                                if ($(o, !1), !y)return t();
                                n(s, function (t) {
                                    var n = t[0], o = t[1];
                                    l.style[e(n)] = o
                                }), p(o, d);
                                var c = h(o);
                                if (0 === c.duration)return t();
                                var u = [];
                                d.easing && (c.transitionDuration && u.push([r + "transition-timing-function", d.easing]), c.animationDuration && u.push([r + "animation-timing-function", d.easing])), d.delay && c.animationDelay && u.push([r + "animation-delay", d.delay + "s"]), d.duration && c.animationDuration && u.push([r + "animation-duration", d.duration + "s"]), n(u, function (t) {
                                    var n = t[0], o = t[1];
                                    l.style[e(n)] = o, s.push(t)
                                });
                                var f = c.delay, g = 1e3 * f, b = c.duration, E = 1e3 * b, M = Date.now();
                                C = [], c.transitionDuration && C.push(i), c.animationDuration && C.push(a), C = C.join(" "), A = function (e) {
                                    e.stopPropagation();
                                    var n = e.originalEvent || e, o = n.timeStamp || Date.now(), r = parseFloat(n.elapsedTime.toFixed(3));
                                    Math.max(o - M, 0) >= g && r >= b && t()
                                }, o.on(C, A), v(o, d), m(t, g + 1.5 * E, !1)
                            }), u
                        }
                    }
                }

                function p(e, t) {
                    t.addClass && (l.addClass(e, t.addClass), t.addClass = null), t.removeClass && (l.removeClass(e, t.removeClass), t.removeClass = null)
                }

                function h(e) {
                    function n(e) {
                        return o ? "Webkit" + e.charAt(0).toUpperCase() + e.substr(1) : e
                    }

                    var r = M(e), i = t.getComputedStyle(r), a = f(i[n("transitionDuration")]), d = f(i[n("animationDuration")]), c = f(i[n("transitionDelay")]), s = f(i[n("animationDelay")]);
                    d *= parseInt(i[n("animationIterationCount")], 10) || 1;
                    var l = Math.max(d, a), m = Math.max(s, c);
                    return {
                        duration: l,
                        delay: m,
                        animationDuration: d,
                        transitionDuration: a,
                        animationDelay: s,
                        transitionDelay: c
                    }
                }

                function f(e) {
                    var t = 0, o = (e || "").split(/\s*,\s*/);
                    return n(o, function (e) {
                        "s" == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)), e = parseFloat(e) || 0, t = t ? Math.max(e, t) : e
                    }), t
                }

                function g(e) {
                    y && y(), C.push(e), y = d(function () {
                        y = null;
                        for (var e = s(), t = 0; t < C.length; t++)C[t](e);
                        C.length = 0
                    })
                }

                function b(e, t) {
                    E(e, t), v(e, t)
                }

                function E(e, t) {
                    t.from && (e.css(t.from), t.from = null)
                }

                function v(e, t) {
                    t.to && (e.css(t.to), t.to = null)
                }

                function M(e) {
                    for (var t = 0; t < e.length; t++)if (1 === e[t].nodeType)return e[t]
                }

                function $(t, n) {
                    var o = M(t), i = e(r + "transition-delay");
                    o.style[i] = n ? "-9999s" : ""
                }

                var y, C = [];
                return u
            }])
        }()
    }(), function () {
        t.module("material.components.autocomplete", ["material.core", "material.components.icon", "material.components.virtualRepeat"])
    }(), function () {
        function e(e) {
            return {
                restrict: "E", link: function (t, n, o) {
                    t.$on("$destroy", function () {
                        e.destroy()
                    })
                }
            }
        }

        function n(e) {
            function n(e, n, i, a, d, c, s) {
                function l(o, r, s, l) {
                    r = i.extractElementByName(r, "md-bottom-sheet"), p = i.createBackdrop(o, "md-bottom-sheet-backdrop md-opaque"), s.clickOutsideToClose && p.on("click", function () {
                        i.nextTick(d.cancel, !0)
                    }), a.inherit(p, s.parent), e.enter(p, s.parent, null);
                    var m = new u(r, s.parent);
                    return s.bottomSheet = m, a.inherit(m.element, s.parent), s.disableParentScroll && (s.restoreScroll = i.disableScrollAround(m.element, s.parent)), e.enter(m.element, s.parent).then(function () {
                        var e = i.findFocusTarget(r) || t.element(r[0].querySelector("button") || r[0].querySelector("a") || r[0].querySelector("[ng-click]"));
                        e.focus(), s.escapeToClose && (s.rootElementKeyupCallback = function (e) {
                            e.keyCode === n.KEY_CODE.ESCAPE && i.nextTick(d.cancel, !0)
                        }, c.on("keyup", s.rootElementKeyupCallback))
                    })
                }

                function m(t, n, o) {
                    var r = o.bottomSheet;
                    return e.leave(p), e.leave(r.element).then(function () {
                        o.disableParentScroll && (o.restoreScroll(), delete o.restoreScroll), r.cleanup()
                    })
                }

                function u(e, t) {
                    function a(t) {
                        e.css(n.CSS.TRANSITION_DURATION, "0ms")
                    }

                    function c(t) {
                        var o = t.pointer.distanceY;
                        5 > o && (o = Math.max(-r, o / 2)), e.css(n.CSS.TRANSFORM, "translate3d(0," + (r + o) + "px,0)")
                    }

                    function l(t) {
                        if (t.pointer.distanceY > 0 && (t.pointer.distanceY > 20 || Math.abs(t.pointer.velocityY) > o)) {
                            var r = e.prop("offsetHeight") - t.pointer.distanceY, a = Math.min(r / t.pointer.velocityY * .75, 500);
                            e.css(n.CSS.TRANSITION_DURATION, a + "ms"), i.nextTick(d.cancel, !0)
                        } else e.css(n.CSS.TRANSITION_DURATION, ""), e.css(n.CSS.TRANSFORM, "")
                    }

                    var m = s.register(t, "drag", {horizontal: !1});
                    return t.on("$md.dragstart", a).on("$md.drag", c).on("$md.dragend", l), {
                        element: e,
                        cleanup: function () {
                            m(), t.off("$md.dragstart", a), t.off("$md.drag", c), t.off("$md.dragend", l)
                        }
                    }
                }

                var p;
                return {
                    themable: !0,
                    onShow: l,
                    onRemove: m,
                    escapeToClose: !0,
                    clickOutsideToClose: !0,
                    disableParentScroll: !0
                }
            }

            var o = .5, r = 80;
            return n.$inject = ["$animate", "$mdConstant", "$mdUtil", "$mdTheming", "$mdBottomSheet", "$rootElement", "$mdGesture"], e("$mdBottomSheet").setDefaults({
                methods: ["disableParentScroll", "escapeToClose", "clickOutsideToClose"],
                options: n
            })
        }

        t.module("material.components.bottomSheet", ["material.core", "material.components.backdrop"]).directive("mdBottomSheet", e).provider("$mdBottomSheet", n), e.$inject = ["$mdBottomSheet"], n.$inject = ["$$interimElementProvider"]
    }(), function () {
        t.module("material.components.backdrop", ["material.core"]).directive("mdBackdrop", ["$mdTheming", "$animate", "$rootElement", "$window", "$log", "$$rAF", "$document", function (e, t, n, o, r, i, a) {
            function d(d, s, l) {
                var m = o.getComputedStyle(a[0].body);
                if ("fixed" == m.position) {
                    var u = parseInt(m.height, 10) + Math.abs(parseInt(m.top, 10));
                    s.css({height: u + "px"})
                }
                t.pin && t.pin(s, n), i(function () {
                    var t = s.parent()[0];
                    if (t) {
                        "BODY" == t.nodeName && s.css({position: "fixed"});
                        var n = o.getComputedStyle(t);
                        "static" == n.position && r.warn(c)
                    }
                    e.inherit(s, s.parent())
                })
            }

            var c = "<md-backdrop> may not work properly in a scrolled, static-positioned parent container.";
            return {restrict: "E", link: d}
        }])
    }(), function () {
        function e(e, n, o, r) {
            function i(e) {
                return t.isDefined(e.href) || t.isDefined(e.ngHref) || t.isDefined(e.ngLink) || t.isDefined(e.uiSref)
            }

            function a(e, t) {
                if (i(t))return '<a class="md-button" ng-transclude></a>';
                var n = "undefined" == typeof t.type ? "button" : t.type;
                return '<button class="md-button" type="' + n + '" ng-transclude></button>'
            }

            function d(a, d, c) {
                var s = d[0];
                n(d), e.attach(a, d);
                var l = s.textContent.trim();
                l || o.expect(d, "aria-label"), i(c) && t.isDefined(c.ngDisabled) && a.$watch(c.ngDisabled, function (e) {
                    d.attr("tabindex", e ? -1 : 0)
                }), d.on("click", function (e) {
                    c.disabled === !0 && (e.preventDefault(), e.stopImmediatePropagation())
                }), a.mouseActive = !1, d.on("mousedown", function () {
                    a.mouseActive = !0, r(function () {
                        a.mouseActive = !1
                    }, 100)
                }).on("focus", function () {
                    a.mouseActive === !1 && d.addClass("md-focused")
                }).on("blur", function (e) {
                    d.removeClass("md-focused")
                })
            }

            return {restrict: "EA", replace: !0, transclude: !0, template: a, link: d}
        }

        t.module("material.components.button", ["material.core"]).directive("mdButton", e), e.$inject = ["$mdButtonInkRipple", "$mdTheming", "$mdAria", "$timeout"]
    }(), function () {
        function e(e) {
            return {
                restrict: "E", link: function (t, n) {
                    e(n)
                }
            }
        }

        t.module("material.components.card", ["material.core"]).directive("mdCard", e), e.$inject = ["$mdTheming"]
    }(), function () {
        function e(e, n, o, r, i, a) {
            function d(d, s) {
                return s.type = "checkbox", s.tabindex = s.tabindex || "0", d.attr("role", s.type), d.on("click", function (e) {
                    this.hasAttribute("disabled") && e.stopImmediatePropagation()
                }), function (d, s, l, m) {
                    function u(e, t, n) {
                        l[e] && d.$watch(l[e], function (e) {
                            n[e] && s.attr(t, n[e])
                        })
                    }

                    function p(e) {
                        var t = e.which || e.keyCode;
                        (t === o.KEY_CODE.SPACE || t === o.KEY_CODE.ENTER) && (e.preventDefault(), s.hasClass("md-focused") || s.addClass("md-focused"), h(e))
                    }

                    function h(e) {
                        s[0].hasAttribute("disabled") || d.$apply(function () {
                            var t = l.ngChecked ? l.checked : !m.$viewValue;
                            m.$setViewValue(t, e && e.type), m.$render()
                        })
                    }

                    function f() {
                        m.$viewValue ? s.addClass(c) : s.removeClass(c)
                    }

                    m = m || i.fakeNgModel(),
                        r(s), l.ngChecked && d.$watch(d.$eval.bind(d, l.ngChecked), m.$setViewValue.bind(m)), u("ngDisabled", "tabindex", {
                        "true": "-1",
                        "false": l.tabindex
                    }), n.expectWithText(s, "aria-label"), e.link.pre(d, {
                        on: t.noop,
                        0: {}
                    }, l, [m]), d.mouseActive = !1, s.on("click", h).on("keypress", p).on("mousedown", function () {
                        d.mouseActive = !0, a(function () {
                            d.mouseActive = !1
                        }, 100)
                    }).on("focus", function () {
                        d.mouseActive === !1 && s.addClass("md-focused")
                    }).on("blur", function () {
                        s.removeClass("md-focused")
                    }), m.$render = f
                }
            }

            e = e[0];
            var c = "md-checked";
            return {
                restrict: "E",
                transclude: !0,
                require: "?ngModel",
                priority: 210,
                template: '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-icon"></div></div><div ng-transclude class="md-label"></div>',
                compile: d
            }
        }

        t.module("material.components.checkbox", ["material.core"]).directive("mdCheckbox", e), e.$inject = ["inputDirective", "$mdAria", "$mdConstant", "$mdTheming", "$mdUtil", "$timeout"]
    }(), function () {
        function e(e) {
            function t(e, t) {
                this.$scope = e, this.$element = t
            }

            return {
                restrict: "E", controller: ["$scope", "$element", t], link: function (t, o, r) {
                    o[0];
                    e(o), t.$broadcast("$mdContentLoaded", o), n(o[0])
                }
            }
        }

        function n(e) {
            t.element(e).on("$md.pressdown", function (t) {
                "t" === t.pointer.type && (t.$materialScrollFixed || (t.$materialScrollFixed = !0, 0 === e.scrollTop ? e.scrollTop = 1 : e.scrollHeight === e.scrollTop + e.offsetHeight && (e.scrollTop -= 1)))
            })
        }

        t.module("material.components.content", ["material.core"]).directive("mdContent", e), e.$inject = ["$mdTheming"]
    }(), function () {
        t.module("material.components.chips", ["material.core", "material.components.autocomplete"])
    }(), function () {
        function e(e, n, o) {
            return {
                restrict: "E", link: function (r, i, a) {
                    n(i), e(function () {
                        function e() {
                            i.toggleClass("md-content-overflow", a.scrollHeight > a.clientHeight)
                        }

                        var n, a = i[0].querySelector("md-dialog-content");
                        a && (n = a.getElementsByTagName("img"), e(), t.element(n).on("load", e)), r.$on("$destroy", function () {
                            o.destroy(i)
                        })
                    })
                }
            }
        }

        function o(e) {
            function o(e, t) {
                return {
                    template: ['<md-dialog md-theme="{{ dialog.theme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">', '  <md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">', '    <h2 class="md-title">{{ dialog.title }}</h2>', '    <div ng-if="::dialog.mdHtmlContent" class="md-dialog-content-body" ', '        ng-bind-html="::dialog.mdHtmlContent"></div>', '    <div ng-if="::!dialog.mdHtmlContent" class="md-dialog-content-body">', "      <p>{{::dialog.mdTextContent}}</p>", "    </div>", "  </md-dialog-content>", "  <md-dialog-actions>", '    <md-button ng-if="dialog.$type == \'confirm\'"               ng-click="dialog.abort()" class="md-primary">', "      {{ dialog.cancel }}", "    </md-button>", '    <md-button ng-click="dialog.hide()" class="md-primary" md-autofocus="dialog.$type!=\'confirm\'">', "      {{ dialog.ok }}", "    </md-button>", "  </md-dialog-actions>", "</md-dialog>"].join("").replace(/\s\s+/g, ""),
                    controller: function () {
                        this.hide = function () {
                            e.hide(!0)
                        }, this.abort = function () {
                            e.cancel()
                        }
                    },
                    controllerAs: "dialog",
                    bindToController: !0,
                    theme: t.defaultTheme()
                }
            }

            function r(e, o, r, d, c, s, l, m, u, p) {
                function h(e, t, n, o) {
                    if (o) {
                        if (o.mdHtmlContent = o.htmlContent || n.htmlContent || "", o.mdTextContent = o.textContent || n.textContent || o.content || n.content || "", o.mdHtmlContent && !p.has("$sanitize"))throw Error("The ngSanitize module must be loaded in order to use htmlContent.");
                        if (o.mdHtmlContent && o.mdTextContent)throw Error("md-dialog cannot have both `htmlContent` and `textContent`")
                    }
                }

                function f(e, n, o, i) {
                    function a() {
                        var e = n[0].querySelectorAll(".md-actions");
                        e.length > 0 && u.warn("Using a class of md-actions is deprected, please use <md-dialog-actions>.")
                    }

                    function d() {
                        function e() {
                            var e = n[0].querySelector(".dialog-close");
                            if (!e) {
                                var o = n[0].querySelectorAll(".md-actions button, md-dialog-actions button");
                                e = o[o.length - 1]
                            }
                            return t.element(e)
                        }

                        if (o.focusOnOpen) {
                            var i = r.findFocusTarget(n) || e();
                            i.focus()
                        }
                    }

                    return t.element(s[0].body).addClass("md-dialog-is-showing"), b(o), M(n.find("md-dialog"), o), v(e, n, o), C(n, o).then(function () {
                        E(n, o), $(n, o), a(), d()
                    })
                }

                function g(e, n, o) {
                    function r() {
                        return A(n, o)
                    }

                    function d() {
                        t.element(s[0].body).removeClass("md-dialog-is-showing"), n.remove(), o.$destroy || o.origin.focus()
                    }

                    return o.deactivateListeners(), o.unlockScreenReader(), o.hideBackdrop(o.$destroy), i && i.parentNode && i.parentNode.removeChild(i), a && a.parentNode && a.parentNode.removeChild(a), o.$destroy ? d() : r().then(d)
                }

                function b(e) {
                    function o(e, o) {
                        var r = t.element(e || {});
                        if (r && r.length) {
                            var i = {
                                top: 0,
                                left: 0,
                                height: 0,
                                width: 0
                            }, a = t.isFunction(r[0].getBoundingClientRect);
                            return t.extend(o || {}, {
                                element: a ? r : n,
                                bounds: a ? r[0].getBoundingClientRect() : t.extend({}, i, r[0]),
                                focus: t.bind(r, r.focus)
                            })
                        }
                    }

                    function r(e, n) {
                        if (t.isString(e)) {
                            var o = e, r = s[0].querySelectorAll(o);
                            e = r.length ? r[0] : null
                        }
                        return t.element(e || n)
                    }

                    e.origin = t.extend({
                        element: null,
                        bounds: null,
                        focus: t.noop
                    }, e.origin || {}), e.parent = r(e.parent, m), e.closeTo = o(r(e.closeTo)), e.openFrom = o(r(e.openFrom)), e.targetEvent && (e.origin = o(e.targetEvent.target, e.origin))
                }

                function E(n, o) {
                    var i = t.element(l), a = r.debounce(function () {
                        y(n, o)
                    }, 60), c = [], s = function () {
                        var t = "alert" == o.$type ? e.hide : e.cancel;
                        r.nextTick(t, !0)
                    };
                    if (o.escapeToClose) {
                        var m = o.parent, u = function (e) {
                            e.keyCode === d.KEY_CODE.ESCAPE && (e.stopPropagation(), e.preventDefault(), s())
                        };
                        n.on("keydown", u), m.on("keydown", u), i.on("resize", a), c.push(function () {
                            n.off("keydown", u), m.off("keydown", u), i.off("resize", a)
                        })
                    }
                    if (o.clickOutsideToClose) {
                        var p, m = n, h = function (e) {
                            p = e.target
                        }, f = function (e) {
                            p === m[0] && e.target === m[0] && (e.stopPropagation(), e.preventDefault(), s())
                        };
                        m.on("mousedown", h), m.on("mouseup", f), c.push(function () {
                            m.off("mousedown", h), m.off("mouseup", f)
                        })
                    }
                    o.deactivateListeners = function () {
                        c.forEach(function (e) {
                            e()
                        }), o.deactivateListeners = null
                    }
                }

                function v(e, t, n) {
                    n.disableParentScroll && (n.restoreScroll = r.disableScrollAround(t, n.parent)), n.hasBackdrop && (n.backdrop = r.createBackdrop(e, "md-dialog-backdrop md-opaque"), c.enter(n.backdrop, n.parent)), n.hideBackdrop = function (e) {
                        n.backdrop && (e ? n.backdrop.remove() : c.leave(n.backdrop)), n.disableParentScroll && (n.restoreScroll(), delete n.restoreScroll), n.hideBackdrop = null
                    }
                }

                function M(e, n) {
                    var d = "alert" === n.$type ? "alertdialog" : "dialog", c = e.find("md-dialog-content"), s = e.attr("id") || "dialog_" + r.nextUid();
                    e.attr({
                        role: d,
                        tabIndex: "-1"
                    }), 0 === c.length && (c = e), c.attr("id", s), e.attr("aria-describedby", s), n.ariaLabel ? o.expect(e, "aria-label", n.ariaLabel) : o.expectAsync(e, "aria-label", function () {
                        var e = c.text().split(/\s+/);
                        return e.length > 3 && (e = e.slice(0, 3).concat("...")), e.join(" ")
                    }), i = document.createElement("div"), i.classList.add("md-dialog-focus-trap"), i.tabIndex = 0, a = i.cloneNode(!1);
                    var l = t.bind(e, e.focus);
                    i.addEventListener("focus", l), a.addEventListener("focus", l), e[0].parentNode.insertBefore(i, e[0]), e.append(a)
                }

                function $(e, t) {
                    function n(e) {
                        for (; e.parentNode;) {
                            if (e === document.body)return;
                            for (var t = e.parentNode.children, r = 0; r < t.length; r++)e === t[r] || T(t[r], ["SCRIPT", "STYLE"]) || t[r].setAttribute("aria-hidden", o);
                            n(e = e.parentNode)
                        }
                    }

                    var o = !0;
                    n(e[0]), t.unlockScreenReader = function () {
                        o = !1, n(e[0]), t.unlockScreenReader = null
                    }
                }

                function y(e, t) {
                    var n = "fixed" == l.getComputedStyle(s[0].body).position, o = t.backdrop ? l.getComputedStyle(t.backdrop[0]) : null, i = o ? Math.min(s[0].body.clientHeight, Math.ceil(Math.abs(parseInt(o.height, 10)))) : 0;
                    return e.css({top: (n ? r.scrollTop(t.parent) : 0) + "px", height: i ? i + "px" : "100%"}), e
                }

                function C(e, t) {
                    t.parent.append(e), y(e, t);
                    var n = e.find("md-dialog"), o = r.dom.animator, i = o.calculateZoomToOrigin, a = {
                        transitionInClass: "md-transition-in",
                        transitionOutClass: "md-transition-out"
                    }, d = o.toTransformCss(i(n, t.openFrom || t.origin)), c = o.toTransformCss("");
                    return t.fullscreen && n.addClass("md-dialog-fullscreen"), o.translate3d(n, d, c, a).then(function (e) {
                        return t.reverseAnimate = function () {
                            return delete t.reverseAnimate, t.closeTo ? (a = {
                                transitionInClass: "md-transition-out",
                                transitionOutClass: "md-transition-in"
                            }, d = c, c = o.toTransformCss(i(n, t.closeTo)), o.translate3d(n, d, c, a)) : e(o.toTransformCss(i(n, t.origin)))
                        }, !0
                    })
                }

                function A(e, t) {
                    return t.reverseAnimate()
                }

                function T(e, t) {
                    return -1 !== t.indexOf(e.nodeName) ? !0 : void 0
                }

                return {
                    hasBackdrop: !0,
                    isolateScope: !0,
                    onShow: f,
                    onShowing: h,
                    onRemove: g,
                    clickOutsideToClose: !1,
                    escapeToClose: !0,
                    targetEvent: null,
                    closeTo: null,
                    openFrom: null,
                    focusOnOpen: !0,
                    disableParentScroll: !0,
                    autoWrap: !0,
                    fullscreen: !1,
                    transformTemplate: function (e, t) {
                        function n(e) {
                            return t.autoWrap && !/<\/md-dialog>/g.test(e) ? "<md-dialog>" + (e || "") + "</md-dialog>" : e || ""
                        }

                        return '<div class="md-dialog-container">' + n(e) + "</div>"
                    }
                }
            }

            var i, a;
            return o.$inject = ["$mdDialog", "$mdTheming"], r.$inject = ["$mdDialog", "$mdAria", "$mdUtil", "$mdConstant", "$animate", "$document", "$window", "$rootElement", "$log", "$injector"], e("$mdDialog").setDefaults({
                methods: ["disableParentScroll", "hasBackdrop", "clickOutsideToClose", "escapeToClose", "targetEvent", "closeTo", "openFrom", "parent", "fullscreen"],
                options: r
            }).addPreset("alert", {
                methods: ["title", "htmlContent", "textContent", "content", "ariaLabel", "ok", "theme", "css"],
                options: o
            }).addPreset("confirm", {
                methods: ["title", "htmlContent", "textContent", "content", "ariaLabel", "ok", "cancel", "theme", "css"],
                options: o
            })
        }

        t.module("material.components.dialog", ["material.core", "material.components.backdrop"]).directive("mdDialog", e).provider("$mdDialog", o), e.$inject = ["$$rAF", "$mdTheming", "$mdDialog"], o.$inject = ["$$interimElementProvider"]
    }(), function () {
        !function () {
            function e() {
                return {
                    template: '<table aria-hidden="true" class="md-calendar-day-header"><thead></thead></table><div class="md-calendar-scroll-mask"><md-virtual-repeat-container class="md-calendar-scroll-container" md-offset-size="' + (r - o) + '"><table role="grid" tabindex="0" class="md-calendar" aria-readonly="true"><tbody role="rowgroup" md-virtual-repeat="i in ctrl.items" md-calendar-month md-month-offset="$index" class="md-calendar-month" md-start-index="ctrl.getSelectedMonthIndex()" md-item-size="' + o + '"></tbody></table></md-virtual-repeat-container></div>',
                    scope: {minDate: "=mdMinDate", maxDate: "=mdMaxDate", dateFilter: "=mdDateFilter"},
                    require: ["ngModel", "mdCalendar"],
                    controller: n,
                    controllerAs: "ctrl",
                    bindToController: !0,
                    link: function (e, t, n, o) {
                        var r = o[0], i = o[1];
                        i.configureNgModel(r)
                    }
                }
            }

            function n(e, t, n, o, r, i, a, c, s, l, m) {
                if (a(e), this.items = {length: 2e3}, this.maxDate && this.minDate) {
                    var u = c.getMonthDistance(this.minDate, this.maxDate) + 1;
                    u = Math.max(u, 1), u += 1, this.items.length = u
                }
                if (this.$animate = o, this.$q = r, this.$mdInkRipple = l, this.$mdUtil = m, this.keyCode = i.KEY_CODE, this.dateUtil = c, this.dateLocale = s, this.$element = e, this.$scope = n, this.calendarElement = e[0].querySelector(".md-calendar"), this.calendarScroller = e[0].querySelector(".md-virtual-repeat-scroller"), this.today = this.dateUtil.createDateAtMidnight(), this.firstRenderableDate = this.dateUtil.incrementMonths(this.today, -this.items.length / 2), this.minDate && this.minDate > this.firstRenderableDate)this.firstRenderableDate = this.minDate; else if (this.maxDate) {
                    this.items.length - 2;
                    this.firstRenderableDate = this.dateUtil.incrementMonths(this.maxDate, -(this.items.length - 2))
                }
                this.id = d++, this.ngModelCtrl = null, this.selectedDate = null, this.displayDate = null, this.focusDate = null, this.isInitialized = !1, this.isMonthTransitionInProgress = !1, t.tabindex || e.attr("tabindex", "-1");
                var p = this;
                this.cellClickHandler = function () {
                    var e = this;
                    this.hasAttribute("data-timestamp") && n.$apply(function () {
                        var t = Number(e.getAttribute("data-timestamp"));
                        p.setNgModelValue(p.dateUtil.createDateAtMidnight(t))
                    })
                }, this.attachCalendarEventListeners()
            }

            t.module("material.components.datepicker", ["material.core", "material.components.icon", "material.components.virtualRepeat"]).directive("mdCalendar", e);
            var o = 265, r = 45, i = "md-calendar-selected-date", a = "md-focus", d = 0;
            n.$inject = ["$element", "$attrs", "$scope", "$animate", "$q", "$mdConstant", "$mdTheming", "$$mdDateUtil", "$mdDateLocale", "$mdInkRipple", "$mdUtil"], n.prototype.configureNgModel = function (e) {
                this.ngModelCtrl = e;
                var t = this;
                e.$render = function () {
                    t.changeSelectedDate(t.ngModelCtrl.$viewValue)
                }
            }, n.prototype.buildInitialCalendarDisplay = function () {
                this.buildWeekHeader(), this.hideVerticalScrollbar(), this.displayDate = this.selectedDate || this.today, this.isInitialized = !0
            }, n.prototype.hideVerticalScrollbar = function () {
                var e = this.$element[0], t = e.querySelector(".md-calendar-scroll-mask"), n = this.calendarScroller, o = e.querySelector(".md-calendar-day-header").clientWidth, r = n.offsetWidth - n.clientWidth;
                t.style.width = o + "px", n.style.width = o + r + "px", n.style.paddingRight = r + "px"
            }, n.prototype.attachCalendarEventListeners = function () {
                this.$element.on("keydown", t.bind(this, this.handleKeyEvent))
            }, n.prototype.handleKeyEvent = function (e) {
                var t = this;
                this.$scope.$apply(function () {
                    if (e.which == t.keyCode.ESCAPE || e.which == t.keyCode.TAB)return t.$scope.$emit("md-calendar-close"), void(e.which == t.keyCode.TAB && e.preventDefault());
                    if (e.which === t.keyCode.ENTER)return t.setNgModelValue(t.displayDate), void e.preventDefault();
                    var n = t.getFocusDateFromKeyEvent(e);
                    n && (n = t.boundDateByMinAndMax(n), e.preventDefault(), e.stopPropagation(), t.changeDisplayDate(n).then(function () {
                        t.focus(n)
                    }))
                })
            }, n.prototype.getFocusDateFromKeyEvent = function (e) {
                var t = this.dateUtil, n = this.keyCode;
                switch (e.which) {
                    case n.RIGHT_ARROW:
                        return t.incrementDays(this.displayDate, 1);
                    case n.LEFT_ARROW:
                        return t.incrementDays(this.displayDate, -1);
                    case n.DOWN_ARROW:
                        return e.metaKey ? t.incrementMonths(this.displayDate, 1) : t.incrementDays(this.displayDate, 7);
                    case n.UP_ARROW:
                        return e.metaKey ? t.incrementMonths(this.displayDate, -1) : t.incrementDays(this.displayDate, -7);
                    case n.PAGE_DOWN:
                        return t.incrementMonths(this.displayDate, 1);
                    case n.PAGE_UP:
                        return t.incrementMonths(this.displayDate, -1);
                    case n.HOME:
                        return t.getFirstDateOfMonth(this.displayDate);
                    case n.END:
                        return t.getLastDateOfMonth(this.displayDate);
                    default:
                        return null
                }
            }, n.prototype.getSelectedMonthIndex = function () {
                return this.dateUtil.getMonthDistance(this.firstRenderableDate, this.selectedDate || this.today)
            }, n.prototype.scrollToMonth = function (e) {
                if (this.dateUtil.isValidDate(e)) {
                    var t = this.dateUtil.getMonthDistance(this.firstRenderableDate, e);
                    this.calendarScroller.scrollTop = t * o
                }
            }, n.prototype.setNgModelValue = function (e) {
                this.$scope.$emit("md-calendar-change", e), this.ngModelCtrl.$setViewValue(e), this.ngModelCtrl.$render()
            }, n.prototype.focus = function (e) {
                var t = e || this.selectedDate || this.today, n = this.calendarElement.querySelector(".md-focus");
                n && n.classList.remove(a);
                var o = this.getDateId(t), r = document.getElementById(o);
                r ? (r.classList.add(a), r.focus()) : this.focusDate = t
            }, n.prototype.boundDateByMinAndMax = function (e) {
                var t = e;
                return this.minDate && e < this.minDate && (t = new Date(this.minDate.getTime())), this.maxDate && e > this.maxDate && (t = new Date(this.maxDate.getTime())), t
            }, n.prototype.changeSelectedDate = function (e) {
                var t = this, n = this.selectedDate;
                this.selectedDate = e, this.changeDisplayDate(e).then(function () {
                    if (n) {
                        var o = document.getElementById(t.getDateId(n));
                        o && (o.classList.remove(i), o.setAttribute("aria-selected", "false"))
                    }
                    if (e) {
                        var r = document.getElementById(t.getDateId(e));
                        r && (r.classList.add(i), r.setAttribute("aria-selected", "true"))
                    }
                })
            }, n.prototype.changeDisplayDate = function (e) {
                if (!this.isInitialized)return this.buildInitialCalendarDisplay(), this.$q.when();
                if (!this.dateUtil.isValidDate(e) || this.isMonthTransitionInProgress)return this.$q.when();
                this.isMonthTransitionInProgress = !0;
                var t = this.animateDateChange(e);
                this.displayDate = e;
                var n = this;
                return t.then(function () {
                    n.isMonthTransitionInProgress = !1
                }), t
            }, n.prototype.animateDateChange = function (e) {
                return this.scrollToMonth(e), this.$q.when()
            }, n.prototype.buildWeekHeader = function () {
                for (var e = this.dateLocale.firstDayOfWeek, t = this.dateLocale.shortDays, n = document.createElement("tr"), o = 0; 7 > o; o++) {
                    var r = document.createElement("th");
                    r.textContent = t[(o + e) % 7], n.appendChild(r)
                }
                this.$element.find("thead").append(n)
            }, n.prototype.getDateId = function (e) {
                return ["md", this.id, e.getFullYear(), e.getMonth(), e.getDate()].join("-")
            }
        }()
    }(), function () {
        !function () {
            function e() {
                return {
                    require: ["^^mdCalendar", "mdCalendarMonth"],
                    scope: {offset: "=mdMonthOffset"},
                    controller: n,
                    controllerAs: "mdMonthCtrl",
                    bindToController: !0,
                    link: function (e, t, n, o) {
                        var r = o[0], i = o[1];
                        i.calendarCtrl = r, i.generateContent(), e.$watch(function () {
                            return i.offset
                        }, function (e, t) {
                            e != t && i.generateContent()
                        })
                    }
                }
            }

            function n(e, t, n) {
                this.dateUtil = t, this.dateLocale = n, this.$element = e, this.calendarCtrl = null, this.offset, this.focusAfterAppend = null
            }

            t.module("material.components.datepicker").directive("mdCalendarMonth", e);
            var o = "md-calendar-date-today", r = "md-calendar-selected-date", i = "md-focus";
            n.$inject = ["$element", "$$mdDateUtil", "$mdDateLocale"], n.prototype.generateContent = function () {
                var e = this.calendarCtrl, t = this.dateUtil.incrementMonths(e.firstRenderableDate, this.offset);
                this.$element.empty(), this.$element.append(this.buildCalendarForMonth(t)), this.focusAfterAppend && (this.focusAfterAppend.classList.add(i), this.focusAfterAppend.focus(), this.focusAfterAppend = null)
            }, n.prototype.buildDateCell = function (e) {
                var t = this.calendarCtrl, n = document.createElement("td");
                if (n.tabIndex = -1, n.classList.add("md-calendar-date"), n.setAttribute("role", "gridcell"), e) {
                    n.setAttribute("tabindex", "-1"), n.setAttribute("aria-label", this.dateLocale.longDateFormatter(e)), n.id = t.getDateId(e), n.setAttribute("data-timestamp", e.getTime()), this.dateUtil.isSameDay(e, t.today) && n.classList.add(o), this.dateUtil.isValidDate(t.selectedDate) && this.dateUtil.isSameDay(e, t.selectedDate) && (n.classList.add(r), n.setAttribute("aria-selected", "true"));
                    var i = this.dateLocale.dates[e.getDate()];
                    if (this.isDateEnabled(e)) {
                        var a = document.createElement("span");
                        n.appendChild(a), a.classList.add("md-calendar-date-selection-indicator"), a.textContent = i, n.addEventListener("click", t.cellClickHandler), t.focusDate && this.dateUtil.isSameDay(e, t.focusDate) && (this.focusAfterAppend = n)
                    } else n.classList.add("md-calendar-date-disabled"), n.textContent = i
                }
                return n
            }, n.prototype.isDateEnabled = function (e) {
                return this.dateUtil.isDateWithinRange(e, this.calendarCtrl.minDate, this.calendarCtrl.maxDate) && (!t.isFunction(this.calendarCtrl.dateFilter) || this.calendarCtrl.dateFilter(e))
            }, n.prototype.buildDateRow = function (e) {
                var t = document.createElement("tr");
                return t.setAttribute("role", "row"), t.setAttribute("aria-label", this.dateLocale.weekNumberFormatter(e)), t
            }, n.prototype.buildCalendarForMonth = function (e) {
                var t = this.dateUtil.isValidDate(e) ? e : new Date, n = this.dateUtil.getFirstDateOfMonth(t), o = this.getLocaleDay_(n), r = this.dateUtil.getNumberOfDaysInMonth(t), i = document.createDocumentFragment(), a = 1, d = this.buildDateRow(a);
                i.appendChild(d);
                var c = this.offset === this.calendarCtrl.items.length - 1, s = 0, l = document.createElement("td");
                if (l.classList.add("md-calendar-month-label"), this.calendarCtrl.maxDate && n > this.calendarCtrl.maxDate && l.classList.add("md-calendar-month-label-disabled"), l.textContent = this.dateLocale.monthHeaderFormatter(t), 2 >= o) {
                    l.setAttribute("colspan", "7");
                    var m = this.buildDateRow();
                    if (m.appendChild(l), i.insertBefore(m, d), c)return i
                } else s = 2, l.setAttribute("colspan", "2"), d.appendChild(l);
                for (var u = s; o > u; u++)d.appendChild(this.buildDateCell());
                for (var p = o, h = n, f = 1; r >= f; f++) {
                    if (7 === p) {
                        if (c)return i;
                        p = 0, a++, d = this.buildDateRow(a), i.appendChild(d)
                    }
                    h.setDate(f);
                    var g = this.buildDateCell(h);
                    d.appendChild(g), p++
                }
                for (; d.childNodes.length < 7;)d.appendChild(this.buildDateCell());
                for (; i.childNodes.length < 6;) {
                    for (var b = this.buildDateRow(), u = 0; 7 > u; u++)b.appendChild(this.buildDateCell());
                    i.appendChild(b)
                }
                return i
            }, n.prototype.getLocaleDay_ = function (e) {
                return (e.getDay() + (7 - this.dateLocale.firstDayOfWeek)) % 7
            }
        }()
    }(), function () {
        !function () {
            t.module("material.components.datepicker").config(["$provide", function (e) {
                function t() {
                    this.months = null, this.shortMonths = null, this.days = null, this.shortDays = null, this.dates = null, this.firstDayOfWeek = 0, this.formatDate = null, this.parseDate = null, this.monthHeaderFormatter = null, this.weekNumberFormatter = null, this.longDateFormatter = null, this.msgCalendar = "", this.msgOpenCalendar = ""
                }

                t.prototype.$get = function (e) {
                    function t(e) {
                        if (!e)return "";
                        var t = e.toLocaleTimeString(), n = e;
                        return 0 != e.getHours() || -1 === t.indexOf("11:") && -1 === t.indexOf("23:") || (n = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 1, 0, 0)), n.toLocaleDateString()
                    }

                    function n(e) {
                        return new Date(e)
                    }

                    function o(e) {
                        e = e.trim();
                        var t = /^(([a-zA-Z]{3,}|[0-9]{1,4})([ \.,]+|[\/\-])){2}([a-zA-Z]{3,}|[0-9]{1,4})$/;
                        return t.test(e)
                    }

                    function r(e) {
                        return u.shortMonths[e.getMonth()] + " " + e.getFullYear()
                    }

                    function i(e) {
                        return "Week " + e
                    }

                    function a(e) {
                        return [u.days[e.getDay()], u.months[e.getMonth()], u.dates[e.getDate()], e.getFullYear()].join(" ")
                    }

                    for (var d = e.DATETIME_FORMATS.DAY.map(function (e) {
                        return e[0]
                    }), c = Array(32), s = 1; 31 >= s; s++)c[s] = s;
                    var l = "Calendar", m = "Open calendar", u = {
                        months: this.months || e.DATETIME_FORMATS.MONTH,
                        shortMonths: this.shortMonths || e.DATETIME_FORMATS.SHORTMONTH,
                        days: this.days || e.DATETIME_FORMATS.DAY,
                        shortDays: this.shortDays || d,
                        dates: this.dates || c,
                        firstDayOfWeek: this.firstDayOfWeek || 0,
                        formatDate: this.formatDate || t,
                        parseDate: this.parseDate || n,
                        isDateComplete: this.isDateComplete || o,
                        monthHeaderFormatter: this.monthHeaderFormatter || r,
                        weekNumberFormatter: this.weekNumberFormatter || i,
                        longDateFormatter: this.longDateFormatter || a,
                        msgCalendar: this.msgCalendar || l,
                        msgOpenCalendar: this.msgOpenCalendar || m
                    };
                    return u
                }, t.prototype.$get.$inject = ["$locale"], e.provider("$mdDateLocale", new t)
            }])
        }()
    }(), function () {
        !function () {
            function n() {
                return {
                    template: '<md-button class="md-datepicker-button md-icon-button" type="button" tabindex="-1" aria-hidden="true" ng-click="ctrl.openCalendarPane($event)"><md-icon class="md-datepicker-calendar-icon" md-svg-icon="md-calendar"></md-icon></md-button><div class="md-datepicker-input-container" ng-class="{\'md-datepicker-focused\': ctrl.isFocused}"><input class="md-datepicker-input" aria-haspopup="true" ng-focus="ctrl.setFocused(true)" ng-blur="ctrl.setFocused(false)"><md-button type="button" md-no-ink class="md-datepicker-triangle-button md-icon-button" ng-click="ctrl.openCalendarPane($event)" aria-label="{{::ctrl.dateLocale.msgOpenCalendar}}"><div class="md-datepicker-expand-triangle"></div></md-button></div><div class="md-datepicker-calendar-pane md-whiteframe-z1"><div class="md-datepicker-input-mask"><div class="md-datepicker-input-mask-opaque"></div></div><div class="md-datepicker-calendar"><md-calendar role="dialog" aria-label="{{::ctrl.dateLocale.msgCalendar}}" md-min-date="ctrl.minDate" md-max-date="ctrl.maxDate"md-date-filter="ctrl.dateFilter"ng-model="ctrl.date" ng-if="ctrl.isCalendarOpen"></md-calendar></div></div>',
                    require: ["ngModel", "mdDatepicker", "?^mdInputContainer"],
                    scope: {
                        minDate: "=mdMinDate",
                        maxDate: "=mdMaxDate",
                        placeholder: "@mdPlaceholder",
                        dateFilter: "=mdDateFilter"
                    },
                    controller: o,
                    controllerAs: "ctrl",
                    bindToController: !0,
                    link: function (e, t, n, o) {
                        var r = o[0], i = o[1], a = o[2];
                        if (a)throw Error("md-datepicker should not be placed inside md-input-container.");
                        i.configureNgModel(r)
                    }
                }
            }

            function o(e, n, o, r, i, a, d, c, s, l, m, u) {
                this.$compile = r, this.$timeout = i, this.$window = a, this.dateLocale = l, this.dateUtil = m, this.$mdConstant = d, this.$mdUtil = s, this.$$rAF = u, this.documentElement = t.element(document.documentElement), this.ngModelCtrl = null, this.inputElement = n[0].querySelector("input"), this.ngInputElement = t.element(this.inputElement), this.inputContainer = n[0].querySelector(".md-datepicker-input-container"), this.calendarPane = n[0].querySelector(".md-datepicker-calendar-pane"), this.calendarButton = n[0].querySelector(".md-datepicker-button"), this.inputMask = n[0].querySelector(".md-datepicker-input-mask-opaque"), this.$element = n, this.$attrs = o, this.$scope = e, this.date = null, this.isFocused = !1, this.isDisabled, this.setDisabled(n[0].disabled || t.isString(o.disabled)), this.isCalendarOpen = !1, this.calendarPaneOpenedFrom = null, this.calendarPane.id = "md-date-pane" + s.nextUid(), c(n), this.bodyClickHandler = t.bind(this, this.handleBodyClick), this.windowResizeHandler = s.debounce(t.bind(this, this.closeCalendarPane), 100), o.tabindex || n.attr("tabindex", "-1"), this.installPropertyInterceptors(), this.attachChangeListeners(), this.attachInteractionListeners();
                var p = this;
                e.$on("$destroy", function () {
                    p.detachCalendarPane()
                })
            }

            t.module("material.components.datepicker").directive("mdDatepicker", n);
            var r = 3, i = "md-datepicker-invalid", a = 500, d = 368, c = 360;
            o.$inject = ["$scope", "$element", "$attrs", "$compile", "$timeout", "$window", "$mdConstant", "$mdTheming", "$mdUtil", "$mdDateLocale", "$$mdDateUtil", "$$rAF"], o.prototype.configureNgModel = function (e) {
                this.ngModelCtrl = e;
                var t = this;
                e.$render = function () {
                    var e = t.ngModelCtrl.$viewValue;
                    if (e && !(e instanceof Date))throw Error("The ng-model for md-datepicker must be a Date instance. Currently the model is a: " + typeof e);
                    t.date = e, t.inputElement.value = t.dateLocale.formatDate(e), t.resizeInputElement(), t.updateErrorState()
                }
            }, o.prototype.attachChangeListeners = function () {
                var e = this;
                e.$scope.$on("md-calendar-change", function (t, n) {
                    e.ngModelCtrl.$setViewValue(n), e.date = n, e.inputElement.value = e.dateLocale.formatDate(n), e.closeCalendarPane(), e.resizeInputElement(), e.updateErrorState()
                }), e.ngInputElement.on("input", t.bind(e, e.resizeInputElement)), e.ngInputElement.on("input", e.$mdUtil.debounce(e.handleInputEvent, a, e))
            }, o.prototype.attachInteractionListeners = function () {
                var e = this, t = this.$scope, n = this.$mdConstant.KEY_CODE;
                e.ngInputElement.on("keydown", function (o) {
                    o.altKey && o.keyCode == n.DOWN_ARROW && (e.openCalendarPane(o), t.$digest())
                }), t.$on("md-calendar-close", function () {
                    e.closeCalendarPane()
                })
            }, o.prototype.installPropertyInterceptors = function () {
                var e = this;
                if (this.$attrs.ngDisabled) {
                    var t = this.$mdUtil.validateScope(this.$element) ? this.$element.scope() : null;
                    t && t.$watch(this.$attrs.ngDisabled, function (t) {
                        e.setDisabled(t)
                    })
                }
                Object.defineProperty(this, "placeholder", {
                    get: function () {
                        return e.inputElement.placeholder
                    }, set: function (t) {
                        e.inputElement.placeholder = t || ""
                    }
                })
            }, o.prototype.setDisabled = function (e) {
                this.isDisabled = e, this.inputElement.disabled = e, this.calendarButton.disabled = e
            }, o.prototype.updateErrorState = function (e) {
                var n = e || this.date;
                this.clearErrorState(), this.dateUtil.isValidDate(n) ? (this.dateUtil.isValidDate(this.minDate) && this.ngModelCtrl.$setValidity("mindate", n >= this.minDate), this.dateUtil.isValidDate(this.maxDate) && this.ngModelCtrl.$setValidity("maxdate", n <= this.maxDate), t.isFunction(this.dateFilter) && this.ngModelCtrl.$setValidity("filtered", this.dateFilter(n))) : this.ngModelCtrl.$setValidity("valid", null == n), this.ngModelCtrl.$valid || this.inputContainer.classList.add(i)
            }, o.prototype.clearErrorState = function () {
                this.inputContainer.classList.remove(i), ["mindate", "maxdate", "filtered", "valid"].forEach(function (e) {
                    this.ngModelCtrl.$setValidity(e, !0)
                }, this)
            }, o.prototype.resizeInputElement = function () {
                this.inputElement.size = this.inputElement.value.length + r
            }, o.prototype.handleInputEvent = function () {
                var e = this.inputElement.value, t = e ? this.dateLocale.parseDate(e) : null;
                this.dateUtil.setDateTimeToMidnight(t);
                var n = "" == e || this.dateUtil.isValidDate(t) && this.dateLocale.isDateComplete(e) && this.isDateEnabled(t);
                n && (this.ngModelCtrl.$setViewValue(t), this.date = t), this.updateErrorState(t)
            }, o.prototype.isDateEnabled = function (e) {
                return this.dateUtil.isDateWithinRange(e, this.minDate, this.maxDate) && (!t.isFunction(this.dateFilter) || this.dateFilter(e))
            }, o.prototype.attachCalendarPane = function () {
                var e = this.calendarPane;
                e.style.transform = "", this.$element.addClass("md-datepicker-open");
                var t = this.inputContainer.getBoundingClientRect(), n = document.body.getBoundingClientRect(), o = t.top - n.top, r = t.left - n.left, i = n.top < 0 && 0 == document.body.scrollTop ? -n.top : document.body.scrollTop, a = n.left < 0 && 0 == document.body.scrollLeft ? -n.left : document.body.scrollLeft, s = i + this.$window.innerHeight, l = a + this.$window.innerWidth;
                if (r + c > l) {
                    if (l - c > 0)r = l - c; else {
                        r = a;
                        var m = this.$window.innerWidth / c;
                        e.style.transform = "scale(" + m + ")"
                    }
                    e.classList.add("md-datepicker-pos-adjusted")
                }
                o + d > s && s - d > i && (o = s - d, e.classList.add("md-datepicker-pos-adjusted")), e.style.left = r + "px", e.style.top = o + "px", document.body.appendChild(e), this.inputMask.style.left = t.width + "px", this.$$rAF(function () {
                    e.classList.add("md-pane-open")
                })
            }, o.prototype.detachCalendarPane = function () {
                this.$element.removeClass("md-datepicker-open"), this.calendarPane.classList.remove("md-pane-open"), this.calendarPane.classList.remove("md-datepicker-pos-adjusted"), this.calendarPane.parentNode && this.calendarPane.parentNode.removeChild(this.calendarPane)
            }, o.prototype.openCalendarPane = function (t) {
                if (!this.isCalendarOpen && !this.isDisabled) {
                    this.isCalendarOpen = !0, this.calendarPaneOpenedFrom = t.target, this.$mdUtil.disableScrollAround(this.calendarPane), this.attachCalendarPane(), this.focusCalendar();
                    var n = this;
                    this.$mdUtil.nextTick(function () {
                        n.documentElement.on("click touchstart", n.bodyClickHandler)
                    }, !1), e.addEventListener("resize", this.windowResizeHandler)
                }
            }, o.prototype.closeCalendarPane = function () {
                this.isCalendarOpen && (this.isCalendarOpen = !1, this.detachCalendarPane(), this.calendarPaneOpenedFrom.focus(), this.calendarPaneOpenedFrom = null, this.$mdUtil.enableScrolling(), this.documentElement.off("click touchstart", this.bodyClickHandler), e.removeEventListener("resize", this.windowResizeHandler))
            }, o.prototype.getCalendarCtrl = function () {
                return t.element(this.calendarPane.querySelector("md-calendar")).controller("mdCalendar")
            }, o.prototype.focusCalendar = function () {
                var e = this;
                this.$mdUtil.nextTick(function () {
                    e.getCalendarCtrl().focus()
                }, !1)
            }, o.prototype.setFocused = function (e) {
                this.isFocused = e
            }, o.prototype.handleBodyClick = function (e) {
                if (this.isCalendarOpen) {
                    var t = this.$mdUtil.getClosest(e.target, "md-calendar");
                    t || this.closeCalendarPane(), this.$scope.$digest()
                }
            }
        }()
    }(), function () {
        !function () {
            t.module("material.components.datepicker").factory("$$mdDateUtil", function () {
                function e(e) {
                    return new Date(e.getFullYear(), e.getMonth(), 1)
                }

                function n(e) {
                    return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate()
                }

                function o(e) {
                    return new Date(e.getFullYear(), e.getMonth() + 1, 1)
                }

                function r(e) {
                    return new Date(e.getFullYear(), e.getMonth() - 1, 1)
                }

                function i(e, t) {
                    return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth()
                }

                function a(e, t) {
                    return e.getDate() == t.getDate() && i(e, t)
                }

                function d(e, t) {
                    var n = o(e);
                    return i(n, t)
                }

                function c(e, t) {
                    var n = r(e);
                    return i(t, n)
                }

                function s(e, t) {
                    return b((e.getTime() + t.getTime()) / 2)
                }

                function l(t) {
                    var n = e(t);
                    return Math.floor((n.getDay() + t.getDate() - 1) / 7)
                }

                function m(e, t) {
                    return new Date(e.getFullYear(), e.getMonth(), e.getDate() + t)
                }

                function u(e, t) {
                    var o = new Date(e.getFullYear(), e.getMonth() + t, 1), r = n(o);
                    return r < e.getDate() ? o.setDate(r) : o.setDate(e.getDate()), o
                }

                function p(e, t) {
                    return 12 * (t.getFullYear() - e.getFullYear()) + (t.getMonth() - e.getMonth())
                }

                function h(e) {
                    return new Date(e.getFullYear(), e.getMonth(), n(e))
                }

                function f(e) {
                    return null != e && e.getTime && !isNaN(e.getTime())
                }

                function g(e) {
                    f(e) && e.setHours(0, 0, 0, 0)
                }

                function b(e) {
                    var n;
                    return n = t.isUndefined(e) ? new Date : new Date(e), g(n), n
                }

                function E(e, n, o) {
                    return (!t.isDate(n) || e >= n) && (!t.isDate(o) || o >= e)
                }

                return {
                    getFirstDateOfMonth: e,
                    getNumberOfDaysInMonth: n,
                    getDateInNextMonth: o,
                    getDateInPreviousMonth: r,
                    isInNextMonth: d,
                    isInPreviousMonth: c,
                    getDateMidpoint: s,
                    isSameMonthAndYear: i,
                    getWeekOfMonth: l,
                    incrementDays: m,
                    incrementMonths: u,
                    getLastDateOfMonth: h,
                    isSameDay: a,
                    getMonthDistance: p,
                    isValidDate: f,
                    setDateTimeToMidnight: g,
                    createDateAtMidnight: b,
                    isDateWithinRange: E
                }
            })
        }()
    }(), function () {
        function e(e) {
            return {restrict: "E", link: e}
        }

        t.module("material.components.divider", ["material.core"]).directive("mdDivider", e), e.$inject = ["$mdTheming"]
    }(), function () {
        !function () {
            function e() {
                return {
                    restrict: "E", require: ["^?mdFabSpeedDial", "^?mdFabToolbar"], compile: function (e, n) {
                        var o = e.children(), r = !1;
                        t.forEach(["", "data-", "x-"], function (e) {
                            r = r || (o.attr(e + "ng-repeat") ? !0 : !1)
                        }), r ? o.addClass("md-fab-action-item") : o.wrap('<div class="md-fab-action-item">')
                    }
                }
            }

            t.module("material.components.fabActions", ["material.core"]).directive("mdFabActions", e)
        }()
    }(), function () {
        !function () {
            function e(e, n, o, r, i, a) {
                function d() {
                    _.direction = _.direction || "down", _.isOpen = _.isOpen || !1, l(), n.addClass("md-animations-waiting")
                }

                function c() {
                    var o = ["click", "focusin", "focusout"];
                    t.forEach(o, function (e) {
                        n.on(e, s)
                    }), e.$on("$destroy", function () {
                        t.forEach(o, function (e) {
                            n.off(e, s)
                        }), h()
                    })
                }

                function s(e) {
                    "click" == e.type && k(e), "focusout" != e.type || S || (S = a(function () {
                        _.close()
                    }, 100, !1)), "focusin" == e.type && S && (a.cancel(S), S = null)
                }

                function l() {
                    _.currentActionIndex = -1
                }

                function m() {
                    e.$watch("vm.direction", function (e, t) {
                        o.removeClass(n, "md-" + t), o.addClass(n, "md-" + e), l()
                    });
                    var t, r;
                    e.$watch("vm.isOpen", function (e) {
                        l(), t && r || (t = x(), r = N()), e ? p() : h();
                        var i = e ? "md-is-open" : "", a = e ? "" : "md-is-open";
                        t.attr("aria-haspopup", !0), t.attr("aria-expanded", e), r.attr("aria-hidden", !e), o.setClass(n, i, a)
                    })
                }

                function u() {
                    n[0].scrollHeight > 0 ? o.addClass(n, "md-animations-ready").then(function () {
                        n.removeClass("md-animations-waiting")
                    }) : 10 > H && (a(u, 100), H += 1)
                }

                function p() {
                    n.on("keydown", g), r.nextTick(function () {
                        t.element(document).on("click touchend", f)
                    })
                }

                function h() {
                    n.off("keydown", g), t.element(document).off("click touchend", f)
                }

                function f(e) {
                    if (e.target) {
                        var t = r.getClosest(e.target, "md-fab-trigger"), n = r.getClosest(e.target, "md-fab-actions");
                        t || n || _.close()
                    }
                }

                function g(e) {
                    switch (e.which) {
                        case i.KEY_CODE.ESCAPE:
                            return _.close(), e.preventDefault(), !1;
                        case i.KEY_CODE.LEFT_ARROW:
                            return $(e), !1;
                        case i.KEY_CODE.UP_ARROW:
                            return y(e), !1;
                        case i.KEY_CODE.RIGHT_ARROW:
                            return C(e), !1;
                        case i.KEY_CODE.DOWN_ARROW:
                            return A(e), !1
                    }
                }

                function b(e) {
                    v(e, -1)
                }

                function E(e) {
                    v(e, 1)
                }

                function v(e, n) {
                    var o = M();
                    _.currentActionIndex = _.currentActionIndex + n, _.currentActionIndex = Math.min(o.length - 1, _.currentActionIndex), _.currentActionIndex = Math.max(0, _.currentActionIndex);
                    var r = t.element(o[_.currentActionIndex]).children()[0];
                    t.element(r).attr("tabindex", 0), r.focus(), e.preventDefault(), e.stopImmediatePropagation()
                }

                function M() {
                    var e = N()[0].querySelectorAll(".md-fab-action-item");
                    return t.forEach(e, function (e) {
                        t.element(t.element(e).children()[0]).attr("tabindex", -1)
                    }), e
                }

                function $(e) {
                    "left" === _.direction ? E(e) : b(e)
                }

                function y(e) {
                    "down" === _.direction ? b(e) : E(e)
                }

                function C(e) {
                    "left" === _.direction ? b(e) : E(e)
                }

                function A(e) {
                    "up" === _.direction ? b(e) : E(e)
                }

                function T(e) {
                    return r.getClosest(e, "md-fab-trigger")
                }

                function w(e) {
                    return r.getClosest(e, "md-fab-actions")
                }

                function k(e) {
                    T(e.target) && _.toggle(), w(e.target) && _.close()
                }

                function x() {
                    return n.find("md-fab-trigger")
                }

                function N() {
                    return n.find("md-fab-actions")
                }

                var _ = this;
                _.open = function () {
                    e.$evalAsync("vm.isOpen = true")
                }, _.close = function () {
                    e.$evalAsync("vm.isOpen = false"), n.find("md-fab-trigger")[0].focus()
                }, _.toggle = function () {
                    e.$evalAsync("vm.isOpen = !vm.isOpen")
                }, d(), c(), m();
                var H = 0;
                u();
                var S
            }

            t.module("material.components.fabShared", ["material.core"]).controller("FabController", e), e.$inject = ["$scope", "$element", "$animate", "$mdUtil", "$mdConstant", "$timeout"]
        }()
    }(), function () {
        !function () {
            function n() {
                function e(e, t) {
                    t.prepend('<div class="md-css-variables"></div>')
                }

                return {
                    restrict: "E",
                    scope: {direction: "@?mdDirection", isOpen: "=?mdOpen"},
                    bindToController: !0,
                    controller: "FabController",
                    controllerAs: "vm",
                    link: e
                }
            }

            function o(n) {
                function o(e) {
                    n(e, i, !1)
                }

                function r(n) {
                    if (!n.hasClass("md-animations-waiting") || n.hasClass("md-animations-ready")) {
                        var o = n[0], r = n.controller("mdFabSpeedDial"), i = o.querySelectorAll(".md-fab-action-item"), a = o.querySelector("md-fab-trigger"), d = o.querySelector(".md-css-variables"), c = parseInt(e.getComputedStyle(d).zIndex);
                        t.forEach(i, function (e, t) {
                            var n = e.style;
                            n.transform = n.webkitTransform = "", n.transitionDelay = "", n.opacity = 1, n.zIndex = i.length - t + c
                        }), a.style.zIndex = c + i.length + 1, r.isOpen || t.forEach(i, function (e, t) {
                            var n, o, i = e.style, d = (a.clientHeight - e.clientHeight) / 2, c = (a.clientWidth - e.clientWidth) / 2;
                            switch (r.direction) {
                                case"up":
                                    n = e.scrollHeight * (t + 1) + d, o = "Y";
                                    break;
                                case"down":
                                    n = -(e.scrollHeight * (t + 1) + d), o = "Y";
                                    break;
                                case"left":
                                    n = e.scrollWidth * (t + 1) + c, o = "X";
                                    break;
                                case"right":
                                    n = -(e.scrollWidth * (t + 1) + c), o = "X"
                            }
                            var s = "translate" + o + "(" + n + "px)";
                            i.transform = i.webkitTransform = s
                        })
                    }
                }

                return {
                    addClass: function (e, t, n) {
                        e.hasClass("md-fling") ? (r(e), o(n)) : n()
                    }, removeClass: function (e, t, n) {
                        r(e), o(n)
                    }
                }
            }

            function r(n) {
                function o(e) {
                    n(e, i, !1)
                }

                function r(n) {
                    var o = n[0], r = n.controller("mdFabSpeedDial"), i = o.querySelectorAll(".md-fab-action-item"), d = o.querySelector(".md-css-variables"), c = parseInt(e.getComputedStyle(d).zIndex);
                    t.forEach(i, function (e, t) {
                        var n = e.style, o = t * a;
                        n.opacity = r.isOpen ? 1 : 0, n.transform = n.webkitTransform = r.isOpen ? "scale(1)" : "scale(0.1)", n.transitionDelay = (r.isOpen ? o : i.length - o) + "ms", n.zIndex = i.length - t + c
                    })
                }

                var a = 65;
                return {
                    addClass: function (e, t, n) {
                        r(e), o(n)
                    }, removeClass: function (e, t, n) {
                        r(e), o(n)
                    }
                }
            }

            var i = 300;
            t.module("material.components.fabSpeedDial", ["material.core", "material.components.fabShared", "material.components.fabTrigger", "material.components.fabActions"]).directive("mdFabSpeedDial", n).animation(".md-fling", o).animation(".md-scale", r).service("mdFabSpeedDialFlingAnimation", o).service("mdFabSpeedDialScaleAnimation", r), o.$inject = ["$timeout"], r.$inject = ["$timeout"]
        }()
    }(), function () {
        !function () {
            function n() {
                function e(e, t, n) {
                    t.addClass("md-fab-toolbar"), t.find("md-fab-trigger").find("button").prepend('<div class="md-fab-toolbar-background"></div>')
                }

                return {
                    restrict: "E",
                    transclude: !0,
                    template: '<div class="md-fab-toolbar-wrapper">  <div class="md-fab-toolbar-content" ng-transclude></div></div>',
                    scope: {direction: "@?mdDirection", isOpen: "=?mdOpen"},
                    bindToController: !0,
                    controller: "FabController",
                    controllerAs: "vm",
                    link: e
                }
            }

            function o() {
                function n(n, o, r) {
                    if (o) {
                        var i = n[0], a = n.controller("mdFabToolbar"), d = i.querySelector(".md-fab-toolbar-background"), c = i.querySelector("md-fab-trigger button"), s = i.querySelector("md-toolbar"), l = i.querySelector("md-fab-trigger button md-icon"), m = n.find("md-fab-actions").children();
                        if (c && d) {
                            var u = e.getComputedStyle(c).getPropertyValue("background-color"), p = i.offsetWidth, h = (i.offsetHeight, 2 * (p / c.offsetWidth));
                            d.style.backgroundColor = u, d.style.borderRadius = p + "px", a.isOpen ? (s.style.pointerEvents = "initial", d.style.width = c.offsetWidth + "px", d.style.height = c.offsetHeight + "px", d.style.transform = "scale(" + h + ")", d.style.transitionDelay = "0ms", l && (l.style.transitionDelay = ".3s"), t.forEach(m, function (e, t) {
                                e.style.transitionDelay = 25 * (m.length - t) + "ms"
                            })) : (s.style.pointerEvents = "none", d.style.transform = "scale(1)", d.style.top = "0", n.hasClass("md-right") && (d.style.left = "0", d.style.right = null), n.hasClass("md-left") && (d.style.right = "0", d.style.left = null), d.style.transitionDelay = "200ms", l && (l.style.transitionDelay = "0ms"), t.forEach(m, function (e, t) {
                                e.style.transitionDelay = 200 + 25 * t + "ms"
                            }))
                        }
                    }
                }

                return {
                    addClass: function (e, t, o) {
                        n(e, t, o), o()
                    }, removeClass: function (e, t, o) {
                        n(e, t, o), o()
                    }
                }
            }

            t.module("material.components.fabToolbar", ["material.core", "material.components.fabShared", "material.components.fabTrigger", "material.components.fabActions"]).directive("mdFabToolbar", n).animation(".md-fab-toolbar", o).service("mdFabToolbarAnimation", o)
        }()
    }(), function () {
        !function () {
            function e() {
                return {restrict: "E", require: ["^?mdFabSpeedDial", "^?mdFabToolbar"]}
            }

            t.module("material.components.fabTrigger", ["material.core"]).directive("mdFabTrigger", e)
        }()
    }(), function () {
        function e(e, o, r, i) {
            function a(n, a, d, c) {
                function s() {
                    for (var e in o.MEDIA)i(e), i.getQuery(o.MEDIA[e]).addListener(C);
                    return i.watchResponsiveAttributes(["md-cols", "md-row-height", "md-gutter"], d, m)
                }

                function l() {
                    c.layoutDelegate = t.noop, A();
                    for (var e in o.MEDIA)i.getQuery(o.MEDIA[e]).removeListener(C)
                }

                function m(e) {
                    null == e ? c.invalidateLayout() : i(e) && c.invalidateLayout()
                }

                function u(e) {
                    var o = g(), i = {tileSpans: b(o), colCount: E(), rowMode: $(), rowHeight: M(), gutter: v()};
                    if (e || !t.equals(i, T)) {
                        var d = r(i.colCount, i.tileSpans, o).map(function (e, n) {
                            return {
                                grid: {element: a, style: f(i.colCount, n, i.gutter, i.rowMode, i.rowHeight)},
                                tiles: e.map(function (e, r) {
                                    return {
                                        element: t.element(o[r]),
                                        style: h(e.position, e.spans, i.colCount, n, i.gutter, i.rowMode, i.rowHeight)
                                    }
                                })
                            }
                        }).reflow().performance();
                        n.mdOnLayout({$event: {performance: d}}), T = i
                    }
                }

                function p(e) {
                    return w + e + k
                }

                function h(e, t, n, o, r, i, a) {
                    var d = 1 / n * 100, c = (n - 1) / n, s = x({
                        share: d,
                        gutterShare: c,
                        gutter: r
                    }), l = {
                        left: N({unit: s, offset: e.col, gutter: r}),
                        width: _({unit: s, span: t.col, gutter: r}),
                        paddingTop: "",
                        marginTop: "",
                        top: "",
                        height: ""
                    };
                    switch (i) {
                        case"fixed":
                            l.top = N({unit: a, offset: e.row, gutter: r}), l.height = _({
                                unit: a,
                                span: t.row,
                                gutter: r
                            });
                            break;
                        case"ratio":
                            var m = d / a, u = x({share: m, gutterShare: c, gutter: r});
                            l.paddingTop = _({unit: u, span: t.row, gutter: r}), l.marginTop = N({
                                unit: u,
                                offset: e.row,
                                gutter: r
                            });
                            break;
                        case"fit":
                            var p = (o - 1) / o, m = 1 / o * 100, u = x({share: m, gutterShare: p, gutter: r});
                            l.top = N({unit: u, offset: e.row, gutter: r}), l.height = _({
                                unit: u,
                                span: t.row,
                                gutter: r
                            })
                    }
                    return l
                }

                function f(e, t, n, o, r) {
                    var i = {};
                    switch (o) {
                        case"fixed":
                            i.height = _({unit: r, span: t, gutter: n}), i.paddingBottom = "";
                            break;
                        case"ratio":
                            var a = 1 === e ? 0 : (e - 1) / e, d = 1 / e * 100, c = d * (1 / r), s = x({
                                share: c,
                                gutterShare: a,
                                gutter: n
                            });
                            i.height = "", i.paddingBottom = _({unit: s, span: t, gutter: n});
                            break;
                        case"fit":
                    }
                    return i
                }

                function g() {
                    return [].filter.call(a.children(), function (e) {
                        return "MD-GRID-TILE" == e.tagName && !e.$$mdDestroyed
                    })
                }

                function b(e) {
                    return [].map.call(e, function (e) {
                        var n = t.element(e).controller("mdGridTile");
                        return {
                            row: parseInt(i.getResponsiveAttribute(n.$attrs, "md-rowspan"), 10) || 1,
                            col: parseInt(i.getResponsiveAttribute(n.$attrs, "md-colspan"), 10) || 1
                        }
                    })
                }

                function E() {
                    var e = parseInt(i.getResponsiveAttribute(d, "md-cols"), 10);
                    if (isNaN(e))throw"md-grid-list: md-cols attribute was not found, or contained a non-numeric value";
                    return e
                }

                function v() {
                    return y(i.getResponsiveAttribute(d, "md-gutter") || 1)
                }

                function M() {
                    var e = i.getResponsiveAttribute(d, "md-row-height");
                    switch ($()) {
                        case"fixed":
                            return y(e);
                        case"ratio":
                            var t = e.split(":");
                            return parseFloat(t[0]) / parseFloat(t[1]);
                        case"fit":
                            return 0
                    }
                }

                function $() {
                    var e = i.getResponsiveAttribute(d, "md-row-height");
                    return "fit" == e ? "fit" : -1 !== e.indexOf(":") ? "ratio" : "fixed"
                }

                function y(e) {
                    return /\D$/.test(e) ? e : e + "px"
                }

                a.attr("role", "list"), c.layoutDelegate = u;
                var C = t.bind(c, c.invalidateLayout), A = s();
                n.$on("$destroy", l);
                var T, w = e.startSymbol(), k = e.endSymbol(), x = e(p("share") + "% - (" + p("gutter") + " * " + p("gutterShare") + ")"), N = e("calc((" + p("unit") + " + " + p("gutter") + ") * " + p("offset") + ")"), _ = e("calc((" + p("unit") + ") * " + p("span") + " + (" + p("span") + " - 1) * " + p("gutter") + ")")
            }

            return {restrict: "E", controller: n, scope: {mdOnLayout: "&"}, link: a}
        }

        function n(e) {
            this.layoutInvalidated = !1, this.tilesInvalidated = !1, this.$timeout_ = e.nextTick, this.layoutDelegate = t.noop
        }

        function o(e) {
            function n(t, n) {
                var o, a, d, c, s, l;
                return c = e.time(function () {
                    a = r(t, n)
                }), o = {
                    layoutInfo: function () {
                        return a
                    }, map: function (t) {
                        return s = e.time(function () {
                            var e = o.layoutInfo();
                            d = t(e.positioning, e.rowCount)
                        }), o
                    }, reflow: function (t) {
                        return l = e.time(function () {
                            var e = t || i;
                            e(d.grid, d.tiles)
                        }), o
                    }, performance: function () {
                        return {tileCount: n.length, layoutTime: c, mapTime: s, reflowTime: l, totalTime: c + s + l}
                    }
                }
            }

            function o(e, t) {
                e.element.css(e.style), t.forEach(function (e) {
                    e.element.css(e.style)
                })
            }

            function r(e, t) {
                function n(t, n) {
                    if (t.col > e)throw"md-grid-list: Tile at position " + n + " has a colspan (" + t.col + ") that exceeds the column count (" + e + ")";
                    for (var a = 0, l = 0; l - a < t.col;)d >= e ? o() : (a = s.indexOf(0, d), -1 !== a && -1 !== (l = i(a + 1)) ? d = l + 1 : (a = l = 0, o()));
                    return r(a, t.col, t.row), d = a + t.col, {col: a, row: c}
                }

                function o() {
                    d = 0, c++, r(0, e, -1)
                }

                function r(e, t, n) {
                    for (var o = e; e + t > o; o++)s[o] = Math.max(s[o] + n, 0)
                }

                function i(e) {
                    var t;
                    for (t = e; t < s.length; t++)if (0 !== s[t])return t;
                    return t === s.length ? t : void 0
                }

                function a() {
                    for (var t = [], n = 0; e > n; n++)t.push(0);
                    return t
                }

                var d = 0, c = 0, s = a();
                return {
                    positioning: t.map(function (e, t) {
                        return {spans: e, position: n(e, t)}
                    }), rowCount: c + Math.max.apply(Math, s)
                }
            }

            var i = o;
            return n.animateWith = function (e) {
                i = t.isFunction(e) ? e : o
            }, n
        }

        function r(e) {
            function n(n, o, r, i) {
                o.attr("role", "listitem");
                var a = e.watchResponsiveAttributes(["md-colspan", "md-rowspan"], r, t.bind(i, i.invalidateLayout));
                i.invalidateTiles(), n.$on("$destroy", function () {
                    o[0].$$mdDestroyed = !0, a(), i.invalidateLayout()
                }), t.isDefined(n.$parent.$index) && n.$watch(function () {
                    return n.$parent.$index
                }, function (e, t) {
                    e !== t && i.invalidateTiles()
                })
            }

            return {
                restrict: "E",
                require: "^mdGridList",
                template: "<figure ng-transclude></figure>",
                transclude: !0,
                scope: {},
                controller: ["$attrs", function (e) {
                    this.$attrs = e
                }],
                link: n
            }
        }

        function i() {
            return {template: "<figcaption ng-transclude></figcaption>", transclude: !0}
        }

        t.module("material.components.gridList", ["material.core"]).directive("mdGridList", e).directive("mdGridTile", r).directive("mdGridTileFooter", i).directive("mdGridTileHeader", i).factory("$mdGridLayout", o), e.$inject = ["$interpolate", "$mdConstant", "$mdGridLayout", "$mdMedia"], n.$inject = ["$mdUtil"], n.prototype = {
            invalidateTiles: function () {
                this.tilesInvalidated = !0, this.invalidateLayout()
            }, invalidateLayout: function () {
                this.layoutInvalidated || (this.layoutInvalidated = !0, this.$timeout_(t.bind(this, this.layout)))
            }, layout: function () {
                try {
                    this.layoutDelegate(this.tilesInvalidated)
                } finally {
                    this.layoutInvalidated = !1, this.tilesInvalidated = !1
                }
            }
        }, o.$inject = ["$mdUtil"], r.$inject = ["$mdMedia"]
    }(), function () {
        t.module("material.components.icon", ["material.core"])
    }(), function () {
        function e(e) {
            return {
                restrict: "E", compile: function (t) {
                    return t[0].setAttribute("role", "list"), e
                }
            }
        }

        function n(e, n, o, r) {
            var i = ["md-checkbox", "md-switch"];
            return {
                restrict: "E", controller: "MdListController", compile: function (a, d) {
                    function c() {
                        for (var e, t, n = ["md-switch", "md-checkbox"], o = 0; t = n[o]; ++o)if ((e = a.find(t)[0]) && !e.hasAttribute("aria-label")) {
                            var r = a.find("p")[0];
                            if (!r)return;
                            e.setAttribute("aria-label", "Toggle " + r.textContent)
                        }
                    }

                    function s(e) {
                        var n;
                        "div" == e ? (n = t.element('<div class="md-no-style md-list-item-inner">'), n.append(a.contents()), a.addClass("md-proxy-focus")) : (n = t.element('<md-button class="md-no-style"><div class="md-list-item-inner"></div></md-button>'), m(a[0], n[0]), n.children().eq(0).append(a.contents())), a[0].setAttribute("tabindex", "-1"), a.append(n)
                    }

                    function l() {
                        if (b && !p(b) && b.hasAttribute("ng-click")) {
                            e.expect(b, "aria-label");
                            var n = t.element('<md-button class="md-secondary-container md-icon-button">');
                            m(b, n[0]), b.setAttribute("tabindex", "-1"), b.classList.remove("md-secondary"), n.append(b), b = n[0]
                        }
                        b && (b.hasAttribute("ng-click") || d.ngClick && u(b)) && (a.addClass("md-with-secondary"), a.append(b))
                    }

                    function m(e, n) {
                        var o = ["ng-if", "ng-click", "aria-label", "ng-disabled", "ui-sref", "href", "ng-href", "ng-attr-ui-sref"];
                        t.forEach(o, function (t) {
                            e.hasAttribute(t) && (n.setAttribute(t, e.getAttribute(t)), e.removeAttribute(t))
                        })
                    }

                    function u(e) {
                        return -1 != i.indexOf(e.nodeName.toLowerCase())
                    }

                    function p(e) {
                        var t = e.nodeName.toUpperCase();
                        return "MD-BUTTON" == t || "BUTTON" == t
                    }

                    function h(e, a, d, c) {
                        function s(e) {
                            for (var t = e.attributes, n = 0; n < t.length; n++)if ("ngClick" === d.$normalize(t[n].name))return !0;
                            return !1
                        }

                        function l() {
                            var e = a.children();
                            e.length && !e[0].hasAttribute("ng-click") && t.forEach(i, function (e) {
                                t.forEach(p.querySelectorAll(e), function (e) {
                                    u.push(e)
                                })
                            })
                        }

                        function m() {
                            (1 == u.length || h) && (a.addClass("md-clickable"), h || c.attachRipple(e, t.element(a[0].querySelector(".md-no-style"))))
                        }

                        var u = [], p = a[0].firstElementChild, h = p && s(p);
                        l(), m(), a.hasClass("md-proxy-focus") && u.length && t.forEach(u, function (n) {
                            n = t.element(n), e.mouseActive = !1, n.on("mousedown", function () {
                                e.mouseActive = !0, r(function () {
                                    e.mouseActive = !1
                                }, 100)
                            }).on("focus", function () {
                                e.mouseActive === !1 && a.addClass("md-focused"), n.on("blur", function t() {
                                    a.removeClass("md-focused"), n.off("blur", t)
                                })
                            })
                        }), h || u.length || p && p.addEventListener("keypress", function (e) {
                            if ("INPUT" != e.target.nodeName && "TEXTAREA" != e.target.nodeName) {
                                var t = e.which || e.keyCode;
                                t == n.KEY_CODE.SPACE && p && (p.click(), e.preventDefault(), e.stopPropagation())
                            }
                        }), a.off("click"), a.off("keypress"), 1 == u.length && p && a.children().eq(0).on("click", function (e) {
                            var n = o.getClosest(e.target, "BUTTON");
                            !n && p.contains(e.target) && t.forEach(u, function (n) {
                                e.target === n || n.contains(e.target) || t.element(n).triggerHandler("click")
                            })
                        })
                    }

                    var f, g, b = a[0].querySelector(".md-secondary");
                    if (a[0].setAttribute("role", "listitem"), d.ngClick || d.ngHref || d.href || d.uiSref || d.ngAttrUiSref)s("button"); else {
                        for (var E, v = 0; E = i[v]; ++v)if (g = a[0].querySelector(E)) {
                            f = !0;
                            break
                        }
                        f ? s("div") : a[0].querySelector("md-button:not(.md-secondary):not(.md-exclude)") || a.addClass("md-no-proxy")
                    }
                    return l(), c(), h
                }
            }
        }

        function o(e, t, n) {
            function o(e, t) {
                var o = {};
                n.attach(e, t, o)
            }

            var r = this;
            r.attachRipple = o
        }

        t.module("material.components.list", ["material.core"]).controller("MdListController", o).directive("mdList", e).directive("mdListItem", n), e.$inject = ["$mdTheming"], n.$inject = ["$mdAria", "$mdConstant", "$mdUtil", "$timeout"], o.$inject = ["$scope", "$element", "$mdListInkRipple"]
    }(), function () {
        t.module("material.components.menu", ["material.core", "material.components.backdrop"])
    }(), function () {
        function n(e, t) {
            function n(t, n, o) {
                e(n), n.find("md-icon").length && n.addClass("md-has-icon")
            }

            function o(e, n, o, r) {
                var i = this;
                i.isErrorGetter = o.mdIsError && t(o.mdIsError), i.delegateClick = function () {
                    i.input.focus()
                }, i.element = n, i.setFocused = function (e) {
                    n.toggleClass("md-input-focused", !!e)
                }, i.setHasValue = function (e) {
                    n.toggleClass("md-input-has-value", !!e)
                }, i.setHasPlaceholder = function (e) {
                    n.toggleClass("md-input-has-placeholder", !!e)
                }, i.setInvalid = function (e) {
                    e ? r.addClass(n, "md-input-invalid") : r.removeClass(n, "md-input-invalid")
                }, e.$watch(function () {
                    return i.label && i.input
                }, function (e) {
                    e && !i.label.attr("for") && i.label.attr("for", i.input.attr("id"))
                })
            }

            return o.$inject = ["$scope", "$element", "$attrs", "$animate"], {restrict: "E", link: n, controller: o}
        }

        function o() {
            return {
                restrict: "E", require: "^?mdInputContainer", link: function (e, t, n, o) {
                    !o || n.mdNoFloat || t.hasClass("md-container-ignore") || (o.label = t, e.$on("$destroy", function () {
                        o.label = null
                    }))
                }
            }
        }

        function r(e, n, o) {
            function r(r, i, a, d) {
                function c(e) {
                    return m.setHasValue(!p.$isEmpty(e)), e
                }

                function s() {
                    m.setHasValue(i.val().length > 0 || (i[0].validity || {}).badInput)
                }

                function l() {
                    function o(e) {
                        return f(), e
                    }

                    function a() {
                        if (l.style.height = l.offsetHeight + "px", i.addClass("md-no-flex"), isNaN(u)) {
                            s.style.height = "auto", s.scrollTop = 0;
                            var e = d();
                            e && (s.style.height = e + "px")
                        } else {
                            s.setAttribute("rows", 1), h || (s.style.minHeight = "0", h = i.prop("clientHeight"), s.style.minHeight = null);
                            var t = Math.min(u, Math.round(s.scrollHeight / h));
                            s.setAttribute("rows", t), s.style.height = h * t + "px"
                        }
                        i.removeClass("md-no-flex"), l.style.height = "auto"
                    }

                    function d() {
                        var e = s.scrollHeight - s.offsetHeight;
                        return s.offsetHeight + (e > 0 ? e : 0)
                    }

                    function c(e) {
                        s.scrollTop = 0;
                        var t = s.scrollHeight - s.offsetHeight, n = s.offsetHeight + t;
                        s.style.height = n + "px"
                    }

                    if (!t.isDefined(i.attr("md-no-autogrow"))) {
                        var s = i[0], l = m.element[0], u = NaN, h = null;
                        s.hasAttribute("rows") && (u = parseInt(s.getAttribute("rows")));
                        var f = e.debounce(a, 1);
                        if (p ? (p.$formatters.push(o), p.$viewChangeListeners.push(o)) : f(), i.on("keydown input", f), isNaN(u) && (i.attr("rows", "1"), i.on("scroll", c)), t.element(n).on("resize", f), r.$on("$destroy", function () {
                                t.element(n).off("resize", f)
                            }), t.isDefined(i.attr("md-detect-hidden"))) {
                            var g = function () {
                                var e = !1;
                                return function () {
                                    var t = 0 === s.offsetHeight;
                                    t === !1 && e === !0 && a(), e = t
                                }
                            }();
                            r.$watch(function () {
                                return e.nextTick(g, !1), !0
                            })
                        }
                    }
                }

                var m = d[0], u = !!d[1], p = d[1] || e.fakeNgModel(), h = t.isDefined(a.readonly);
                if (m) {
                    if (m.input)throw new Error("<md-input-container> can only have *one* <input>, <textarea> or <md-select> child element!");
                    m.input = i;
                    var f = t.element('<div class="md-errors-spacer">');
                    i.after(f), m.label || o.expect(i, "aria-label", i.attr("placeholder")), i.addClass("md-input"), i.attr("id") || i.attr("id", "input_" + e.nextUid()), "textarea" === i[0].tagName.toLowerCase() && l(), u || s();
                    var g = m.isErrorGetter || function () {
                            return p.$invalid && (p.$touched || p.$$parentForm && p.$$parentForm.$submitted)
                        };
                    r.$watch(g, m.setInvalid), p.$parsers.push(c), p.$formatters.push(c), i.on("input", s), h || i.on("focus", function (e) {
                        m.setFocused(!0)
                    }).on("blur", function (e) {
                        m.setFocused(!1), s()
                    }), r.$on("$destroy", function () {
                        m.setFocused(!1), m.setHasValue(!1), m.input = null
                    })
                }
            }

            return {restrict: "E", require: ["^?mdInputContainer", "?ngModel"], link: r}
        }

        function i(e, n) {
            function o(o, r, i, a) {
                function d(e) {
                    return s.parent ? (s.text(String(r.val() || e || "").length + "/" + c), e) : e
                }

                var c, s, l, m = a[0], u = a[1];
                n.nextTick(function () {
                    l = t.element(u.element[0].querySelector(".md-errors-spacer")), s = t.element('<div class="md-char-counter">'), l.append(s), i.$set("ngTrim", "false"), m.$formatters.push(d), m.$viewChangeListeners.push(d), r.on("input keydown keyup", function () {
                        d()
                    }), o.$watch(i.mdMaxlength, function (n) {
                        c = n, t.isNumber(n) && n > 0 ? (s.parent().length || e.enter(s, l), d()) : e.leave(s)
                    }), m.$validators["md-maxlength"] = function (e, n) {
                        return !t.isNumber(c) || 0 > c ? !0 : (e || r.val() || n || "").length <= c
                    }
                })
            }

            return {restrict: "A", require: ["ngModel", "^mdInputContainer"], link: o}
        }

        function a(e) {
            function n(e, n, o, r) {
                if (r) {
                    var i = r.element.find("label"), a = t.isDefined(r.element.attr("md-no-float"));
                    if (i && i.length || a)return void r.setHasPlaceholder(!0);
                    var d = o.placeholder;
                    if (n.removeAttr("placeholder"), r.input && "MD-SELECT" != r.input[0].nodeName) {
                        var c = '<label ng-click="delegateClick()">' + d + "</label>";
                        r.element.addClass("md-icon-float"), r.element.prepend(c)
                    }
                }
            }

            return {restrict: "A", require: "^^?mdInputContainer", priority: 200, link: n}
        }

        function d() {
            function e(e, n, o, r) {
                r && (n.toggleClass("md-input-messages-animation", !0), n.toggleClass("md-auto-hide", !0), ("false" == o.mdAutoHide || t(o)) && n.toggleClass("md-auto-hide", !1))
            }

            function t(e) {
                return E.some(function (t) {
                    return e[t]
                })
            }

            return {restrict: "EA", link: e, require: "^^?mdInputContainer"}
        }

        function c(e) {
            function t(t) {
                var n = e.getClosest(t, "md-input-container");
                if (n)return t.toggleClass("md-input-message-animation", !0), {}
            }

            return {restrict: "EA", compile: t, priority: 100}
        }

        function s(e, t) {
            return {
                addClass: function (n, o, r) {
                    var i = b(n);
                    "md-input-invalid" == o && i.hasClass("md-auto-hide") && u(n, t, e)["finally"](r)
                }
            }
        }

        function l(e, t) {
            return {
                enter: function (n, o) {
                    u(n, t, e)["finally"](o)
                }, leave: function (n, o) {
                    p(n, t, e)["finally"](o)
                }, addClass: function (n, o, r) {
                    "ng-hide" == o ? p(n, t, e)["finally"](r) : r()
                }, removeClass: function (n, o, r) {
                    "ng-hide" == o ? u(n, t, e)["finally"](r) : r()
                }
            }
        }

        function m(e) {
            return {
                enter: function (t, n) {
                    var o = b(t);
                    return o.hasClass("md-auto-hide") ? void n() : h(t, e)
                }, leave: function (t, n) {
                    return f(t, e)
                }
            }
        }

        function u(e, n, o) {
            var r, i = [], a = b(e);
            return t.forEach(a.children(), function (e) {
                r = h(t.element(e), n), i.push(r.start())
            }), o.all(i)
        }

        function p(e, n, o) {
            var r, i = [], a = b(e);
            return t.forEach(a.children(), function (e) {
                r = f(t.element(e), n), i.push(r.start())
            }), o.all(i)
        }

        function h(e, t) {
            var n = e[0].offsetHeight;
            return t(e, {
                event: "enter",
                structural: !0,
                from: {opacity: 0, "margin-top": -n + "px"},
                to: {opacity: 1, "margin-top": "0"},
                duration: .3
            })
        }

        function f(t, n) {
            var o = t[0].offsetHeight, r = e.getComputedStyle(t[0]);
            return 0 == r.opacity ? n(t, {}) : n(t, {
                event: "leave",
                structural: !0,
                from: {opacity: 1, "margin-top": 0},
                to: {opacity: 0, "margin-top": -o + "px"},
                duration: .3
            })
        }

        function g(e) {
            var t = e.controller("mdInputContainer");
            return t.element
        }

        function b(e) {
            var n = g(e), o = "ng-messages,data-ng-messages,x-ng-messages,[ng-messages],[data-ng-messages],[x-ng-messages]";
            return t.element(n[0].querySelector(o))
        }

        t.module("material.components.input", ["material.core"]).directive("mdInputContainer", n).directive("label", o).directive("input", r).directive("textarea", r).directive("mdMaxlength", i).directive("placeholder", a).directive("ngMessages", d).directive("ngMessage", c).directive("ngMessageExp", c).animation(".md-input-invalid", s).animation(".md-input-messages-animation", l).animation(".md-input-message-animation", m), n.$inject = ["$mdTheming", "$parse"], r.$inject = ["$mdUtil", "$window", "$mdAria"], i.$inject = ["$animate", "$mdUtil"], a.$inject = ["$log"];
        var E = ["ngIf", "ngShow", "ngHide", "ngSwitchWhen", "ngSwitchDefault"];
        c.$inject = ["$mdUtil"], s.$inject = ["$q", "$animateCss"], l.$inject = ["$q", "$animateCss"], m.$inject = ["$animateCss"]
    }(), function () {
        t.module("material.components.menuBar", ["material.core", "material.components.menu"])
    }(), function () {
        function e(e, o, r) {
            function i(e) {
                return e.attr("aria-valuemin", 0), e.attr("aria-valuemax", 100), e.attr("role", "progressbar"), a
            }

            function a(i, a, p) {
                function h() {
                    p.$observe("value", function (e) {
                        var t = d(e);
                        a.attr("aria-valuenow", t), v() == m && b(t)
                    }), p.$observe("mdMode", function (e) {
                        switch (e) {
                            case m:
                            case u:
                                y.removeClass("ng-hide"), M && y.removeClass(M), y.addClass(M = "md-mode-" + e);
                                break;
                            default:
                                M && y.removeClass(M), y.addClass("ng-hide"), M = n
                        }
                    })
                }

                function f() {
                    $.css({
                        width: 100 * E() + "px",
                        height: 100 * E() + "px"
                    }), $.children().eq(0).css(C({transform: o.supplant("translate(-50%, -50%) scale( {0} )", [E()])}))
                }

                function g() {
                    if (t.isUndefined(p.mdMode)) {
                        var e = t.isDefined(p.value), n = e ? m : u, i = "Auto-adding the missing md-mode='{0}' to the ProgressCircular element";
                        r.debug(o.supplant(i, [n])), a.attr("md-mode", n), p.mdMode = n
                    }
                }

                function b(e) {
                    if (v()) {
                        A = A || t.element(a[0].querySelector(".md-left > .md-half-circle")), T = T || t.element(a[0].querySelector(".md-right > .md-half-circle")), w = w || t.element(a[0].querySelector(".md-gap"));
                        var n = c({
                            borderBottomColor: 50 >= e ? "transparent !important" : "",
                            transition: 50 >= e ? "" : "borderBottomColor 0.1s linear"
                        }), r = c({
                            transition: 50 >= e ? "transform 0.1s linear" : "",
                            transform: o.supplant("rotate({0}deg)", [50 >= e ? 135 : (e - 50) / 50 * 180 + 135])
                        }), i = c({
                            transition: e >= 50 ? "transform 0.1s linear" : "",
                            transform: o.supplant("rotate({0}deg)", [e >= 50 ? 45 : e / 50 * 180 - 135])
                        });
                        A.css(C(r)), T.css(C(i)), w.css(C(n))
                    }
                }

                function E() {
                    if (!p.mdDiameter)return l;
                    var e = /([0-9]*)%/.exec(p.mdDiameter), t = Math.max(0, e && e[1] / 100 || parseFloat(p.mdDiameter));
                    return t > 1 ? t / s : t
                }

                function v() {
                    var e = (p.mdMode || "").trim();
                    if (e)switch (e) {
                        case m:
                        case u:
                            break;
                        default:
                            e = n
                    }
                    return e
                }

                e(a);
                var M, $ = a, y = t.element(a.children()[0]), C = o.dom.animator.toCss;
                a.attr("md-mode", v()), f(), g(), h();
                var A, T, w
            }

            function d(e) {
                return Math.max(0, Math.min(e || 0, 100))
            }

            function c(e) {
                for (var t in e)e.hasOwnProperty(t) && "" == e[t] && delete e[t];
                return e
            }

            var s = 100, l = .5, m = "determinate", u = "indeterminate";
            return {
                restrict: "E",
                scope: !0,
                template: '<div class="md-scale-wrapper"><div class="md-spinner-wrapper"><div class="md-inner"><div class="md-gap"></div><div class="md-left"><div class="md-half-circle"></div></div><div class="md-right"><div class="md-half-circle"></div></div></div></div></div>',
                compile: i
            }
        }

        t.module("material.components.progressCircular", ["material.core"]).directive("mdProgressCircular", e), e.$inject = ["$mdTheming", "$mdUtil", "$log"]
    }(), function () {
        function e(e, o, r) {
            function i(e, t, n) {
                return e.attr("aria-valuemin", 0), e.attr("aria-valuemax", 100), e.attr("role", "progressbar"), a
            }

            function a(i, a, u) {
                function p() {
                    u.$observe("value", function (e) {
                        var t = d(e);
                        a.attr("aria-valuenow", t), f() != m && g(M, t)
                    }), u.$observe("mdBufferValue", function (e) {
                        g(v, d(e))
                    }), u.$observe("mdMode", function (e) {
                        switch (e) {
                            case m:
                            case l:
                            case c:
                            case s:
                                $.removeClass("ng-hide " + b), $.addClass(b = "md-mode-" + e);
                                break;
                            default:
                                b && $.removeClass(b), $.addClass("ng-hide"), b = n
                        }
                    })
                }

                function h() {
                    if (t.isUndefined(u.mdMode)) {
                        var e = t.isDefined(u.value), n = e ? c : s, i = "Auto-adding the missing md-mode='{0}' to the ProgressLinear element";
                        r.debug(o.supplant(i, [n])), a.attr("md-mode", n), u.mdMode = n
                    }
                }

                function f() {
                    var e = (u.mdMode || "").trim();
                    if (e)switch (e) {
                        case c:
                        case s:
                        case l:
                        case m:
                            break;
                        default:
                            e = n
                    }
                    return e
                }

                function g(e, n) {
                    if (f()) {
                        var r = o.supplant("translateX({0}%) scale({1},1)", [(n - 100) / 2, n / 100]), i = E({transform: r});
                        t.element(e).css(i)
                    }
                }

                e(a);
                var b, E = o.dom.animator.toCss, v = t.element(a[0].querySelector(".md-bar1")), M = t.element(a[0].querySelector(".md-bar2")), $ = t.element(a[0].querySelector(".md-container"));
                a.attr("md-mode", f()), h(), p()
            }

            function d(e) {
                return Math.max(0, Math.min(e || 0, 100))
            }

            var c = "determinate", s = "indeterminate", l = "buffer", m = "query";
            return {
                restrict: "E",
                template: '<div class="md-container"><div class="md-dashed"></div><div class="md-bar md-bar1"></div><div class="md-bar md-bar2"></div></div>',
                compile: i
            }
        }

        t.module("material.components.progressLinear", ["material.core"]).directive("mdProgressLinear", e), e.$inject = ["$mdTheming", "$mdUtil", "$log"]
    }(), function () {
        function e(e, n, o, r) {
            function i(i, a, d, c) {
                function s() {
                    a.hasClass("md-focused") || a.addClass("md-focused")
                }

                function l(o) {
                    var r = o.which || o.keyCode;
                    if (r == n.KEY_CODE.ENTER || o.currentTarget == o.target)switch (r) {
                        case n.KEY_CODE.LEFT_ARROW:
                        case n.KEY_CODE.UP_ARROW:
                            o.preventDefault(), m.selectPrevious(), s();
                            break;
                        case n.KEY_CODE.RIGHT_ARROW:
                        case n.KEY_CODE.DOWN_ARROW:
                            o.preventDefault(), m.selectNext(), s();
                            break;
                        case n.KEY_CODE.ENTER:
                            var i = t.element(e.getClosest(a[0], "form"));
                            i.length > 0 && i.triggerHandler("submit")
                    }
                }

                o(a);
                var m = c[0], u = c[1] || e.fakeNgModel();
                m.init(u), i.mouseActive = !1, a.attr({
                    role: "radiogroup",
                    tabIndex: a.attr("tabindex") || "0"
                }).on("keydown", l).on("mousedown", function (e) {
                    i.mouseActive = !0, r(function () {
                        i.mouseActive = !1
                    }, 100)
                }).on("focus", function () {
                    i.mouseActive === !1 && m.$element.addClass("md-focused")
                }).on("blur", function () {
                    m.$element.removeClass("md-focused")
                })
            }

            function a(e) {
                this._radioButtonRenderFns = [], this.$element = e
            }

            function d() {
                return {
                    init: function (e) {
                        this._ngModelCtrl = e, this._ngModelCtrl.$render = t.bind(this, this.render)
                    }, add: function (e) {
                        this._radioButtonRenderFns.push(e)
                    }, remove: function (e) {
                        var t = this._radioButtonRenderFns.indexOf(e);
                        -1 !== t && this._radioButtonRenderFns.splice(t, 1)
                    }, render: function () {
                        this._radioButtonRenderFns.forEach(function (e) {
                            e()
                        })
                    }, setViewValue: function (e, t) {
                        this._ngModelCtrl.$setViewValue(e, t), this.render()
                    }, getViewValue: function () {
                        return this._ngModelCtrl.$viewValue
                    }, selectNext: function () {
                        return c(this.$element, 1)
                    }, selectPrevious: function () {
                        return c(this.$element, -1)
                    }, setActiveDescendant: function (e) {
                        this.$element.attr("aria-activedescendant", e)
                    }
                }
            }

            function c(n, o) {
                var r = e.iterator(n[0].querySelectorAll("md-radio-button"), !0);
                if (r.count()) {
                    var i = function (e) {
                        return !t.element(e).attr("disabled")
                    }, a = n[0].querySelector("md-radio-button.md-checked"), d = r[0 > o ? "previous" : "next"](a, i) || r.first();
                    t.element(d).triggerHandler("click")
                }
            }

            return a.prototype = d(), {
                restrict: "E",
                controller: ["$element", a],
                require: ["mdRadioGroup", "?ngModel"],
                link: {pre: i}
            }
        }

        function n(e, t, n) {
            function o(o, i, a, d) {
                function c(e) {
                    if (!d)throw"RadioGroupController not found.";
                    d.add(l), a.$observe("value", l), i.on("click", s).on("$destroy", function () {
                        d.remove(l)
                    })
                }

                function s(e) {
                    i[0].hasAttribute("disabled") || o.$apply(function () {
                        d.setViewValue(a.value, e && e.type)
                    })
                }

                function l() {
                    function e(e) {
                        "MD-RADIO-GROUP" != i.parent()[0].nodeName && i.parent()[e ? "addClass" : "removeClass"](r)
                    }

                    var t = d.getViewValue() == a.value;
                    t !== u && (u = t, i.attr("aria-checked", t), t ? (e(!0), i.addClass(r), d.setActiveDescendant(i.attr("id"))) : (e(!1), i.removeClass(r)))
                }

                function m(n, o) {
                    function r() {
                        return a.id || "radio_" + t.nextUid()
                    }

                    o.ariaId = r(), n.attr({
                        id: o.ariaId,
                        role: "radio",
                        "aria-checked": "false"
                    }), e.expectWithText(n, "aria-label")
                }

                var u;
                n(i), m(i, o), c()
            }

            var r = "md-checked";
            return {
                restrict: "E",
                require: "^mdRadioGroup",
                transclude: !0,
                template: '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-off"></div><div class="md-on"></div></div><div ng-transclude class="md-label"></div>',
                link: o
            }
        }

        t.module("material.components.radioButton", ["material.core"]).directive("mdRadioGroup", e).directive("mdRadioButton", n), e.$inject = ["$mdUtil", "$mdConstant", "$mdTheming", "$timeout"], n.$inject = ["$mdAria", "$mdUtil", "$mdTheming"]
    }(), function () {
        function e(e, o, r, i, a, d) {
            function c(a, c) {
                var s = t.element("<md-select-value><span></span></md-select-value>");
                if (s.append('<span class="md-select-icon" aria-hidden="true"></span>'), s.addClass("md-select-value"), s[0].hasAttribute("id") || s.attr("id", "select_value_label_" + o.nextUid()), a.find("md-content").length || a.append(t.element("<md-content>").append(a.contents())), c.mdOnOpen && (a.find("md-content").prepend(t.element('<div> <md-progress-circular md-mode="{{progressMode}}" ng-hide="$$loadingAsyncDone"></md-progress-circular></div>')), a.find("md-option").attr("ng-show", "$$loadingAsyncDone")), c.name) {
                    var l = t.element('<select class="md-visually-hidden">');
                    l.attr({name: "." + c.name, "ng-model": c.ngModel, "aria-hidden": "true", tabindex: "-1"});
                    var m = a.find("md-option");
                    t.forEach(m, function (e) {
                        var n = t.element("<option>" + e.innerHTML + "</option>");
                        e.hasAttribute("ng-value") ? n.attr("ng-value", e.getAttribute("ng-value")) : e.hasAttribute("value") && n.attr("value", e.getAttribute("value")), l.append(n)
                    }), a.parent().append(l)
                }
                var u = t.isDefined(c.multiple) ? "multiple" : "", p = '<div class="md-select-menu-container" aria-hidden="true"><md-select-menu {0}>{1}</md-select-menu></div>';
                return p = o.supplant(p, [u, a.html()]), a.empty().append(s), a.append(p), c.tabindex = c.tabindex || "0", function (a, c, s, l) {
                    function m() {
                        var e = c.attr("aria-label") || c.attr("placeholder");
                        !e && $ && $.label && (e = $.label.text()), v = e, i.expect(c, "aria-label", e)
                    }

                    function u() {
                        x && (_ = _ || x.find("md-select-menu").controller("mdSelectMenu"), y.setLabelText(_.selectedLabels()))
                    }

                    function p() {
                        if (v) {
                            var e = _.selectedLabels({mode: "aria"});
                            c.attr("aria-label", e.length ? v + ": " + e : v)
                        }
                    }

                    function h() {
                        $ && $.setHasValue(_.selectedLabels().length > 0 || (c[0].validity || {}).badInput)
                    }

                    function f() {
                        if (x = t.element(c[0].querySelector(".md-select-menu-container")),
                                N = a, c.attr("md-container-class")) {
                            var e = x[0].getAttribute("class") + " " + c.attr("md-container-class");
                            x[0].setAttribute("class", e)
                        }
                        _ = x.find("md-select-menu").controller("mdSelectMenu"), _.init(C, s.ngModel), c.on("$destroy", function () {
                            x.remove()
                        })
                    }

                    function g(e) {
                        var n = [32, 13, 38, 40];
                        if (-1 != n.indexOf(e.keyCode))e.preventDefault(), b(e); else if (e.keyCode <= 90 && e.keyCode >= 31) {
                            e.preventDefault();
                            var o = _.optNodeForKeyboardSearch(e);
                            if (!o)return;
                            var r = t.element(o).controller("mdOption");
                            _.isMultiple || _.deselect(Object.keys(_.selected)[0]), _.select(r.hashKey, r.value), _.refreshViewValue()
                        }
                    }

                    function b() {
                        N.isOpen = !0, c.attr("aria-expanded", "true"), e.show({
                            scope: N,
                            preserveScope: !0,
                            skipCompile: !0,
                            element: x,
                            target: c[0],
                            selectCtrl: y,
                            preserveElement: !0,
                            hasBackdrop: !0,
                            loadingAsync: s.mdOnOpen ? a.$eval(s.mdOnOpen) || !0 : !1
                        })["finally"](function () {
                            N.isOpen = !1, c.focus(), c.attr("aria-expanded", "false"), C.$setTouched()
                        })
                    }

                    var E, v, M = !0, $ = l[0], y = l[1], C = l[2], A = l[3], T = c.find("md-select-value"), w = t.isDefined(s.readonly);
                    if ($) {
                        var k = $.isErrorGetter || function () {
                                return C.$invalid && C.$touched
                            };
                        if ($.input)throw new Error("<md-input-container> can only have *one* child <input>, <textarea> or <select> element!");
                        $.input = c, $.label || i.expect(c, "aria-label", c.attr("placeholder")), a.$watch(k, $.setInvalid)
                    }
                    var x, N, _;
                    if (f(), r(c), s.name && A) {
                        var H = c.parent()[0].querySelector('select[name=".' + s.name + '"]');
                        o.nextTick(function () {
                            var e = t.element(H).controller("ngModel");
                            e && A.$removeControl(e)
                        })
                    }
                    A && o.nextTick(function () {
                        A.$setPristine()
                    });
                    var S = C.$render;
                    C.$render = function () {
                        S(), u(), p(), h()
                    }, s.$observe("placeholder", C.$render), y.setLabelText = function (e) {
                        y.setIsPlaceholder(!e);
                        var t = s.placeholder || ($ && $.label ? $.label.text() : "");
                        e = e || t || "";
                        var n = T.children().eq(0);
                        n.html(e)
                    }, y.setIsPlaceholder = function (e) {
                        e ? (T.addClass("md-select-placeholder"), $ && $.label && $.label.addClass("md-placeholder")) : (T.removeClass("md-select-placeholder"), $ && $.label && $.label.removeClass("md-placeholder"))
                    }, w || (c.on("focus", function (e) {
                        $ && $.element.hasClass("md-input-has-value") && $.setFocused(!0)
                    }), o.nextTick(function () {
                        c.on("blur", function () {
                            M && (M = !1, C.$setUntouched()), N.isOpen || ($ && $.setFocused(!1), h())
                        })
                    })), y.triggerClose = function () {
                        d(s.mdOnClose)(a)
                    }, a.$$postDigest(function () {
                        m(), u(), p()
                    }), a.$watch(_.selectedLabels, u);
                    var D;
                    s.$observe("ngMultiple", function (e) {
                        D && D();
                        var t = d(e);
                        D = a.$watch(function () {
                            return t(a)
                        }, function (e, t) {
                            (e !== n || t !== n) && (e ? c.attr("multiple", "multiple") : c.removeAttr("multiple"), c.attr("aria-multiselectable", e ? "true" : "false"), x && (_.setMultiple(e), S = C.$render, C.$render = function () {
                                S(), u(), p(), h()
                            }, C.$render()))
                        })
                    }), s.$observe("disabled", function (e) {
                        t.isString(e) && (e = !0), (E === n || E !== e) && (E = e, e ? (c.attr({
                            tabindex: -1,
                            "aria-disabled": "true"
                        }), c.off("click", b), c.off("keydown", g)) : (c.attr({
                            tabindex: s.tabindex,
                            "aria-disabled": "false"
                        }), c.on("click", b), c.on("keydown", g)))
                    }), s.disabled || s.ngDisabled || (c.attr({
                        tabindex: s.tabindex,
                        "aria-disabled": "false"
                    }), c.on("click", b), c.on("keydown", g));
                    var I = {
                        role: "listbox",
                        "aria-expanded": "false",
                        "aria-multiselectable": s.multiple === n || s.ngMultiple ? "false" : "true"
                    };
                    c[0].hasAttribute("id") || (I.id = "select_" + o.nextUid());
                    var O = "select_container_" + o.nextUid();
                    x.attr("id", O), I["aria-owns"] = O, c.attr(I), a.$on("$destroy", function () {
                        e.destroy()["finally"](function () {
                            $ && ($.setFocused(!1), $.setHasValue(!1), $.input = null), C.$setTouched()
                        })
                    })
                }
            }

            return {
                restrict: "E",
                require: ["^?mdInputContainer", "mdSelect", "ngModel", "?^form"],
                compile: c,
                controller: function () {
                }
            }
        }

        function o(e, o, r) {
            function i(e, n, i, a) {
                function d(e) {
                    (13 == e.keyCode || 32 == e.keyCode) && c(e)
                }

                function c(n) {
                    var r = o.getClosest(n.target, "md-option"), i = r && t.element(r).data("$mdOptionController");
                    if (r && i) {
                        if (r.hasAttribute("disabled"))return n.stopImmediatePropagation(), !1;
                        var a = s.hashGetter(i.value), d = t.isDefined(s.selected[a]);
                        e.$apply(function () {
                            s.isMultiple ? d ? s.deselect(a) : s.select(a, i.value) : d || (s.deselect(Object.keys(s.selected)[0]), s.select(a, i.value)), s.refreshViewValue()
                        })
                    }
                }

                var s = a[0];
                r(n), n.on("click", c), n.on("keypress", d)
            }

            function a(r, i, a) {
                function d() {
                    var e = l.ngModel.$modelValue || l.ngModel.$viewValue || [];
                    if (t.isArray(e)) {
                        var n = Object.keys(l.selected), o = e.map(l.hashGetter), r = n.filter(function (e) {
                            return -1 === o.indexOf(e)
                        });
                        r.forEach(l.deselect), o.forEach(function (t, n) {
                            l.select(t, e[n])
                        })
                    }
                }

                function s() {
                    var e = l.ngModel.$viewValue || l.ngModel.$modelValue;
                    Object.keys(l.selected).forEach(l.deselect), l.select(l.hashGetter(e), e)
                }

                var l = this;
                l.isMultiple = t.isDefined(i.multiple), l.selected = {}, l.options = {}, r.$watchCollection(function () {
                    return l.options
                }, function () {
                    l.ngModel.$render()
                });
                var m, u;
                l.setMultiple = function (e) {
                    function n(e, n) {
                        return t.isArray(e || n || [])
                    }

                    var o = l.ngModel;
                    u = u || o.$isEmpty, l.isMultiple = e, m && m(), l.isMultiple ? (o.$validators["md-multiple"] = n, o.$render = d, r.$watchCollection(l.modelBinding, function (e) {
                        n(e) && d(e), l.ngModel.$setPristine()
                    }), o.$isEmpty = function (e) {
                        return !e || 0 === e.length
                    }) : (delete o.$validators["md-multiple"], o.$render = s)
                };
                var p, h, f, g = "", b = 300;
                l.optNodeForKeyboardSearch = function (e) {
                    p && clearTimeout(p), p = setTimeout(function () {
                        p = n, g = "", f = n, h = n
                    }, b), g += String.fromCharCode(e.keyCode);
                    var o = new RegExp("^" + g, "i");
                    h || (h = a.find("md-option"), f = new Array(h.length), t.forEach(h, function (e, t) {
                        f[t] = e.textContent.trim()
                    }));
                    for (var r = 0; r < f.length; ++r)if (o.test(f[r]))return h[r]
                }, l.init = function (n, o) {
                    if (l.ngModel = n, l.modelBinding = o, n.$options && n.$options.trackBy) {
                        var i = {}, a = e(n.$options.trackBy);
                        l.hashGetter = function (e, t) {
                            return i.$value = e, a(t || r, i)
                        }
                    } else l.hashGetter = function (e) {
                        return t.isObject(e) ? "object_" + (e.$$mdSelectId || (e.$$mdSelectId = ++c)) : e
                    };
                    l.setMultiple(l.isMultiple)
                }, l.selectedLabels = function (e) {
                    e = e || {};
                    var t = e.mode || "html", n = o.nodesToArray(a[0].querySelectorAll("md-option[selected]"));
                    if (n.length) {
                        var r;
                        return "html" == t ? r = function (e) {
                            return e.innerHTML
                        } : "aria" == t && (r = function (e) {
                            return e.hasAttribute("aria-label") ? e.getAttribute("aria-label") : e.textContent
                        }), n.map(r).join(", ")
                    }
                    return ""
                }, l.select = function (e, t) {
                    var n = l.options[e];
                    n && n.setSelected(!0), l.selected[e] = t
                }, l.deselect = function (e) {
                    var t = l.options[e];
                    t && t.setSelected(!1), delete l.selected[e]
                }, l.addOption = function (e, n) {
                    if (t.isDefined(l.options[e]))throw new Error('Duplicate md-option values are not allowed in a select. Duplicate value "' + n.value + '" found.');
                    l.options[e] = n, t.isDefined(l.selected[e]) && (l.select(e, n.value), l.refreshViewValue())
                }, l.removeOption = function (e) {
                    delete l.options[e]
                }, l.refreshViewValue = function () {
                    var e, n = [];
                    for (var o in l.selected)(e = l.options[o]) ? n.push(e.value) : n.push(l.selected[o]);
                    var r = l.ngModel.$options && l.ngModel.$options.trackBy, i = l.isMultiple ? n : n[0], a = l.ngModel.$modelValue;
                    (r ? t.equals(a, i) : a == i) || (l.ngModel.$setViewValue(i), l.ngModel.$render())
                }
            }

            return a.$inject = ["$scope", "$attrs", "$element"], {
                restrict: "E",
                require: ["mdSelectMenu"],
                scope: !0,
                controller: a,
                link: {pre: i}
            }
        }

        function r(e, n) {
            function o(e, n) {
                return e.append(t.element('<div class="md-text">').append(e.contents())), e.attr("tabindex", n.tabindex || "0"), r
            }

            function r(o, r, i, a) {
                function d(e, t, n) {
                    if (!l.hashGetter)return void(n || o.$$postDigest(function () {
                        d(e, t, !0)
                    }));
                    var r = l.hashGetter(t, o), i = l.hashGetter(e, o);
                    s.hashKey = i, s.value = e, l.removeOption(r, s), l.addOption(i, s)
                }

                function c() {
                    var e = {role: "option", "aria-selected": "false"};
                    r[0].hasAttribute("id") || (e.id = "select_option_" + n.nextUid()), r.attr(e)
                }

                var s = a[0], l = a[1];
                t.isDefined(i.ngValue) ? o.$watch(i.ngValue, d) : t.isDefined(i.value) ? d(i.value) : o.$watch(function () {
                    return r.text()
                }, d), i.$observe("disabled", function (e) {
                    e ? r.attr("tabindex", "-1") : r.attr("tabindex", "0")
                }), o.$$postDigest(function () {
                    i.$observe("selected", function (e) {
                        t.isDefined(e) && ("string" == typeof e && (e = !0), e ? (l.isMultiple || l.deselect(Object.keys(l.selected)[0]), l.select(s.hashKey, s.value)) : l.deselect(s.hashKey), l.refreshViewValue())
                    })
                }), e.attach(o, r), c(), o.$on("$destroy", function () {
                    l.removeOption(s.hashKey, s)
                })
            }

            function i(e) {
                this.selected = !1, this.setSelected = function (t) {
                    t && !this.selected ? e.attr({
                        selected: "selected",
                        "aria-selected": "true"
                    }) : !t && this.selected && (e.removeAttr("selected"), e.attr("aria-selected", "false")), this.selected = t
                }
            }

            return i.$inject = ["$element"], {
                restrict: "E",
                require: ["mdOption", "^^mdSelectMenu"],
                controller: i,
                compile: o
            }
        }

        function i() {
            function e(e, n) {
                var o = e.find("label");
                o.length || (o = t.element("<label>"), e.prepend(o)), o.addClass("md-container-ignore"), n.label && o.text(n.label)
            }

            return {restrict: "E", compile: e}
        }

        function a(e) {
            function o(e, o, c, s, l, m, u, p, h) {
                function f(e, t, n) {
                    function o() {
                        return u(t, {addClass: "md-leave"}).start()
                    }

                    function r() {
                        t.removeClass("md-active"), t.attr("aria-hidden", "true"), t[0].style.display = "none", b(n), !n.$destroy && n.restoreFocus && n.target.focus()
                    }

                    return n = n || {}, n.cleanupInteraction(), n.cleanupResizing(), n.hideBackdrop(), n.$destroy === !0 ? r() : o().then(r)
                }

                function g(r, i, a) {
                    function d(e, t, n) {
                        return n.parent.append(t), l(function (e, n) {
                            try {
                                u(t, {removeClass: "md-leave", duration: 0}).start().then(f).then(e)
                            } catch (o) {
                                n(o)
                            }
                        })
                    }

                    function f() {
                        return l(function (e) {
                            if (a.isRemoved)return l.reject(!1);
                            var t = E(r, i, a);
                            t.container.element.css(M.toCss(t.container.styles)), t.dropDown.element.css(M.toCss(t.dropDown.styles)), m(function () {
                                i.addClass("md-active"), t.dropDown.element.css(M.toCss({transform: ""})), b(a.focusedNode), e()
                            })
                        })
                    }

                    function g(e, t, n) {
                        return n.disableParentScroll && !c.getClosest(n.target, "MD-DIALOG") ? n.restoreScroll = c.disableScrollAround(n.element, n.parent) : n.disableParentScroll = !1, n.hasBackdrop && (n.backdrop = c.createBackdrop(e, "md-select-backdrop md-click-catcher"), p.enter(n.backdrop, h[0].body, null, {duration: 0})), function () {
                            n.backdrop && n.backdrop.remove(), n.disableParentScroll && n.restoreScroll(), delete n.restoreScroll
                        }
                    }

                    function b(e) {
                        e && !e.hasAttribute("disabled") && e.focus()
                    }

                    function $(e, n) {
                        var o = i.find("md-select-menu");
                        if (!n.target)throw new Error(c.supplant(v, [n.target]));
                        t.extend(n, {
                            isRemoved: !1,
                            target: t.element(n.target),
                            parent: t.element(n.parent),
                            selectEl: o,
                            contentEl: i.find("md-content"),
                            optionNodes: o[0].getElementsByTagName("md-option")
                        })
                    }

                    function y() {
                        var e = function (e, t, n) {
                            return function () {
                                if (!n.isRemoved) {
                                    var o = E(e, t, n), r = o.container, i = o.dropDown;
                                    r.element.css(M.toCss(r.styles)), i.element.css(M.toCss(i.styles))
                                }
                            }
                        }(r, i, a), n = t.element(s);
                        return n.on("resize", e), n.on("orientationchange", e), function () {
                            n.off("resize", e), n.off("orientationchange", e)
                        }
                    }

                    function C() {
                        a.loadingAsync && !a.isRemoved && (r.$$loadingAsyncDone = !1, r.progressMode = "indeterminate", l.when(a.loadingAsync).then(function () {
                            r.$$loadingAsyncDone = !0, r.progressMode = "", delete a.loadingAsync
                        }).then(function () {
                            m(f)
                        }))
                    }

                    function A() {
                        function t(t) {
                            t.preventDefault(), t.stopPropagation(), a.restoreFocus = !1, c.nextTick(e.hide, !0)
                        }

                        function r(t) {
                            var n = o.KEY_CODE;
                            switch (t.preventDefault(), t.stopPropagation(), t.keyCode) {
                                case n.UP_ARROW:
                                    return l();
                                case n.DOWN_ARROW:
                                    return s();
                                case n.SPACE:
                                case n.ENTER:
                                    var r = c.getClosest(t.target, "md-option");
                                    r && (u.triggerHandler({type: "click", target: r}), t.preventDefault()), m(t);
                                    break;
                                case n.TAB:
                                case n.ESCAPE:
                                    t.stopPropagation(), t.preventDefault(), a.restoreFocus = !0, c.nextTick(e.hide, !0);
                                    break;
                                default:
                                    if (t.keyCode >= 31 && t.keyCode <= 90) {
                                        var i = u.controller("mdSelectMenu").optNodeForKeyboardSearch(t);
                                        a.focusedNode = i || a.focusedNode, i && i.focus()
                                    }
                            }
                        }

                        function d(e) {
                            var t, o = c.nodesToArray(a.optionNodes), r = o.indexOf(a.focusedNode);
                            do-1 === r ? r = 0 : "next" === e && r < o.length - 1 ? r++ : "prev" === e && r > 0 && r--, t = o[r], t.hasAttribute("disabled") && (t = n); while (!t && r < o.length - 1 && r > 0);
                            t && t.focus(), a.focusedNode = t
                        }

                        function s() {
                            d("next")
                        }

                        function l() {
                            d("prev")
                        }

                        function m(t) {
                            function n() {
                                var e = !1;
                                if (t && t.currentTarget.children.length > 0) {
                                    var n = t.currentTarget.children[0], o = n.scrollHeight > n.clientHeight;
                                    if (o && n.children.length > 0) {
                                        var r = t.pageX - t.currentTarget.getBoundingClientRect().left;
                                        r > n.querySelector("md-option").offsetWidth && (e = !0)
                                    }
                                }
                                return e
                            }

                            if (!(t && "click" == t.type && t.currentTarget != u[0] || n())) {
                                var o = c.getClosest(t.target, "md-option");
                                o && o.hasAttribute && !o.hasAttribute("disabled") && (t.preventDefault(), t.stopPropagation(), p.isMultiple || (a.restoreFocus = !0, c.nextTick(function () {
                                    e.hide(p.ngModel.$viewValue)
                                }, !0)))
                            }
                        }

                        if (!a.isRemoved) {
                            var u = a.selectEl, p = u.controller("mdSelectMenu") || {};
                            return i.addClass("md-clickable"), a.backdrop && a.backdrop.on("click", t), u.on("keydown", r), u.on("click", m), function () {
                                a.backdrop && a.backdrop.off("click", t), u.off("keydown", r), u.off("click", m), i.removeClass("md-clickable"), a.isRemoved = !0
                            }
                        }
                    }

                    return C(), $(r, a), a.hideBackdrop = g(r, i, a), d(r, i, a).then(function (e) {
                        return i.attr("aria-hidden", "false"), a.alreadyOpen = !0, a.cleanupInteraction = A(), a.cleanupResizing = y(), e
                    }, a.hideBackdrop)
                }

                function b(e) {
                    var t = e.selectCtrl;
                    if (t) {
                        var n = e.selectEl.controller("mdSelectMenu");
                        t.setLabelText(n.selectedLabels()), t.triggerClose()
                    }
                }

                function E(e, n, o) {
                    var l, m = n[0], u = o.target[0].children[0], p = h[0].body, f = o.selectEl[0], g = o.contentEl[0], b = p.getBoundingClientRect(), E = u.getBoundingClientRect(), v = !1, M = {
                        left: b.left + d,
                        top: d,
                        bottom: b.height - d,
                        right: b.width - d - (c.floatingScrollbars() ? 16 : 0)
                    }, $ = {
                        top: E.top - M.top,
                        left: E.left - M.left,
                        right: M.right - (E.left + E.width),
                        bottom: M.bottom - (E.top + E.height)
                    }, y = b.width - 2 * d, C = g.scrollHeight > g.offsetHeight, A = f.querySelector("md-option[selected]"), T = f.getElementsByTagName("md-option"), w = f.getElementsByTagName("md-optgroup"), k = r(o.loadingAsync);
                    l = k ? g.firstElementChild || g : A ? A : w.length ? w[0] : T.length ? T[0] : g.firstElementChild || g, g.offsetWidth > y ? g.style["max-width"] = y + "px" : g.style.maxWidth = null, v && (g.style["min-width"] = E.width + "px"), C && f.classList.add("md-overflow");
                    var x = l;
                    "MD-OPTGROUP" === (x.tagName || "").toUpperCase() && (x = T[0] || g.firstElementChild || g, l = x), o.focusedNode = x, m.style.display = "block";
                    var N = f.getBoundingClientRect(), _ = a(l);
                    if (l) {
                        var H = s.getComputedStyle(l);
                        _.paddingLeft = parseInt(H.paddingLeft, 10) || 0, _.paddingRight = parseInt(H.paddingRight, 10) || 0
                    }
                    if (C) {
                        var S = g.offsetHeight / 2;
                        g.scrollTop = _.top + _.height / 2 - S, $.top < S ? g.scrollTop = Math.min(_.top, g.scrollTop + S - $.top) : $.bottom < S && (g.scrollTop = Math.max(_.top + _.height - N.height, g.scrollTop - S + $.bottom))
                    }
                    var D, I, O, R;
                    v ? (D = E.left, I = E.top + E.height, O = "50% 0", I + N.height > M.bottom && (I = E.top - N.height, O = "50% 100%")) : (D = E.left + _.left - _.paddingLeft + 2, I = Math.floor(E.top + E.height / 2 - _.height / 2 - _.top + g.scrollTop) + 4, O = _.left + E.width / 2 + "px " + (_.top + _.height / 2 - g.scrollTop) + "px 0px", R = Math.min(E.width + _.paddingLeft + _.paddingRight, y));
                    var L = m.getBoundingClientRect(), P = Math.round(100 * Math.min(E.width / N.width, 1)) / 100, F = Math.round(100 * Math.min(E.height / N.height, 1)) / 100;
                    return {
                        container: {
                            element: t.element(m),
                            styles: {
                                left: Math.floor(i(M.left, D, M.right - L.width)),
                                top: Math.floor(i(M.top, I, M.bottom - L.height)),
                                "min-width": R
                            }
                        },
                        dropDown: {
                            element: t.element(f),
                            styles: {
                                transformOrigin: O,
                                transform: o.alreadyOpen ? "" : c.supplant("scale({0},{1})", [P, F])
                            }
                        }
                    }
                }

                var v = "$mdSelect.show() expected a target element in options.target but got '{0}'!", M = c.dom.animator;
                return {parent: "body", themable: !0, onShow: g, onRemove: f, hasBackdrop: !0, disableParentScroll: !0}
            }

            function r(e) {
                return e && t.isFunction(e.then)
            }

            function i(e, t, n) {
                return Math.max(e, Math.min(t, n))
            }

            function a(e) {
                return e ? {
                    left: e.offsetLeft,
                    top: e.offsetTop,
                    width: e.offsetWidth,
                    height: e.offsetHeight
                } : {left: 0, top: 0, width: 0, height: 0}
            }

            return o.$inject = ["$mdSelect", "$mdConstant", "$mdUtil", "$window", "$q", "$$rAF", "$animateCss", "$animate", "$document"], e("$mdSelect").setDefaults({
                methods: ["target"],
                options: o
            })
        }

        var d = 8, c = 0;
        t.module("material.components.select", ["material.core", "material.components.backdrop"]).directive("mdSelect", e).directive("mdSelectMenu", o).directive("mdOption", r).directive("mdOptgroup", i).provider("$mdSelect", a), e.$inject = ["$mdSelect", "$mdUtil", "$mdTheming", "$mdAria", "$compile", "$parse"], o.$inject = ["$parse", "$mdUtil", "$mdTheming"], r.$inject = ["$mdButtonInkRipple", "$mdUtil"], a.$inject = ["$$interimElementProvider"]
    }(), function () {
        function e(e, t) {
            return ["$mdUtil", function (n) {
                return {
                    restrict: "A", multiElement: !0, link: function (o, r, i) {
                        var a = o.$on("$md-resize-enable", function () {
                            a(), o.$watch(i[e], function (e) {
                                !!e === t && (n.nextTick(function () {
                                    o.$broadcast("$md-resize")
                                }), n.dom.animator.waitTransitionEnd(r).then(function () {
                                    o.$broadcast("$md-resize")
                                }))
                            })
                        })
                    }
                }
            }]
        }

        t.module("material.components.showHide", ["material.core"]).directive("ngShow", e("ngShow", !0)).directive("ngHide", e("ngHide", !1))
    }(), function () {
        function e(e, n) {
            return function (o) {
                function r() {
                    return e.when(o).then(function (e) {
                        return d = e, e
                    })
                }

                var i, a = "SideNav '" + o + "' is not available!", d = e.get(o);
                return d || e.notFoundError(o), i = {
                    isOpen: function () {
                        return d && d.isOpen()
                    }, isLockedOpen: function () {
                        return d && d.isLockedOpen()
                    }, toggle: function () {
                        return d ? d.toggle() : n.reject(a)
                    }, open: function () {
                        return d ? d.open() : n.reject(a)
                    }, close: function () {
                        return d ? d.close() : n.reject(a)
                    }, then: function (e) {
                        var o = d ? n.when(d) : r();
                        return o.then(e || t.noop)
                    }
                }
            }
        }

        function o() {
            return {
                restrict: "A", require: "^mdSidenav", link: function (e, t, n, o) {
                }
            }
        }

        function r(e, o, r, i, a, d, c, s, l, m) {
            function u(d, u, p, h) {
                function f(e, t) {
                    d.isLockedOpen = e, e === t ? u.toggleClass("md-locked-open", !!e) : a[e ? "addClass" : "removeClass"](u, "md-locked-open"), w.toggleClass("md-locked-open", !!e)
                }

                function g(e) {
                    var t = o.findFocusTarget(u) || o.findFocusTarget(u, "[md-sidenav-focus]") || u, n = u.parent();
                    return n[e ? "on" : "off"]("keydown", v), w[e ? "on" : "off"]("click", M), e && (y = m[0].activeElement), b(e), C = l.all([e ? a.enter(w, n) : a.leave(w), a[e ? "removeClass" : "addClass"](u, "md-closed")]).then(function () {
                        d.isOpen && t && t.focus()
                    })
                }

                function b(e) {
                    var o = u.parent();
                    e && !$ ? ($ = o.css("overflow"), o.css("overflow", "hidden")) : t.isDefined($) && (o.css("overflow", $), $ = n)
                }

                function E(e) {
                    return d.isOpen == e ? l.when(!0) : l(function (t) {
                        d.isOpen = e, o.nextTick(function () {
                            C.then(function (e) {
                                d.isOpen || (y && y.focus(), y = null), t(e)
                            })
                        })
                    })
                }

                function v(e) {
                    var t = e.keyCode === r.KEY_CODE.ESCAPE;
                    return t ? M(e) : l.when(!0)
                }

                function M(e) {
                    return e.preventDefault(), h.close()
                }

                var $, y = null, C = l.when(!0), A = c(p.mdIsLockedOpen), T = function () {
                    return A(d.$parent, {
                        $media: function (t) {
                            return s.warn("$media is deprecated for is-locked-open. Use $mdMedia instead."), e(t)
                        }, $mdMedia: e
                    })
                }, w = o.createBackdrop(d, "md-sidenav-backdrop md-opaque ng-enter");
                i.inherit(w, u), u.on("$destroy", function () {
                    w.remove(), h.destroy()
                }), d.$on("$destroy", function () {
                    w.remove()
                }), d.$watch(T, f), d.$watch("isOpen", g), h.$toggleOpen = E
            }

            return {
                restrict: "E",
                scope: {isOpen: "=?mdIsOpen"},
                controller: "$mdSidenavController",
                compile: function (e) {
                    return e.addClass("md-closed"), e.attr("tabIndex", "-1"), u
                }
            }
        }

        function i(e, t, n, o, r) {
            var i = this;
            i.isOpen = function () {
                return !!e.isOpen
            }, i.isLockedOpen = function () {
                return !!e.isLockedOpen
            }, i.open = function () {
                return i.$toggleOpen(!0)
            }, i.close = function () {
                return i.$toggleOpen(!1)
            }, i.toggle = function () {
                return i.$toggleOpen(!e.isOpen)
            }, i.$toggleOpen = function (t) {
                return r.when(e.isOpen = t)
            }, i.destroy = o.register(i, n.mdComponentId)
        }

        t.module("material.components.sidenav", ["material.core", "material.components.backdrop"]).factory("$mdSidenav", e).directive("mdSidenav", r).directive("mdSidenavFocus", o).controller("$mdSidenavController", i), e.$inject = ["$mdComponentRegistry", "$q"], r.$inject = ["$mdMedia", "$mdUtil", "$mdConstant", "$mdTheming", "$animate", "$compile", "$parse", "$log", "$q", "$document"], i.$inject = ["$scope", "$element", "$attrs", "$mdComponentRegistry", "$q"]
    }(), function () {
        function e(e, n, o, r, i, a, d, c, s) {
            function l(e, t) {
                return e.attr({tabIndex: 0, role: "slider"}), o.expect(e, "aria-label"), m
            }

            function m(o, l, m, u) {
                function p() {
                    v(), C(), E()
                }

                function h(e) {
                    K = parseFloat(e), l.attr("aria-valuemin", e), p()
                }

                function f(e) {
                    G = parseFloat(e), l.attr("aria-valuemax", e), p()
                }

                function g(e) {
                    X = parseFloat(e), E()
                }

                function b(e) {
                    l.attr("aria-disabled", !!e)
                }

                function E() {
                    if (t.isDefined(m.mdDiscrete) && !t.isUndefined(X)) {
                        if (0 >= X) {
                            var e = "Slider step value must be greater than zero when in discrete mode";
                            throw s.error(e), new Error(e)
                        }
                        var o = Math.floor((G - K) / X);
                        if (!Q) {
                            Q = t.element('<canvas style="position:absolute;">'), j.append(Q);
                            var r = n.getComputedStyle(j[0]);
                            Z = Q[0].getContext("2d"), Z.fillStyle = r.backgroundColor || "black"
                        }
                        var i = M();
                        Q[0].width = i.width, Q[0].height = i.height;
                        for (var a, d = 0; o >= d; d++)a = Math.floor(i.width * (d / o)), Z.fillRect(a - 1, 0, 2, i.height)
                    }
                }

                function v() {
                    J = z[0].getBoundingClientRect()
                }

                function M() {
                    return V(), J
                }

                function $(e) {
                    if (!l[0].hasAttribute("disabled")) {
                        var t;
                        e.keyCode === i.KEY_CODE.LEFT_ARROW ? t = -X : e.keyCode === i.KEY_CODE.RIGHT_ARROW && (t = X), t && ((e.metaKey || e.ctrlKey || e.altKey) && (t *= 4), e.preventDefault(), e.stopPropagation(), o.$evalAsync(function () {
                            y(u.$viewValue + t)
                        }))
                    }
                }

                function y(e) {
                    u.$setViewValue(A(T(e)))
                }

                function C() {
                    isNaN(u.$viewValue) && (u.$viewValue = u.$modelValue);
                    var e = (u.$viewValue - K) / (G - K);
                    o.modelValue = u.$viewValue, l.attr("aria-valuenow", u.$viewValue), w(e), B.text(u.$viewValue)
                }

                function A(e) {
                    return t.isNumber(e) ? Math.max(K, Math.min(G, e)) : void 0
                }

                function T(e) {
                    if (t.isNumber(e)) {
                        var n = Math.round((e - K) / X) * X + K;
                        return Math.round(1e3 * n) / 1e3
                    }
                }

                function w(e) {
                    var t = 100 * e + "%";
                    q.css("width", t), U.css("left", t), l.toggleClass("md-min", 0 === e), l.toggleClass("md-max", 1 === e)
                }

                function k(e) {
                    if (!P()) {
                        l.addClass("md-active"), l[0].focus(), v();
                        var t = R(O(e.pointer.x)), n = A(T(t));
                        o.$apply(function () {
                            y(n), w(L(n))
                        })
                    }
                }

                function x(e) {
                    if (!P()) {
                        l.removeClass("md-dragging md-active");
                        var t = R(O(e.pointer.x)), n = A(T(t));
                        o.$apply(function () {
                            y(n), C()
                        })
                    }
                }

                function N(e) {
                    P() || (ee = !0, e.stopPropagation(), l.addClass("md-dragging"), S(e))
                }

                function _(e) {
                    ee && (e.stopPropagation(), S(e))
                }

                function H(e) {
                    ee && (e.stopPropagation(), ee = !1)
                }

                function S(e) {
                    te ? I(e.pointer.x) : D(e.pointer.x)
                }

                function D(e) {
                    o.$evalAsync(function () {
                        y(R(O(e)))
                    })
                }

                function I(e) {
                    var t = R(O(e)), n = A(T(t));
                    w(O(e)), B.text(n)
                }

                function O(e) {
                    return Math.max(0, Math.min(1, (e - J.left) / J.width))
                }

                function R(e) {
                    return K + e * (G - K)
                }

                function L(e) {
                    return (e - K) / (G - K)
                }

                a(l), u = u || {
                        $setViewValue: function (e) {
                            this.$viewValue = e, this.$viewChangeListeners.forEach(function (e) {
                                e()
                            })
                        }, $parsers: [], $formatters: [], $viewChangeListeners: []
                    };
                var P = t.noop;
                null != m.disabled ? P = function () {
                    return !0
                } : m.ngDisabled && (P = t.bind(null, c(m.ngDisabled), o.$parent));
                var F = t.element(l[0].querySelector(".md-thumb")), B = t.element(l[0].querySelector(".md-thumb-text")), U = F.parent(), z = t.element(l[0].querySelector(".md-track-container")), q = t.element(l[0].querySelector(".md-track-fill")), j = t.element(l[0].querySelector(".md-track-ticks")), V = r.throttle(v, 5e3);
                t.isDefined(m.min) ? m.$observe("min", h) : h(0), t.isDefined(m.max) ? m.$observe("max", f) : f(100), t.isDefined(m.step) ? m.$observe("step", g) : g(1);
                var W = t.noop;
                m.ngDisabled && (W = o.$parent.$watch(m.ngDisabled, b)), d.register(l, "drag"), l.on("keydown", $).on("$md.pressdown", k).on("$md.pressup", x).on("$md.dragstart", N).on("$md.drag", _).on("$md.dragend", H), setTimeout(p, 0);
                var Y = e.throttle(p);
                t.element(n).on("resize", Y), o.$on("$destroy", function () {
                    t.element(n).off("resize", Y), W()
                }), u.$render = C, u.$viewChangeListeners.push(C), u.$formatters.push(A), u.$formatters.push(T);
                var K, G, X, Q, Z, J = {};
                v();
                var ee = !1, te = t.isDefined(m.mdDiscrete)
            }

            return {
                scope: {},
                require: "?ngModel",
                template: '<div class="md-slider-wrapper"><div class="md-track-container"><div class="md-track"></div><div class="md-track md-track-fill"></div><div class="md-track-ticks"></div></div><div class="md-thumb-container"><div class="md-thumb"></div><div class="md-focus-thumb"></div><div class="md-focus-ring"></div><div class="md-sign"><span class="md-thumb-text"></span></div><div class="md-disabled-thumb"></div></div></div>',
                compile: l
            }
        }

        t.module("material.components.slider", ["material.core"]).directive("mdSlider", e), e.$inject = ["$$rAF", "$window", "$mdAria", "$mdUtil", "$mdConstant", "$mdTheming", "$mdGesture", "$parse", "$log"]
    }(), function () {
        function e(e, o, r, i) {
            function a(e) {
                function t(e, t) {
                    t.addClass("md-sticky-clone");
                    var n = {element: e, clone: t};
                    return f.items.push(n), i.nextTick(function () {
                        p.prepend(n.clone)
                    }), h(), function () {
                        f.items.forEach(function (t, n) {
                            t.element[0] === e[0] && (f.items.splice(n, 1), t.clone.remove())
                        }), h()
                    }
                }

                function a() {
                    f.items.forEach(d), f.items = f.items.sort(function (e, t) {
                        return e.top < t.top ? -1 : 1
                    });
                    for (var e, t = p.prop("scrollTop"), n = f.items.length - 1; n >= 0; n--)if (t > f.items[n].top) {
                        e = f.items[n];
                        break
                    }
                    l(e)
                }

                function d(e) {
                    var t = e.element[0];
                    for (e.top = 0, e.left = 0; t && t !== p[0];)e.top += t.offsetTop, e.left += t.offsetLeft, t = t.offsetParent;
                    e.height = e.element.prop("offsetHeight"), e.clone.css("margin-left", e.left + "px"), i.floatingScrollbars() && e.clone.css("margin-right", "0")
                }

                function s() {
                    var e = p.prop("scrollTop"), t = e > (s.prevScrollTop || 0);
                    if (s.prevScrollTop = e, 0 === e)return void l(null);
                    if (t) {
                        if (f.next && f.next.top <= e)return void l(f.next);
                        if (f.current && f.next && f.next.top - e <= f.next.height)return void u(f.current, e + (f.next.top - f.next.height - e))
                    }
                    if (!t) {
                        if (f.current && f.prev && e < f.current.top)return void l(f.prev);
                        if (f.next && f.current && e >= f.next.top - f.current.height)return void u(f.current, e + (f.next.top - e - f.current.height))
                    }
                    f.current && u(f.current, e)
                }

                function l(e) {
                    if (f.current !== e) {
                        f.current && (u(f.current, null), m(f.current, null)), e && m(e, "active"), f.current = e;
                        var t = f.items.indexOf(e);
                        f.next = f.items[t + 1], f.prev = f.items[t - 1], m(f.next, "next"), m(f.prev, "prev")
                    }
                }

                function m(e, t) {
                    e && e.state !== t && (e.state && (e.clone.attr("sticky-prev-state", e.state), e.element.attr("sticky-prev-state", e.state)), e.clone.attr("sticky-state", t), e.element.attr("sticky-state", t), e.state = t)
                }

                function u(e, t) {
                    e && (null === t || t === n ? e.translateY && (e.translateY = null, e.clone.css(o.CSS.TRANSFORM, "")) : (e.translateY = t, e.clone.css(o.CSS.TRANSFORM, "translate3d(" + e.left + "px," + t + "px,0)")))
                }

                var p = e.$element, h = r.throttle(a);
                c(p), p.on("$scrollstart", h), p.on("$scroll", s);
                var f;
                return f = {prev: null, current: null, next: null, items: [], add: t, refreshElements: a}
            }

            function d(n) {
                var o, r = t.element("<div>");
                e[0].body.appendChild(r[0]);
                for (var i = ["sticky", "-webkit-sticky"], a = 0; a < i.length; ++a)if (r.css({
                        position: i[a],
                        top: 0,
                        "z-index": 2
                    }), r.css("position") == i[a]) {
                    o = i[a];
                    break
                }
                return r.remove(), o
            }

            function c(e) {
                function t() {
                    +i.now() - o > a ? (n = !1, e.triggerHandler("$scrollend")) : (e.triggerHandler("$scroll"), r.throttle(t))
                }

                var n, o, a = 200;
                e.on("scroll touchmove", function () {
                    n || (n = !0, r.throttle(t), e.triggerHandler("$scrollstart")), e.triggerHandler("$scroll"), o = +i.now()
                })
            }

            var s = d();
            return function (e, t, n) {
                var o = t.controller("mdContent");
                if (o)if (s)t.css({position: s, top: 0, "z-index": 2}); else {
                    var r = o.$element.data("$$sticky");
                    r || (r = a(o), o.$element.data("$$sticky", r));
                    var i = r.add(t, n || t.clone());
                    e.$on("$destroy", i)
                }
            }
        }

        t.module("material.components.sticky", ["material.core", "material.components.content"]).factory("$mdSticky", e), e.$inject = ["$document", "$mdConstant", "$$rAF", "$mdUtil"]
    }(), function () {
        function e(e, n, o, r) {
            return {
                restrict: "E",
                replace: !0,
                transclude: !0,
                template: '<div class="md-subheader">  <div class="md-subheader-inner">    <span class="md-subheader-content"></span>  </div></div>',
                link: function (i, a, d, c, s) {
                    function l(e) {
                        return t.element(e[0].querySelector(".md-subheader-content"))
                    }

                    o(a);
                    var m = a[0].outerHTML;
                    s(i, function (e) {
                        l(a).append(e)
                    }), a.hasClass("md-no-sticky") || s(i, function (t) {
                        var o = '<div class="md-subheader-wrapper">' + m + "</div>", d = n(o)(i);
                        e(i, a, d), r.nextTick(function () {
                            l(d).append(t)
                        })
                    })
                }
            }
        }

        t.module("material.components.subheader", ["material.core", "material.components.sticky"]).directive("mdSubheader", e), e.$inject = ["$mdSticky", "$compile", "$mdTheming", "$mdUtil"]
    }(), function () {
        function e(e) {
            function t(e) {
                function t(t, r, i) {
                    var a = e(i[n]);
                    r.on(o, function (e) {
                        t.$apply(function () {
                            a(t, {$event: e})
                        })
                    })
                }

                return {restrict: "A", link: t}
            }

            var n = "md" + e, o = "$md." + e.toLowerCase();
            return t.$inject = ["$parse"], t
        }

        t.module("material.components.swipe", ["material.core"]).directive("mdSwipeLeft", e("SwipeLeft")).directive("mdSwipeRight", e("SwipeRight")).directive("mdSwipeUp", e("SwipeUp")).directive("mdSwipeDown", e("SwipeDown"))
    }(), function () {
        function e(e, n, o, r, i, a) {
            function d(e, d) {
                var s = c.compile(e, d);
                return e.addClass("md-dragging"), function (e, d, c, l) {
                    function m(t) {
                        f && f(e) || (t.stopPropagation(), d.addClass("md-dragging"), E = {width: g.prop("offsetWidth")}, d.removeClass("transition"))
                    }

                    function u(e) {
                        if (E) {
                            e.stopPropagation(), e.srcEvent && e.srcEvent.preventDefault();
                            var t = e.pointer.distanceX / E.width, n = l.$viewValue ? 1 + t : t;
                            n = Math.max(0, Math.min(1, n)), g.css(o.CSS.TRANSFORM, "translate3d(" + 100 * n + "%,0,0)"), E.translate = n
                        }
                    }

                    function p(e) {
                        if (E) {
                            e.stopPropagation(), d.removeClass("md-dragging"), g.css(o.CSS.TRANSFORM, "");
                            var t = l.$viewValue ? E.translate > .5 : E.translate < .5;
                            t && h(!l.$viewValue), E = null
                        }
                    }

                    function h(t) {
                        e.$apply(function () {
                            l.$setViewValue(t), l.$render()
                        })
                    }

                    l = l || n.fakeNgModel();
                    var f = null;
                    null != c.disabled ? f = function () {
                        return !0
                    } : c.ngDisabled && (f = r(c.ngDisabled));
                    var g = t.element(d[0].querySelector(".md-thumb-container")), b = t.element(d[0].querySelector(".md-container"));
                    i(function () {
                        d.removeClass("md-dragging")
                    }), s(e, d, c, l), f && e.$watch(f, function (e) {
                        d.attr("tabindex", e ? -1 : 0)
                    }), a.register(b, "drag"), b.on("$md.dragstart", m).on("$md.drag", u).on("$md.dragend", p);
                    var E
                }
            }

            var c = e[0];
            return {
                restrict: "E",
                priority: 210,
                transclude: !0,
                template: '<div class="md-container"><div class="md-bar"></div><div class="md-thumb-container"><div class="md-thumb" md-ink-ripple md-ink-ripple-checkbox></div></div></div><div ng-transclude class="md-label"></div>',
                require: "?ngModel",
                compile: d
            }
        }

        t.module("material.components.switch", ["material.core", "material.components.checkbox"]).directive("mdSwitch", e), e.$inject = ["mdCheckboxDirective", "$mdUtil", "$mdConstant", "$parse", "$$rAF", "$mdGesture"]
    }(), function () {
        t.module("material.components.tabs", ["material.core", "material.components.icon"])
    }(), function () {
        function e(e) {
            return {
                restrict: "E", link: function (t, n, o) {
                    t.$on("$destroy", function () {
                        e.destroy()
                    })
                }
            }
        }

        function n(e) {
            function n(e) {
                r = e
            }

            function o(e, n, o, i) {
                function a(t, a, d) {
                    r = d.textContent || d.content;
                    var l = !i("gt-sm");
                    return a = o.extractElementByName(a, "md-toast", !0), d.onSwipe = function (e, t) {
                        var r = e.type.replace("$md.", ""), i = r.replace("swipe", "");
                        "down" === i && -1 != d.position.indexOf("top") && !l || "up" === i && (-1 != d.position.indexOf("bottom") || l) || ("left" !== i && "right" !== i || !l) && (a.addClass("md-" + r), o.nextTick(n.cancel))
                    }, d.openClass = c(d.position), d.parent.addClass(d.openClass), o.hasComputedStyle(d.parent, "position", "static") && d.parent.css("position", "relative"), a.on(s, d.onSwipe), a.addClass(l ? "md-bottom" : d.position.split(" ").map(function (e) {
                        return "md-" + e
                    }).join(" ")), d.parent && d.parent.addClass("md-toast-animating"), e.enter(a, d.parent).then(function () {
                        d.parent && d.parent.removeClass("md-toast-animating")
                    })
                }

                function d(t, n, r) {
                    return n.off(s, r.onSwipe), r.parent && r.parent.addClass("md-toast-animating"), r.openClass && r.parent.removeClass(r.openClass), (1 == r.$destroy ? n.remove() : e.leave(n)).then(function () {
                        r.parent && r.parent.removeClass("md-toast-animating"), o.hasComputedStyle(r.parent, "position", "static") && r.parent.css("position", "")
                    })
                }

                function c(e) {
                    return i("gt-sm") ? "md-toast-open-" + (e.indexOf("top") > -1 ? "top" : "bottom") : "md-toast-open-bottom"
                }

                var s = "$md.swipeleft $md.swiperight $md.swipeup $md.swipedown";
                return {
                    onShow: a,
                    onRemove: d,
                    position: "bottom left",
                    themable: !0,
                    hideDelay: 3e3,
                    autoWrap: !0,
                    transformTemplate: function (e, n) {
                        var o = n.autoWrap && e && !/md-toast-content/g.test(e);
                        if (o) {
                            var r = t.element(e), i = '<div class="md-toast-content">' + r.html() + "</div>";
                            return r.empty().append(i), r[0].outerHTML
                        }
                        return o ? '<div class="md-toast-content">' + e + "</div>" : e || ""
                    }
                }
            }

            var r, i = "ok", a = e("$mdToast").setDefaults({
                methods: ["position", "hideDelay", "capsule", "parent"],
                options: o
            }).addPreset("simple", {
                argOption: "textContent",
                methods: ["textContent", "content", "action", "highlightAction", "theme", "parent"],
                options: ["$mdToast", "$mdTheming", function (e, t) {
                    var n = {
                        template: '<md-toast md-theme="{{ toast.theme }}" ng-class="{\'md-capsule\': toast.capsule}">  <div class="md-toast-content">    <span flex role="alert" aria-relevant="all" aria-atomic="true">      {{ toast.content }}    </span>    <md-button class="md-action" ng-if="toast.action" ng-click="toast.resolve()" ng-class="{\'md-highlight\': toast.highlightAction}">      {{ toast.action }}    </md-button>  </div></md-toast>',
                        controller: ["$scope", function (t) {
                            var n = this;
                            t.$watch(function () {
                                return r
                            }, function () {
                                n.content = r
                            }), this.resolve = function () {
                                e.hide(i)
                            }
                        }],
                        theme: t.defaultTheme(),
                        controllerAs: "toast",
                        bindToController: !0
                    };
                    return n
                }]
            }).addMethod("updateTextContent", n).addMethod("updateContent", n);
            return o.$inject = ["$animate", "$mdToast", "$mdUtil", "$mdMedia"], a
        }

        t.module("material.components.toast", ["material.core", "material.components.button"]).directive("mdToast", e).provider("$mdToast", n), e.$inject = ["$mdToast"], n.$inject = ["$$interimElementProvider"]
    }(), function () {
        function e(e, n, o, r, i) {
            var a = t.bind(null, o.supplant, "translate3d(0,{0}px,0)");
            return {
                template: "", restrict: "E", link: function (d, c, s) {
                    function l() {
                        function r(e) {
                            var t = c.parent().find("md-content");
                            !f && t.length && l(null, t), e = d.$eval(e), e === !1 ? g() : g = u()
                        }

                        function l(e, t) {
                            t && c.parent()[0] === t.parent()[0] && (f && f.off("scroll", M), f = t, g = u())
                        }

                        function m(e) {
                            var t = e ? e.target.scrollTop : E;
                            $(), b = Math.min(h / v, Math.max(0, b + t - E)), c.css(n.CSS.TRANSFORM, a([-b * v])), f.css(n.CSS.TRANSFORM, a([(h - b) * v])), E = t, o.nextTick(function () {
                                var e = c.hasClass("md-whiteframe-z1");
                                e && !b ? i.removeClass(c, "md-whiteframe-z1") : !e && b && i.addClass(c, "md-whiteframe-z1")
                            })
                        }

                        function u() {
                            return f ? (f.on("scroll", M), f.attr("scroll-shrink", "true"), e(p), function () {
                                f.off("scroll", M), f.attr("scroll-shrink", "false"), e(p)
                            }) : t.noop
                        }

                        function p() {
                            h = c.prop("offsetHeight");
                            var e = -h * v + "px";
                            f.css({"margin-top": e, "margin-bottom": e}), m()
                        }

                        var h, f, g = t.noop, b = 0, E = 0, v = s.mdShrinkSpeedFactor || .5, M = e.throttle(m), $ = o.debounce(p, 5e3);
                        d.$on("$mdContentLoaded", l), s.$observe("mdScrollShrink", r), s.ngShow && d.$watch(s.ngShow, p), s.ngHide && d.$watch(s.ngHide, p), d.$on("$destroy", g)
                    }

                    r(c), t.isDefined(s.mdScrollShrink) && l()
                }
            }
        }

        t.module("material.components.toolbar", ["material.core", "material.components.content"]).directive("mdToolbar", e), e.$inject = ["$$rAF", "$mdConstant", "$mdUtil", "$mdTheming", "$animate"]
    }(), function () {
        function e(e, n, o, r, i, a, d, c, s) {
            function l(d, l, p) {
                function h() {
                    t.isDefined(p.mdDelay) || (d.delay = m)
                }

                function f() {
                    var e = "center top";
                    switch (d.direction) {
                        case"left":
                            e = "right center";
                            break;
                        case"right":
                            e = "left center";
                            break;
                        case"top":
                            e = "center bottom";
                            break;
                        case"bottom":
                            e = "center top"
                    }
                    w.css("transform-origin", e)
                }

                function g() {
                    d.$on("$destroy", function () {
                        d.visible = !1, l.remove(), t.element(n).off("resize", x)
                    }), d.$watch("visible", function (e) {
                        e ? $() : y()
                    }), d.$watch("direction", C)
                }

                function b() {
                    T.attr("aria-label") || T.text().trim() || T.attr("aria-label", l.text().trim())
                }

                function E() {
                    l.detach(), l.attr("role", "tooltip")
                }

                function v() {
                    function e() {
                        M(!1)
                    }

                    var o = !1, i = t.element(n);
                    if (T[0] && "MutationObserver" in n) {
                        var a = new MutationObserver(function (e) {
                            e.forEach(function (e) {
                                "disabled" === e.attributeName && T[0].disabled && (M(!1), d.$digest())
                            })
                        });
                        a.observe(T[0], {attributes: !0})
                    }
                    var c = function () {
                        s = document.activeElement === T[0]
                    }, s = !1;
                    i.on("blur", c), i.on("resize", x), document.addEventListener("scroll", e, !0), d.$on("$destroy", function () {
                        i.off("blur", c), i.off("resize", x), document.removeEventListener("scroll", e, !0), a && a.disconnect()
                    });
                    var l = function (e) {
                        return "focus" === e.type && s ? void(s = !1) : (T.on("blur mouseleave touchend touchcancel", m), void M(!0))
                    }, m = function () {
                        var e = d.hasOwnProperty("autohide") ? d.autohide : p.hasOwnProperty("mdAutohide");
                        (e || o || r[0].activeElement !== T[0]) && (T.off("blur mouseleave touchend touchcancel", m), T.triggerHandler("blur"), M(!1)), o = !1
                    };
                    T.on("mousedown", function () {
                        o = !0
                    }), T.on("focus mouseenter touchstart", l)
                }

                function M(t) {
                    M.value = !!t, M.queued || (t ? (M.queued = !0, e(function () {
                        d.visible = M.value, M.queued = !1
                    }, d.delay)) : i.nextTick(function () {
                        d.visible = !1
                    }))
                }

                function $() {
                    return k.append(l), i.hasComputedStyle(l, "display", "none") ? (d.visible = !1, void l.detach()) : (C(), void t.forEach([l, w], function (e) {
                        c.addClass(e, "md-show")
                    }))
                }

                function y() {
                    var e = [];
                    t.forEach([l, w], function (t) {
                        t.parent() && t.hasClass("md-show") && e.push(c.removeClass(t, "md-show"))
                    }), s.all(e).then(function () {
                        d.visible || l.detach()
                    })
                }

                function C() {
                    d.visible && (f(), A())
                }

                function A() {
                    function e(e) {
                        var t = {left: e.left, top: e.top};
                        return t.left = Math.min(t.left, k.prop("scrollWidth") - n.width - u), t.left = Math.max(t.left, u), t.top = Math.min(t.top, k.prop("scrollHeight") - n.height - u), t.top = Math.max(t.top, u), t
                    }

                    function t(e) {
                        return "left" === e ? {
                            left: o.left - n.width - u,
                            top: o.top + o.height / 2 - n.height / 2
                        } : "right" === e ? {
                            left: o.left + o.width + u,
                            top: o.top + o.height / 2 - n.height / 2
                        } : "top" === e ? {
                            left: o.left + o.width / 2 - n.width / 2,
                            top: o.top - n.height - u
                        } : {left: o.left + o.width / 2 - n.width / 2, top: o.top + o.height + u}
                    }

                    var n = i.offsetRect(l, k), o = i.offsetRect(T, k), r = t(d.direction), a = l.prop("offsetParent");
                    d.direction ? r = e(r) : a && r.top > a.scrollHeight - n.height - u && (r = e(t("top"))), l.css({
                        left: r.left + "px",
                        top: r.top + "px"
                    })
                }

                a(l);
                var T = i.getParentWithPointerEvents(l), w = t.element(l[0].getElementsByClassName("md-content")[0]), k = t.element(document.body), x = o.throttle(function () {
                    C()
                });
                c.pin && c.pin(l, T), h(), E(), v(), f(), g(), b()
            }

            var m = 0, u = 8;
            return {
                restrict: "E",
                transclude: !0,
                priority: 210,
                template: '<div class="md-content" ng-transclude></div>',
                scope: {
                    delay: "=?mdDelay",
                    visible: "=?mdVisible",
                    autohide: "=?mdAutohide",
                    direction: "@?mdDirection"
                },
                link: l
            }
        }

        t.module("material.components.tooltip", ["material.core"]).directive("mdTooltip", e), e.$inject = ["$timeout", "$window", "$$rAF", "$document", "$mdUtil", "$mdTheming", "$rootElement", "$animate", "$q"]
    }(), function () {
        function e() {
            return {
                controller: o, template: n, compile: function (e, t) {
                    e.addClass("md-virtual-repeat-container").addClass(t.hasOwnProperty("mdOrientHorizontal") ? "md-orient-horizontal" : "md-orient-vertical")
                }
            }
        }

        function n(e) {
            return '<div class="md-virtual-repeat-scroller"><div class="md-virtual-repeat-sizer"></div><div class="md-virtual-repeat-offsetter">' + e[0].innerHTML + "</div></div>"
        }

        function o(e, n, o, r, i, a, d, c) {
            this.$rootScope = r, this.$scope = a, this.$element = d, this.$attrs = c, this.size = 0, this.scrollSize = 0, this.scrollOffset = 0, this.horizontal = this.$attrs.hasOwnProperty("mdOrientHorizontal"), this.repeater = null, this.autoShrink = this.$attrs.hasOwnProperty("mdAutoShrink"), this.autoShrinkMin = parseInt(this.$attrs.mdAutoShrinkMin, 10) || 0, this.originalSize = null, this.offsetSize = parseInt(this.$attrs.mdOffsetSize, 10) || 0, this.$attrs.mdTopIndex ? (this.bindTopIndex = o(this.$attrs.mdTopIndex), this.topIndex = this.bindTopIndex(this.$scope), t.isDefined(this.topIndex) || (this.topIndex = 0, this.bindTopIndex.assign(this.$scope, 0)), this.$scope.$watch(this.bindTopIndex, t.bind(this, function (e) {
                e !== this.topIndex && this.scrollToIndex(e)
            }))) : this.topIndex = 0, this.scroller = d[0].getElementsByClassName("md-virtual-repeat-scroller")[0], this.sizer = this.scroller.getElementsByClassName("md-virtual-repeat-sizer")[0], this.offsetter = this.scroller.getElementsByClassName("md-virtual-repeat-offsetter")[0];
            var s = t.bind(this, this.updateSize);
            e(t.bind(this, function () {
                s();
                var e = n.debounce(s, 10, null, !1), o = t.element(i);
                this.size || e(), o.on("resize", e), a.$on("$destroy", function () {
                    o.off("resize", e)
                }), a.$emit("$md-resize-enable"), a.$on("$md-resize", s)
            }))
        }

        function r(e) {
            return {
                controller: i,
                priority: 1e3,
                require: ["mdVirtualRepeat", "^^mdVirtualRepeatContainer"],
                restrict: "A",
                terminal: !0,
                transclude: "element",
                compile: function (t, n) {
                    var o = n.mdVirtualRepeat, r = o.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)\s*$/), i = r[1], a = e(r[2]), d = n.mdExtraName && e(n.mdExtraName);
                    return function (e, t, n, o, r) {
                        o[0].link_(o[1], r, i, a, d)
                    }
                }
            }
        }

        function i(e, n, o, r, i, a, d) {
            this.$scope = e, this.$element = n, this.$attrs = o, this.$browser = r, this.$document = i, this.$rootScope = a, this.$$rAF = d, this.onDemand = o.hasOwnProperty("mdOnDemand"), this.browserCheckUrlChange = r.$$checkUrlChange, this.newStartIndex = 0, this.newEndIndex = 0, this.newVisibleEnd = 0, this.startIndex = 0, this.endIndex = 0, this.itemSize = e.$eval(o.mdItemSize) || null, this.isFirstRender = !0, this.isVirtualRepeatUpdating_ = !1, this.itemsLength = 0, this.unwatchItemSize_ = t.noop, this.blocks = {}, this.pooledBlocks = []
        }

        function a(e) {
            if (!t.isFunction(e.getItemAtIndex) || !t.isFunction(e.getLength))throw Error("When md-on-demand is enabled, the Object passed to md-virtual-repeat must implement functions getItemAtIndex() and getLength() ");
            this.model = e
        }

        t.module("material.components.virtualRepeat", ["material.core", "material.components.showHide"]).directive("mdVirtualRepeatContainer", e).directive("mdVirtualRepeat", r);
        var d = 1533917, c = 3;
        o.$inject = ["$$rAF", "$mdUtil", "$parse", "$rootScope", "$window", "$scope", "$element", "$attrs"], o.prototype.register = function (e) {
            this.repeater = e, t.element(this.scroller).on("scroll wheel touchmove touchend", t.bind(this, this.handleScroll_))
        }, o.prototype.isHorizontal = function () {
            return this.horizontal
        }, o.prototype.getSize = function () {
            return this.size
        }, o.prototype.setSize_ = function (e) {
            this.size = e, this.$element[0].style[this.isHorizontal() ? "width" : "height"] = e + "px"
        }, o.prototype.updateSize = function () {
            this.originalSize || (this.size = this.isHorizontal() ? this.$element[0].clientWidth : this.$element[0].clientHeight, this.repeater && this.repeater.containerUpdated())
        }, o.prototype.getScrollSize = function () {
            return this.scrollSize
        }, o.prototype.sizeScroller_ = function (e) {
            var t = this.isHorizontal() ? "width" : "height", n = this.isHorizontal() ? "height" : "width";
            if (this.sizer.innerHTML = "", d > e)this.sizer.style[t] = e + "px"; else {
                this.sizer.style[t] = "auto", this.sizer.style[n] = "auto";
                var o = Math.floor(e / d), r = document.createElement("div");
                r.style[t] = d + "px", r.style[n] = "1px";
                for (var i = 0; o > i; i++)this.sizer.appendChild(r.cloneNode(!1));
                r.style[t] = e - o * d + "px", this.sizer.appendChild(r)
            }
        }, o.prototype.autoShrink_ = function (e) {
            var t = Math.max(e, this.autoShrinkMin * this.repeater.getItemSize());
            if (this.autoShrink && t !== this.size) {
                var n = this.originalSize || this.size;
                !n || n > t ? (this.originalSize || (this.originalSize = this.size), this.setSize_(t)) : this.originalSize && (this.setSize_(this.originalSize), this.originalSize = null), this.repeater.containerUpdated()
            }
        }, o.prototype.setScrollSize = function (e) {
            var t = e + this.offsetSize;
            this.scrollSize !== t && (this.sizeScroller_(t), this.autoShrink_(t), this.scrollSize = t)
        }, o.prototype.getScrollOffset = function () {
            return this.scrollOffset
        }, o.prototype.scrollTo = function (e) {
            this.scroller[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = e, this.handleScroll_()
        }, o.prototype.scrollToIndex = function (e) {
            var t = this.repeater.getItemSize(), n = this.repeater.itemsLength;
            e > n && (e = n - 1), this.scrollTo(t * e)
        }, o.prototype.resetScroll = function () {
            this.scrollTo(0)
        }, o.prototype.handleScroll_ = function () {
            var e = this.isHorizontal() ? this.scroller.scrollLeft : this.scroller.scrollTop;
            if (e !== this.scrollOffset) {
                var t = this.repeater.getItemSize();
                if (t) {
                    var n = Math.max(0, Math.floor(e / t) - c), o = this.isHorizontal() ? "translateX(" : "translateY(";
                    if (o += n * t + "px)", this.scrollOffset = e, this.offsetter.style.webkitTransform = o, this.offsetter.style.transform = o, this.bindTopIndex) {
                        var r = Math.floor(e / t);
                        r !== this.topIndex && r < this.repeater.itemsLength && (this.topIndex = r, this.bindTopIndex.assign(this.$scope, r), this.$rootScope.$$phase || this.$scope.$digest())
                    }
                    this.repeater.containerUpdated()
                }
            }
        }, r.$inject = ["$parse"], i.$inject = ["$scope", "$element", "$attrs", "$browser", "$document", "$rootScope", "$$rAF"], i.Block, i.prototype.link_ = function (e, n, o, r, i) {
            this.container = e, this.transclude = n, this.repeatName = o, this.rawRepeatListExpression = r, this.extraName = i, this.sized = !1, this.repeatListExpression = t.bind(this, this.repeatListExpression_), this.container.register(this)
        }, i.prototype.readItemSize_ = function () {
            if (!this.itemSize) {
                this.items = this.repeatListExpression(this.$scope), this.parentNode = this.$element[0].parentNode;
                var e = this.getBlock_(0);
                e.element[0].parentNode || this.parentNode.appendChild(e.element[0]), this.itemSize = e.element[0][this.container.isHorizontal() ? "offsetWidth" : "offsetHeight"] || null, this.blocks[0] = e, this.poolBlock_(0), this.itemSize && this.containerUpdated()
            }
        }, i.prototype.repeatListExpression_ = function (e) {
            var t = this.rawRepeatListExpression(e);
            if (this.onDemand && t) {
                var n = new a(t);
                return n.$$includeIndexes(this.newStartIndex, this.newVisibleEnd), n
            }
            return t
        }, i.prototype.containerUpdated = function () {
            return this.itemSize ? (this.sized || (this.items = this.repeatListExpression(this.$scope)), this.sized || (this.unwatchItemSize_(), this.sized = !0, this.$scope.$watchCollection(this.repeatListExpression, t.bind(this, function (e, t) {
                this.isVirtualRepeatUpdating_ || this.virtualRepeatUpdate_(e, t)
            }))), this.updateIndexes_(), void((this.newStartIndex !== this.startIndex || this.newEndIndex !== this.endIndex || this.container.getScrollOffset() > this.container.getScrollSize()) && (this.items instanceof a && this.items.$$includeIndexes(this.newStartIndex, this.newEndIndex), this.virtualRepeatUpdate_(this.items, this.items)))) : (this.unwatchItemSize_ = this.$scope.$watchCollection(this.repeatListExpression, t.bind(this, function (e) {
                e && e.length && this.$$rAF(t.bind(this, this.readItemSize_))
            })), void(this.$rootScope.$$phase || this.$scope.$digest()))
        }, i.prototype.getItemSize = function () {
            return this.itemSize
        }, i.prototype.virtualRepeatUpdate_ = function (e, n) {
            this.isVirtualRepeatUpdating_ = !0;
            var o = e && e.length || 0, r = !1;
            if (this.items && o < this.items.length && 0 !== this.container.getScrollOffset())return this.items = e, void this.container.resetScroll();
            if (o !== this.itemsLength && (r = !0, this.itemsLength = o), this.items = e, (e !== n || r) && this.updateIndexes_(), this.parentNode = this.$element[0].parentNode, r && this.container.setScrollSize(o * this.itemSize), this.isFirstRender) {
                this.isFirstRender = !1;
                var i = this.$attrs.mdStartIndex ? this.$scope.$eval(this.$attrs.mdStartIndex) :
                    this.container.topIndex;
                this.container.scrollToIndex(i)
                this.container.scrollToIndex(i);


            }
            Object.keys(this.blocks).forEach(function (e) {
                var t = parseInt(e, 10);
                (t < this.newStartIndex || t >= this.newEndIndex) && this.poolBlock_(t)
            }, this), this.$browser.$$checkUrlChange = t.noop;
            var a, d, c = [], s = [];
            for (a = this.newStartIndex; a < this.newEndIndex && null == this.blocks[a]; a++)d = this.getBlock_(a), this.updateBlock_(d, a), c.push(d);
            for (; null != this.blocks[a]; a++)this.updateBlock_(this.blocks[a], a);
            for (var l = a - 1; a < this.newEndIndex; a++)d = this.getBlock_(a), this.updateBlock_(d, a), s.push(d);
            c.length && this.parentNode.insertBefore(this.domFragmentFromBlocks_(c), this.$element[0].nextSibling), s.length && this.parentNode.insertBefore(this.domFragmentFromBlocks_(s), this.blocks[l] && this.blocks[l].element[0].nextSibling), this.$browser.$$checkUrlChange = this.browserCheckUrlChange, this.startIndex = this.newStartIndex, this.endIndex = this.newEndIndex, this.isVirtualRepeatUpdating_ = !1
        }, i.prototype.getBlock_ = function (e) {
            if (this.pooledBlocks.length)return this.pooledBlocks.pop();
            var n;
            return this.transclude(t.bind(this, function (t, o) {
                n = {element: t, "new": !0, scope: o}, this.updateScope_(o, e), this.parentNode.appendChild(t[0])
            })), n
        }, i.prototype.updateBlock_ = function (e, t) {
            this.blocks[t] = e, (e["new"] || e.scope.$index !== t || e.scope[this.repeatName] !== this.items[t]) && (e["new"] = !1, this.updateScope_(e.scope, t), this.$rootScope.$$phase || e.scope.$digest())
        }, i.prototype.updateScope_ = function (e, t) {
            e.$index = t, e[this.repeatName] = this.items && this.items[t], this.extraName && (e[this.extraName(this.$scope)] = this.items[t])
        }, i.prototype.poolBlock_ = function (e) {
            this.pooledBlocks.push(this.blocks[e]), this.parentNode.removeChild(this.blocks[e].element[0]), delete this.blocks[e]
        }, i.prototype.domFragmentFromBlocks_ = function (e) {
            var t = this.$document[0].createDocumentFragment();
            return e.forEach(function (e) {
                t.appendChild(e.element[0])
            }), t
        }, i.prototype.updateIndexes_ = function () {
            var e = this.items ? this.items.length : 0, t = Math.ceil(this.container.getSize() / this.itemSize);
            this.newStartIndex = Math.max(0, Math.min(e - t, Math.floor(this.container.getScrollOffset() / this.itemSize))), this.newVisibleEnd = this.newStartIndex + t + c, this.newEndIndex = Math.min(e, this.newVisibleEnd), this.newStartIndex = Math.max(0, this.newStartIndex - c)
        }, a.prototype.$$includeIndexes = function (e, t) {
            for (var n = e; t > n; n++)this.hasOwnProperty(n) || (this[n] = this.model.getItemAtIndex(n));
            this.length = this.model.getLength()
        }
    }(), function () {
        t.module("material.components.whiteframe", [])
    }(), function () {
        function e(e, o, d, c, s, l, m, u, p, h) {
            function f() {
                d.initOptionalProperties(e, p, {
                    searchText: null,
                    selectedItem: null
                }), s(o), v(), d.nextTick(function () {
                    $(), b(), E(), o.on("focus", E)
                })
            }

            function g() {
                function t() {
                    var e = 0, t = o.find("md-input-container");
                    if (t.length) {
                        var n = t.find("input");
                        e = t.prop("offsetHeight"), e -= n.prop("offsetTop"), e -= n.prop("offsetHeight"), e += t.prop("offsetTop")
                    }
                    return e
                }

                function n() {
                    var e = me.scrollContainer.getBoundingClientRect(), t = {};
                    e.right > m.right - i && (t.left = s.right - e.width + "px"), me.$.scrollContainer.css(t)
                }

                if (!me)return d.nextTick(g, !1, e);
                var c, s = me.wrap.getBoundingClientRect(), l = me.snap.getBoundingClientRect(), m = me.root.getBoundingClientRect(), u = l.bottom - m.top, h = m.bottom - l.top, f = s.left - m.left, b = s.width, E = t();
                p.mdFloatingLabel && (f += a, b -= 2 * a), c = {
                    left: f + "px",
                    minWidth: b + "px",
                    maxWidth: Math.max(s.right - m.left, m.right - s.left) - i + "px"
                }, u > h && m.height - s.bottom - i < r ? (c.top = "auto", c.bottom = h + "px", c.maxHeight = Math.min(r, s.top - m.top - i) + "px") : (c.top = u - E + "px", c.bottom = "auto", c.maxHeight = Math.min(r, m.bottom + d.scrollTop() - s.bottom - i) + "px"), me.$.scrollContainer.css(c), d.nextTick(n, !1)
            }

            function b() {
                me.$.root.length && (s(me.$.scrollContainer), me.$.scrollContainer.detach(), me.$.root.append(me.$.scrollContainer), m.pin && m.pin(me.$.scrollContainer, u))
            }

            function E() {
                e.autofocus && me.input.focus()
            }

            function v() {
                var n = parseInt(e.delay, 10) || 0;
                p.$observe("disabled", function (e) {
                    ce.isDisabled = !!e
                }), p.$observe("required", function (e) {
                    ce.isRequired = !!e
                }), e.$watch("searchText", n ? d.debounce(I, n) : I), e.$watch("selectedItem", x), t.element(l).on("resize", g), e.$on("$destroy", M)
            }

            function M() {
                if (t.element(l).off("resize", g), me) {
                    var e = "ul scroller scrollContainer input".split(" ");
                    t.forEach(e, function (e) {
                        me.$[e].remove()
                    })
                }
            }

            function $() {
                me = {
                    main: o[0],
                    scrollContainer: o[0].getElementsByClassName("md-virtual-repeat-container")[0],
                    scroller: o[0].getElementsByClassName("md-virtual-repeat-scroller")[0],
                    ul: o.find("ul")[0],
                    input: o.find("input")[0],
                    wrap: o.find("md-autocomplete-wrap")[0],
                    root: document.body
                }, me.li = me.ul.getElementsByTagName("li"), me.snap = y(), me.$ = C(me)
            }

            function y() {
                for (var e = o; e.length; e = e.parent())if (t.isDefined(e.attr("md-autocomplete-snap")))return e[0];
                return me.wrap
            }

            function C(e) {
                var n = {};
                for (var o in e)e.hasOwnProperty(o) && (n[o] = t.element(e[o]));
                return n
            }

            function A(t, n) {
                !t && n ? (g(), me && d.nextTick(function () {
                    d.disableScrollAround(me.ul)
                }, !1, e)) : t && !n && d.nextTick(function () {
                    d.enableScrolling()
                }, !1, e)
            }

            function T() {
                pe = !0
            }

            function w() {
                fe || me.input.focus(), pe = !1, ce.hidden = j()
            }

            function k() {
                me.input.focus()
            }

            function x(t, n) {
                t && B(t).then(function (o) {
                    e.searchText = o, H(t, n)
                }), t !== n && N()
            }

            function N() {
                t.isFunction(e.itemChange) && e.itemChange(U(e.selectedItem))
            }

            function _() {
                t.isFunction(e.textChange) && e.textChange()
            }

            function H(e, t) {
                he.forEach(function (n) {
                    n(e, t)
                })
            }

            function S(e) {
                -1 == he.indexOf(e) && he.push(e)
            }

            function D(e) {
                var t = he.indexOf(e);
                -1 != t && he.splice(t, 1)
            }

            function I(t, n) {
                ce.index = z(), t !== n && B(e.selectedItem).then(function (o) {
                    t !== o && (e.selectedItem = null, t !== n && _(), X() ? ae() : (ce.matches = [], q(!1), te()))
                })
            }

            function O() {
                fe = !1, pe || (ce.hidden = j())
            }

            function R(e) {
                e && (pe = !1, fe = !1), me.input.blur()
            }

            function L() {
                fe = !0, t.isString(e.searchText) || (e.searchText = ""), ce.hidden = j(), ce.hidden || ae()
            }

            function P(e) {
                switch (e.keyCode) {
                    case c.KEY_CODE.DOWN_ARROW:
                        if (ce.loading)return;
                        e.stopPropagation(), e.preventDefault(), ce.index = Math.min(ce.index + 1, ce.matches.length - 1), oe(), te();
                        break;
                    case c.KEY_CODE.UP_ARROW:
                        if (ce.loading)return;
                        e.stopPropagation(), e.preventDefault(), ce.index = ce.index < 0 ? ce.matches.length - 1 : Math.max(0, ce.index - 1), oe(), te();
                        break;
                    case c.KEY_CODE.TAB:
                        if (w(), ce.hidden || ce.loading || ce.index < 0 || ce.matches.length < 1)return;
                        Z(ce.index);
                        break;
                    case c.KEY_CODE.ENTER:
                        if (ce.hidden || ce.loading || ce.index < 0 || ce.matches.length < 1)return;
                        if (Y())return;
                        e.stopPropagation(), e.preventDefault(), Z(ce.index);
                        break;
                    case c.KEY_CODE.ESCAPE:
                        e.stopPropagation(), e.preventDefault(), J(), R(!0)
                }
            }

            function F() {
                return t.isNumber(e.minLength) ? e.minLength : 1
            }

            function B(t) {
                function n(t) {
                    return t && e.itemText ? e.itemText(U(t)) : null
                }

                return h.when(n(t) || t)
            }

            function U(e) {
                if (!e)return n;
                var t = {};
                return ce.itemName && (t[ce.itemName] = e), t
            }

            function z() {
                return e.autoselect ? 0 : -1
            }

            function q(e) {
                ce.loading != e && (ce.loading = e), ce.hidden = j()
            }

            function j() {
                return ce.loading && !W() ? !0 : Y() ? !0 : fe ? !V() : !0
            }

            function V() {
                return X() && W() || ie()
            }

            function W() {
                return ce.matches.length ? !0 : !1
            }

            function Y() {
                return ce.scope.selectedItem ? !0 : !1
            }

            function K() {
                return ce.loading && !Y()
            }

            function G() {
                return B(ce.matches[ce.index])
            }

            function X() {
                return (e.searchText || "").length >= F()
            }

            function Q(e, t, n) {
                Object.defineProperty(ce, e, {
                    get: function () {
                        return n
                    }, set: function (e) {
                        var o = n;
                        n = e, t(e, o)
                    }
                })
            }

            function Z(t) {
                d.nextTick(function () {
                    B(ce.matches[t]).then(function (e) {
                        var t = me.$.input.controller("ngModel");
                        t.$setViewValue(e), t.$render()
                    })["finally"](function () {
                        e.selectedItem = ce.matches[t], q(!1)
                    })
                }, !1)
            }

            function J() {
                q(!0), ce.index = 0, ce.matches = [], e.searchText = "", Z(-1);
                var t = document.createEvent("CustomEvent");
                t.initCustomEvent("input", !0, !0, {value: e.searchText}), me.input.dispatchEvent(t), me.input.focus()
            }

            function ee(n) {
                function o(t) {
                    ue[i] = t, (n || "") === (e.searchText || "") && (ce.matches = t, ce.hidden = j(), e.selectOnMatch && de(), te(), g())
                }

                var r = e.$parent.$eval(le), i = n.toLowerCase();
                t.isArray(r) ? o(r) : r && (q(!0), d.nextTick(function () {
                    r.success && r.success(o), r.then && r.then(o), r["finally"] && r["finally"](function () {
                        q(!1)
                    })
                }, !0, e))
            }

            function te() {
                G().then(function (e) {
                    ce.messages = [ne(), e]
                })
            }

            function ne() {
                if (ge === ce.matches.length)return "";
                switch (ge = ce.matches.length, ce.matches.length) {
                    case 0:
                        return "There are no matches available.";
                    case 1:
                        return "There is 1 match available.";
                    default:
                        return "There are " + ce.matches.length + " matches available."
                }
            }

            function oe() {
                if (me.li[0]) {
                    var e = me.li[0].offsetHeight, t = e * ce.index, n = t + e, o = me.scroller.clientHeight, r = me.scroller.scrollTop;
                    r > t ? re(t) : n > r + o && re(n - o)
                }
            }

            function re(e) {
                me.$.scrollContainer.controller("mdVirtualRepeatContainer").scrollTo(e)
            }

            function ie() {
                var e = (ce.scope.searchText || "").length;
                return ce.hasNotFound && !W() && !ce.loading && e >= F() && fe && !Y()
            }

            function ae() {
                var t = e.searchText || "", n = t.toLowerCase();
                !e.noCache && ue[n] ? (ce.matches = ue[n], te()) : ee(t), ce.hidden = j()
            }

            function de() {
                var t = e.searchText, n = ce.matches, o = n[0];
                1 === n.length && B(o).then(function (e) {
                    t == e && Z(0)
                })
            }

            var ce = this, se = e.itemsExpr.split(/ in /i), le = se[1], me = null, ue = {}, pe = !1, he = [], fe = !1, ge = 0;
            return Q("hidden", A, !0), ce.scope = e, ce.parent = e.$parent, ce.itemName = se[0], ce.matches = [], ce.loading = !1, ce.hidden = !0, ce.index = null, ce.messages = [], ce.id = d.nextUid(), ce.isDisabled = null, ce.isRequired = null, ce.hasNotFound = !1, ce.keydown = P, ce.blur = O, ce.focus = L, ce.clear = J, ce.select = Z, ce.listEnter = T, ce.listLeave = w, ce.mouseUp = k, ce.getCurrentDisplayValue = G, ce.registerSelectedItemWatcher = S, ce.unregisterSelectedItemWatcher = D, ce.notFoundVisible = ie, ce.loadingIsVisible = K, f()
        }

        t.module("material.components.autocomplete").controller("MdAutocompleteCtrl", e);
        var o = 41, r = 5.5 * o, i = 8, a = 2;
        e.$inject = ["$scope", "$element", "$mdUtil", "$mdConstant", "$mdTheming", "$window", "$animate", "$rootElement", "$attrs", "$q"]
    }(), function () {
        function e() {
            var e = !1;
            return {
                controller: "MdAutocompleteCtrl",
                controllerAs: "$mdAutocompleteCtrl",
                scope: {
                    inputName: "@mdInputName",
                    inputMinlength: "@mdInputMinlength",
                    inputMaxlength: "@mdInputMaxlength",
                    searchText: "=?mdSearchText",
                    selectedItem: "=?mdSelectedItem",
                    itemsExpr: "@mdItems",
                    itemText: "&mdItemText",
                    placeholder: "@placeholder",
                    noCache: "=?mdNoCache",
                    selectOnMatch: "=?mdSelectOnMatch",
                    itemChange: "&?mdSelectedItemChange",
                    textChange: "&?mdSearchTextChange",
                    minLength: "=?mdMinLength",
                    delay: "=?mdDelay",
                    autofocus: "=?mdAutofocus",
                    floatingLabel: "@?mdFloatingLabel",
                    autoselect: "=?mdAutoselect",
                    menuClass: "@?mdMenuClass",
                    inputId: "@?mdInputId"
                },
                link: function (t, n, o, r) {
                    r.hasNotFound = e
                },
                template: function (t, n) {
                    function o() {
                        var e = t.find("md-item-template").detach(), n = e.length ? e.html() : t.html();
                        return e.length || t.empty(), "<md-autocomplete-parent-scope md-autocomplete-replace>" + n + "</md-autocomplete-parent-scope>"
                    }

                    function r() {
                        var e = t.find("md-not-found").detach(), n = e.length ? e.html() : "";
                        return n ? '<li ng-if="$mdAutocompleteCtrl.notFoundVisible()"                         md-autocomplete-parent-scope>' + n + "</li>" : ""
                    }

                    function i() {
                        return n.mdFloatingLabel ? '            <md-input-container flex ng-if="floatingLabel">              <label>{{floatingLabel}}</label>              <input type="search"                  ' + (null != s ? 'tabindex="' + s + '"' : "") + '                  id="{{ inputId || \'fl-input-\' + $mdAutocompleteCtrl.id }}"                  name="{{inputName}}"                  autocomplete="off"                  ng-required="$mdAutocompleteCtrl.isRequired"                  ng-minlength="inputMinlength"                  ng-maxlength="inputMaxlength"                  ng-disabled="$mdAutocompleteCtrl.isDisabled"                  ng-model="$mdAutocompleteCtrl.scope.searchText"                  ng-keydown="$mdAutocompleteCtrl.keydown($event)"                  ng-blur="$mdAutocompleteCtrl.blur()"                  ng-focus="$mdAutocompleteCtrl.focus()"                  aria-owns="ul-{{$mdAutocompleteCtrl.id}}"                  aria-label="{{floatingLabel}}"                  aria-autocomplete="list"                  aria-haspopup="true"                  aria-activedescendant=""                  aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"/>              <div md-autocomplete-parent-scope md-autocomplete-replace>' + c + "</div>            </md-input-container>" : '            <input flex type="search"                ' + (null != s ? 'tabindex="' + s + '"' : "") + '                id="{{ inputId || \'input-\' + $mdAutocompleteCtrl.id }}"                name="{{inputName}}"                ng-if="!floatingLabel"                autocomplete="off"                ng-required="$mdAutocompleteCtrl.isRequired"                ng-disabled="$mdAutocompleteCtrl.isDisabled"                ng-model="$mdAutocompleteCtrl.scope.searchText"                ng-keydown="$mdAutocompleteCtrl.keydown($event)"                ng-blur="$mdAutocompleteCtrl.blur()"                ng-focus="$mdAutocompleteCtrl.focus()"                placeholder="{{placeholder}}"                aria-owns="ul-{{$mdAutocompleteCtrl.id}}"                aria-label="{{placeholder}}"                aria-autocomplete="list"                aria-haspopup="true"                aria-activedescendant=""                aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"/>            <button                type="button"                tabindex="-1"                ng-if="$mdAutocompleteCtrl.scope.searchText && !$mdAutocompleteCtrl.isDisabled"                ng-click="$mdAutocompleteCtrl.clear()">              <md-icon md-svg-icon="md-close"></md-icon>              <span class="md-visually-hidden">Clear</span>            </button>                '
                    }

                    var a = r(), d = o(), c = t.html(), s = n.tabindex;
                    return e = a ? !0 : !1, n.hasOwnProperty("tabindex") || t.attr("tabindex", "-1"), '        <md-autocomplete-wrap            layout="row"            ng-class="{ \'md-whiteframe-z1\': !floatingLabel, \'md-menu-showing\': !$mdAutocompleteCtrl.hidden }"            role="listbox">          ' + i() + '          <md-progress-linear              class="' + (n.mdFloatingLabel ? "md-inline" : "") + '"              ng-if="$mdAutocompleteCtrl.loadingIsVisible()"              md-mode="indeterminate"></md-progress-linear>          <md-virtual-repeat-container              md-auto-shrink              md-auto-shrink-min="1"              ng-mouseenter="$mdAutocompleteCtrl.listEnter()"              ng-mouseleave="$mdAutocompleteCtrl.listLeave()"              ng-mouseup="$mdAutocompleteCtrl.mouseUp()"              ng-hide="$mdAutocompleteCtrl.hidden"              class="md-autocomplete-suggestions-container md-whiteframe-z1"              ng-class="{ \'md-not-found\': $mdAutocompleteCtrl.notFoundVisible() }"              role="presentation">            <ul class="md-autocomplete-suggestions"                ng-class="::menuClass"                id="ul-{{$mdAutocompleteCtrl.id}}">              <li md-virtual-repeat="item in $mdAutocompleteCtrl.matches"                  ng-class="{ selected: $index === $mdAutocompleteCtrl.index }"                  ng-click="$mdAutocompleteCtrl.select($index)"                  md-extra-name="$mdAutocompleteCtrl.itemName">                  ' + d + "                  </li>" + a + '            </ul>          </md-virtual-repeat-container>        </md-autocomplete-wrap>        <aria-status            class="md-visually-hidden"            role="status"            aria-live="assertive">          <p ng-repeat="message in $mdAutocompleteCtrl.messages track by $index" ng-if="message">{{message}}</p>        </aria-status>'
                }
            }
        }

        t.module("material.components.autocomplete").directive("mdAutocomplete", e)
    }(), function () {
        function e(e, t) {
            function n(e, n, o) {
                return function (e, n, r) {
                    function i(n, o) {
                        c[o] = e[n], e.$watch(n, function (e) {
                            t.nextTick(function () {
                                c[o] = e
                            })
                        })
                    }

                    function a() {
                        var t = !1, n = !1;
                        e.$watch(function () {
                            n || t || (t = !0, e.$$postDigest(function () {
                                n || c.$digest(), t = n = !1
                            }))
                        }), c.$watch(function () {
                            n = !0
                        })
                    }

                    var d = e.$mdAutocompleteCtrl, c = d.parent.$new(), s = d.itemName;
                    i("$index", "$index"), i("item", s), a(), o(c, function (e) {
                        n.after(e)
                    })
                }
            }

            return {restrict: "AE", compile: n, terminal: !0, transclude: "element"}
        }

        t.module("material.components.autocomplete").directive("mdAutocompleteParentScope", e), e.$inject = ["$compile", "$mdUtil"]
    }(), function () {
        function e(e, n, o) {
            function r(r, i) {
                var d = null, c = null, s = o.mdHighlightFlags || "", l = e.$watch(function (e) {
                    return {term: r(e), unsafeText: i(e)}
                }, function (e, o) {
                    (null === d || e.unsafeText !== o.unsafeText) && (d = t.element("<div>").text(e.unsafeText).html()), (null === c || e.term !== o.term) && (c = a(e.term, s)), n.html(d.replace(c, '<span class="highlight">$&</span>'))
                }, !0);
                n.on("$destroy", l)
            }

            function i(e) {
                return e && e.replace(/[\\\^\$\*\+\?\.\(\)\|\{}\[\]]/g, "\\$&")
            }

            function a(e, t) {
                var n = "";
                return t.indexOf("^") >= 1 && (n += "^"), n += e, t.indexOf("$") >= 1 && (n += "$"), new RegExp(i(n), t.replace(/[\$\^]/g, ""))
            }

            this.init = r
        }

        t.module("material.components.autocomplete").controller("MdHighlightCtrl", e), e.$inject = ["$scope", "$element", "$attrs"]
    }(), function () {
        function e(e, t) {
            return {
                terminal: !0, controller: "MdHighlightCtrl", compile: function (n, o) {
                    var r = t(o.mdHighlightText), i = e(n.html());
                    return function (e, t, n, o) {
                        o.init(r, i)
                    }
                }
            }
        }

        t.module("material.components.autocomplete").directive("mdHighlightText", e), e.$inject = ["$interpolate", "$parse"]
    }(), function () {
        function e(e, o) {
            function r(n, r) {
                return n.append(o.processTemplate(i)), function (n, o, r, i) {
                    o.addClass("md-chip"), e(o), i && t.element(o[0].querySelector(".md-chip-content")).on("blur", function () {
                        i.selectedChip = -1
                    })
                }
            }

            var i = o.processTemplate(n);
            return {restrict: "E", require: "^?mdChips", compile: r}
        }

        t.module("material.components.chips").directive("mdChip", e);
        var n = '    <span ng-if="!$mdChipsCtrl.readonly" class="md-visually-hidden">      {{$mdChipsCtrl.deleteHint}}    </span>';
        e.$inject = ["$mdTheming", "$mdUtil"]
    }(), function () {
        function e(e) {
            function t(t, n, o, r) {
                n.on("click", function (e) {
                    t.$apply(function () {
                        r.removeChip(t.$$replacedScope.$index)
                    })
                }), e(function () {
                    n.attr({tabindex: -1, "aria-hidden": !0}), n.find("button").attr("tabindex", "-1")
                })
            }

            return {restrict: "A", require: "^mdChips", scope: !1, link: t}
        }

        t.module("material.components.chips").directive("mdChipRemove", e), e.$inject = ["$timeout"]
    }(), function () {
        function e(e) {
            function t(t, n, o) {
                var r = t.$parent.$mdChipsCtrl, i = r.parent.$new(!1, r.parent);
                i.$$replacedScope = t, i.$chip = t.$chip, i.$index = t.$index, i.$mdChipsCtrl = r;
                var a = r.$scope.$eval(o.mdChipTransclude);
                n.html(a), e(n.contents())(i)
            }

            return {restrict: "EA", terminal: !0, link: t, scope: !1}
        }

        t.module("material.components.chips").directive("mdChipTransclude", e), e.$inject = ["$compile"]
    }(), function () {
        function e(e, t, n, o, r) {
            this.$timeout = r, this.$mdConstant = t, this.$scope = e, this.parent = e.$parent, this.$log = n, this.$element = o, this.ngModelCtrl = null, this.userInputNgModelCtrl = null, this.userInputElement = null, this.items = [], this.selectedChip = -1, this.hasAutocomplete = !1, this.deleteHint = "Press delete to remove this chip.", this.deleteButtonLabel = "Remove", this.chipBuffer = "", this.useOnAppend = !1, this.useTransformChip = !1, this.useOnAdd = !1, this.useOnRemove = !1, this.useOnSelect = !1
        }

        t.module("material.components.chips").controller("MdChipsCtrl", e), e.$inject = ["$scope", "$mdConstant", "$log", "$element", "$timeout"], e.prototype.inputKeydown = function (e) {
            var t = this.getChipBuffer();
            if (!(this.hasAutocomplete && e.isDefaultPrevented && e.isDefaultPrevented())) {
                if (e.keyCode === this.$mdConstant.KEY_CODE.BACKSPACE) {
                    if (t)return;
                    return e.preventDefault(), e.stopPropagation(), void(this.items.length && this.selectAndFocusChipSafe(this.items.length - 1))
                }
                if ((!this.separatorKeys || this.separatorKeys.length < 1) && (this.separatorKeys = [this.$mdConstant.KEY_CODE.ENTER]), -1 !== this.separatorKeys.indexOf(e.keyCode)) {
                    if (this.hasAutocomplete && this.requireMatch || !t)return;
                    e.preventDefault(), this.appendChip(t), this.resetChipBuffer()
                }
            }
        }, e.prototype.chipKeydown = function (e) {
            if (!this.getChipBuffer())switch (e.keyCode) {
                case this.$mdConstant.KEY_CODE.BACKSPACE:
                case this.$mdConstant.KEY_CODE.DELETE:
                    if (this.selectedChip < 0)return;
                    e.preventDefault(),
                        this.removeAndSelectAdjacentChip(this.selectedChip);
                    break;
                case this.$mdConstant.KEY_CODE.LEFT_ARROW:
                    e.preventDefault(), this.selectedChip < 0 && (this.selectedChip = this.items.length), this.items.length && this.selectAndFocusChipSafe(this.selectedChip - 1);
                    break;
                case this.$mdConstant.KEY_CODE.RIGHT_ARROW:
                    e.preventDefault(), this.selectAndFocusChipSafe(this.selectedChip + 1);
                    break;
                case this.$mdConstant.KEY_CODE.ESCAPE:
                case this.$mdConstant.KEY_CODE.TAB:
                    if (this.selectedChip < 0)return;
                    e.preventDefault(), this.onFocus()
            }
        }, e.prototype.getPlaceholder = function () {
            var e = this.items.length && ("" == this.secondaryPlaceholder || this.secondaryPlaceholder);
            return e ? this.placeholder : this.secondaryPlaceholder
        }, e.prototype.removeAndSelectAdjacentChip = function (e) {
            var n = this.getAdjacentChipIndex(e);
            this.removeChip(e), this.$timeout(t.bind(this, function () {
                this.selectAndFocusChipSafe(n)
            }))
        }, e.prototype.resetSelectedChip = function () {
            this.selectedChip = -1
        }, e.prototype.getAdjacentChipIndex = function (e) {
            var t = this.items.length - 1;
            return 0 == t ? -1 : e == t ? e - 1 : e
        }, e.prototype.appendChip = function (e) {
            if (this.useTransformChip && this.transformChip) {
                var n = this.transformChip({$chip: e});
                t.isDefined(n) && (e = n)
            }
            if (t.isObject(e)) {
                var o = this.items.some(function (n) {
                    return t.equals(e, n)
                });
                if (o)return
            }
            if (!(null == e || this.items.indexOf(e) + 1)) {
                var r = this.items.push(e);
                this.useOnAdd && this.onAdd && this.onAdd({$chip: e, $index: r})
            }
        }, e.prototype.useOnAppendExpression = function () {
            this.$log.warn("md-on-append is deprecated; please use md-transform-chip or md-on-add instead"), this.useTransformChip && this.transformChip || (this.useTransformChip = !0, this.transformChip = this.onAppend)
        }, e.prototype.useTransformChipExpression = function () {
            this.useTransformChip = !0
        }, e.prototype.useOnAddExpression = function () {
            this.useOnAdd = !0
        }, e.prototype.useOnRemoveExpression = function () {
            this.useOnRemove = !0
        }, e.prototype.useOnSelectExpression = function () {
            this.useOnSelect = !0
        }, e.prototype.getChipBuffer = function () {
            return this.userInputElement ? this.userInputNgModelCtrl ? this.userInputNgModelCtrl.$viewValue : this.userInputElement[0].value : this.chipBuffer
        }, e.prototype.resetChipBuffer = function () {
            this.userInputElement ? this.userInputNgModelCtrl ? (this.userInputNgModelCtrl.$setViewValue(""), this.userInputNgModelCtrl.$render()) : this.userInputElement[0].value = "" : this.chipBuffer = ""
        }, e.prototype.removeChip = function (e) {
            var t = this.items.splice(e, 1);
            t && t.length && this.useOnRemove && this.onRemove && this.onRemove({$chip: t[0], $index: e})
        }, e.prototype.removeChipAndFocusInput = function (e) {
            this.removeChip(e), this.onFocus()
        }, e.prototype.selectAndFocusChipSafe = function (e) {
            return this.items.length ? e === this.items.length ? this.onFocus() : (e = Math.max(e, 0), e = Math.min(e, this.items.length - 1), this.selectChip(e), void this.focusChip(e)) : (this.selectChip(-1), void this.onFocus())
        }, e.prototype.selectChip = function (e) {
            e >= -1 && e <= this.items.length ? (this.selectedChip = e, this.useOnSelect && this.onSelect && this.onSelect({$chip: this.items[this.selectedChip]})) : this.$log.warn("Selected Chip index out of bounds; ignoring.")
        }, e.prototype.selectAndFocusChip = function (e) {
            this.selectChip(e), -1 != e && this.focusChip(e)
        }, e.prototype.focusChip = function (e) {
            this.$element[0].querySelector('md-chip[index="' + e + '"] .md-chip-content').focus()
        }, e.prototype.configureNgModel = function (e) {
            this.ngModelCtrl = e;
            var t = this;
            e.$render = function () {
                t.items = t.ngModelCtrl.$viewValue
            }
        }, e.prototype.onFocus = function () {
            var e = this.$element[0].querySelector("input");
            e && e.focus(), this.resetSelectedChip()
        }, e.prototype.onInputFocus = function () {
            this.inputHasFocus = !0, this.resetSelectedChip()
        }, e.prototype.onInputBlur = function () {
            this.inputHasFocus = !1
        }, e.prototype.configureUserInput = function (e) {
            this.userInputElement = e;
            var n = e.controller("ngModel");
            n != this.ngModelCtrl && (this.userInputNgModelCtrl = n);
            var o = this.$scope, r = this, i = function (e, n) {
                o.$evalAsync(t.bind(r, n, e))
            };
            e.attr({tabindex: 0}).on("keydown", function (e) {
                i(e, r.inputKeydown)
            }).on("focus", function (e) {
                i(e, r.onInputFocus)
            }).on("blur", function (e) {
                i(e, r.onInputBlur)
            })
        }, e.prototype.configureAutocomplete = function (e) {
            e && (this.hasAutocomplete = !0, e.registerSelectedItemWatcher(t.bind(this, function (e) {
                e && (this.appendChip(e), this.resetChipBuffer())
            })), this.$element.find("input").on("focus", t.bind(this, this.onInputFocus)).on("blur", t.bind(this, this.onInputBlur)))
        }, e.prototype.hasFocus = function () {
            return this.inputHasFocus || this.selectedChip >= 0
        }
    }(), function () {
        function e(e, t, a, d, c) {
            function s(n, o) {
                function r(e) {
                    if (o.ngModel) {
                        var t = i[0].querySelector(e);
                        return t && t.outerHTML
                    }
                }

                var i = o.$mdUserTemplate;
                o.$mdUserTemplate = null;
                var s = r("md-chips>*[md-chip-remove]") || m.remove, l = r("md-chips>md-chip-template") || m["default"], u = r("md-chips>md-autocomplete") || r("md-chips>input") || m.input, p = i.find("md-chip");
                return i[0].querySelector("md-chip-template>*[md-chip-remove]") && d.warn("invalid placement of md-chip-remove within md-chip-template."), function (n, r, i, d) {
                    t.initOptionalProperties(n, o), e(r);
                    var h = d[0];
                    if (h.chipContentsTemplate = l, h.chipRemoveTemplate = s, h.chipInputTemplate = u, r.attr({
                            "aria-hidden": !0,
                            tabindex: -1
                        }).on("focus", function () {
                            h.onFocus()
                        }), o.ngModel && (h.configureNgModel(r.controller("ngModel")), i.mdTransformChip && h.useTransformChipExpression(), i.mdOnAppend && h.useOnAppendExpression(), i.mdOnAdd && h.useOnAddExpression(), i.mdOnRemove && h.useOnRemoveExpression(), i.mdOnSelect && h.useOnSelectExpression(), u != m.input && n.$watch("$mdChipsCtrl.readonly", function (e) {
                            e || t.nextTick(function () {
                                0 === u.indexOf("<md-autocomplete") && h.configureAutocomplete(r.find("md-autocomplete").controller("mdAutocomplete")), h.configureUserInput(r.find("input"))
                            })
                        }), t.nextTick(function () {
                            var e = r.find("input");
                            e && e.toggleClass("md-input", !0)
                        })), p.length > 0) {
                        var f = a(p.clone())(n.$parent);
                        c(function () {
                            r.find("md-chips-wrap").prepend(f)
                        })
                    }
                }
            }

            function l() {
                return {
                    chips: t.processTemplate(n),
                    input: t.processTemplate(o),
                    "default": t.processTemplate(r),
                    remove: t.processTemplate(i)
                }
            }

            var m = l();
            return {
                template: function (e, t) {
                    return t.$mdUserTemplate = e.clone(), m.chips
                },
                require: ["mdChips"],
                restrict: "E",
                controller: "MdChipsCtrl",
                controllerAs: "$mdChipsCtrl",
                bindToController: !0,
                compile: s,
                scope: {
                    readonly: "=readonly",
                    placeholder: "@",
                    secondaryPlaceholder: "@",
                    transformChip: "&mdTransformChip",
                    onAppend: "&mdOnAppend",
                    onAdd: "&mdOnAdd",
                    onRemove: "&mdOnRemove",
                    onSelect: "&mdOnSelect",
                    deleteHint: "@",
                    deleteButtonLabel: "@",
                    separatorKeys: "=?mdSeparatorKeys",
                    requireMatch: "=?mdRequireMatch"
                }
            }
        }

        t.module("material.components.chips").directive("mdChips", e);
        var n = '      <md-chips-wrap          ng-if="!$mdChipsCtrl.readonly || $mdChipsCtrl.items.length > 0"          ng-keydown="$mdChipsCtrl.chipKeydown($event)"          ng-class="{ \'md-focused\': $mdChipsCtrl.hasFocus(), \'md-readonly\': !$mdChipsCtrl.ngModelCtrl }"          class="md-chips">        <md-chip ng-repeat="$chip in $mdChipsCtrl.items"            index="{{$index}}"            ng-class="{\'md-focused\': $mdChipsCtrl.selectedChip == $index, \'md-readonly\': $mdChipsCtrl.readonly}">          <div class="md-chip-content"              tabindex="-1"              aria-hidden="true"              ng-focus="!$mdChipsCtrl.readonly && $mdChipsCtrl.selectChip($index)"              md-chip-transclude="$mdChipsCtrl.chipContentsTemplate"></div>          <div ng-if="!$mdChipsCtrl.readonly"               class="md-chip-remove-container"               md-chip-transclude="$mdChipsCtrl.chipRemoveTemplate"></div>        </md-chip>        <div ng-if="!$mdChipsCtrl.readonly && $mdChipsCtrl.ngModelCtrl"            class="md-chip-input-container"            md-chip-transclude="$mdChipsCtrl.chipInputTemplate"></div>        </div>      </md-chips-wrap>', o = '        <input            class="md-input"            tabindex="0"            placeholder="{{$mdChipsCtrl.getPlaceholder()}}"            aria-label="{{$mdChipsCtrl.getPlaceholder()}}"            ng-model="$mdChipsCtrl.chipBuffer"            ng-focus="$mdChipsCtrl.onInputFocus()"            ng-blur="$mdChipsCtrl.onInputBlur()"            ng-keydown="$mdChipsCtrl.inputKeydown($event)">', r = "      <span>{{$chip}}</span>", i = '      <button          class="md-chip-remove"          ng-if="!$mdChipsCtrl.readonly"          ng-click="$mdChipsCtrl.removeChipAndFocusInput($$replacedScope.$index)"          type="button"          aria-hidden="true"          tabindex="-1">        <md-icon md-svg-icon="md-close"></md-icon>        <span class="md-visually-hidden">          {{$mdChipsCtrl.deleteButtonLabel}}        </span>      </button>';
        e.$inject = ["$mdTheming", "$mdUtil", "$compile", "$log", "$timeout"]
    }(), function () {
        function e() {
            this.selectedItem = null, this.searchText = ""
        }

        t.module("material.components.chips").controller("MdContactChipsCtrl", e), e.prototype.queryContact = function (e) {
            var n = this.contactQuery({$query: e});
            return this.filterSelected ? n.filter(t.bind(this, this.filterSelectedContacts)) : n
        }, e.prototype.itemName = function (e) {
            return e[this.contactName]
        }, e.prototype.filterSelectedContacts = function (e) {
            return -1 == this.contacts.indexOf(e)
        }
    }(), function () {
        function e(e, t) {
            function o(n, o) {
                return function (n, r, i, a) {
                    t.initOptionalProperties(n, o), e(r), r.attr("tabindex", "-1")
                }
            }

            return {
                template: function (e, t) {
                    return n
                },
                restrict: "E",
                controller: "MdContactChipsCtrl",
                controllerAs: "$mdContactChipsCtrl",
                bindToController: !0,
                compile: o,
                scope: {
                    contactQuery: "&mdContacts",
                    placeholder: "@",
                    secondaryPlaceholder: "@",
                    contactName: "@mdContactName",
                    contactImage: "@mdContactImage",
                    contactEmail: "@mdContactEmail",
                    contacts: "=ngModel",
                    requireMatch: "=?mdRequireMatch",
                    highlightFlags: "@?mdHighlightFlags"
                }
            }
        }

        t.module("material.components.chips").directive("mdContactChips", e);
        var n = '      <md-chips class="md-contact-chips"          ng-model="$mdContactChipsCtrl.contacts"          md-require-match="$mdContactChipsCtrl.requireMatch"          md-autocomplete-snap>          <md-autocomplete              md-menu-class="md-contact-chips-suggestions"              md-selected-item="$mdContactChipsCtrl.selectedItem"              md-search-text="$mdContactChipsCtrl.searchText"              md-items="item in $mdContactChipsCtrl.queryContact($mdContactChipsCtrl.searchText)"              md-item-text="$mdContactChipsCtrl.itemName(item)"              md-no-cache="true"              md-autoselect              placeholder="{{$mdContactChipsCtrl.contacts.length == 0 ?                  $mdContactChipsCtrl.placeholder : $mdContactChipsCtrl.secondaryPlaceholder}}">            <div class="md-contact-suggestion">              <img                   ng-src="{{item[$mdContactChipsCtrl.contactImage]}}"                  alt="{{item[$mdContactChipsCtrl.contactName]}}"                  ng-if="item[$mdContactChipsCtrl.contactImage]" />              <span class="md-contact-name" md-highlight-text="$mdContactChipsCtrl.searchText"                    md-highlight-flags="{{$mdContactChipsCtrl.highlightFlags}}">                {{item[$mdContactChipsCtrl.contactName]}}              </span>              <span class="md-contact-email" >{{item[$mdContactChipsCtrl.contactEmail]}}</span>            </div>          </md-autocomplete>          <md-chip-template>            <div class="md-contact-avatar">              <img                   ng-src="{{$chip[$mdContactChipsCtrl.contactImage]}}"                  alt="{{$chip[$mdContactChipsCtrl.contactName]}}"                  ng-if="$chip[$mdContactChipsCtrl.contactImage]" />            </div>            <div class="md-contact-name">              {{$chip[$mdContactChipsCtrl.contactName]}}            </div>          </md-chip-template>      </md-chips>';
        e.$inject = ["$mdTheming", "$mdUtil"]
    }(), function () {
        function e(e, t, n) {
            function o(o, r, i) {
                function a() {
                    var e = r.parent();
                    return e.attr("aria-label") || e.text() ? !0 : e.parent().attr("aria-label") || e.parent().text() ? !0 : !1
                }

                function d() {
                    o.svgIcon || o.svgSrc || (o.fontIcon && r.addClass("md-font " + o.fontIcon), r.addClass(e.fontSet(o.fontSet)))
                }

                t(r), d();
                var c = i.alt || o.fontIcon || o.svgIcon || r.text(), s = i.$normalize(i.$attr.mdSvgIcon || i.$attr.mdSvgSrc || "");
                i["aria-label"] || ("" == c || a() ? r.text() || n.expect(r, "aria-hidden", "true") : (n.expect(r, "aria-label", c), n.expect(r, "role", "img"))), s && i.$observe(s, function (t) {
                    r.empty(), t && e(t).then(function (e) {
                        r.append(e)
                    })
                })
            }

            return {
                scope: {fontSet: "@mdFontSet", fontIcon: "@mdFontIcon", svgIcon: "@mdSvgIcon", svgSrc: "@mdSvgSrc"},
                restrict: "E",
                link: o
            }
        }

        t.module("material.components.icon").directive("mdIcon", ["$mdIcon", "$mdTheming", "$mdAria", e])
    }(), function () {
        function e() {
        }

        function n(e, t) {
            this.url = e, this.viewBoxSize = t || r.defaultViewBoxSize
        }

        function o(e, n, o, r, i) {
            function a(t) {
                if (t = t || "", b[t])return o.when(b[t].clone());
                if (E.test(t))return m(t).then(c(t));
                -1 == t.indexOf(":") && (t = "$default:" + t);
                var n = e[t] ? s : l;
                return n(t).then(c(t))
            }

            function d(n) {
                var o = t.isUndefined(n) || !(n && n.length);
                if (o)return e.defaultFontSet;
                var r = n;
                return t.forEach(e.fontSets, function (e) {
                    e.alias == n && (r = e.fontSet || r)
                }), r
            }

            function c(t) {
                return function (n) {
                    return b[t] = p(n) ? n : new h(n, e[t]), b[t].clone()
                }
            }

            function s(t) {
                var n = e[t];
                return m(n.url).then(function (e) {
                    return new h(e, n)
                })
            }

            function l(t) {
                function n(e) {
                    var n = t.slice(t.lastIndexOf(":") + 1), o = e.querySelector("#" + n);
                    return o ? new h(o, d) : i(t)
                }

                function i(e) {
                    var t = "icon " + e + " not found";
                    return r.warn(t), o.reject(t || e)
                }

                var a = t.substring(0, t.lastIndexOf(":")) || "$default", d = e[a];
                return d ? m(d.url).then(n) : i(t)
            }

            function m(e) {
                return n.get(e, {cache: i}).then(function (e) {
                    return t.element("<div>").append(e.data).find("svg")[0]
                })["catch"](u)
            }

            function u(e) {
                var n = t.isString(e) ? e : e.message || e.data || e.statusText;
                return r.warn(n), o.reject(n)
            }

            function p(e) {
                return t.isDefined(e.element) && t.isDefined(e.config)
            }

            function h(e, n) {
                e && "svg" != e.tagName && (e = t.element('<svg xmlns="http://www.w3.org/2000/svg">').append(e)[0]), e.getAttribute("xmlns") || e.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.element = e, this.config = n, this.prepare()
            }

            function f() {
                var n = this.config ? this.config.viewBoxSize : e.defaultViewBoxSize;
                t.forEach({
                    fit: "",
                    height: "100%",
                    width: "100%",
                    preserveAspectRatio: "xMidYMid meet",
                    viewBox: this.element.getAttribute("viewBox") || "0 0 " + n + " " + n
                }, function (e, t) {
                    this.element.setAttribute(t, e)
                }, this), t.forEach({"pointer-events": "none", display: "block"}, function (e, t) {
                    this.element.style[t] = e
                }, this)
            }

            function g() {
                return this.element.cloneNode(!0)
            }

            var b = {}, E = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i;
            return h.prototype = {clone: g, prepare: f}, a.fontSet = d, a
        }

        t.module("material.components.icon").provider("$mdIcon", e);
        var r = {defaultViewBoxSize: 24, defaultFontSet: "material-icons", fontSets: []};
        e.prototype = {
            icon: function (e, t, o) {
                return -1 == e.indexOf(":") && (e = "$default:" + e), r[e] = new n(t, o), this
            }, iconSet: function (e, t, o) {
                return r[e] = new n(t, o), this
            }, defaultIconSet: function (e, t) {
                var o = "$default";
                return r[o] || (r[o] = new n(e, t)), r[o].viewBoxSize = t || r.defaultViewBoxSize, this
            }, defaultViewBoxSize: function (e) {
                return r.defaultViewBoxSize = e, this
            }, fontSet: function (e, t) {
                return r.fontSets.push({alias: e, fontSet: t || e}), this
            }, defaultFontSet: function (e) {
                return r.defaultFontSet = e ? e : "", this
            }, defaultIconSize: function (e) {
                return r.defaultIconSize = e, this
            }, preloadIcons: function (e) {
                var t = this, n = [{
                    id: "md-tabs-arrow",
                    url: "md-tabs-arrow.svg",
                    svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g><polygon points="15.4,7.4 14,6 8,12 14,18 15.4,16.6 10.8,12 "/></g></svg>'
                }, {
                    id: "md-close",
                    url: "md-close.svg",
                    svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"/></g></svg>'
                }, {
                    id: "md-cancel",
                    url: "md-cancel.svg",
                    svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><g><path d="M12 2c-5.53 0-10 4.47-10 10s4.47 10 10 10 10-4.47 10-10-4.47-10-10-10zm5 13.59l-1.41 1.41-3.59-3.59-3.59 3.59-1.41-1.41 3.59-3.59-3.59-3.59 1.41-1.41 3.59 3.59 3.59-3.59 1.41 1.41-3.59 3.59 3.59 3.59z"/></g></svg>'
                }, {
                    id: "md-menu",
                    url: "md-menu.svg",
                    svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 24 24"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>'
                }, {
                    id: "md-toggle-arrow",
                    url: "md-toggle-arrow-svg",
                    svg: '<svg version="1.1" x="0px" y="0px" viewBox="0 0 48 48"><path d="M24 16l-12 12 2.83 2.83 9.17-9.17 9.17 9.17 2.83-2.83z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>'
                }, {
                    id: "md-calendar",
                    url: "md-calendar.svg",
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>'
                }];
                n.forEach(function (n) {
                    t.icon(n.id, n.url), e.put(n.url, n.svg)
                })
            }, $get: ["$http", "$q", "$log", "$templateCache", function (e, t, n, i) {
                return this.preloadIcons(i), o(r, e, t, n, i)
            }]
        }, o.$inject = ["config", "$http", "$q", "$log", "$templateCache"]
    }(), function () {
        function e(e, o, r, i, a, d, c, s) {
            var l, m, u = this;
            this.nestLevel = parseInt(o.mdNestLevel, 10) || 0, this.init = function (e, n) {
                n = n || {}, l = e, m = r[0].querySelector("[ng-click],[ng-mouseenter]"), m.setAttribute("aria-expanded", "false"), this.isInMenuBar = n.isInMenuBar, this.nestedMenus = a.nodesToArray(l[0].querySelectorAll(".md-nested-menu")), l.on("$mdInterimElementRemove", function () {
                    u.isOpen = !1
                });
                var o = "menu_container_" + a.nextUid();
                l.attr("id", o), t.element(m).attr({
                    "aria-owns": o,
                    "aria-haspopup": "true"
                }), i.$on("$destroy", this.disableHoverListener)
            };
            var p, h, f = [];
            this.enableHoverListener = function () {
                f.push(c.$on("$mdMenuOpen", function (e, t) {
                    l[0].contains(t[0]) && (u.currentlyOpenMenu = t.controller("mdMenu"), u.isAlreadyOpening = !1, u.currentlyOpenMenu.registerContainerProxy(u.triggerContainerProxy.bind(u)))
                })), f.push(c.$on("$mdMenuClose", function (e, t) {
                    l[0].contains(t[0]) && (u.currentlyOpenMenu = n)
                })), h = t.element(a.nodesToArray(l[0].children[0].children)), h.on("mouseenter", u.handleMenuItemHover), h.on("mouseleave", u.handleMenuItemMouseLeave)
            }, this.disableHoverListener = function () {
                for (; f.length;)f.shift()();
                h && h.off("mouseenter", u.handleMenuItemHover), h && h.off("mouseleave", u.handleMenuMouseLeave)
            }, this.handleMenuItemHover = function (e) {
                if (!u.isAlreadyOpening) {
                    var n = e.target.querySelector("md-menu") || a.getClosest(e.target, "MD-MENU");
                    p = d(function () {
                        if (n && (n = t.element(n).controller("mdMenu")), u.currentlyOpenMenu && u.currentlyOpenMenu != n) {
                            var e = u.nestLevel + 1;
                            u.currentlyOpenMenu.close(!0, {closeTo: e})
                        } else n && !n.isOpen && n.open && (u.isAlreadyOpening = !0, n.open())
                    }, n ? 100 : 250);
                    var o = e.currentTarget.querySelector("button:not([disabled])");
                    o && o.focus()
                }
            }, this.handleMenuItemMouseLeave = function () {
                p && (d.cancel(p), p = n)
            }, this.open = function (t) {
                t && t.stopPropagation(), t && t.preventDefault(), u.isOpen || (u.enableHoverListener(), u.isOpen = !0, m = m || (t ? t.target : r[0]), m.setAttribute("aria-expanded", "true"), i.$emit("$mdMenuOpen", r), e.show({
                    scope: i,
                    mdMenuCtrl: u,
                    nestLevel: u.nestLevel,
                    element: l,
                    target: m,
                    preserveElement: !0,
                    parent: "body"
                })["finally"](function () {
                    m.setAttribute("aria-expanded", "false"), u.disableHoverListener()
                }))
            }, i.$mdOpenMenu = this.open, i.$watch(function () {
                return u.isOpen
            }, function (e) {
                e ? (l.attr("aria-hidden", "false"), r[0].classList.add("md-open"), t.forEach(u.nestedMenus, function (e) {
                    e.classList.remove("md-open")
                })) : (l.attr("aria-hidden", "true"), r[0].classList.remove("md-open")), i.$mdMenuIsOpen = u.isOpen
            }), this.focusMenuContainer = function () {
                var e = l[0].querySelector("[md-menu-focus-target]");
                e || (e = l[0].querySelector(".md-button")), e.focus()
            }, this.registerContainerProxy = function (e) {
                this.containerProxy = e
            }, this.triggerContainerProxy = function (e) {
                this.containerProxy && this.containerProxy(e)
            }, this.destroy = function () {
                return u.isOpen ? e.destroy() : s.when(!1)
            }, this.close = function (n, o) {
                if (u.isOpen) {
                    u.isOpen = !1;
                    var a = t.extend({}, o, {skipFocus: n});
                    if (i.$emit("$mdMenuClose", r, a), e.hide(null, o), !n) {
                        var d = u.restoreFocusTo || r.find("button")[0];
                        d instanceof t.element && (d = d[0]), d && d.focus()
                    }
                }
            }, this.positionMode = function () {
                var e = (o.mdPositionMode || "target").split(" ");
                return 1 == e.length && e.push(e[0]), {left: e[0], top: e[1]}
            }, this.offsets = function () {
                var e = (o.mdOffset || "0 0").split(" ").map(parseFloat);
                if (2 == e.length)return {left: e[0], top: e[1]};
                if (1 == e.length)return {top: e[0], left: e[0]};
                throw Error("Invalid offsets specified. Please follow format <x, y> or <n>")
            }
        }

        t.module("material.components.menu").controller("mdMenuCtrl", e), e.$inject = ["$mdMenu", "$attrs", "$element", "$scope", "$mdUtil", "$timeout", "$rootScope", "$q"]
    }(), function () {
        function e(e) {
            function o(n) {
                n.addClass("md-menu");
                var o = n.children()[0];
                if (o.hasAttribute("ng-click") || (o = o.querySelector("[ng-click],[ng-mouseenter]") || o), !o || "MD-BUTTON" != o.nodeName && "BUTTON" != o.nodeName || o.hasAttribute("type") || o.setAttribute("type", "button"), 2 != n.children().length)throw Error(i + "Expected two children elements.");
                o && o.setAttribute("aria-haspopup", "true");
                var a = n[0].querySelectorAll("md-menu"), d = parseInt(n[0].getAttribute("md-nest-level"), 10) || 0;
                return a && t.forEach(e.nodesToArray(a), function (e) {
                    e.hasAttribute("md-position-mode") || e.setAttribute("md-position-mode", "cascade"), e.classList.add("md-nested-menu"), e.setAttribute("md-nest-level", d + 1)
                }), r
            }

            function r(e, o, r, i) {
                var a = i[0], d = i[1] != n, c = t.element('<div class="md-open-menu-container md-whiteframe-z2"></div>'), s = o.children()[1];
                s.hasAttribute("role") || s.setAttribute("role", "menu"), c.append(s), o.on("$destroy", function () {
                    c.remove()
                }), o.append(c), c[0].style.display = "none", a.init(c, {isInMenuBar: d})
            }

            var i = "Invalid HTML for md-menu: ";
            return {restrict: "E", require: ["mdMenu", "?^mdMenuBar"], controller: "mdMenuCtrl", scope: !0, compile: o}
        }

        t.module("material.components.menu").directive("mdMenu", e), e.$inject = ["$mdUtil"]
    }(), function () {
        function e(e) {
            function o(e, o, a, d, c, s, l, m, u) {
                function p(n, o, r) {
                    return r.nestLevel ? t.noop : (r.disableParentScroll && !e.getClosest(r.target, "MD-DIALOG") ? r.restoreScroll = e.disableScrollAround(r.element, r.parent) : r.disableParentScroll = !1, r.hasBackdrop && (r.backdrop = e.createBackdrop(n, "md-menu-backdrop md-click-catcher"), u.enter(r.backdrop, d[0].body)), function () {
                        r.backdrop && r.backdrop.remove(), r.disableParentScroll && r.restoreScroll()
                    })
                }

                function h(e, t, n) {
                    function o() {
                        return m(t, {addClass: "md-leave"}).start()
                    }

                    function r() {
                        t.removeClass("md-active"), E(t, n), n.alreadyOpen = !1
                    }

                    return n.cleanupInteraction(), n.cleanupResizing(), n.hideBackdrop(), n.$destroy === !0 ? r() : o().then(r)
                }

                function f(n, r, i) {
                    function d() {
                        return i.parent.append(r), r[0].style.display = "", s(function (e) {
                            var t = v(r, i);
                            r.removeClass("md-leave"), m(r, {
                                addClass: "md-active",
                                from: M.toCss(t),
                                to: M.toCss({transform: ""})
                            }).start().then(e)
                        })
                    }

                    function u() {
                        if (!i.target)throw Error("$mdMenu.show() expected a target to animate from in options.target");
                        t.extend(i, {
                            alreadyOpen: !1,
                            isRemoved: !1,
                            target: t.element(i.target),
                            parent: t.element(i.parent),
                            menuContentEl: t.element(r[0].querySelector("md-menu-content"))
                        })
                    }

                    function h() {
                        var e = function (e, t) {
                            return l.throttle(function () {
                                if (!i.isRemoved) {
                                    var n = v(e, t);
                                    e.css(M.toCss(n))
                                }
                            })
                        }(r, i);
                        return c.addEventListener("resize", e), c.addEventListener("orientationchange", e), function () {
                            c.removeEventListener("resize", e), c.removeEventListener("orientationchange", e)
                        }
                    }

                    function f() {
                        function t(t) {
                            var n;
                            switch (t.keyCode) {
                                case a.KEY_CODE.ESCAPE:
                                    i.mdMenuCtrl.close(!1, {closeAll: !0}), n = !0;
                                    break;
                                case a.KEY_CODE.UP_ARROW:
                                    g(t, i.menuContentEl, i, -1) || i.nestLevel || i.mdMenuCtrl.triggerContainerProxy(t), n = !0;
                                    break;
                                case a.KEY_CODE.DOWN_ARROW:
                                    g(t, i.menuContentEl, i, 1) || i.nestLevel || i.mdMenuCtrl.triggerContainerProxy(t), n = !0;
                                    break;
                                case a.KEY_CODE.LEFT_ARROW:
                                    i.nestLevel ? i.mdMenuCtrl.close() : i.mdMenuCtrl.triggerContainerProxy(t), n = !0;
                                    break;
                                case a.KEY_CODE.RIGHT_ARROW:
                                    var o = e.getClosest(t.target, "MD-MENU");
                                    o && o != i.parent[0] ? t.target.click() : i.mdMenuCtrl.triggerContainerProxy(t), n = !0
                            }
                            n && (t.preventDefault(), t.stopImmediatePropagation())
                        }

                        function o(e) {
                            e.preventDefault(), e.stopPropagation(), n.$apply(function () {
                                i.mdMenuCtrl.close(!0, {closeAll: !0})
                            })
                        }

                        function d(t) {
                            function o() {
                                n.$apply(function () {
                                    i.mdMenuCtrl.close(!0, {closeAll: !0})
                                })
                            }

                            function r(e, t) {
                                if (!e)return !1;
                                for (var n, o = 0; n = t[o]; ++o)for (var r, i = [n, "data-" + n, "x-" + n], a = 0; r = i[a]; ++a)if (e.hasAttribute(r))return !0;
                                return !1
                            }

                            var a = t.target;
                            do {
                                if (a == i.menuContentEl[0])return;
                                if ((r(a, ["ng-click", "ng-href", "ui-sref"]) || "BUTTON" == a.nodeName || "MD-BUTTON" == a.nodeName) && !r(a, ["md-prevent-menu-close"])) {
                                    var d = e.getClosest(a, "MD-MENU");
                                    a.hasAttribute("disabled") || d && d != i.parent[0] || o();
                                    break
                                }
                            } while (a = a.parentNode)
                        }

                        r.addClass("md-clickable"), i.backdrop && i.backdrop.on("click", o), i.menuContentEl.on("keydown", t), i.menuContentEl[0].addEventListener("click", d, !0);
                        var c = i.menuContentEl[0].querySelector("[md-menu-focus-target]");
                        if (!c) {
                            var s = i.menuContentEl[0].firstElementChild;
                            c = s && (s.querySelector(".md-button:not([disabled])") || s.firstElementChild)
                        }
                        return c && c.focus(), function () {
                            r.removeClass("md-clickable"), i.backdrop && i.backdrop.off("click", o), i.menuContentEl.off("keydown", t), i.menuContentEl[0].removeEventListener("click", d, !0)
                        }
                    }

                    return u(i), o.inherit(i.menuContentEl, i.target), i.cleanupResizing = h(), i.hideBackdrop = p(n, r, i), d().then(function (e) {
                        return i.alreadyOpen = !0, i.cleanupInteraction = f(), e
                    })
                }

                function g(t, n, o, r) {
                    for (var i, a = e.getClosest(t.target, "MD-MENU-ITEM"), d = e.nodesToArray(n[0].children), c = d.indexOf(a), s = c + r; s >= 0 && s < d.length; s += r) {
                        var l = d[s].querySelector(".md-button");
                        if (i = b(l))break
                    }
                    return i
                }

                function b(e) {
                    return e && -1 != e.getAttribute("tabindex") ? (e.focus(), d[0].activeElement == e) : void 0
                }

                function E(e, t) {
                    t.preserveElement ? r(e).style.display = "none" : r(e).parentNode === r(t.parent) && r(t.parent).removeChild(r(e))
                }

                function v(t, o) {
                    function r(e) {
                        e.top = Math.max(Math.min(e.top, E.bottom - l.offsetHeight), E.top), e.left = Math.max(Math.min(e.left, E.right - l.offsetWidth), E.left)
                    }

                    function a() {
                        for (var e = 0; e < m.children.length; ++e)if ("none" != c.getComputedStyle(m.children[e]).display)return m.children[e]
                    }

                    var s, l = t[0], m = t[0].firstElementChild, u = m.getBoundingClientRect(), p = d[0].body, h = p.getBoundingClientRect(), f = c.getComputedStyle(m), g = o.target[0].querySelector("[md-menu-origin]") || o.target[0], b = g.getBoundingClientRect(), E = {
                        left: h.left + i,
                        top: Math.max(h.top, 0) + i,
                        bottom: Math.max(h.bottom, Math.max(h.top, 0) + h.height) - i,
                        right: h.right - i
                    }, v = {top: 0, left: 0, right: 0, bottom: 0}, M = {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }, $ = o.mdMenuCtrl.positionMode();
                    ("target" == $.top || "target" == $.left || "target-right" == $.left) && (s = a(), s && (s = s.firstElementChild || s, s = s.querySelector("[md-menu-align-target]") || s, v = s.getBoundingClientRect(), M = {
                        top: parseFloat(l.style.top || 0),
                        left: parseFloat(l.style.left || 0)
                    }));
                    var y = {}, C = "top ";
                    switch ($.top) {
                        case"target":
                            y.top = M.top + b.top - v.top;
                            break;
                        case"cascade":
                            y.top = b.top - parseFloat(f.paddingTop) - g.style.top;
                            break;
                        case"bottom":
                            y.top = b.top + b.height;
                            break;
                        default:
                            throw new Error('Invalid target mode "' + $.top + '" specified for md-menu on Y axis.')
                    }
                    switch ($.left) {
                        case"target":
                            y.left = M.left + b.left - v.left, C += "left";
                            break;
                        case"target-right":
                            y.left = b.right - u.width + (u.right - v.right), C += "right";
                            break;
                        case"cascade":
                            var A = b.right + u.width < E.right;
                            y.left = A ? b.right - g.style.left : b.left - g.style.left - u.width, C += A ? "left" : "right";
                            break;
                        case"left":
                            y.left = b.left, C += "left";
                            break;
                        default:
                            throw new Error('Invalid target mode "' + $.left + '" specified for md-menu on X axis.')
                    }
                    var T = o.mdMenuCtrl.offsets();
                    y.top += T.top, y.left += T.left, r(y);
                    var w = Math.round(100 * Math.min(b.width / l.offsetWidth, 1)) / 100, k = Math.round(100 * Math.min(b.height / l.offsetHeight, 1)) / 100;
                    return {
                        top: Math.round(y.top),
                        left: Math.round(y.left),
                        transform: o.alreadyOpen ? n : e.supplant("scale({0},{1})", [w, k]),
                        transformOrigin: C
                    }
                }

                var M = e.dom.animator;
                return {
                    parent: "body",
                    onShow: f,
                    onRemove: h,
                    hasBackdrop: !0,
                    disableParentScroll: !0,
                    skipCompile: !0,
                    preserveScope: !0,
                    skipHide: !0,
                    themable: !0
                }
            }

            function r(e) {
                return e instanceof t.element && (e = e[0]), e
            }

            var i = 8;
            return o.$inject = ["$mdUtil", "$mdTheming", "$mdConstant", "$document", "$window", "$q", "$$rAF", "$animateCss", "$animate"], e("$mdMenu").setDefaults({
                methods: ["target"],
                options: o
            })
        }

        t.module("material.components.menu").provider("$mdMenu", e), e.$inject = ["$$interimElementProvider"]
    }(), function () {
        function e(e, n, r, i, a, d, c, s) {
            this.$element = r, this.$attrs = i, this.$mdConstant = a, this.$mdUtil = c, this.$document = d, this.$scope = e, this.$rootScope = n, this.$timeout = s;
            var l = this;
            t.forEach(o, function (e) {
                l[e] = t.bind(l, l[e])
            })
        }

        t.module("material.components.menuBar").controller("MenuBarController", e);
        var o = ["handleKeyDown", "handleMenuHover", "scheduleOpenHoveredMenu", "cancelScheduledOpen"];
        e.$inject = ["$scope", "$rootScope", "$element", "$attrs", "$mdConstant", "$document", "$mdUtil", "$timeout"], e.prototype.init = function () {
            var e = this.$element, t = this.$mdUtil, o = this.$scope, r = this, i = [];
            e.on("keydown", this.handleKeyDown), this.parentToolbar = t.getClosest(e, "MD-TOOLBAR"), i.push(this.$rootScope.$on("$mdMenuOpen", function (t, n) {
                -1 != r.getMenus().indexOf(n[0]) && (e[0].classList.add("md-open"), n[0].classList.add("md-open"), r.currentlyOpenMenu = n.controller("mdMenu"), r.currentlyOpenMenu.registerContainerProxy(r.handleKeyDown), r.enableOpenOnHover())
            })), i.push(this.$rootScope.$on("$mdMenuClose", function (o, i, a) {
                var d = r.getMenus();
                if (-1 != d.indexOf(i[0]) && (e[0].classList.remove("md-open"), i[0].classList.remove("md-open")), e[0].contains(i[0])) {
                    for (var c = i[0]; c && -1 == d.indexOf(c);)c = t.getClosest(c, "MD-MENU", !0);
                    c && (a.skipFocus || c.querySelector("button:not([disabled])").focus(), r.currentlyOpenMenu = n, r.disableOpenOnHover(), r.setKeyboardMode(!0))
                }
            })), o.$on("$destroy", function () {
                for (; i.length;)i.shift()()
            }), this.setKeyboardMode(!0)
        }, e.prototype.setKeyboardMode = function (e) {
            e ? this.$element[0].classList.add("md-keyboard-mode") : this.$element[0].classList.remove("md-keyboard-mode")
        }, e.prototype.enableOpenOnHover = function () {
            if (!this.openOnHoverEnabled) {
                this.openOnHoverEnabled = !0;
                var e;
                (e = this.parentToolbar) && (e.dataset.mdRestoreStyle = e.getAttribute("style"), e.style.position = "relative", e.style.zIndex = 100), t.element(this.getMenus()).on("mouseenter", this.handleMenuHover)
            }
        }, e.prototype.handleMenuHover = function (e) {
            this.setKeyboardMode(!1), this.openOnHoverEnabled && this.scheduleOpenHoveredMenu(e)
        }, e.prototype.disableOpenOnHover = function () {
            if (this.openOnHoverEnabled) {
                this.openOnHoverEnabled = !1;
                var e;
                (e = this.parentToolbar) && e.setAttribute("style", e.dataset.mdRestoreStyle || ""), t.element(this.getMenus()).off("mouseenter", this.handleMenuHover)
            }
        }, e.prototype.scheduleOpenHoveredMenu = function (e) {
            var n = t.element(e.currentTarget), o = n.controller("mdMenu");
            this.setKeyboardMode(!1), this.scheduleOpenMenu(o)
        }, e.prototype.scheduleOpenMenu = function (e) {
            var t = this, o = this.$timeout;
            e != t.currentlyOpenMenu && (o.cancel(t.pendingMenuOpen), t.pendingMenuOpen = o(function () {
                t.pendingMenuOpen = n, t.currentlyOpenMenu && t.currentlyOpenMenu.close(!0, {closeAll: !0}), e.open()
            }, 200, !1))
        }, e.prototype.handleKeyDown = function (e) {
            var n = this.$mdConstant.KEY_CODE, o = this.currentlyOpenMenu, r = o && o.isOpen;
            this.setKeyboardMode(!0);
            var i, a, d;
            switch (e.keyCode) {
                case n.DOWN_ARROW:
                    o ? o.focusMenuContainer() : this.openFocusedMenu(), i = !0;
                    break;
                case n.UP_ARROW:
                    o && o.close(), i = !0;
                    break;
                case n.LEFT_ARROW:
                    a = this.focusMenu(-1), r && (d = t.element(a).controller("mdMenu"), this.scheduleOpenMenu(d)), i = !0;
                    break;
                case n.RIGHT_ARROW:
                    a = this.focusMenu(1), r && (d = t.element(a).controller("mdMenu"), this.scheduleOpenMenu(d)), i = !0
            }
            i && (e && e.preventDefault && e.preventDefault(), e && e.stopImmediatePropagation && e.stopImmediatePropagation())
        }, e.prototype.focusMenu = function (e) {
            var t = this.getMenus(), n = this.getFocusedMenuIndex();
            -1 == n && (n = this.getOpenMenuIndex());
            var o = !1;
            return -1 == n ? n = 0 : (0 > e && n > 0 || e > 0 && n < t.length - e) && (n += e, o = !0), o ? (t[n].querySelector("button").focus(), t[n]) : void 0
        }, e.prototype.openFocusedMenu = function () {
            var e = this.getFocusedMenu();
            e && t.element(e).controller("mdMenu").open()
        }, e.prototype.getMenus = function () {
            var e = this.$element;
            return this.$mdUtil.nodesToArray(e[0].children).filter(function (e) {
                return "MD-MENU" == e.nodeName
            })
        }, e.prototype.getFocusedMenu = function () {
            return this.getMenus()[this.getFocusedMenuIndex()]
        }, e.prototype.getFocusedMenuIndex = function () {
            var e = this.$mdUtil, t = e.getClosest(this.$document[0].activeElement, "MD-MENU");
            if (!t)return -1;
            var n = this.getMenus().indexOf(t);
            return n
        }, e.prototype.getOpenMenuIndex = function () {
            for (var e = this.getMenus(), t = 0; t < e.length; ++t)if (e[t].classList.contains("md-open"))return t;
            return -1
        }
    }(), function () {
        function e(e, n) {
            return {
                restrict: "E", require: "mdMenuBar", controller: "MenuBarController", compile: function (o, r) {
                    return r.ariaRole || o[0].setAttribute("role", "menubar"), t.forEach(o[0].children, function (n) {
                        if ("MD-MENU" == n.nodeName) {
                            n.hasAttribute("md-position-mode") || (n.setAttribute("md-position-mode", "left bottom"), n.querySelector("button,a").setAttribute("role", "menuitem"));
                            var o = e.nodesToArray(n.querySelectorAll("md-menu-content"));
                            t.forEach(o, function (e) {
                                e.classList.add("md-menu-bar-menu"), e.classList.add("md-dense"), e.hasAttribute("width") || e.setAttribute("width", 5)
                            })
                        }
                    }), function (e, t, o, r) {
                        n(e, t), r.init()
                    }
                }
            }
        }

        t.module("material.components.menuBar").directive("mdMenuBar", e), e.$inject = ["$mdUtil", "$mdTheming"]
    }(), function () {
        function e() {
            return {
                restrict: "E", compile: function (e, t) {
                    t.role || e[0].setAttribute("role", "separator")
                }
            }
        }

        t.module("material.components.menuBar").directive("mdMenuDivider", e)
    }(), function () {
        function e(e, t, n) {
            this.$element = t, this.$attrs = n, this.$scope = e
        }

        t.module("material.components.menuBar").controller("MenuItemController", e), e.$inject = ["$scope", "$element", "$attrs"], e.prototype.init = function (e) {
            var t = this.$element, n = this.$attrs;
            this.ngModel = e, ("checkbox" == n.type || "radio" == n.type) && (this.mode = n.type, this.iconEl = t[0].children[0], this.buttonEl = t[0].children[1], e && this.initClickListeners())
        }, e.prototype.clearNgAria = function () {
            var e = this.$element[0], n = ["role", "tabindex", "aria-invalid", "aria-checked"];
            t.forEach(n, function (t) {
                e.removeAttribute(t)
            })
        }, e.prototype.initClickListeners = function () {
            function e() {
                if ("radio" == d) {
                    var e = a.ngValue ? i.$eval(a.ngValue) : a.value;
                    return r.$modelValue == e
                }
                return r.$modelValue
            }

            function n(e) {
                e ? s.off("click", l) : s.on("click", l)
            }

            var o = this, r = this.ngModel, i = this.$scope, a = this.$attrs, d = (this.$element, this.mode);
            this.handleClick = t.bind(this, this.handleClick);
            var c = this.iconEl, s = t.element(this.buttonEl), l = this.handleClick;
            a.$observe("disabled", n), n(a.disabled), r.$render = function () {
                o.clearNgAria(), e() ? (c.style.display = "", s.attr("aria-checked", "true")) : (c.style.display = "none", s.attr("aria-checked", "false"))
            }, i.$$postDigest(r.$render)
        }, e.prototype.handleClick = function (e) {
            var t, n = this.mode, o = this.ngModel, r = this.$attrs;
            "checkbox" == n ? t = !o.$modelValue : "radio" == n && (t = r.ngValue ? this.$scope.$eval(r.ngValue) : r.value), o.$setViewValue(t), o.$render()
        }
    }(), function () {
        function e() {
            return {
                require: ["mdMenuItem", "?ngModel"], priority: 210, compile: function (e, n) {
                    function o(n, o, r) {
                        r = r || e, r instanceof t.element && (r = r[0]), r.hasAttribute(n) || r.setAttribute(n, o)
                    }

                    function r(t) {
                        if (e[0].hasAttribute(t)) {
                            var n = e[0].getAttribute(t);
                            a[0].setAttribute(t, n), e[0].removeAttribute(t)
                        }
                    }

                    if ("checkbox" == n.type || "radio" == n.type) {
                        var i = e[0].textContent, a = t.element('<md-button type="button"></md-button>');
                        a.html(i), a.attr("tabindex", "0"), e.html(""), e.append(t.element('<md-icon md-svg-icon="check"></md-icon>')), e.append(a), e[0].classList.add("md-indent"), o("role", "checkbox" == n.type ? "menuitemcheckbox" : "menuitemradio", a), t.forEach(["ng-disabled"], r)
                    } else o("role", "menuitem", e[0].querySelector("md-button,button,a"));
                    return function (e, t, n, o) {
                        var r = o[0], i = o[1];
                        r.init(i)
                    }
                }, controller: "MenuItemController"
            }
        }

        t.module("material.components.menuBar").directive("mdMenuItem", e)
    }(), function () {
        function e() {
            function e(e, o, r, i) {
                if (i) {
                    var a = i.getTabElementIndex(o), d = n(o, "md-tab-body").remove(), c = n(o, "md-tab-label").remove(), s = i.insertTab({
                        scope: e,
                        parent: e.$parent,
                        index: a,
                        element: o,
                        template: d.html(),
                        label: c.html()
                    }, a);
                    e.select = e.select || t.noop, e.deselect = e.deselect || t.noop, e.$watch("active", function (e) {
                        e && i.select(s.getIndex())
                    }), e.$watch("disabled", function () {
                        i.refreshIndex()
                    }), e.$watch(function () {
                        return i.getTabElementIndex(o)
                    }, function (e) {
                        s.index = e, i.updateTabOrder()
                    }), e.$on("$destroy", function () {
                        i.removeTab(s)
                    })
                }
            }

            function n(e, n) {
                for (var o = e[0].children, r = 0, i = o.length; i > r; r++) {
                    var a = o[r];
                    if (a.tagName === n.toUpperCase())return t.element(a)
                }
                return t.element()
            }

            return {
                require: "^?mdTabs",
                terminal: !0,
                compile: function (o, r) {
                    var i = n(o, "md-tab-label"), a = n(o, "md-tab-body");
                    if (0 == i.length && (i = t.element("<md-tab-label></md-tab-label>"), r.label ? i.text(r.label) : i.append(o.contents()), 0 == a.length)) {
                        var d = o.contents().detach();
                        a = t.element("<md-tab-body></md-tab-body>"), a.append(d)
                    }
                    return o.append(i), a.html() && o.append(a), e
                },
                scope: {
                    active: "=?mdActive",
                    disabled: "=?ngDisabled",
                    select: "&?mdOnSelect",
                    deselect: "&?mdOnDeselect"
                }
            }
        }

        t.module("material.components.tabs").directive("mdTab", e)
    }(), function () {
        function e() {
            return {
                require: "^?mdTabs", link: function (e, t, n, o) {
                    o && o.attachRipple(e, t)
                }
            }
        }

        t.module("material.components.tabs").directive("mdTabItem", e)
    }(), function () {
        function e() {
            return {terminal: !0}
        }

        t.module("material.components.tabs").directive("mdTabLabel", e)
    }(), function () {
        function e(e) {
            return {
                restrict: "A", compile: function (t, n) {
                    var o = e(n.mdTabScroll, null, !0);
                    return function (e, t) {
                        t.on("mousewheel", function (t) {
                            e.$apply(function () {
                                o(e, {$event: t})
                            })
                        })
                    }
                }
            }
        }

        t.module("material.components.tabs").directive("mdTabScroll", e), e.$inject = ["$parse"]
    }(), function () {
        function e(e, o, r, i, a, d, c, s, l, m) {
            function u() {
                ce.selectedIndex = ce.selectedIndex || 0, p(), f(), h(), m(o), d.nextTick(function () {
                    oe(), J(), re(), ce.tabs[ce.selectedIndex] && ce.tabs[ce.selectedIndex].scope.select(), pe = !0, Y()
                })
            }

            function p() {
                var e = s.$mdTabsTemplate, n = t.element(le.data);
                n.html(e), l(n.contents())(ce.parent), delete s.$mdTabsTemplate
            }

            function h() {
                t.element(r).on("resize", I), e.$on("$destroy", E)
            }

            function f() {
                e.$watch("$mdTabsCtrl.selectedIndex", w)
            }

            function g(e, t) {
                var n = s.$normalize("md-" + e);
                t && W(e, t), s.$observe(n, function (t) {
                    ce[e] = t
                })
            }

            function b(e, t) {
                function n(t) {
                    ce[e] = "false" !== t
                }

                var o = s.$normalize("md-" + e);
                t && W(e, t), s.hasOwnProperty(o) && n(s[o]), s.$observe(o, n)
            }

            function E() {
                ue = !0, t.element(r).off("resize", I)
            }

            function v(e) {
                t.element(le.wrapper).toggleClass("md-stretch-tabs", z()), re()
            }

            function M(e) {
                ce.shouldCenterTabs = q()
            }

            function $(e, t) {
                e !== t && d.nextTick(ce.updateInkBarStyles)
            }

            function y(e, t) {
                e !== t && (ce.maxTabWidth = G(), ce.shouldCenterTabs = q(), d.nextTick(function () {
                    ce.maxTabWidth = G(), J(ce.selectedIndex)
                }))
            }

            function C(e) {
                o[e ? "removeClass" : "addClass"]("md-no-tab-content")
            }

            function A(n) {
                var o = ce.shouldCenterTabs ? "" : "-" + n + "px";
                t.element(le.paging).css(i.CSS.TRANSFORM, "translate3d(" + o + ", 0, 0)"), e.$broadcast("$mdTabsPaginationChanged")
            }

            function T(e, t) {
                e !== t && le.tabs[e] && (J(), Z())
            }

            function w(t, n) {
                t !== n && (ce.selectedIndex = V(t), ce.lastSelectedIndex = n, ce.updateInkBarStyles(), oe(), J(t), e.$broadcast("$mdTabsChanged"), ce.tabs[n] && ce.tabs[n].scope.deselect(), ce.tabs[t] && ce.tabs[t].scope.select())
            }

            function k(e) {
                var t = o[0].getElementsByTagName("md-tab");
                return Array.prototype.indexOf.call(t, e[0])
            }

            function x() {
                x.watcher || (x.watcher = e.$watch(function () {
                    d.nextTick(function () {
                        x.watcher && o.prop("offsetParent") && (x.watcher(), x.watcher = null, I())
                    }, !1)
                }))
            }

            function N(e) {
                switch (e.keyCode) {
                    case i.KEY_CODE.LEFT_ARROW:
                        e.preventDefault(), Q(-1, !0);
                        break;
                    case i.KEY_CODE.RIGHT_ARROW:
                        e.preventDefault(), Q(1, !0);
                        break;
                    case i.KEY_CODE.SPACE:
                    case i.KEY_CODE.ENTER:
                        e.preventDefault(), se || (ce.selectedIndex = ce.focusIndex)
                }
                ce.lastClick = !1
            }

            function _(e) {
                se || (ce.focusIndex = ce.selectedIndex = e), ce.lastClick = !0, d.nextTick(function () {
                    ce.tabs[e].element.triggerHandler("click")
                }, !1)
            }

            function H(e) {
                ce.shouldPaginate && (e.preventDefault(), ce.offsetLeft = ae(ce.offsetLeft - e.wheelDelta))
            }

            function S() {
                var e, t, n = le.canvas.clientWidth, o = n + ce.offsetLeft;
                for (e = 0; e < le.tabs.length && (t = le.tabs[e], !(t.offsetLeft + t.offsetWidth > o)); e++);
                ce.offsetLeft = ae(t.offsetLeft)
            }

            function D() {
                var e, t;
                for (e = 0; e < le.tabs.length && (t = le.tabs[e], !(t.offsetLeft + t.offsetWidth >= ce.offsetLeft)); e++);
                ce.offsetLeft = ae(t.offsetLeft + t.offsetWidth - le.canvas.clientWidth)
            }

            function I() {
                ce.lastSelectedIndex = ce.selectedIndex, ce.offsetLeft = ae(ce.offsetLeft), d.nextTick(function () {
                    ce.updateInkBarStyles(), Y()
                })
            }

            function O(e) {
                t.element(le.inkBar).toggleClass("ng-hide", e)
            }

            function R(e) {
                o.toggleClass("md-dynamic-height", e)
            }

            function L(e) {
                if (!ue) {
                    var t = ce.selectedIndex, n = ce.tabs.splice(e.getIndex(), 1)[0];
                    ne(), ce.selectedIndex === t && (n.scope.deselect(), ce.tabs[ce.selectedIndex] && ce.tabs[ce.selectedIndex].scope.select()), d.nextTick(function () {
                        Y(), ce.offsetLeft = ae(ce.offsetLeft)
                    })
                }
            }

            function P(e, n) {
                var o = pe, r = {
                    getIndex: function () {
                        return ce.tabs.indexOf(i)
                    }, isActive: function () {
                        return this.getIndex() === ce.selectedIndex
                    }, isLeft: function () {
                        return this.getIndex() < ce.selectedIndex
                    }, isRight: function () {
                        return this.getIndex() > ce.selectedIndex
                    }, shouldRender: function () {
                        return !ce.noDisconnect || this.isActive()
                    }, hasFocus: function () {
                        return !ce.lastClick && ce.hasFocus && this.getIndex() === ce.focusIndex
                    }, id: d.nextUid()
                }, i = t.extend(r, e);
                return t.isDefined(n) ? ce.tabs.splice(n, 0, i) : ce.tabs.push(i), ee(), te(), d.nextTick(function () {
                    Y(), o && ce.autoselect && d.nextTick(function () {
                        d.nextTick(function () {
                            _(ce.tabs.indexOf(i))
                        })
                    })
                }), i
            }

            function F() {
                var e = {};
                return e.wrapper = o[0].getElementsByTagName("md-tabs-wrapper")[0], e.data = o[0].getElementsByTagName("md-tab-data")[0], e.canvas = e.wrapper.getElementsByTagName("md-tabs-canvas")[0], e.paging = e.canvas.getElementsByTagName("md-pagination-wrapper")[0], e.tabs = e.paging.getElementsByTagName("md-tab-item"), e.dummies = e.canvas.getElementsByTagName("md-dummy-tab"), e.inkBar = e.paging.getElementsByTagName("md-ink-bar")[0], e.contentsWrapper = o[0].getElementsByTagName("md-tabs-content-wrapper")[0], e.contents = e.contentsWrapper.getElementsByTagName("md-tab-content"), e
            }

            function B() {
                return ce.offsetLeft > 0
            }

            function U() {
                var e = le.tabs[le.tabs.length - 1];
                return e && e.offsetLeft + e.offsetWidth > le.canvas.clientWidth + ce.offsetLeft
            }

            function z() {
                switch (ce.stretchTabs) {
                    case"always":
                        return !0;
                    case"never":
                        return !1;
                    default:
                        return !ce.shouldPaginate && r.matchMedia("(max-width: 600px)").matches
                }
            }

            function q() {
                return ce.centerTabs && !ce.shouldPaginate
            }

            function j() {
                if (ce.noPagination || !pe)return !1;
                var e = o.prop("clientWidth");
                return t.forEach(F().dummies, function (t) {
                    e -= t.offsetWidth
                }), 0 > e
            }

            function V(e) {
                if (-1 === e)return -1;
                var t, n, o = Math.max(ce.tabs.length - e, e);
                for (t = 0; o >= t; t++) {
                    if (n = ce.tabs[e + t], n && n.scope.disabled !== !0)return n.getIndex();
                    if (n = ce.tabs[e - t], n && n.scope.disabled !== !0)return n.getIndex()
                }
                return e
            }

            function W(e, t, n) {
                Object.defineProperty(ce, e, {
                    get: function () {
                        return n
                    }, set: function (e) {
                        var o = n;
                        n = e, t && t(e, o)
                    }
                })
            }

            function Y() {
                z() || K(), ce.maxTabWidth = G(), ce.shouldPaginate = j()
            }

            function K() {
                var e = 1;
                t.forEach(F().dummies, function (t) {
                    e += Math.ceil(t.offsetWidth)
                }), t.element(le.paging).css("width", e + "px")
            }

            function G() {
                return o.prop("clientWidth")
            }

            function X() {
                var e = ce.tabs[ce.selectedIndex], t = ce.tabs[ce.focusIndex];
                ce.tabs = ce.tabs.sort(function (e, t) {
                    return e.index - t.index
                }), ce.selectedIndex = ce.tabs.indexOf(e), ce.focusIndex = ce.tabs.indexOf(t)
            }

            function Q(e, t) {
                var n, o = t ? "focusIndex" : "selectedIndex", r = ce[o];
                for (n = r + e; ce.tabs[n] && ce.tabs[n].scope.disabled; n += e);
                ce.tabs[n] && (ce[o] = n)
            }

            function Z() {
                F().dummies[ce.focusIndex].focus()
            }

            function J(e) {
                if (null == e && (e = ce.focusIndex), le.tabs[e] && !ce.shouldCenterTabs) {
                    var t = le.tabs[e], n = t.offsetLeft, o = t.offsetWidth + n;
                    ce.offsetLeft = Math.max(ce.offsetLeft, ae(o - le.canvas.clientWidth + 64)), ce.offsetLeft = Math.min(ce.offsetLeft, ae(n))
                }
            }

            function ee() {
                me.forEach(function (e) {
                    d.nextTick(e)
                }), me = []
            }

            function te() {
                var e = !1;
                t.forEach(ce.tabs, function (t) {
                    t.template && (e = !0)
                }), ce.hasContent = e
            }

            function ne() {
                ce.selectedIndex = V(ce.selectedIndex), ce.focusIndex = V(ce.focusIndex)
            }

            function oe() {
                if (!ce.dynamicHeight)return o.css("height", "");
                if (!ce.tabs.length)return me.push(oe);
                var e = le.contents[ce.selectedIndex], t = e ? e.offsetHeight : 0, r = le.wrapper.offsetHeight, i = t + r, a = o.prop("clientHeight");
                if (a !== i) {
                    "bottom" === o.attr("md-align-tabs") && (a -= r, i -= r, o.attr("md-border-bottom") !== n && ++a), se = !0;
                    var s = {height: a + "px"}, l = {height: i + "px"};
                    o.css(s), c(o, {
                        from: s,
                        to: l,
                        easing: "cubic-bezier(0.35, 0, 0.25, 1)",
                        duration: .5
                    }).start().done(function () {
                        o.css({transition: "none", height: ""}), d.nextTick(function () {
                            o.css("transition", "")
                        }), se = !1
                    })
                }
            }

            function re() {
                if (!le.tabs[ce.selectedIndex])return void t.element(le.inkBar).css({left: "auto", right: "auto"});
                if (!ce.tabs.length)return me.push(ce.updateInkBarStyles);
                if (!o.prop("offsetParent"))return x();
                var e, n = ce.selectedIndex, r = le.paging.offsetWidth, i = le.tabs[n], a = i.offsetLeft, c = r - a - i.offsetWidth;
                ce.shouldCenterTabs && (e = Array.prototype.slice.call(le.tabs).reduce(function (e, t) {
                    return e + t.offsetWidth
                }, 0), r > e && d.nextTick(re, !1)), ie(), t.element(le.inkBar).css({left: a + "px", right: c + "px"})
            }

            function ie() {
                var e = ce.selectedIndex, n = ce.lastSelectedIndex, o = t.element(le.inkBar);
                t.isNumber(n) && o.toggleClass("md-left", n > e).toggleClass("md-right", e > n)
            }

            function ae(e) {
                if (!le.tabs.length || !ce.shouldPaginate)return 0;
                var t = le.tabs[le.tabs.length - 1], n = t.offsetLeft + t.offsetWidth;
                return e = Math.max(0, e), e = Math.min(n - le.canvas.clientWidth, e)
            }

            function de(e, n) {
                var o = {colorElement: t.element(le.inkBar)};
                a.attach(e, n, o)
            }

            var ce = this, se = !1, le = F(), me = [], ue = !1, pe = !1;
            g("stretchTabs", v), W("focusIndex", T, ce.selectedIndex || 0), W("offsetLeft", A, 0), W("hasContent", C, !1), W("maxTabWidth", $, G()), W("shouldPaginate", y, !1), b("noInkBar", O), b("dynamicHeight", R), b("noPagination"), b("swipeContent"), b("noDisconnect"), b("autoselect"), b("centerTabs", M, !1), b("enableDisconnect"), ce.scope = e, ce.parent = e.$parent, ce.tabs = [], ce.lastSelectedIndex = null, ce.hasFocus = !1, ce.lastClick = !0, ce.shouldCenterTabs = q(), ce.updatePagination = d.debounce(Y, 100), ce.redirectFocus = Z, ce.attachRipple = de, ce.insertTab = P, ce.removeTab = L, ce.select = _, ce.scroll = H, ce.nextPage = S, ce.previousPage = D, ce.keydown = N, ce.canPageForward = U, ce.canPageBack = B, ce.refreshIndex = ne, ce.incrementIndex = Q, ce.getTabElementIndex = k, ce.updateInkBarStyles = d.debounce(re, 100), ce.updateTabOrder = d.debounce(X, 100), u()
        }

        t.module("material.components.tabs").controller("MdTabsController", e), e.$inject = ["$scope", "$element", "$window", "$mdConstant", "$mdTabInkRipple", "$mdUtil", "$animateCss", "$attrs", "$compile", "$mdTheming"]
    }(), function () {
        function e() {
            return {
                scope: {selectedIndex: "=?mdSelected"}, template: function (e, t) {
                    return t.$mdTabsTemplate = e.html(), '<md-tabs-wrapper> <md-tab-data></md-tab-data> <md-prev-button tabindex="-1" role="button" aria-label="Previous Page" aria-disabled="{{!$mdTabsCtrl.canPageBack()}}" ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageBack() }" ng-if="$mdTabsCtrl.shouldPaginate" ng-click="$mdTabsCtrl.previousPage()"> <md-icon md-svg-icon="md-tabs-arrow"></md-icon> </md-prev-button> <md-next-button tabindex="-1" role="button" aria-label="Next Page" aria-disabled="{{!$mdTabsCtrl.canPageForward()}}" ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageForward() }" ng-if="$mdTabsCtrl.shouldPaginate" ng-click="$mdTabsCtrl.nextPage()"> <md-icon md-svg-icon="md-tabs-arrow"></md-icon> </md-next-button> <md-tabs-canvas tabindex="{{ $mdTabsCtrl.hasFocus ? -1 : 0 }}" aria-activedescendant="tab-item-{{$mdTabsCtrl.tabs[$mdTabsCtrl.focusIndex].id}}" ng-focus="$mdTabsCtrl.redirectFocus()" ng-class="{ \'md-paginated\': $mdTabsCtrl.shouldPaginate, \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs }" ng-keydown="$mdTabsCtrl.keydown($event)" role="tablist"> <md-pagination-wrapper ng-class="{ \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs }" md-tab-scroll="$mdTabsCtrl.scroll($event)"> <md-tab-item tabindex="-1" class="md-tab" style="max-width: {{ $mdTabsCtrl.maxTabWidth + \'px\' }}" ng-repeat="tab in $mdTabsCtrl.tabs" role="tab" aria-controls="tab-content-{{::tab.id}}" aria-selected="{{tab.isActive()}}" aria-disabled="{{tab.scope.disabled || \'false\'}}" ng-click="$mdTabsCtrl.select(tab.getIndex())" ng-class="{ \'md-active\':    tab.isActive(), \'md-focused\':   tab.hasFocus(), \'md-disabled\':  tab.scope.disabled }" ng-disabled="tab.scope.disabled" md-swipe-left="$mdTabsCtrl.nextPage()" md-swipe-right="$mdTabsCtrl.previousPage()" md-tabs-template="::tab.label" md-scope="::tab.parent"></md-tab-item> <md-ink-bar></md-ink-bar> </md-pagination-wrapper> <div class="md-visually-hidden md-dummy-wrapper"> <md-dummy-tab class="md-tab" tabindex="-1" id="tab-item-{{::tab.id}}" role="tab" aria-controls="tab-content-{{::tab.id}}" aria-selected="{{tab.isActive()}}" aria-disabled="{{tab.scope.disabled || \'false\'}}" ng-focus="$mdTabsCtrl.hasFocus = true" ng-blur="$mdTabsCtrl.hasFocus = false" ng-repeat="tab in $mdTabsCtrl.tabs" md-tabs-template="::tab.label" md-scope="::tab.parent"></md-dummy-tab> </div> </md-tabs-canvas> </md-tabs-wrapper> <md-tabs-content-wrapper ng-show="$mdTabsCtrl.hasContent && $mdTabsCtrl.selectedIndex >= 0"> <md-tab-content id="tab-content-{{::tab.id}}" role="tabpanel" aria-labelledby="tab-item-{{::tab.id}}" md-swipe-left="$mdTabsCtrl.swipeContent && $mdTabsCtrl.incrementIndex(1)" md-swipe-right="$mdTabsCtrl.swipeContent && $mdTabsCtrl.incrementIndex(-1)" ng-if="$mdTabsCtrl.hasContent" ng-repeat="(index, tab) in $mdTabsCtrl.tabs" ng-class="{ \'md-no-transition\': $mdTabsCtrl.lastSelectedIndex == null, \'md-active\':        tab.isActive(), \'md-left\':          tab.isLeft(), \'md-right\':         tab.isRight(), \'md-no-scroll\':     $mdTabsCtrl.dynamicHeight }"> <div md-tabs-template="::tab.template" md-connected-if="tab.isActive()" md-scope="::tab.parent" ng-if="$mdTabsCtrl.enableDisconnect || tab.shouldRender()"></div> </md-tab-content> </md-tabs-content-wrapper>'
                }, controller: "MdTabsController", controllerAs: "$mdTabsCtrl", bindToController: !0
            }
        }

        t.module("material.components.tabs").directive("mdTabs", e)
    }(), function () {
        function e(e, t) {
            function n(n, o, r, i) {
                function a() {
                    n.$watch("connected", function (e) {
                        e === !1 ? d() : c()
                    }), n.$on("$destroy", c)
                }

                function d() {
                    i.enableDisconnect && t.disconnectScope(s)
                }

                function c() {
                    i.enableDisconnect && t.reconnectScope(s)
                }

                if (i) {
                    var s = i.enableDisconnect ? n.compileScope.$new() : n.compileScope;
                    return o.html(n.template), e(o.contents())(s), o.on("DOMSubtreeModified", function () {
                        i.updatePagination(), i.updateInkBarStyles()
                    }), t.nextTick(a)
                }
            }

            return {
                restrict: "A",
                link: n,
                scope: {template: "=mdTabsTemplate", connected: "=?mdConnectedIf", compileScope: "=mdScope"},
                require: "^?mdTabs"
            }
        }

        t.module("material.components.tabs").directive("mdTabsTemplate", e), e.$inject = ["$compile", "$mdUtil"]
    }(), function () {
        t.module("material.core").constant("$MD_THEME_CSS", "md-autocomplete.md-THEME_NAME-theme {  background: '{{background-50}}'; }  md-autocomplete.md-THEME_NAME-theme[disabled] {    background: '{{background-100}}'; }  md-autocomplete.md-THEME_NAME-theme button md-icon path {    fill: '{{background-600}}'; }  md-autocomplete.md-THEME_NAME-theme button:after {    background: '{{background-600-0.3}}'; }.md-autocomplete-suggestions-container.md-THEME_NAME-theme {  background: '{{background-50}}'; }  .md-autocomplete-suggestions-container.md-THEME_NAME-theme li {    color: '{{background-900}}'; }    .md-autocomplete-suggestions-container.md-THEME_NAME-theme li .highlight {      color: '{{background-600}}'; }    .md-autocomplete-suggestions-container.md-THEME_NAME-theme li:hover, .md-autocomplete-suggestions-container.md-THEME_NAME-theme li.selected {      background: '{{background-200}}'; }md-bottom-sheet.md-THEME_NAME-theme {  background-color: '{{background-50}}';  border-top-color: '{{background-300}}'; }  md-bottom-sheet.md-THEME_NAME-theme.md-list md-list-item {    color: '{{foreground-1}}'; }  md-bottom-sheet.md-THEME_NAME-theme .md-subheader {    background-color: '{{background-50}}'; }  md-bottom-sheet.md-THEME_NAME-theme .md-subheader {    color: '{{foreground-1}}'; }md-backdrop {  background-color: '{{background-900-0.0}}'; }  md-backdrop.md-opaque.md-THEME_NAME-theme {    background-color: '{{background-900-1.0}}'; }a.md-button.md-THEME_NAME-theme:not([disabled]):hover,.md-button.md-THEME_NAME-theme:not([disabled]):hover {  background-color: '{{background-500-0.2}}'; }a.md-button.md-THEME_NAME-theme:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme:not([disabled]).md-focused {  background-color: '{{background-500-0.2}}'; }a.md-button.md-THEME_NAME-theme:not([disabled]).md-icon-button:hover,.md-button.md-THEME_NAME-theme:not([disabled]).md-icon-button:hover {  background-color: transparent; }a.md-button.md-THEME_NAME-theme.md-fab,.md-button.md-THEME_NAME-theme.md-fab {  background-color: '{{accent-color}}';  color: '{{accent-contrast}}'; }  a.md-button.md-THEME_NAME-theme.md-fab md-icon,  .md-button.md-THEME_NAME-theme.md-fab md-icon {    color: '{{accent-contrast}}'; }  a.md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover,  .md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover {    background-color: '{{accent-color}}'; }  a.md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused,  .md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused {    background-color: '{{accent-A700}}'; }a.md-button.md-THEME_NAME-theme.md-primary,.md-button.md-THEME_NAME-theme.md-primary {  color: '{{primary-color}}'; }  a.md-button.md-THEME_NAME-theme.md-primary.md-raised, a.md-button.md-THEME_NAME-theme.md-primary.md-fab,  .md-button.md-THEME_NAME-theme.md-primary.md-raised,  .md-button.md-THEME_NAME-theme.md-primary.md-fab {    color: '{{primary-contrast}}';    background-color: '{{primary-color}}'; }    a.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]) md-icon, a.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]) md-icon,    .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]) md-icon,    .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]) md-icon {      color: '{{primary-contrast}}'; }    a.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):hover, a.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):hover,    .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):hover,    .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):hover {      background-color: '{{primary-color}}'; }    a.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]).md-focused, a.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]).md-focused,    .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]).md-focused,    .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]).md-focused {      background-color: '{{primary-600}}'; }  a.md-button.md-THEME_NAME-theme.md-primary:not([disabled]) md-icon,  .md-button.md-THEME_NAME-theme.md-primary:not([disabled]) md-icon {    color: '{{primary-color}}'; }a.md-button.md-THEME_NAME-theme.md-fab,.md-button.md-THEME_NAME-theme.md-fab {  background-color: '{{accent-color}}';  color: '{{accent-contrast}}'; }  a.md-button.md-THEME_NAME-theme.md-fab:not([disabled]) .md-icon,  .md-button.md-THEME_NAME-theme.md-fab:not([disabled]) .md-icon {    color: '{{accent-contrast}}'; }  a.md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover,  .md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover {    background-color: '{{accent-color}}'; }  a.md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused,  .md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused {    background-color: '{{accent-A700}}'; }a.md-button.md-THEME_NAME-theme.md-raised,.md-button.md-THEME_NAME-theme.md-raised {  color: '{{background-900}}';  background-color: '{{background-50}}'; }  a.md-button.md-THEME_NAME-theme.md-raised:not([disabled]) .md-icon,  .md-button.md-THEME_NAME-theme.md-raised:not([disabled]) .md-icon {    color: '{{background-contrast}}'; }  a.md-button.md-THEME_NAME-theme.md-raised:not([disabled]):hover,  .md-button.md-THEME_NAME-theme.md-raised:not([disabled]):hover {    background-color: '{{background-50}}'; }  a.md-button.md-THEME_NAME-theme.md-raised:not([disabled]).md-focused,  .md-button.md-THEME_NAME-theme.md-raised:not([disabled]).md-focused {    background-color: '{{background-200}}'; }a.md-button.md-THEME_NAME-theme.md-warn,.md-button.md-THEME_NAME-theme.md-warn {  color: '{{warn-color}}'; }  a.md-button.md-THEME_NAME-theme.md-warn.md-raised, a.md-button.md-THEME_NAME-theme.md-warn.md-fab,  .md-button.md-THEME_NAME-theme.md-warn.md-raised,  .md-button.md-THEME_NAME-theme.md-warn.md-fab {    color: '{{warn-contrast}}';    background-color: '{{warn-color}}'; }    a.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]) md-icon, a.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]) md-icon,    .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]) md-icon,    .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]) md-icon {      color: '{{warn-contrast}}'; }    a.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):hover, a.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):hover,    .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):hover,    .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):hover {      background-color: '{{warn-color}}'; }    a.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]).md-focused, a.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]).md-focused,    .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]).md-focused,    .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]).md-focused {      background-color: '{{warn-700}}'; }  a.md-button.md-THEME_NAME-theme.md-warn:not([disabled]) md-icon,  .md-button.md-THEME_NAME-theme.md-warn:not([disabled]) md-icon {    color: '{{warn-color}}'; }a.md-button.md-THEME_NAME-theme.md-accent,.md-button.md-THEME_NAME-theme.md-accent {  color: '{{accent-color}}'; }  a.md-button.md-THEME_NAME-theme.md-accent.md-raised, a.md-button.md-THEME_NAME-theme.md-accent.md-fab,  .md-button.md-THEME_NAME-theme.md-accent.md-raised,  .md-button.md-THEME_NAME-theme.md-accent.md-fab {    color: '{{accent-contrast}}';    background-color: '{{accent-color}}'; }    a.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]) md-icon, a.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]) md-icon,    .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]) md-icon,    .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]) md-icon {      color: '{{accent-contrast}}'; }    a.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):hover, a.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):hover,    .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):hover,    .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):hover {      background-color: '{{accent-color}}'; }    a.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]).md-focused, a.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]).md-focused,    .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]).md-focused,    .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]).md-focused {      background-color: '{{accent-700}}'; }  a.md-button.md-THEME_NAME-theme.md-accent:not([disabled]) md-icon,  .md-button.md-THEME_NAME-theme.md-accent:not([disabled]) md-icon {    color: '{{accent-color}}'; }a.md-button.md-THEME_NAME-theme[disabled], a.md-button.md-THEME_NAME-theme.md-raised[disabled], a.md-button.md-THEME_NAME-theme.md-fab[disabled], a.md-button.md-THEME_NAME-theme.md-accent[disabled], a.md-button.md-THEME_NAME-theme.md-warn[disabled],.md-button.md-THEME_NAME-theme[disabled],.md-button.md-THEME_NAME-theme.md-raised[disabled],.md-button.md-THEME_NAME-theme.md-fab[disabled],.md-button.md-THEME_NAME-theme.md-accent[disabled],.md-button.md-THEME_NAME-theme.md-warn[disabled] {  color: '{{foreground-3}}' !important;  cursor: default; }  a.md-button.md-THEME_NAME-theme[disabled] md-icon, a.md-button.md-THEME_NAME-theme.md-raised[disabled] md-icon, a.md-button.md-THEME_NAME-theme.md-fab[disabled] md-icon, a.md-button.md-THEME_NAME-theme.md-accent[disabled] md-icon, a.md-button.md-THEME_NAME-theme.md-warn[disabled] md-icon,  .md-button.md-THEME_NAME-theme[disabled] md-icon,  .md-button.md-THEME_NAME-theme.md-raised[disabled] md-icon,  .md-button.md-THEME_NAME-theme.md-fab[disabled] md-icon,  .md-button.md-THEME_NAME-theme.md-accent[disabled] md-icon,  .md-button.md-THEME_NAME-theme.md-warn[disabled] md-icon {    color: '{{foreground-3}}'; }a.md-button.md-THEME_NAME-theme.md-raised[disabled], a.md-button.md-THEME_NAME-theme.md-fab[disabled],.md-button.md-THEME_NAME-theme.md-raised[disabled],.md-button.md-THEME_NAME-theme.md-fab[disabled] {  background-color: '{{foreground-4}}'; }a.md-button.md-THEME_NAME-theme[disabled],.md-button.md-THEME_NAME-theme[disabled] {  background-color: transparent; }md-card.md-THEME_NAME-theme {  background-color: '{{background-color}}';  border-radius: 2px; }  md-card.md-THEME_NAME-theme .md-card-image {    border-radius: 2px 2px 0 0; }  md-card.md-THEME_NAME-theme md-card-header md-card-avatar md-icon {    color: '{{background-color}}';    background-color: '{{foreground-3}}'; }  md-card.md-THEME_NAME-theme md-card-header md-card-header-text .md-subhead {    color: '{{foreground-2}}'; }  md-card.md-THEME_NAME-theme md-card-title md-card-title-text:not(:only-child) .md-subhead {    color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme .md-ripple {  color: '{{accent-600}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-ripple {  color: '{{background-600}}'; }md-checkbox.md-THEME_NAME-theme.md-checked.md-focused .md-container:before {  background-color: '{{accent-color-0.26}}'; }md-checkbox.md-THEME_NAME-theme .md-ink-ripple {  color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-ink-ripple {  color: '{{accent-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-icon {  background-color: '{{accent-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-icon:after {  border-color: '{{accent-contrast-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-ripple {  color: '{{primary-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ripple {  color: '{{background-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-ink-ripple {  color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple {  color: '{{primary-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-icon {  background-color: '{{primary-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked.md-focused .md-container:before {  background-color: '{{primary-color-0.26}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-icon:after {  border-color: '{{primary-contrast-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-ripple {  color: '{{warn-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-ink-ripple {  color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple {  color: '{{warn-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-icon {  background-color: '{{warn-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked.md-focused:not([disabled]) .md-container:before {  background-color: '{{warn-color-0.26}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-icon:after {  border-color: '{{background-200}}'; }md-checkbox.md-THEME_NAME-theme[disabled] .md-icon {  border-color: '{{foreground-3}}'; }md-checkbox.md-THEME_NAME-theme[disabled].md-checked .md-icon {  background-color: '{{foreground-3}}'; }md-checkbox.md-THEME_NAME-theme[disabled].md-checked .md-icon:after {  border-color: '{{background-200}}'; }md-checkbox.md-THEME_NAME-theme[disabled] .md-label {  color: '{{foreground-3}}'; }md-content.md-THEME_NAME-theme {  color: '{{foreground-1}}';  background-color: '{{background-color}}'; }md-chips.md-THEME_NAME-theme .md-chips {  box-shadow: 0 1px '{{background-300}}'; }  md-chips.md-THEME_NAME-theme .md-chips.md-focused {    box-shadow: 0 2px '{{primary-color}}'; }md-chips.md-THEME_NAME-theme .md-chip {  background: '{{background-300}}';  color: '{{background-800}}'; }  md-chips.md-THEME_NAME-theme .md-chip.md-focused {    background: '{{primary-color}}';    color: '{{primary-contrast}}'; }    md-chips.md-THEME_NAME-theme .md-chip.md-focused md-icon {      color: '{{primary-contrast}}'; }md-chips.md-THEME_NAME-theme md-chip-remove .md-button md-icon path {  fill: '{{background-500}}'; }.md-contact-suggestion span.md-contact-email {  color: '{{background-400}}'; }md-dialog.md-THEME_NAME-theme {  border-radius: 4px;  background-color: '{{background-color}}'; }  md-dialog.md-THEME_NAME-theme.md-content-overflow .md-actions, md-dialog.md-THEME_NAME-theme.md-content-overflow md-dialog-actions {    border-top-color: '{{foreground-4}}'; }/** Theme styles for mdCalendar. */.md-calendar.md-THEME_NAME-theme {  color: '{{foreground-1}}'; }  .md-calendar.md-THEME_NAME-theme tr:last-child td {    border-bottom-color: '{{background-200}}'; }.md-THEME_NAME-theme .md-calendar-day-header {  background: '{{background-hue-1}}';  color: '{{foreground-1}}'; }.md-THEME_NAME-theme .md-calendar-date.md-calendar-date-today .md-calendar-date-selection-indicator {  border: 1px solid '{{primary-500}}'; }.md-THEME_NAME-theme .md-calendar-date.md-calendar-date-today.md-calendar-date-disabled {  color: '{{primary-500-0.6}}'; }.md-THEME_NAME-theme .md-calendar-date.md-focus .md-calendar-date-selection-indicator {  background: '{{background-hue-1}}'; }.md-THEME_NAME-theme .md-calendar-date-selection-indicator:hover {  background: '{{background-hue-1}}'; }.md-THEME_NAME-theme .md-calendar-date.md-calendar-selected-date .md-calendar-date-selection-indicator,.md-THEME_NAME-theme .md-calendar-date.md-focus.md-calendar-selected-date .md-calendar-date-selection-indicator {  background: '{{primary-500}}';  color: '{{primary-500-contrast}}';  border-color: transparent; }.md-THEME_NAME-theme .md-calendar-date-disabled,.md-THEME_NAME-theme .md-calendar-month-label-disabled {  color: '{{foreground-3}}'; }/** Theme styles for mdDatepicker. */md-datepicker.md-THEME_NAME-theme {  background: '{{background-color}}'; }.md-THEME_NAME-theme .md-datepicker-input {  color: '{{background-contrast}}';  background: '{{background-color}}'; }  .md-THEME_NAME-theme .md-datepicker-input::-webkit-input-placeholder, .md-THEME_NAME-theme .md-datepicker-input::-moz-placeholder, .md-THEME_NAME-theme .md-datepicker-input:-moz-placeholder, .md-THEME_NAME-theme .md-datepicker-input:-ms-input-placeholder {    color: \"{{foreground-3}}\"; }.md-THEME_NAME-theme .md-datepicker-input-container {  border-bottom-color: '{{background-300}}'; }  .md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-focused {    border-bottom-color: '{{primary-500}}'; }  .md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-invalid {    border-bottom-color: '{{warn-A700}}'; }.md-THEME_NAME-theme .md-datepicker-calendar-pane {  border-color: '{{background-300}}'; }.md-THEME_NAME-theme .md-datepicker-triangle-button .md-datepicker-expand-triangle {  border-top-color: '{{foreground-3}}'; }.md-THEME_NAME-theme .md-datepicker-triangle-button:hover .md-datepicker-expand-triangle {  border-top-color: '{{foreground-2}}'; }.md-THEME_NAME-theme .md-datepicker-open .md-datepicker-calendar-icon {  fill: '{{primary-500}}'; }.md-THEME_NAME-theme .md-datepicker-calendar,.md-THEME_NAME-theme .md-datepicker-input-mask-opaque {  background: '{{background-color}}'; }md-divider.md-THEME_NAME-theme {  border-top-color: '{{foreground-4}}'; }.layout-row > md-divider.md-THEME_NAME-theme {  border-right-color: '{{foreground-4}}'; }md-icon.md-THEME_NAME-theme {  color: '{{foreground-2}}'; }  md-icon.md-THEME_NAME-theme.md-primary {    color: '{{primary-color}}'; }  md-icon.md-THEME_NAME-theme.md-accent {    color: '{{accent-color}}'; }  md-icon.md-THEME_NAME-theme.md-warn {    color: '{{warn-color}}'; }md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h3, md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h4,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h3,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h4 {  color: '{{foreground-1}}'; }md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text p,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text p {  color: '{{foreground-2}}'; }md-list.md-THEME_NAME-theme .md-proxy-focus.md-focused div.md-no-style {  background-color: '{{background-100}}'; }md-list.md-THEME_NAME-theme md-list-item > .md-avatar-icon {  background-color: '{{foreground-3}}';  color: '{{background-color}}'; }md-list.md-THEME_NAME-theme md-list-item > md-icon {  color: '{{foreground-2}}'; }  md-list.md-THEME_NAME-theme md-list-item > md-icon.md-highlight {    color: '{{primary-color}}'; }    md-list.md-THEME_NAME-theme md-list-item > md-icon.md-highlight.md-accent {      color: '{{accent-color}}'; }md-menu-content.md-THEME_NAME-theme {  background-color: '{{background-color}}'; }  md-menu-content.md-THEME_NAME-theme md-menu-divider {    background-color: '{{foreground-4}}'; }md-input-container.md-THEME_NAME-theme .md-input {  color: '{{foreground-1}}';  border-color: '{{foreground-4}}';  text-shadow: '{{foreground-shadow}}'; }  md-input-container.md-THEME_NAME-theme .md-input::-webkit-input-placeholder, md-input-container.md-THEME_NAME-theme .md-input::-moz-placeholder, md-input-container.md-THEME_NAME-theme .md-input:-moz-placeholder, md-input-container.md-THEME_NAME-theme .md-input:-ms-input-placeholder {    color: \"{{foreground-3}}\"; }md-input-container.md-THEME_NAME-theme > md-icon {  color: '{{foreground-1}}'; }md-input-container.md-THEME_NAME-theme label,md-input-container.md-THEME_NAME-theme .md-placeholder {  text-shadow: '{{foreground-shadow}}';  color: '{{foreground-3}}'; }md-input-container.md-THEME_NAME-theme ng-messages :not(.md-char-counter), md-input-container.md-THEME_NAME-theme [ng-messages] :not(.md-char-counter),md-input-container.md-THEME_NAME-theme ng-message :not(.md-char-counter), md-input-container.md-THEME_NAME-theme data-ng-message :not(.md-char-counter), md-input-container.md-THEME_NAME-theme x-ng-message :not(.md-char-counter),md-input-container.md-THEME_NAME-theme [ng-message] :not(.md-char-counter), md-input-container.md-THEME_NAME-theme [data-ng-message] :not(.md-char-counter), md-input-container.md-THEME_NAME-theme [x-ng-message] :not(.md-char-counter),md-input-container.md-THEME_NAME-theme [ng-message-exp] :not(.md-char-counter), md-input-container.md-THEME_NAME-theme [data-ng-message-exp] :not(.md-char-counter), md-input-container.md-THEME_NAME-theme [x-ng-message-exp] :not(.md-char-counter) {  color: '{{warn-A700}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-has-value label {  color: '{{foreground-2}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused .md-input {  border-color: '{{primary-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused label {  color: '{{primary-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused md-icon {  color: '{{primary-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent .md-input {  border-color: '{{accent-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent label {  color: '{{accent-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn .md-input {  border-color: '{{warn-A700}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn label {  color: '{{warn-A700}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid .md-input {  border-color: '{{warn-A700}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid.md-input-focused label {  color: '{{warn-A700}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid ng-message, md-input-container.md-THEME_NAME-theme.md-input-invalid data-ng-message, md-input-container.md-THEME_NAME-theme.md-input-invalid x-ng-message,md-input-container.md-THEME_NAME-theme.md-input-invalid [ng-message], md-input-container.md-THEME_NAME-theme.md-input-invalid [data-ng-message], md-input-container.md-THEME_NAME-theme.md-input-invalid [x-ng-message],md-input-container.md-THEME_NAME-theme.md-input-invalid [ng-message-exp], md-input-container.md-THEME_NAME-theme.md-input-invalid [data-ng-message-exp], md-input-container.md-THEME_NAME-theme.md-input-invalid [x-ng-message-exp],md-input-container.md-THEME_NAME-theme.md-input-invalid .md-char-counter {  color: '{{warn-A700}}'; }md-input-container.md-THEME_NAME-theme .md-input[disabled],md-input-container.md-THEME_NAME-theme .md-input [disabled] {  border-bottom-color: transparent;  color: '{{foreground-3}}';  background-image: linear-gradient(to right, \"{{foreground-3}}\" 0%, \"{{foreground-3}}\" 33%, transparent 0%);  background-image: -ms-linear-gradient(left, transparent 0%, \"{{foreground-3}}\" 100%); }md-menu-bar.md-THEME_NAME-theme > button.md-button {  color: '{{foreground-2}}';  border-radius: 2px; }md-menu-bar.md-THEME_NAME-theme md-menu.md-open > button, md-menu-bar.md-THEME_NAME-theme md-menu > button:focus {  outline: none;  background: '{{background-200}}'; }md-menu-bar.md-THEME_NAME-theme.md-open:not(.md-keyboard-mode) md-menu:hover > button {  background-color: '{{ background-500-0.2}}'; }md-menu-bar.md-THEME_NAME-theme:not(.md-keyboard-mode):not(.md-open) md-menu button:hover,md-menu-bar.md-THEME_NAME-theme:not(.md-keyboard-mode):not(.md-open) md-menu button:focus {  background: transparent; }md-menu-content.md-THEME_NAME-theme .md-menu > .md-button:after {  color: '{{foreground-2}}'; }md-menu-content.md-THEME_NAME-theme .md-menu.md-open > .md-button {  background-color: '{{ background-500-0.2}}'; }md-toolbar.md-THEME_NAME-theme.md-menu-toolbar {  background-color: '{{background-color}}';  color: '{{foreground-1}}'; }  md-toolbar.md-THEME_NAME-theme.md-menu-toolbar md-toolbar-filler {    background-color: '{{primary-color}}';    color: '{{primary-contrast}}'; }    md-toolbar.md-THEME_NAME-theme.md-menu-toolbar md-toolbar-filler md-icon {      color: '{{primary-contrast}}'; }md-progress-circular.md-THEME_NAME-theme {  background-color: transparent; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-gap {    border-top-color: '{{primary-color}}';    border-bottom-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme .md-inner .md-right .md-half-circle {    border-top-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-right .md-half-circle {    border-right-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-left .md-half-circle {    border-left-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-gap {    border-top-color: '{{warn-color}}';    border-bottom-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-right .md-half-circle {    border-top-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-right .md-half-circle {    border-right-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-left .md-half-circle {    border-left-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-gap {    border-top-color: '{{accent-color}}';    border-bottom-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-right .md-half-circle {    border-top-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-right .md-half-circle {    border-right-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-left .md-half-circle {    border-left-color: '{{accent-color}}'; }md-progress-linear.md-THEME_NAME-theme .md-container {  background-color: '{{primary-100}}'; }md-progress-linear.md-THEME_NAME-theme .md-bar {  background-color: '{{primary-color}}'; }md-progress-linear.md-THEME_NAME-theme.md-warn .md-container {  background-color: '{{warn-100}}'; }md-progress-linear.md-THEME_NAME-theme.md-warn .md-bar {  background-color: '{{warn-color}}'; }md-progress-linear.md-THEME_NAME-theme.md-accent .md-container {  background-color: '{{accent-100}}'; }md-progress-linear.md-THEME_NAME-theme.md-accent .md-bar {  background-color: '{{accent-color}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-bar1 {  background-color: '{{warn-100}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-dashed:before {  background: radial-gradient(\"{{warn-100}}\" 0%, \"{{warn-100}}\" 16%, transparent 42%); }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-bar1 {  background-color: '{{accent-100}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-dashed:before {  background: radial-gradient(\"{{accent-100}}\" 0%, \"{{accent-100}}\" 16%, transparent 42%); }md-radio-button.md-THEME_NAME-theme .md-off {  border-color: '{{foreground-2}}'; }md-radio-button.md-THEME_NAME-theme .md-on {  background-color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme.md-checked .md-off {  border-color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme.md-checked .md-ink-ripple {  color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme .md-container .md-ripple {  color: '{{accent-600}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-on, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-on {  background-color: '{{primary-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-off {  border-color: '{{primary-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple {  color: '{{primary-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-container .md-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-container .md-ripple {  color: '{{primary-600}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-on, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-on {  background-color: '{{warn-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-off, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-off {  border-color: '{{warn-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-ink-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple {  color: '{{warn-color-0.87}}'; }md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-container .md-ripple, md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-container .md-ripple {  color: '{{warn-600}}'; }md-radio-group.md-THEME_NAME-theme[disabled],md-radio-button.md-THEME_NAME-theme[disabled] {  color: '{{foreground-3}}'; }  md-radio-group.md-THEME_NAME-theme[disabled] .md-container .md-off,  md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-off {    border-color: '{{foreground-3}}'; }  md-radio-group.md-THEME_NAME-theme[disabled] .md-container .md-on,  md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-on {    border-color: '{{foreground-3}}'; }md-radio-group.md-THEME_NAME-theme .md-checked .md-ink-ripple {  color: '{{accent-color-0.26}}'; }md-radio-group.md-THEME_NAME-theme.md-primary .md-checked:not([disabled]) .md-ink-ripple, md-radio-group.md-THEME_NAME-theme .md-checked:not([disabled]).md-primary .md-ink-ripple {  color: '{{primary-color-0.26}}'; }md-radio-group.md-THEME_NAME-theme .md-checked.md-primary .md-ink-ripple {  color: '{{warn-color-0.26}}'; }md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked .md-container:before {  background-color: '{{accent-color-0.26}}'; }md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty).md-primary .md-checked .md-container:before,md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked.md-primary .md-container:before {  background-color: '{{primary-color-0.26}}'; }md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty).md-warn .md-checked .md-container:before,md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked.md-warn .md-container:before {  background-color: '{{warn-color-0.26}}'; }md-select.md-THEME_NAME-theme[disabled] .md-select-value {  border-bottom-color: transparent;  background-image: linear-gradient(to right, \"{{foreground-3}}\" 0%, \"{{foreground-3}}\" 33%, transparent 0%);  background-image: -ms-linear-gradient(left, transparent 0%, \"{{foreground-3}}\" 100%); }md-select.md-THEME_NAME-theme .md-select-value {  border-bottom-color: '{{foreground-4}}'; }  md-select.md-THEME_NAME-theme .md-select-value.md-select-placeholder {    color: '{{foreground-3}}'; }md-select.md-THEME_NAME-theme.ng-invalid.ng-dirty .md-select-value {  color: '{{warn-A700}}' !important;  border-bottom-color: '{{warn-A700}}' !important; }md-select.md-THEME_NAME-theme:not([disabled]):focus .md-select-value {  border-bottom-color: '{{primary-color}}';  color: '{{ foreground-1 }}'; }  md-select.md-THEME_NAME-theme:not([disabled]):focus .md-select-value.md-select-placeholder {    color: '{{ foreground-1 }}'; }md-select.md-THEME_NAME-theme:not([disabled]):focus.md-accent .md-select-value {  border-bottom-color: '{{accent-color}}'; }md-select.md-THEME_NAME-theme:not([disabled]):focus.md-warn .md-select-value {  border-bottom-color: '{{warn-color}}'; }md-select.md-THEME_NAME-theme[disabled] .md-select-value {  color: '{{foreground-3}}'; }  md-select.md-THEME_NAME-theme[disabled] .md-select-value.md-select-placeholder {    color: '{{foreground-3}}'; }md-select-menu.md-THEME_NAME-theme md-option[disabled] {  color: '{{foreground-3}}'; }md-select-menu.md-THEME_NAME-theme md-optgroup {  color: '{{foreground-2}}'; }  md-select-menu.md-THEME_NAME-theme md-optgroup md-option {    color: '{{foreground-1}}'; }md-select-menu.md-THEME_NAME-theme md-option[selected] {  color: '{{primary-500}}'; }  md-select-menu.md-THEME_NAME-theme md-option[selected]:focus {    color: '{{primary-600}}'; }  md-select-menu.md-THEME_NAME-theme md-option[selected].md-accent {    color: '{{accent-500}}'; }    md-select-menu.md-THEME_NAME-theme md-option[selected].md-accent:focus {      color: '{{accent-600}}'; }md-select-menu.md-THEME_NAME-theme md-option:focus:not([disabled]):not([selected]) {  background: '{{background-200}}'; }md-sidenav.md-THEME_NAME-theme {  background-color: '{{background-color}}'; }md-slider.md-THEME_NAME-theme .md-track {  background-color: '{{foreground-3}}'; }md-slider.md-THEME_NAME-theme .md-track-ticks {  background-color: '{{foreground-4}}'; }md-slider.md-THEME_NAME-theme .md-focus-thumb {  background-color: '{{foreground-2}}'; }md-slider.md-THEME_NAME-theme .md-focus-ring {  background-color: '{{accent-color}}'; }md-slider.md-THEME_NAME-theme .md-disabled-thumb {  border-color: '{{background-color}}'; }md-slider.md-THEME_NAME-theme.md-min .md-thumb:after {  background-color: '{{background-color}}'; }md-slider.md-THEME_NAME-theme .md-track.md-track-fill {  background-color: '{{accent-color}}'; }md-slider.md-THEME_NAME-theme .md-thumb:after {  border-color: '{{accent-color}}';  background-color: '{{accent-color}}'; }md-slider.md-THEME_NAME-theme .md-sign {  background-color: '{{accent-color}}'; }  md-slider.md-THEME_NAME-theme .md-sign:after {    border-top-color: '{{accent-color}}'; }md-slider.md-THEME_NAME-theme .md-thumb-text {  color: '{{accent-contrast}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-focus-ring {  background-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-track.md-track-fill {  background-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-thumb:after {  border-color: '{{warn-color}}';  background-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-sign {  background-color: '{{warn-color}}'; }  md-slider.md-THEME_NAME-theme.md-warn .md-sign:after {    border-top-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-thumb-text {  color: '{{warn-contrast}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-focus-ring {  background-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-track.md-track-fill {  background-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-thumb:after {  border-color: '{{primary-color}}';  background-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-sign {  background-color: '{{primary-color}}'; }  md-slider.md-THEME_NAME-theme.md-primary .md-sign:after {    border-top-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-thumb-text {  color: '{{primary-contrast}}'; }md-slider.md-THEME_NAME-theme[disabled] .md-thumb:after {  border-color: '{{foreground-3}}'; }md-slider.md-THEME_NAME-theme[disabled]:not(.md-min) .md-thumb:after {  background-color: '{{foreground-3}}'; }.md-subheader.md-THEME_NAME-theme {  color: '{{ foreground-2-0.23 }}';  background-color: '{{background-color}}'; }  .md-subheader.md-THEME_NAME-theme.md-primary {    color: '{{primary-color}}'; }  .md-subheader.md-THEME_NAME-theme.md-accent {    color: '{{accent-color}}'; }  .md-subheader.md-THEME_NAME-theme.md-warn {    color: '{{warn-color}}'; }md-switch.md-THEME_NAME-theme .md-ink-ripple {  color: '{{background-500}}'; }md-switch.md-THEME_NAME-theme .md-thumb {  background-color: '{{background-50}}'; }md-switch.md-THEME_NAME-theme .md-bar {  background-color: '{{background-500}}'; }md-switch.md-THEME_NAME-theme.md-checked .md-ink-ripple {  color: '{{accent-color}}'; }md-switch.md-THEME_NAME-theme.md-checked .md-thumb {  background-color: '{{accent-color}}'; }md-switch.md-THEME_NAME-theme.md-checked .md-bar {  background-color: '{{accent-color-0.5}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-focused .md-thumb:before {  background-color: '{{accent-color-0.26}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-primary .md-ink-ripple {  color: '{{primary-color}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-primary .md-thumb {  background-color: '{{primary-color}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-primary .md-bar {  background-color: '{{primary-color-0.5}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-primary.md-focused .md-thumb:before {  background-color: '{{primary-color-0.26}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-ink-ripple {  color: '{{warn-color}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-thumb {  background-color: '{{warn-color}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-bar {  background-color: '{{warn-color-0.5}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-warn.md-focused .md-thumb:before {  background-color: '{{warn-color-0.26}}'; }md-switch.md-THEME_NAME-theme[disabled] .md-thumb {  background-color: '{{background-400}}'; }md-switch.md-THEME_NAME-theme[disabled] .md-bar {  background-color: '{{foreground-4}}'; }md-tabs.md-THEME_NAME-theme md-tabs-wrapper {  background-color: transparent;  border-color: '{{foreground-4}}'; }md-tabs.md-THEME_NAME-theme .md-paginator md-icon {  color: '{{primary-color}}'; }md-tabs.md-THEME_NAME-theme md-ink-bar {  color: '{{accent-color}}';  background: '{{accent-color}}'; }md-tabs.md-THEME_NAME-theme .md-tab {  color: '{{foreground-2}}'; }  md-tabs.md-THEME_NAME-theme .md-tab[disabled], md-tabs.md-THEME_NAME-theme .md-tab[disabled] md-icon {    color: '{{foreground-3}}'; }  md-tabs.md-THEME_NAME-theme .md-tab.md-active, md-tabs.md-THEME_NAME-theme .md-tab.md-active md-icon, md-tabs.md-THEME_NAME-theme .md-tab.md-focused, md-tabs.md-THEME_NAME-theme .md-tab.md-focused md-icon {    color: '{{primary-color}}'; }  md-tabs.md-THEME_NAME-theme .md-tab.md-focused {    background: '{{primary-color-0.1}}'; }  md-tabs.md-THEME_NAME-theme .md-tab .md-ripple-container {    color: '{{accent-100}}'; }md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper {  background-color: '{{accent-color}}'; }  md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {    color: '{{accent-100}}'; }    md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon {      color: '{{accent-contrast}}'; }    md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {      background: '{{accent-contrast-0.1}}'; }  md-tabs.md-THEME_NAME-theme.md-accent > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-ink-bar {    color: '{{primary-600-1}}';    background: '{{primary-600-1}}'; }md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper {  background-color: '{{primary-color}}'; }  md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {    color: '{{primary-100}}'; }    md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon {      color: '{{primary-contrast}}'; }    md-tabs.md-THEME_NAME-theme.md-primary > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {      background: '{{primary-contrast-0.1}}'; }md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper {  background-color: '{{warn-color}}'; }  md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {    color: '{{warn-100}}'; }    md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon {      color: '{{warn-contrast}}'; }    md-tabs.md-THEME_NAME-theme.md-warn > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {      background: '{{warn-contrast-0.1}}'; }md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper {  background-color: '{{primary-color}}'; }  md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {    color: '{{primary-100}}'; }    md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon {      color: '{{primary-contrast}}'; }    md-toolbar > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {      background: '{{primary-contrast-0.1}}'; }md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper {  background-color: '{{accent-color}}'; }  md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {    color: '{{accent-100}}'; }    md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon {      color: '{{accent-contrast}}'; }    md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {      background: '{{accent-contrast-0.1}}'; }  md-toolbar.md-accent > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-ink-bar {    color: '{{primary-600-1}}';    background: '{{primary-600-1}}'; }md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper {  background-color: '{{warn-color}}'; }  md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]) {    color: '{{warn-100}}'; }    md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active, md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-active md-icon, md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused, md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused md-icon {      color: '{{warn-contrast}}'; }    md-toolbar.md-warn > md-tabs.md-THEME_NAME-theme > md-tabs-wrapper > md-tabs-canvas > md-pagination-wrapper > md-tab-item:not([disabled]).md-focused {      background: '{{warn-contrast-0.1}}'; }md-toast.md-THEME_NAME-theme .md-toast-content {  background-color: #323232;  color: '{{background-50}}'; }  md-toast.md-THEME_NAME-theme .md-toast-content .md-button {    color: '{{background-50}}'; }    md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight {      color: '{{primary-A200}}'; }      md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight.md-accent {        color: '{{accent-A200}}'; }      md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight.md-warn {        color: '{{warn-A200}}'; }md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) {  background-color: '{{primary-color}}';  color: '{{primary-contrast}}'; }  md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-icon {    color: '{{primary-contrast}}'; }  md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) .md-button:not(.md-raised) {    color: '{{primary-contrast}}'; }  md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent {    background-color: '{{accent-color}}';    color: '{{accent-contrast}}'; }  md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn {    background-color: '{{warn-color}}';    color: '{{warn-contrast}}'; }md-tooltip.md-THEME_NAME-theme {  color: '{{background-A100}}'; }  md-tooltip.md-THEME_NAME-theme .md-content {    background-color: '{{foreground-2}}'; }");
    }()
}(window, window.angular), window.ngMaterial = {version: {full: "1.0.0"}};
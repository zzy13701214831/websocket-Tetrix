for (var f = Array(24), h = 0; h < f.length; h++) {
    f[h] = Array(16);
    for (var m = 0; m < f[h].length; m++) {
        f[h][m] = 0
    }
}
var p = "I O L S T S-reverse L-reverse".split(" "),
    q = {
        I: [
            [
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0]
            ],
            [
                [1, -1],
                [1, 0],
                [1, 1],
                [1, 2]
            ]
        ],
        L: [
            [
                [0, 0],
                [0, 1],
                [0, 2],
                [1, 2]
            ],
            [
                [1, 1],
                [0, 1],
                [-1, 1],
                [-1, 2]
            ],
            [
                [0, 2],
                [0, 1],
                [0, 0],
                [-1, 0]
            ],
            [
                [-1, 1],
                [0, 1],
                [1, 1],
                [1, 0]
            ]
        ],
        L_R: [
            [
                [1, 0],
                [1, 1],
                [1, 2],
                [0, 2]
            ],
            [
                [2, 1],
                [1, 1],
                [0, 1],
                [0, 0]
            ],
            [
                [1, 2],
                [1, 1],
                [1, 0],
                [2, 0]
            ],
            [
                [0, 1],
                [1, 1],
                [2, 1],
                [2, 2]
            ]
        ],
        S: [
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 2]
            ],
            [
                [1, 1],
                [0, 1],
                [0, 2],
                [-1, 2]
            ]
        ],
        S_R: [
            [
                [1, 0],
                [1, 1],
                [0, 1],
                [0, 2]
            ],
            [
                [2, 1],
                [1, 1],
                [1, 0],
                [0, 0]
            ]
        ],
        T: [
            [
                [1, 0],
                [1, 1],
                [1, 2],
                [0, 1]
            ],
            [
                [2, 1],
                [1, 1],
                [0, 1],
                [1, 0]
            ],
            [
                [1, 2],
                [1, 1],
                [1, 0],
                [2, 1]
            ],
            [
                [0, 1],
                [1, 1],
                [2, 1],
                [1, 2]
            ]
        ]
    };

function r(b) {
    return [Math.floor(b[1] / 25), Math.floor(b[0] / 25)]
}

function t(n) {
    var i = u(n.css("top")),
        F = u(n.css("left"));
    n = n.find("div");
    for (var G = [], j = [], o = 0; o < n.length; o++) {
        var s = $(n[o]),
            E = u(s.css("top")),
            s = u(s.css("left")),
            E = [F + s, i + E];
        G.push(E);
        j.push(r(E))
    }
    return {
        shape: [F, i],
        items: G,
        f: r([F, i]),
        c: j
    }
}

function v(e) {
    var c = !0,
        g = r(e);
    e = g[0];
    g = g[1];
    0 > e || e >= f.length ? c = !1 : 0 > g || g >= f[0].length ? c = !1 : 1 === f[e][g] && (c = !1);
    return c
}

function w(I, H, F) {
    var G = [],
        j = u(I.css("left")),
        o = u(I.css("top")),
        s = I.find("div");
    for (I = 0; I < s.length; I++) {
        var E = $(s[I]),
            i = u(E.css("left")),
            E = u(E.css("top"));
        "top" === H ? E += F : "left" === H && (i += F);
        G.push([j + i, o + E])
    }
    H = !0;
    for (I = 0; I < G.length && (H = v(G[I]), H); I++) {}
    return H
}

function u(b) {
    return parseInt(b.replace("px", ""), 10)
}

function x() {
    var i = $(".current-move-shape");
    if (w(i, "top", 25)) {
        var e = t(i);
        i.css("top", e.shape[1] + 25)
    } else {
        e = t(i);
        e = e.c;
        i = !0;
        try {
            for (var j = 0; j < e.length; j++) {
                var k = e[j];
                f[k[0]][k[1]] = 1
            }
        } catch (g) {
            i = !1
        }
        if (i) {
            $(".current-move-shape").remove();
            y();
            $(".matrix").remove();
            for (k = 0; k < f.length; k++) {
                for (e = 0; e < f[k].length; e++) {
                    1 === f[k][e] && (i = $('<div class="matrix"></div>'), i.css({
                        top: 25 * k,
                        left: 25 * e + 10
                    }), $("#container").append(i))
                }
            }
            z()
        } else {
            A()
        }
    }
}

function B(I) {
    I = I.keyCode;
    if (38 === I) {
        I = $(".current-move-shape");
        var H = "";
        switch (!0) {
            case I.hasClass("shape-I"):
                H = "I";
                break;
            case I.hasClass("shape-L"):
                H = "L";
                break;
            case I.hasClass("shape-L-reverse"):
                H = "L_R";
                break;
            case I.hasClass("shape-S"):
                H = "S";
                break;
            case I.hasClass("shape-S-reverse"):
                H = "S_R";
                break;
            case I.hasClass("shape-T"):
                H = "T"
        }
        if (H) {
            var F = q[H].length,
                G = I.data("status") || 0,
                j = I.find("div"),
                G = ++G % F,
                H = q[H][G],
                o = $(j[0]).parent(),
                F = u(o.css("top")),
                o = u(o.css("left"));
            var s = !0;
            for (var E = 0; E < H.length; E++) {
                var i = 25 * H[E][0];
                s = 25 * H[E][1];
                s = v([o + i, F + s]);
                if (!s) {
                    break
                }
            }
            if (s) {
                for (E = 0; E < H.length; E++) {
                    i = 25 * H[E][0], s = 25 * H[E][1], $(j[E]).css({
                        left: i,
                        top: s
                    })
                }
            }
            I.data("status", G)
        }
    } else {
        40 === I ? x() : 37 === I ? (I = $(".current-move-shape"), w(I, "left", -25) && (G = t(I).shape[0], I.css("left", G - 25))) : 39 === I && (I = $(".current-move-shape"), w(I, "left", 25) && (G = t(I).shape[0], I.css("left", G + 25)))
    }
}

function z() {
    var b = $('<div class="shape current-move-shape shape-' + p[Math.floor(Math.random() * p.length)] + '">                     <div></div>                     <div></div>                     <div></div>                     <div></div>                 </div>');
    b.css({
        top: 0,
        left: f[0].length / 2 * 25 + 10
    });
    $("#container").append(b);
    w(b, "top", 25) || w(b, "left", !w(b, "left", 25)) || A()
}
var C = -1;

function D() {
    z();
    C = setInterval(function() {
        x()
    }, 400)
}

function y() {
    for (var g = 0; g < f.length; g++) {
        for (var e = 0, i = 0; i < f[g].length; i++) {
            1 === f[g][i] && e++
        }
        if (e === f[g].length) {
            console.log("clear row", g);
            f.splice(g, 1);
            var j = Array(16);
            j.forEach(function(d, c) {
                j[c] = 0
            });
            f.unshift(j)
        }
    }
}

function A() {
    alert("Game Over");
    clearInterval(C);
    document.onkeydown = function() {}
}
$(function() {
    document.onkeydown = B;
    D()
});
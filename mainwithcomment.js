const config = {
    Column: 3,
    inputNumber: 2,
    Parents: 100,
    randomPer: [0.9, 1.1],
    burstper: 1,
    misspay: -1
}

let flag = {
    count: 0,
    draw: false,
    dolearn: true,
    dotestplay: true
}

let zeinote = new Note();

zeinote.cset("genies", Array);

/**Random な遺伝子で親を１人つくる*/
randomGene = () => {
    let _T1 = [];
    for (j = 0; j < config.Column; j++) {
        let _T2 = []
        for (k = 0; k < config.inputNumber; k++) {
            _T2.push(rnorm() / Math.sqrt(config.inputNumber))
        }
        _T1.push(_T2)
    }
    return _T1
}

// zeinote.get("genies").replace((() => {
//     let _T0 = []
//     for (i = 0; i < config.Parents; i++) {
//         _T0.push(randomGene());
//     }
//     return _T0;
// })())

zeinote.cset("Boss", Object).replace({
    x: Random(0, GetStyle(window).compute("width")[0]),
    y: Random(0, GetStyle(window).compute("height")[0]),
    angle: Random(0, 360),
    speed: 3,
    interval: 100,
    hit: false
})

zeinote.cset("Character", Object).replace({
    x: GetStyle(window).compute("width")[0] / 2,
    y: GetStyle(window).compute("height")[0] / 2,
    angle: Random(0, 360),
    rotateSpeed: 2
});

/**配列を掛け合わせる NN用 */
Aom(Array, "Multiplication", function (arr) {
    let that = this;
    for (i = 0; i < arr.length; i++) {
        that = that.map(_E0 => _E0 * arr[i]);
    }
    return that;
});

/** 同じindexのやつで引き算する */
Aom(Array, "Subtraction", function (arr) {
    let that = this;
    for (i = 0, j = that.length > arr.length ? that.length : arr.length; i < j; i++) {
        that[i] = (!that[i] ? 0 : that[i]) - (!arr[i] ? 0 : arr[i]);
    }
    return that;
});

/**平均取る */
Aom(Array, "Average", function () {
    return this.reduce((acc, ele) => acc + ele) / this.length
})

function rnorm() {
    return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

/**x軸から反時計回りに360度回転するdegreeを, 正のx軸を0として-180~180のdgreeに変換する */
/**0 ~ 360 => -180 ~ 180 */
function one2two(angle) {
    return angle <= 180 ? angle : angle - 360;
}

/**one2two の逆version */
/**-180 ~ 180 => 0 ~ 360*/
function two2one(angle) {
    return angle >= 0 ? angle : 360 - Math.abs(angle)
}

/** x軸から反時計回りに360度回転するdegree に数字を合わせる。*/
/**Number => 0 ~ 360 */
function onematch(angle) {
    return angle >= 0 ? angle % 360 : 360 + angle % 360;
}

/** 正のx軸を0とする-180~180のdgreeの値を受け取って, 第一引数から見た第二引数の角度を -180 ~ 180 で返す */
function twodis(_A0, _A1) {
    if ((_A0 >= 0 && _A1 >= 0) || (_A0 <= 0 && _A1 <= 0)) return _A1 - _A0;
    if (_A0 >= 0 && _A1 < 0) return Math.abs(_A0) + Math.abs(_A1) <= 180 ? _A1 - _A0 : 360 - (Math.abs(_A0) + Math.abs(_A1));
    if (_A0 < 0 && _A1 >= 0) return Math.abs(_A0) + Math.abs(_A1) <= 180 ? Math.abs(_A0) + Math.abs(_A1) : (Math.abs(_A0) + Math.abs(_A1)) - 360;
}

/** 報酬計算用の3次式 */
function paygraph(angle) {
    // return (-0.001 * Math.pow(angle, 3) + 0.27 * Math.pow(angle, 2) - 24.3 * angle + 729) / 100;
    return (-0.001 * Math.pow(Math.abs(angle), 3) + 0.135 * Math.pow(angle, 2) - 6.075 * Math.abs(angle) + 91.125) / 100;
}

/** 報酬計算用の3次式 */
function paygraph2(angle) {
    return (-0.001 * Math.pow(Math.abs(angle), 3) + 0.03 * Math.pow(angle, 2) - 0.3 * Math.abs(angle) + 1) / 10000;
}

const rad2deg = rad => rad * Math.PI / 180;
const deg2rad = deg => deg * 180 / Math.PI;

function learning(gene) {
    let payment = 0;
    let count = 0;
    let limit = 0;
    let facing = 0;

    /**転と直線の距離 */
    function lintfar() {
        if (zeinote.get("Character").angle == (90 || 270)) {
            return Math.abs(zeinote.get("Character").x - zeinote.get("Boss").x);
        } else {
            return Math.abs(Math.sin(deg2rad(zeinote.get("Character").angle)) / Math.cos(deg2rad(zeinote.get("Character").angle)) * (zeinote.get("Boss").x - zeinote.get("Character").x) - (zeinote.get("Character").y - zeinote.get("Boss").y)) / Math.sqrt(Math.pow(Math.sin(deg2rad(zeinote.get("Character").angle)) / Math.cos(deg2rad(zeinote.get("Character").angle)), 2) + Math.pow(-1, 2))
        }
    }

    do {
        /**Bossの挙動計算用 */
        zeinote.get("Boss").cset("angle", (() => {
            if (!RandFn(zeinote.get("Boss").y, 0, GetStyle(window).compute("height")[0] * .8) && count % zeinote.get("Boss").interval == 0) return Random(0, 360);
            if (zeinote.get("Boss").x <= 0) return Random(-90, 90);
            if (zeinote.get("Boss").x >= GetStyle(window).compute("width")[0]) return Random(90, 270);
            if (zeinote.get("Boss").y <= 0) return Random(-180, 0);
            if (zeinote.get("Boss").y >= GetStyle(window).compute("height")[0] * 0.8) return Random(0, 180);
            return zeinote.get("Boss").angle;
        })());

        // console.log(Math.cos(zeinote.get("Boss").angle * Math.PI / 180) * zeinote.get("Boss").speed * config.burstper)
        zeinote.get("Boss").x += Math.cos(zeinote.get("Boss").angle * Math.PI / 180) * zeinote.get("Boss").speed * config.burstper;
        zeinote.get("Boss").y -= Math.sin(zeinote.get("Boss").angle * Math.PI / 180) * zeinote.get("Boss").speed * config.burstper;

        /**与えられた遺伝子から実数を返す */
        let _T0 = Math.round(Born(gene)(zeinote.get("Character").angle, two2one(rad2deg(Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x))))) * Math.pow(10, 5)) / Math.pow(10, 5);
        /**回転上限角度を超えないようにしている */
        zeinote.get("Character").angle += Math.abs(_T0) >= zeinote.get("Character").rotateSpeed ? zeinote.get("Character").rotateSpeed * (_T0 >= 0 ? 1 : -1) : _T0;
        /**CHaracterの角度を0~360にしている */
        zeinote.get("Character").cset("angle", Math.round(onematch(zeinote.get("Character").angle) * Math.pow(10, 5)) / Math.pow(10, 5));

        // payment -= Math.abs((Math.abs(_T0) >= zeinote.get("Character").rotateSpeed ? zeinote.get("Character").rotateSpeed : _T0)) / 10;
        // payment += paygraph(Math.abs(twodis(one2two(zeinote.get("Character").angle), Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x)) * (180 / Math.PI))));

        count += 1 * config.burstper;
        count = count % zeinote.get("Boss").interval;
        limit += 1;

        // if (Math.abs(twodis(one2two(zeinote.get("Character").angle), Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x)) * (180 / Math.PI))) <= 90) {
        //     payment -= Math.abs(Math.sin(zeinote.get("Character").angle * Math.PI / 180) / Math.cos(zeinote.get("Character").angle * Math.PI / 180) * (zeinote.get("Boss").x-zeinote.get("Character").x) - (zeinote.get("Boss").y-zeinote.get("Character").y)) / Math.sqrt(Math.pow(Math.sin(zeinote.get("Character").angle * Math.PI / 180) / Math.cos(zeinote.get("Character").angle * Math.PI / 180), 2) + Math.pow(-1, 2));
        // } else {
        //     payment -= Math.abs(-1 * (zeinote.get("Boss").x - zeinote.get("Character").x) / (zeinote.get("Boss").y - zeinote.get("Character").y) * zeinote.get("Boss").x - zeinote.get("Boss").y) / Math.sqrt(Math.pow(-1 * (zeinote.get("Boss").x - zeinote.get("Character").x) / (zeinote.get("Boss").y - zeinote.get("Character").y), 2) + Math.pow(-1, 2));
        // }

        /**自機の視線とBossの座標の距離が10px以下かつ, 角度が90度以内の時に報酬を与える */
        if (lintfar() <= 10 &&
            Math.abs(twodis(one2two(zeinote.get("Character").angle), rad2deg(Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x))))) <= 90) {
            facing += 1;
            /**向き続ける程報酬増加 */
            payment += (facing >= 2 ? facing : 0);
            /**より正確に向いたほど報酬増加 */
            payment += (10 - lintfar());
        } else {
            facing = 0;
            payment += config.misspay;
            // payment -= Math.abs(twodis(one2two(zeinote.get("Character").angle), Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x)) * (180 / Math.PI)));
        }
    } while (limit < 1000);
    zeinote.get("Character").angle = Random(0, 360)
    return [gene, payment];
}

/**遺伝子から実数を返す */
function Born(gene) {
    return (...args) => {
        for (i = 0; i < config.Column; i++) {
            args = Aom(args).Multiplication(gene[i]);
        }
        let _T0 = 0;
        for (i = 0; i < args.length; i++) {
            _T0 += args[i];
        }
        // console.log(args)
        return _T0;
    };
}

/**引数で指定した世代分学習させる */
function learn(end) {
    let generation = 0;
    let growth = [];

    do {
        let time = new Date().getTime();
        // console.time("hoge");

        /**各世代ごとに学習させて報酬で昇順にしている */
        let _T0 = zeinote.get("genies").map(_E0 => learning(_E0)).sort((a, b) => b.slice(-1)[0] - a.slice(-1)[0]);
        /**報酬だけの配列にしている */
        let _T1 = _T0.concat().map(_E0 => _E0.filter(_E1 => Sem(_E1) !== "Array")).flat()

        /**報酬を除いた配列に変換 */
        _T0 = _T0.map(_E0 => _E0.filter(_E1 => Sem(_E1) === "Array")).flat()
            /** 1と2, 3と4みたいな感じで平均を取ってる*/
            .map((_E0, _E1, _E2) => _E1 % 2 === 0 ? _E0.map((_E3, _E4) => _E3.map((_E5, _E6) => (_E5 + _E2[_E1 + 1][_E4][_E6]) / 2)) : undefined).filter(_E0 => _E0 !== undefined)
            /**平均を取ったデータを少しづつずらしてる */
            .map(_E0 => [_E0, _E0]).flat().map(_E0 => _E0.map(_E1 => _E1.map(_E2 => _E2 * Random(config.randomPer[0], config.randomPer[1], 10))))
            /**報酬の成長率が低迷したら下半分を総入れ替え */
            .map((_E0, _E1) => Aom(Array.from(_T1.slice(0, _T1.length / 2))).Subtraction(growth)[aom]().Average() <= 100 ? (_E1 >= _T1.length / 2 ? randomGene() : _E0) : _E0);

        generation += 1;
        growth = _T1;
        console.clear();
        // console.log(Aom(Array.from(_T1.slice(0, _T1.length / 2))).Subtraction(growth)[aom]().Average());
        console.log(generation + " / " + end);
        console.log(new Date().getTime() - time);
        // console.timeEnd("hoge");
    } while (flag.dolearn && generation < end);
    setlog()
}

Efal(() => {
    window.Canvas = document.getElementsByTagName("canvas")[0];
    window.ctx = Canvas.getContext('2d');
    ctx.globalCompositeOperation = "source-over";
    Canvas.width = GetStyle(window).compute("width")[0];
    Canvas.height = GetStyle(window).compute("height")[0];

    window.charaimg = new Image();
    charaimg.src = "./img/canon.png";
})

/**描画用関数 */
function draw() {
    ctx.clearRect(0, 0, GetStyle(window).compute("width")[0], GetStyle(window).compute("height")[0]);
    ctx.beginPath();
    ctx.arc(zeinote.get("Boss").x, zeinote.get("Boss").y, 20, 0, Math.PI * 2, false)
    ctx.closePath();
    ctx.fillStyle = "red";
    // ctx.fillStyle = zeinote.get("Boss").hit ? "blue" : "red";
    ctx.fill();

    ctx.save();
    ctx.translate(zeinote.get("Character").x, zeinote.get("Character").y);
    ctx.rotate(-1 * (zeinote.get("Character").angle - 90) * Math.PI / 180);
    ctx.drawImage(charaimg, -20, -20, 40, 40);
    ctx.restore();
}

Efal(() => {
    loadlog()
    setTimeout(draw, 100)
})

/**TestPlay用 */
function testplay(gene) {
    let count = 0;

    (function calc() {
        zeinote.get("Boss").cset("angle", (() => {
            if (!RandFn(zeinote.get("Boss").y, 0, GetStyle(window).compute("height")[0] * .8) && count % zeinote.get("Boss").interval == 0) return Random(0, 360);
            if (zeinote.get("Boss").x <= 0) return Random(-90, 90);
            if (zeinote.get("Boss").x >= GetStyle(window).compute("width")[0]) return Random(90, 270);
            if (zeinote.get("Boss").y <= 0) return Random(-180, 0);
            if (zeinote.get("Boss").y >= GetStyle(window).compute("height")[0] * 0.8) return Random(0, 180);
            return zeinote.get("Boss").angle;
        })());

        // console.log(Math.cos(zeinote.get("Boss").angle * Math.PI / 180) * zeinote.get("Boss").speed * config.burstper)
        zeinote.get("Boss").x += Math.cos(zeinote.get("Boss").angle * Math.PI / 180) * zeinote.get("Boss").speed * config.burstper;
        zeinote.get("Boss").y -= Math.sin(zeinote.get("Boss").angle * Math.PI / 180) * zeinote.get("Boss").speed * config.burstper;

        let _T0 = Math.round(Born(gene)(zeinote.get("Character").angle, two2one(Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x)) * (180 / Math.PI))) * Math.pow(10, 5)) / Math.pow(10, 5);
        zeinote.get("Character").angle += Math.abs(_T0) >= zeinote.get("Character").rotateSpeed ? zeinote.get("Character").rotateSpeed * (_T0 >= 0 ? 1 : -1) : _T0;
        zeinote.get("Character").cset("angle", Math.round(onematch(zeinote.get("Character").angle) * Math.pow(10, 5)) / Math.pow(10, 5));

        count += 1 * config.burstper;
        count = count % zeinote.get("Boss").interval;

        // if (Math.abs(Math.sin(zeinote.get("Character").angle * Math.PI / 180) / Math.cos(zeinote.get("Character").angle * Math.PI / 180) * (zeinote.get("Boss").x - zeinote.get("Character").x) - (zeinote.get("Boss").y - zeinote.get("Character").y)) / Math.sqrt(Math.pow(Math.sin(zeinote.get("Character").angle * Math.PI / 180) / Math.cos(zeinote.get("Character").angle * Math.PI / 180), 2) + Math.pow(-1, 2)) <= 5) {
        //     zeinote.get("Boss").cset("hit", true);
        // } else {
        //     zeinote.get("Boss").cset("hit", false);
        // }
        draw()
        if (flag.dotestplay) requestAnimationFrame(calc);
    })()
}

/**遺伝子をlocalStorageに保存 */
function setlog() {
    localStorage.setItem("zeigenies", JSON.stringify(zeinote.get("genies")))
    console.log("Genies was saved")
}

/**localStorageの遺伝子を取得 */
function getlog() {
    return JSON.parse(localStorage.getItem("zeigenies"))
}

/**取得した遺伝子を学習とかに使えるように .replace している */
function loadlog() {
    zeinote.get("genies").replace(getlog());
    console.log("Genies was loaded")
}

/**保存されている遺伝子でテストプレイ */
function logtest() {
    testplay(getlog()[0]);
}
const config = {
    Column: 4,
    inputNumber: 1,
    Parents: 1,
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

/*
zeinote.get("genies").replace((() => {
    let _T0 = []
    for (i = 0; i < config.Parents; i++) {
        _T0.push(randomGene());
    }
    return _T0;
})())
*/

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

Aom(Array, "Multiplication", function (arr) {
    let that = this;
    for (i = 0; i < arr.length; i++) {
        that = that.map(_E0 => _E0 * arr[i]);
    }
    return that;
});

Aom(Array, "Subtraction", function (arr) {
    let that = this;
    for (i = 0, j = that.length > arr.length ? that.length : arr.length; i < j; i++) {
        that[i] = (!that[i] ? 0 : that[i]) - (!arr[i] ? 0 : arr[i]);
    }
    return that;
});

Aom(Array, "Average", function () {
    return this.reduce((acc, ele) => acc + ele) / this.length
})

function rnorm() {
    return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

function one2two(angle) {
    return angle <= 180 ? angle : angle - 360;
}

function two2one(angle) {
    return angle >= 0 ? angle : 360 - Math.abs(angle)
}

function onematch(angle) {
    return angle >= 0 ? angle % 360 : 360 + angle % 360;
}

function twodis(_A0, _A1) {
    if ((_A0 >= 0 && _A1 >= 0) || (_A0 <= 0 && _A1 <= 0)) return _A1 - _A0;
    if (_A0 >= 0 && _A1 < 0) return Math.abs(_A0) + Math.abs(_A1) <= 180 ? _A1 - _A0 : 360 - (Math.abs(_A0) + Math.abs(_A1));
    if (_A0 < 0 && _A1 >= 0) return Math.abs(_A0) + Math.abs(_A1) <= 180 ? Math.abs(_A0) + Math.abs(_A1) : (Math.abs(_A0) + Math.abs(_A1)) - 360;
}

const rad2deg = rad => rad * 180 / Math.PI;
const deg2rad = deg => deg * Math.PI / 180;

function learning(gene) {
    let payment = 0;
    let count = 0;
    let limit = 0;
    let facing = 0;
    
    function lintfar() {
        if (zeinote.get("Character").angle == (90 || 270)) {
            return Math.abs(zeinote.get("Character").x - zeinote.get("Boss").x);
        } else {
            return Math.abs(Math.sin(deg2rad(zeinote.get("Character").angle)) / Math.cos(deg2rad(zeinote.get("Character").angle)) * (zeinote.get("Boss").x - zeinote.get("Character").x) - (zeinote.get("Boss").y - zeinote.get("Character").y)) / Math.sqrt(Math.pow(Math.sin(deg2rad(zeinote.get("Character").angle)) / Math.cos(deg2rad(zeinote.get("Character").angle)), 2) + Math.pow(-1, 2));
        }
    }
    
    do {
        zeinote.get("Boss").cset("angle", (() => {
            if (!RandFn(zeinote.get("Boss").y, 0, GetStyle(window).compute("height")[0] * .8) && count % zeinote.get("Boss").interval == 0) return Random(0, 360);
            if (zeinote.get("Boss").x <= 0) return Random(-90, 90);
            if (zeinote.get("Boss").x >= GetStyle(window).compute("width")[0]) return Random(90, 270);
            if (zeinote.get("Boss").y <= 0) return Random(-180, 0);
            if (zeinote.get("Boss").y >= GetStyle(window).compute("height")[0] * 0.8) return Random(0, 180);
            return zeinote.get("Boss").angle;
        })());
        
        zeinote.get("Boss").x += Math.cos(zeinote.get("Boss").angle * Math.PI / 180) * zeinote.get("Boss").speed * config.burstper;
        zeinote.get("Boss").y -= Math.sin(zeinote.get("Boss").angle * Math.PI / 180) * zeinote.get("Boss").speed * config.burstper;
        
        // let _T0 = Born(gene)(zeinote.get("Character").angle, two2one(rad2deg(Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x)))));
        let _T0 = Born(gene)(twodis(one2two(zeinote.get("Character").angle), rad2deg(-1 * Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x)))));
        zeinote.get("Character").angle += Math.abs(_T0) >= zeinote.get("Character").rotateSpeed ? zeinote.get("Character").rotateSpeed * (_T0 >= 0 ? 1 : -1) : _T0;
        zeinote.get("Character").cset("angle", Math.round(onematch(zeinote.get("Character").angle) * Math.pow(10, 5)) / Math.pow(10, 5));
        
        // payment -=  Math.abs(_T0) >= zeinote.get("Character").rotateSpeed ? zeinote.get("Character").rotateSpeed : Math.abs(_T0);
        // payment -= deg2rad(Math.abs(twodis(one2two(zeinote.get("Character").angle), rad2deg(Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x))))))

        count += 1 * config.burstper;
        count = count % zeinote.get("Boss").interval;
        limit += 1;

        if (lintfar() <= 10 && Math.abs(twodis(one2two(zeinote.get("Character").angle), rad2deg(-1 * Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x))))) <= 45) {
            facing += 1;
            payment += facing;
        } else {
            facing = 0;
            // payment -= deg2rad(Math.abs(twodis(one2two(zeinote.get("Character").angle), rad2deg(-1 * Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x))))))
            payment -= config.misspay;
        }
        // console.clear();
    } while (limit < 1000);
    zeinote.get("Character").angle = Random(0, 360)
    return [gene, payment];
}

function Born(gene) {
    return (...args) => {
        for (let i = 0; i < config.Column; i++) {
            args = Aom(args).Multiplication(gene[i]);
        }
        let _T0 = 0;
        for (i = 0; i < args.length; i++) {
            _T0 += args[i];
        }
        return _T0;
    };
}

function learn(end) {
    let generation = 0;
    let growth = [];

    do {
        let time = performance.now();

        let _T0 = zeinote.get("genies").map(_E0 => learning(_E0)).sort((a, b) => b.slice(-1)[0] - a.slice(-1)[0]);
        let _T1 = _T0.map(_E0 => _E0.filter(_E1 => Sem(_E1) !== "Array")).flat();

        _T0 = _T0.map(_E0 => _E0.filter(_E1 => Sem(_E1) === "Array")).flat()
            .map((_E0, _E1, _E2) => _E1 % 2 === 0 ? _E0.map((_E3, _E4) => _E3.map((_E5, _E6) => (_E5 + _E2[_E1 + 1][_E4][_E6]) / 2)) : undefined).filter(_E0 => _E0 !== undefined)
            .map(_E0 => [_E0, _E0]).flat().map(_E0 => _E0.map(_E1 => _E1.map(_E2 => _E2 * Random(config.randomPer[0], config.randomPer[1], 10))))
            .map((_E0, _E1) => Aom(Array.from(_T1.slice(0, _T1.length / 2))).Subtraction(growth)[aom]().Average() <= 100 ? (_E1 >= _T1.length / 2 ? randomGene() : _E0) : _E0);

        generation += 1;
        growth = _T1;
        zeinote.get("genies").replace(_T0)
        console.clear();
        console.log(generation + " / " + end);
        console.log(performance.now() - time);
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

function draw() {
    ctx.clearRect(0, 0, GetStyle(window).compute("width")[0], GetStyle(window).compute("height")[0]);
    ctx.beginPath();
    ctx.arc(zeinote.get("Boss").x, zeinote.get("Boss").y, 20, 0, Math.PI * 2, false)
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.save();
    ctx.translate(zeinote.get("Character").x, zeinote.get("Character").y);
    ctx.rotate(deg2rad(zeinote.get("Character").angle + 90));
    ctx.drawImage(charaimg, -20, -20, 40, 40);
    ctx.restore();
}

Efal(() => {
    loadlog()
    setTimeout(draw, 100)
})

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

        zeinote.get("Boss").x += Math.cos(zeinote.get("Boss").angle * Math.PI / 180) * zeinote.get("Boss").speed * config.burstper;
        zeinote.get("Boss").y -= Math.sin(zeinote.get("Boss").angle * Math.PI / 180) * zeinote.get("Boss").speed * config.burstper;

        let _T0 = Born(gene)(twodis(one2two(zeinote.get("Character").angle), rad2deg(-1 * Math.atan2((zeinote.get("Character").y - zeinote.get("Boss").y), (zeinote.get("Boss").x - zeinote.get("Character").x)))));
        // let _T0 = Born(gene)(Math.sin(deg2rad(zeinote.get("Character").angle)), Math.cos(deg2rad(zeinote.get("Character").angle)), zeinote.get("Boss").y - zeinote.get("Character").y, zeinote.get("Boss").x - zeinote.get("Character").x);
        zeinote.get("Character").angle += Math.abs(_T0) >= zeinote.get("Character").rotateSpeed ? zeinote.get("Character").rotateSpeed * (_T0 >= 0 ? 1 : -1) : _T0;
        zeinote.get("Character").cset("angle", Math.round(onematch(zeinote.get("Character").angle) * Math.pow(10, 5)) / Math.pow(10, 5));

        count += 1 * config.burstper;
        count = count % zeinote.get("Boss").interval;

        draw();
        if (flag.dotestplay) requestAnimationFrame(calc);
    })()
}

function setlog() {
    localStorage.setItem("zeigenies", JSON.stringify(zeinote.get("genies")))
    console.log("Genies was saved")
}

function getlog() {
    return JSON.parse(localStorage.getItem("zeigenies"))
}

function loadlog() {
    zeinote.get("genies").replace(getlog());
    console.log("Genies was loaded")
}

function logtest() {
    flag.dotestplay = true;
    testplay(getlog()[0]);
}
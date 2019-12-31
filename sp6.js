const confi_canvas = {
    all: true,
    limitwidth: 16,
    limitheight: 9,
    background: "url('./img/canvas_back.png')"
}
const confi_chara = {
    size: 10,
    speed: 5,
    color: "rgba(200, 30, 30, .5)",
    image: {
        tf: true,
        size: 80,
        image_url: "./img/chara_shadow_small.png"
    },
    hp: 100,
    shot: {
        damage: 8,
        speed: 5,
        size: 8,
        angle: Math.PI / -2,
        interval: 10,
        image: "./img/blackball.png"
    },
    sub: {
        size: 14,
        image_url: "./img/sub_waterball.png",
        radius: 60,
        angle: Math.PI / 6,
        rag: 3,
        keyf: 10,
        shot: {
            damage: 5,
            speed: 3,
            size: 4,
            angle: Math.PI / -2,
            interval: 15,
            image: "./img/sub_shot.png"
        }
    }
}
const confi_zyako = {
    size: 15,
    image: "./img/zyako1.png",
    interval: 350,
    zyako: [],
    shot: {
        size: 5,
        color: "red",
        damage: 10,
        speed: 5,
        angle: 30,
        bullet: []
    }
}
const confi_Boss = {
    size: 70,
    hit_size: 50,
    image: "./img/Boss0.png",
    image1: "./img/Boss1.png",
    hp: 100,
    speed: 2,
    interval: 100,
    damage: 20,
    enemy: {
        size: 16,
        image: "./img/enemy.png",
        range: 500,
        enemy: [],
        interval: 300,
        shot: {
            size: 5,
            speed: 5,
            color: "red",
            damage: 10,
            interval: 500,
            angle: Math.PI / 2,
            bullet: []
        }
    },
    shot: {
        size: 20,
        image: "",
        bullet: []
    },
    say: {
        say: {
            zero: ["よく来たね。Seizya-Projects-6へようこそ。(Please Push Enter Key)", "今回は復刻版だからね, 私が直々に遊んであげるね♪", "管理者権限は使わないから安心してね♪ それじゃあ， 行くよ!!"],
            one: ["どうやら君は想像以上の強者らしい。", "よし，ならば私が相手をしようか。", "楽しませてくださいね～, 強者さん♪"],
            clear: ["流石は強者様。久しぶりに楽しめました。", "それでは, そろそろ私はお暇しましょうかね。", "これはClearした貴方へのご褒美です。", "Congratulations!! Game was Cleared!!", "Bye. Thanks for meeting me!", "Reload Game?"],
            end: ["Game End...!", "笑わせてくれるね～, 弱き者よ。", "ReLoad Game?"]
        }
    }
}

//Data on Play-----------------------------------
let canvas = {
    height: 0,
    width: 0,
    all: undefined,
    background: undefined
}
let run = true;
let fps = 100 / 100;
let chara = {
    x: 0,
    y: 0,
    size: 0,
    speed: 0,
    color: undefined,
    air: false,
    image: {
        tf: undefined,
        size: undefined,
        image: undefined
    },
    hp: 0,
    shot: {
        damage: 0,
        sped: 8,
        size: 0,
        image: undefined,
        interval: 0,
        angle: 0,
        bullet: []
    },
    sub: {
        size: 5,
        image: undefined,
        radius: 0,
        keyf: 0,
        angle: 0,
        rag: 0,
        0: {
            x: 0,
            y: 0
        },
        1: {
            x: 0,
            y: 0
        },
        shot: {
            damage: 0,
            speed: 0,
            size: 0,
            angle: 0,
            interval: 0,
            image: 0,
            bullet: []
        }
    }
}

let zyako = {
    size: 0,
    image: undefined,
    interval: 0,
    zyako: [],
    shot: {
        size: 0,
        color: undefined,
        damage: 0,
        speed: 0,
        angle: 0,
        bullet: []
    }
};

let Boss = {
    size: 0,
    hit_size: 0,
    image: undefined,
    hp: 0,
    interval: 0,
    angle: 0,
    enemy: {
        size: 0,
        image: undefined,
        range: 0,
        enemy: [],
        shot: {
            size: 0,
            image: undefined,
            damage: 0,
            bullet: []
        }
    },
    shot: {
        size: 0,
        image: undefined,
        bullet: []
    },
    say: {
        say: {
            zero: undefined,
            one: undefined
        }
    }
}

let count = 0;
let RateofGame = 0;
let point = {
    point: 0,
    fail: 20,
    succ: 20
}
const Game_plan = ["say0", "zyako0", "say1", "Boss0", "clear"]

//Functions--------------------------------------
window.addEventListener("load", start);
window.addEventListener("load", recall);
window.addEventListener("load", main);
window.addEventListener("load", draw);

function start() {
    canvas.all = confi_canvas.all;
    if (canvas.all) {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
    } else {
        if (window.innerWidth / window.innerHeight >= confi_canvas.limitwidth / confi_canvas.limitheight) {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientWidth * confi_canvas.limitwidth / confi_canvas.limitheight;
        } else {
            canvas.height = document.documentElement.clientHeight;
            canvas.width = document.documentElement.clienHeight * confi_canvas.limitheight / confi_canvas.limitwidth;
        }
    }
    screenCanvas = document.getElementById('screen');
    ctx = screenCanvas.getContext('2d');
    canvas.background = confi_canvas.background;
    ctx.globalCompositeOperation = "source-over";

    chara.size = confi_chara.size;
    //chara.speed = confi_chara.speed;
    chara.speed = 8;
    chara.color = confi_chara.color;
    chara.hp = confi_chara.hp;
    chara.x = canvas.width / 2;
    chara.y = canvas.height * 0.85;

    chara.image.image = new Image();
    chara.image.image.src = confi_chara.image.image_url;
    chara.image.size = confi_chara.image.size;
    chara.image.tf = confi_chara.image.tf;

    chara.sub.size = confi_chara.sub.size;
    chara.sub.image = new Image();
    chara.sub.image.src = confi_chara.sub.image_url;
    chara.sub.radius = confi_chara.sub.radius;
    chara.sub.angle = confi_chara.sub.angle;
    chara.sub.keyf = confi_chara.sub.keyf;
    chara.sub.rag = confi_chara.sub.rag;

    chara.shot.speed = confi_chara.shot.speed;
    chara.shot.size = confi_chara.shot.size;
    chara.shot.damage = confi_chara.shot.damage;
    chara.shot.image = new Image();
    chara.shot.image.src = confi_chara.shot.image;
    chara.shot.angle = confi_chara.shot.angle;
    chara.shot.interval = confi_chara.shot.interval;

    chara.sub.shot.speed = confi_chara.sub.shot.speed;
    chara.sub.shot.size = confi_chara.sub.shot.size;
    chara.sub.shot.damage = confi_chara.sub.shot.damage;
    chara.sub.shot.image = new Image();
    chara.sub.shot.image.src = confi_chara.sub.shot.image;
    chara.sub.shot.angle = confi_chara.sub.shot.angle;
    chara.sub.shot.interval = confi_chara.sub.shot.interval;

    chara.sub.shot.bullet = [[], []]

    zyako.size = confi_zyako.size
    zyako.image = new Image()
    zyako.image.src = confi_zyako.image
    zyako.interval = confi_zyako.interval

    zyako.shot.size = confi_zyako.shot.size
    zyako.shot.color = confi_zyako.shot.color
    zyako.shot.damage = confi_zyako.shot.damage
    zyako.shot.speed = confi_zyako.shot.speed
    zyako.shot.angle = confi_zyako.shot.angle

    Boss.size = confi_Boss.size
    Boss.image = new Image()
    Boss.image.src = confi_Boss.image
    Boss.say = confi_Boss.say;
    Boss.speed = confi_Boss.speed
    Boss.interval = confi_Boss.interval
    Boss.hp = confi_Boss.hp
    Boss.damage = confi_Boss.damage;

    Boss.enemy.size = confi_Boss.enemy.size
    Boss.enemy.image = new Image()
    Boss.enemy.image.src = confi_Boss.enemy.image
    Boss.enemy.interval = confi_Boss.enemy.interval
    Boss.enemy.range = confi_Boss.enemy.range
    Boss.enemy.shot = confi_Boss.enemy.shot;
}

function recall() {
    if (run) main();
    OutofMain()
    requestAnimationFrame(recall);
}

window.addEventListener("keydown", (event) => { if (event.keyCode == 83) { if (run) { run = false; Saying("Now Stop") } else { run = true; Saying() } } })

function main() {
    count += count < 100 ? 1 : -100;
    if (canvas.all) {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
    } else {
        if (window.innerWidth / window.innerHeight >= confi_canvas.limitwidth / confi_canvas.limitheight) {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientWidth * confi_canvas.limitwidth / confi_canvas.limitheight;
        } else {
            canvas.height = document.documentElement.clientHeight;
            canvas.width = document.documentElement.clienHeight * confi_canvas.limitheight / confi_canvas.limitwidth;
        }
    }
    //chara----------------------
    chara.sub[0].x = chara.sub[0].x + (chara.x - Math.cos(chara.sub.angle) * chara.sub.radius - chara.sub[0].x) / chara.sub.rag + (Sayclick(70)[0] % 2 != 0 ? -chara.sub.keyf : 0);
    chara.sub[0].y = chara.sub[0].y + (chara.y + Math.sin(chara.sub.angle) * chara.sub.radius - chara.sub[0].y) / (chara.sub.rag * 2);
    chara.sub[1].x = chara.sub[1].x + (chara.x + Math.cos(chara.sub.angle) * chara.sub.radius - chara.sub[1].x) / chara.sub.rag + (Sayclick(70)[0] % 2 != 0 ? chara.sub.keyf : 0);
    chara.sub[1].y = chara.sub[1].y + (chara.y + Math.sin(chara.sub.angle) * chara.sub.radius - chara.sub[1].y) / (chara.sub.rag * 2);

    if (Keys(32)) {
        if (count % chara.shot.interval == 0) {
            chara.shot.bullet.push({
                x: chara.x,
                y: chara.y,
                angle: 0
            })
        }
        if (count % chara.sub.shot.interval == 0) {
            chara.sub.shot.bullet[0].push({
                x: chara.sub[0].x,
                y: chara.sub[0].y
            })
            chara.sub.shot.bullet[1].push({
                x: chara.sub[1].x,
                y: chara.sub[1].y
            })
        }
    }

    chara.shot.bullet.forEach(_E0 => {
        _E0.x += Math.cos(chara.shot.angle) * chara.shot.speed;
        _E0.y += Math.sin(chara.shot.angle) * chara.shot.speed;
    })

    chara.sub.shot.bullet[0].forEach(_E0 => {
        _E0.x += Math.cos(chara.sub.shot.angle) * chara.shot.speed;
        _E0.y += Math.sin(chara.sub.shot.angle) * chara.shot.speed;
    })

    chara.sub.shot.bullet[1].forEach(_E0 => {
        _E0.x += Math.cos(chara.sub.shot.angle < 0 && chara.sub.shot.angle > Math.PI * -2 ? Math.PI * -2 + chara.sub.shot.angle : Math.PI * 2 - chara.sub.shot.angle) * chara.shot.speed;
        _E0.y += Math.sin(chara.sub.shot.angle < 0 && chara.sub.shot.angle > Math.PI * -2 ? Math.PI * -2 + chara.sub.shot.angle : Math.PI * 2 - chara.sub.shot.angle) * chara.shot.speed;
    })

    chara.shot.bullet = CanvasOver(chara.shot.bullet)
    chara.sub.shot.bullet[0] = CanvasOver(chara.sub.shot.bullet[0])
    chara.sub.shot.bullet[1] = CanvasOver(chara.sub.shot.bullet[1])
    //say------------------------
    if (Game_plan[RateofGame] == "say0") {
        [Boss.x, Boss.y] = [canvas.width / 2, canvas.height / 6]
        // console.log(Sayclick(13)[0] > Boss.say.say.zero.length, Sayclick(13)[0], Boss.say.say.zero.length)
        if (Sayclick(13)[0] >= Boss.say.say.zero.length) {
            Boss.y = -Boss.size;
            Saying()
            Sayclick(13, true);
            PlusRate();
        } else {
            Saying(Boss.say.say.zero[Sayclick(13)[0]])
        }
    }

    if (Game_plan[RateofGame] == "zyako0") {
        if (count % zyako.interval == 0) {
            zyako.zyako.push({
                x: Random(0, canvas.width),
                y: Funcrand("-x+" + canvas.height / 2, 0, canvas.height, 0, canvas.height),
                shot_interval: Random(40, 60)
            })
        }
        zyako.zyako.forEach(_E0 => {
            if (count % _E0.shot_interval == 0) {
                zyako.shot.bullet.push({
                    x: _E0.x,
                    y: _E0.y,
                    angle: Random((180 - zyako.shot.angle) / 2, (180 - zyako.shot.angle) / 2 + zyako.shot.angle)
                })
            }
        })
        zyako.shot.bullet.forEach(_E0 => {
            _E0.x += Math.cos(_E0.angle * (Math.PI / 180)) * zyako.shot.speed
            _E0.y += Math.sin(_E0.angle * Math.PI / 180) * zyako.shot.speed
        })
        zyako.shot.bullet = CanvasOver(zyako.shot.bullet)
        if (point.point >= 1000) {
            PlusRate(); DeleteZyako()
        }
    }

    if (Game_plan[RateofGame] == "say1") {
        [Boss.x, Boss.y] = [canvas.width / 2, canvas.height / 6]
        if (Sayclick(13)[0] >= Boss.say.say.one.length) {
            Saying()
            Sayclick(13, true);
            PlusRate();
            Boss.image.src = confi_Boss.image1;
        } else {
            Saying(Boss.say.say.one[Sayclick(13)[0]])
        }
    }

    if (Game_plan[RateofGame] == "Boss0") {
        if (!RandFn(Boss.y, 0, canvas.height * .8) && count % Boss.interval == 0) {
            Boss.angle = Random(0, 360) * Math.PI / 180;
        }
        if (Boss.x - Boss.size / 4 <= 0) {
            Boss.angle = Random(-90, 90) * Math.PI / 180;
        } if (Boss.x + Boss.size / 4 >= canvas.width) {
            Boss.angle = Random(90, 270) * Math.PI / 180;
        } if (Boss.y - Boss.size / 2 <= 0) {
            Boss.angle = Random(0, 180) * Math.PI / 180;
        } if (Boss.y + Boss.size / 2 >= canvas.height * .8) {
            Boss.angle = Random(180, 360) * Math.PI / 180;
        }

        Boss.x += Math.cos(Boss.angle) * Boss.speed
        Boss.y += Math.sin(Boss.angle) * Boss.speed

        if (count % Boss.enemy.interval == 0) {
            Boss.enemy.enemy.push({ x: NCK(Boss.enemy.range) - Boss.enemy.range / 2 + chara.x, y: Random(0 - Boss.enemy.size, canvas.height / 3), interval: Random(20, 40) })
        }

        Boss.enemy.enemy.forEach(_E0 => {
            if (count % _E0.interval == 0) {
                Boss.enemy.shot.bullet.push({ x: _E0.x, y: _E0.y })
            }
        })

        Boss.enemy.shot.bullet.forEach(_E0 => {
            _E0.x += Math.cos(Boss.enemy.shot.angle) * Boss.enemy.shot.speed
            _E0.y += Math.sin(Boss.enemy.shot.angle) * Boss.enemy.shot.speed
        })

        Boss.enemy.shot.bullet = CanvasOver(Boss.enemy.shot.bullet)
    }

    draw();
    Charamove();
    hit();
}

function OutofMain() {
    if (chara.hp <= 0) {
        [Boss.x, Boss.y] = [canvas.width / 2, canvas.height / 6]
        ctx.drawImage(Boss.image, Boss.x - Boss.size, Boss.y - Boss.size, Boss.size * 2, Boss.size * 2)
        run = false;
        if (Sayclick(13)[0] >= Boss.say.say.end.length) {
            location.reload()
        } else {
            Saying(Boss.say.say.end[Sayclick(13)[0]])
        }
    }
    if (Boss.hp <= 0) {
        run = false;
        [Boss.x, Boss.y] = [canvas.width / 2, canvas.height / 6]
        if (Sayclick(13)[0] >= Boss.say.say.clear.length) {
            location.reload()
        } else {
            Saying(Boss.say.say.clear[Sayclick(13)[0]])
            if (Sayclick(13)[0] == 3) {
                if (!Derie("#saying_box")[0].classList.contains("red")) Derie("#saying_box")[0].classList.add("red");
            } else {
                if (Derie("#saying_box")[0].classList.contains("red")) Derie("#saying_box")[0].classList.remove("red");
            }
        }
    }
}
const tmpAa = (event) => { if (event.keyCode == 72) crKeyMemo("udadd", 32) }
window.addEventListener("keydown", tmpAa)

function draw() {
    Derie("#screen_box")[0].style.width = canvas.width + "px";
    Derie("#screen_box")[0].style.height = canvas.height + "px";
    screenCanvas.width = canvas.width;
    screenCanvas.height = canvas.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (~canvas.background.indexOf("url")) {
        Derie("#screen")[0].style.backgroundImage = canvas.background;
    } else {
        Derie("#screen")[0].style.background = canvas.background;
    }

    //chara_Shot-------------    
    chara.sub.shot.bullet.forEach(_E00 => _E00.forEach(_E0 => {
        ctx.drawImage(chara.sub.shot.image, _E0.x - chara.sub.shot.size, _E0.y - chara.sub.shot.size, chara.sub.shot.size * 2, chara.sub.shot.size * 2)
    }))

    chara.shot.bullet.forEach(_E0 => {
        ctx.drawImage(chara.shot.image, _E0.x - chara.shot.size, _E0.y - chara.shot.size, chara.shot.size * 2, chara.shot.size * 2)
    })
    //chara------------------
    // ctx.imageSmoothingEnabled = falses;
    if (chara.image.tf) ctx.drawImage(chara.image.image, chara.x - chara.image.size / 2, chara.y - chara.image.size / 2, chara.image.size, chara.image.size)
    ctx.beginPath();
    ctx.arc(chara.x, chara.y, chara.size, 0, Math.PI * 2, false)
    ctx.closePath();
    ctx.fillStyle = chara.color;
    ctx.fill();

    [chara.sub[0], chara.sub[1]].forEach(_E0 => {
        ctx.drawImage(chara.sub.image, _E0.x - chara.sub.size, _E0.y - chara.sub.size, chara.sub.size * 2, chara.sub.size * 2)
    })

    //zyako--------------------
    zyako.shot.bullet.forEach(_E0 => {
        ctx.beginPath();
        ctx.arc(_E0.x, _E0.y, zyako.shot.size, 0, Math.PI * 2, false)
        ctx.closePath();
        ctx.fillStyle = zyako.shot.color;
        ctx.fill();
    })

    zyako.zyako.forEach(_E0 => {
        ctx.drawImage(zyako.image, _E0.x - zyako.size, _E0.y - zyako.size, zyako.size * 2, zyako.size * 2)
    })

    //Boss--------------------
    Boss.enemy.shot.bullet.forEach(_E0 => {
        ctx.beginPath();
        ctx.arc(_E0.x, _E0.y, Boss.enemy.shot.size, 0, Math.PI * 2, false)
        ctx.closePath();
        ctx.fillStyle = Boss.enemy.shot.color;
        ctx.fill();
    })

    Boss.enemy.enemy.forEach(_E0 => {
        ctx.drawImage(Boss.enemy.image, _E0.x - Boss.enemy.size, _E0.y - Boss.enemy.size, Boss.enemy.size * 2, Boss.enemy.size * 2)
    })

    ctx.drawImage(Boss.image, Boss.x - Boss.size, Boss.y - Boss.size, Boss.size * 2, Boss.size * 2)
    //Point------------------
    Derie("#screen_point")[0].innerHTML = point.point;
    Derie("#screen_hp")[0].innerHTML = chara.hp;
}

// document.addEventListener("keydown", Charamove)
// window.addEventListener("keyup", Charamove)
function Charamove(event) {
    //console.log(Keys(40))
    if (Keys(37)) chara.x -= 0 <= chara.x - chara.speed ? ((Keys(38) || Keys(40)) ? chara.speed / Math.sqrt(2) : chara.speed) : 0;
    if (Keys(38)) chara.y -= 0 <= chara.y - chara.speed ? ((Keys(37) || Keys(39)) ? chara.speed / Math.sqrt(2) : chara.speed) : 0;
    if (Keys(39)) chara.x += canvas.width >= chara.x + chara.speed ? ((Keys(38) || Keys(40)) ? chara.speed / Math.sqrt(2) : chara.speed) : 0;
    if (Keys(40)) chara.y += canvas.height >= chara.y + chara.speed ? ((Keys(37) || Keys(39)) ? chara.speed / Math.sqrt(2) : chara.speed) : 0;
}

function CanvasOver(tmp0) {
    return tmp0.filter(_E0 => _E0.x <= canvas.width && _E0.x >= 0 && _E0.y <= canvas.height && _E0.y >= 0);
}

OwnLists("Saynumber", "Arradmit", "Code", "Number")
crSaynumber("add", 13, 0)
crSaynumber("add", 70, 0)
crSaynumber("add", 83, 0)
crSaynumber().forEach(_E0 => _E0["Number"] = 0)
window.addEventListener("keydown", (event) => {
    if (!event.repeat) {
        crSaynumber().forEach(_E0 => {
            if (_E0["Code"] == event.keyCode) {
                _E0["Number"]++
            }
        })
    }
})

function Sayclick(code, delet) {
    if (delet) crSaynumber().filter(_E0 => _E0["Code"] == code).forEach(_E0 => _E0["Number"] = 0)
    return crSaynumber().filter(_E0 => _E0["Code"] == code).map(_E0 => _E0["Number"])
}

function Saying(str) {
    if (!str) {
        Derie("#saying_box")[0].classList.remove("fire")
    } else {
        if (!Derie("#saying_box")[0].classList.contains("fire")) Derie("#saying_box")[0].classList.add("fire");
        Derie("#saying_box")[0].innerHTML = str;
    }
}

function Random(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function Funcrand(graph, xmin, xmax, ymin, ymax) {
    let [xx, yy] = [Random(xmin, xmax), Random(ymin, ymax)]
    let x = xx
    return eval(graph) >= yy ? yy : Funcrand(graph, xmin, xmax, ymin, ymax);
}

function hit() {
    zyako.shot.bullet.forEach(_E0 => {
        if (!chara.air && Math.hypot(_E0.x - chara.x, _E0.y - chara.y) <= zyako.shot.size + chara.size) {
            zyako.shot.bullet = zyako.shot.bullet.filter(_E1 => _E0 !== _E1)
            point.point -= point.fail;
            chara.hp -= zyako.shot.damage;
            chara.air = true;
            chara.size = 0;
            setTimeout(() => {
                chara.air = false
                chara.size = confi_chara.size;
            }, 3000)
        }
    })

    zyako.zyako.forEach(_E0 => {
        chara.shot.bullet.forEach(_E1 => {
            if (Math.hypot(_E0.x - _E1.x, _E0.y - _E1.y) <= zyako.size + chara.shot.size) {
                zyako.zyako = zyako.zyako.filter(_E2 => _E0 !== _E2)
                point.point += point.succ;
            }
        })
    })

    zyako.zyako.forEach(_E0 => {
        chara.sub.shot.bullet[0].forEach(_E1 => {
            if (Math.hypot(_E0.x - _E1.x, _E0.y - _E1.y) <= zyako.size + chara.sub.shot.size) {
                zyako.zyako = zyako.zyako.filter(_E2 => _E0 !== _E2)
                point.point += point.succ * 0.7;
            }
        })
    })

    zyako.zyako.forEach(_E0 => {
        chara.sub.shot.bullet[1].forEach(_E1 => {
            if (Math.hypot(_E0.x - _E1.x, _E0.y - _E1.y) <= zyako.size + chara.sub.shot.size) {
                zyako.zyako = zyako.zyako.filter(_E2 => _E0 !== _E2)
                point.point += point.succ * 0.7;
            }
        })
    })

    Boss.enemy.shot.bullet.forEach(_E0 => {
        if (!chara.air && Math.hypot(_E0.x - chara.x, _E0.y - chara.y) <= Boss.enemy.shot.size + chara.size) {
            Boss.enemy.shot.bullet = Boss.enemy.shot.bullet.filter(_E1 => _E0 !== _E1)
            point.point -= point.fail * 1.2;
            chara.hp -= Boss.enemy.shot.damage;
            chara.air = true;
            chara.size = 0;
            setTimeout(() => {
                chara.air = false
                chara.size = confi_chara.size;
            }, 3000)
        }
    })

    Boss.enemy.enemy.forEach(_E0 => {
        chara.shot.bullet.forEach(_E1 => {
            if (Math.hypot(_E0.x - _E1.x, _E0.y - _E1.y) <= Boss.enemy.size + chara.shot.size) {
                Boss.enemy.enemy = Boss.enemy.enemy.filter(_E2 => _E0 !== _E2)
                point.point += point.succ;
            }
        })
    })

    Boss.enemy.enemy.forEach(_E0 => {
        chara.sub.shot.bullet[0].forEach(_E1 => {
            if (Math.hypot(_E0.x - _E1.x, _E0.y - _E1.y) <= Boss.enemy.size + chara.sub.shot.size) {
                Boss.enemy.enemy = Boss.enemy.enemy.filter(_E2 => _E0 !== _E2)
                point.point += point.succ * 0.7;
            }
        })
    })
    if (Game_plan[RateofGame] == "Boss0") {
        Boss.enemy.enemy.forEach(_E0 => {
            chara.sub.shot.bullet[1].forEach(_E1 => {
                if (Math.hypot(_E0.x - _E1.x, _E0.y - _E1.y) <= Boss.enemy.size + chara.sub.shot.size) {
                    Boss.enemy.enemy = Boss.enemy.enemy.filter(_E2 => _E0 !== _E2)
                    point.point += point.succ * 0.7;
                }
            })
        })

        if (chara.x + chara.size >= Boss.x - Boss.size * Boss.hit_size * 0.01 && chara.x - chara.size <= Boss.x + Boss.size * Boss.hit_size * 0.01 && chara.y - chara.size <= Boss.y + Boss.size && chara.y + chara.size >= Boss.y - Boss.size) {
            Boss.hp -= chara.sub.shot.damage * .5;
            point.point += point.succ * 2;
            chara.hp -= Boss.damage;

            chara.air = true;
            chara.size = 0;
            setTimeout(() => {
                chara.air = false
                chara.size = confi_chara.size;
            }, 3000)
        }
        chara.shot.bullet.forEach(_E0 => {
            if (Math.abs(_E0.x + chara.shot.size >= Boss.x - Boss.size && _E0.x - chara.shot.size <= Boss.x + Boss.size && _E0.y - chara.shot.size <= Boss.y + Boss.size && _E0.y + chara.shot.size >= Boss.y - Boss.size)) {
                Boss.hp -= chara.sub.shot.damage * Math.hypot(chara.x - Boss.x, chara.y - Boss.y) / canvas.height * .1;
                point.point += point.succ * 2;
                chara.hp += 1;
                chara.shot.bullet = chara.shot.bullet.filter(_E1 => _E1 !== _E0)
            }
        })

        chara.sub.shot.bullet[0].forEach(_E0 => {
            if (Math.abs(_E0.x + chara.shot.size >= Boss.x - Boss.size && _E0.x - chara.shot.size <= Boss.x + Boss.size && _E0.y - chara.shot.size <= Boss.y + Boss.size && _E0.y + chara.shot.size >= Boss.y - Boss.size)) {
                Boss.hp -= chara.sub.shot.damage * Math.hypot(chara.x - Boss.x, chara.y - Boss.y) / canvas.height * .1;
                point.point += point.succ * 1.5;
                chara.hp += 1
                chara.sub.shot.bullet[0] = chara.sub.shot.bullet[0].filter(_E1 => _E1 !== _E0)
            }
        })

        chara.sub.shot.bullet[1].forEach(_E0 => {
            if (Math.abs(_E0.x + chara.shot.size >= Boss.x - Boss.size && _E0.x - chara.shot.size <= Boss.x + Boss.size && _E0.y - chara.shot.size <= Boss.y + Boss.size && _E0.y + chara.shot.size >= Boss.y + Boss.size)) {
                Boss.hp -= chara.sub.shot.damage * Math.hypot(chara.x - Boss.x, chara.y - Boss.y) / canvas.height * .1;
                point.point += point.succ * 1.5;
                chara.hp += 1
                chara.sub.shot.bullet[1] = chara.sub.shot.bullet[1].filter(_E1 => _E1 !== _E0)
            }
        })
    }
    Math.floor(point.point)
}

function PlusRate() {
    RateofGame += 1;
}

function Array2(...arg) {
    tmp0 = [];
    arg.forEach(_E0 => tmp0.push(_E0))
    return tmp0
}

function DeleteZyako() {
    zyako.zyako = [];
    zyako.shot.bullet = [];
}

function RandFn(now, min, max) {
    if (now >= Random(min, max)) { return true } else { return false }
}

//結構汚い関数です。良いんですよ, どうせ再利用の予定のない関数ですから。
function NCK(N) {
    let [pare1, chil1] = [0, 0];
    for (i = 1; i <= N / 2; i++) {
        pare1 = pare1 + i
    }
    for (i = 0; i < N / 2; i++) {
        chil1 = chil1 + (N - i)
    }
    let [xx, yy] = [Random(0, N), Random(0, chil1 / pare1)]

    let [pare, chil] = [0, 0];
    for (i = 1; i <= xx; i++) {
        pare = pare + i
    }
    for (i = 0; i < xx; i++) {
        chil = chil + (N - i)
    }
    // console.log(chil / pare)
    return yy <= chil / pare ? xx : NCK(N);
}

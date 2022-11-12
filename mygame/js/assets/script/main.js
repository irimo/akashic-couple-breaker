window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
let point = 0;
const GAY = 8;
const BIAN = 9;
const CHILD = 0;
function main(param) {
    let scene = new g.Scene({
        game: g.game,
        // このシーンで利用するアセットのIDを列挙し、シーンに通知します
        assetIds: ["hotel", "dan", "jo", "bakuhatsu", "bomber", "honsya", "explain"]
    });
    var time = 60; // 制限時間
    let group_explain;
    let explain_appear = true;

    scene.onLoad.add(function () {
        // g.game.audio.sound.volume = 0.25;
        // ここからゲーム内容を記述します
        // 各アセットオブジェクトを取得します
        var hotelImageAsset = scene.asset.getImageById("hotel");
        var bakuhatsuImageAsset = scene.asset.getImageById("bakuhatsu");
        var danImageAsset = scene.asset.getImageById("dan");
        var joImageAsset = scene.asset.getImageById("jo");
        var honsyaImageAsset = scene.asset.getImageById("honsya");
        var explainImageAsset = scene.asset.getImageById("explain");
        var bombAudioAsset = scene.asset.getAudioById("bomber");

        // // プレイヤーを生成します
        var hotel = new g.Sprite({
            scene: scene,
            src: hotelImageAsset,
            width: hotelImageAsset.width,
            height: hotelImageAsset.height,
            x: 0,
            y: g.game.height - 160,
            scaleX: 1.7
        });
        let group_bg_back = new g.E({ scene: scene });
        scene.append(group_bg_back);
        setBg(group_bg_back, scene);

        const rect = new g.FilledRect({
            scene,
            cssColor: "black",
            x: 0,
            y: 0,
            width: 300,
            height: 50
          });

        const font = new g.DynamicFont({
            game: g.game,
            fontFamily: "sans-serif",
            size: 20
        });
        let label = new g.Label({
            scene: scene,
            font: font,
            text: point + "pt",
            fontSize: 40,
            textColor: "white",
            x: 40,
            y: 0
        });
        let group_score = new g.E({ scene: scene });
        group_score.append(rect);
        group_score.append(label);
        scene.append(group_score);

        let group_bg_front = new g.E({ scene: scene });
        group_bg_front.append(hotel);
        scene.append(group_bg_front);

        let explain = new g.Sprite({
            scene: scene,
            src: explainImageAsset,
            width: explainImageAsset.width,
            height: explainImageAsset.height,
            x: 0,
            y: 0
        });

        group_explain = new g.E({ scene: scene });
        group_explain.append(explain);
        scene.append(group_explain);

        scene.setInterval(() => {
            showCouple(label, scene, danImageAsset, joImageAsset, bakuhatsuImageAsset, group_score, bombAudioAsset);
        }, 1000);
        
        scene.setTimeout(() => {
            showHonsya(label, scene, honsyaImageAsset, bakuhatsuImageAsset, group_score, bombAudioAsset);
        }, 15000);
    });
    let updateHandler = function () {
        if (time < 57) {
            if (explain_appear == true) {
                group_explain.destroy();
            }
            explain_appear = false;
        }
        if (time <= 0) {
            // RPGアツマール環境であればランキングを表示します
            if (param.isAtsumaru) {
                var boardId_1 = 1;
                window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId_1, g.game.vars.gameState.score).then(function () {
                    window.RPGAtsumaru.experimental.scoreboards.display(boardId_1);
                });
            }
            scene.onUpdate.remove(updateHandler); // カウントダウンを止めるためにこのイベントハンドラを削除します
        }
        // カウントダウン処理
        time -= 1 / g.game.fps;
    };
    scene.onUpdate.add(updateHandler);
    // ここまでゲーム内容を記述します

    g.game.pushScene(scene);
}
function showCouple(label, scene, danImageAsset, joImageAsset, bakuhatsuImageAsset, group_score, bombAudioAsset) {
    let human_width = 48;
    let start_x = g.game.random.get(0, g.game.width - human_width * 2)
    let lgbtq = g.game.random.get(0, 9);
    let speed = g.game.random.get(1, 20);
    let age = g.game.random.get(0, 10);
    
    let group_couple = new g.E({ scene: scene });

    let human1 = null;
    let human2 = null;

    let scale = 1.0;
    if (age === CHILD) {
        scale = 0.7;
    }

    if (lgbtq === BIAN) {
        human1 = new g.Sprite({
            scene: scene,
            src: joImageAsset,
            width: danImageAsset.width,
            height: danImageAsset.height,
            x: start_x + human_width,
            y: 0,
            anchorX: 1.0,
            anchorY: 1.0,
            scaleX: scale,
            scaleY: scale
        });
    } else {
        human1 = new g.Sprite({
            scene: scene,
            src: danImageAsset,
            width: danImageAsset.width,
            height: danImageAsset.height,
            x: start_x + human_width,
            y: 0,
            anchorX: 1.0,
            anchorY: 1.0,
            scaleX: scale,
            scaleY: scale
        });
    }
    if (lgbtq === GAY) {
        human2 = new g.Sprite({
            scene: scene,
            src: danImageAsset,
            width: joImageAsset.width,
            height: joImageAsset.height,
            x: start_x + human_width,
            y: 0,
            anchorX: 0.0,
            anchorY: 1.0,
            scaleX: scale,
            scaleY: scale
        });
    } else {
        human2 = new g.Sprite({
            scene: scene,
            src: joImageAsset,
            width: joImageAsset.width,
            height: joImageAsset.height,
            x: start_x + human_width,
            y: 0,
            anchorX: 0.0,
            anchorY: 1.0,
            scaleX: scale,
            scaleY: scale
        });
    }
    var bakuhatsu = new g.Sprite({
        scene: scene,
        src: bakuhatsuImageAsset,
        width: bakuhatsuImageAsset.width,
        height: bakuhatsuImageAsset.height,
        // parent: group_couple,
        // x: 0,
        y: 0,
        x: human1.x,
        // y: human1.y,
        anchorX: 0.5,
        anchorY: 0.75,
        opacity: 0.0
    });
    human1.touchable = true;
    human2.touchable = true;
    group_couple.append(human1);
    group_couple.append(human2);
    group_couple.append(bakuhatsu);
    scene.insertBefore(group_couple, group_score);
    // let bakuhatsu_point = {x: start_x, y: 0}

    scene.onUpdate.add(() => {
        human1.y += speed;
        if (g.game.height + 300 > human1.y) {
            human2.y = human1.y;
            bakuhatsu.y = human1.y;
            human1.modified();
            human2.modified();
            bakuhatsu.modified();
        }
    });

    human1.onPointDown.add(() => {
        human1.touchable = false;
        human2.touchable = false;
        bakuhatsu.opacity = 1.0;
        bakuhatsu.modified();
        destroyRect(lgbtq, label, group_couple, scene, human1.y, bombAudioAsset);
    });
    human2.onPointDown.add(() => {
        human1.touchable = false;
        human2.touchable = false;
        bakuhatsu.opacity = 1.0;
        bakuhatsu.modified();
        destroyRect(lgbtq, label, group_couple, scene, human1.y, bombAudioAsset);
    });
}
function showHonsya(label, scene, honsyaImageAsset, bakuhatsuImageAsset, group_score, bombAudioAsset) {

    let start_x = g.game.random.get(0, g.game.width - honsyaImageAsset.width)
    let group_couple = new g.E({ scene: scene });
    let honsya = new g.Sprite({
        scene: scene,
        src: honsyaImageAsset,
        width: honsyaImageAsset.width,
        height: honsyaImageAsset.height,
        x: start_x,
        y: 0,
        anchorX: 0.5,
        anchorY: 1.0
    });
    
    honsya.touchable = true;

    var bakuhatsu = new g.Sprite({
        scene: scene,
        src: bakuhatsuImageAsset,
        width: bakuhatsuImageAsset.width,
        height: bakuhatsuImageAsset.height,
        // parent: group_couple,
        // x: 0,
        y: 0,
        x: start_x,
        // y: human1.y,
        anchorX: 0.5,
        anchorY: 0.75,
        opacity: 0.0
    });
    
    group_couple.append(honsya);
    group_couple.append(bakuhatsu);
    scene.insertBefore(group_couple, group_score);

    scene.onUpdate.add(() => {
        honsya.y += 10;
        if (g.game.height + 300 > honsya.y) {
            bakuhatsu.y = honsya.y;
            honsya.modified();
            bakuhatsu.modified();
        }
    });

    honsya.onPointDown.add(() => {    
        honsya.touchable = false;
        bakuhatsu.opacity = 1.0;
        bakuhatsu.modified();
        destroyRect(0, label, group_couple, scene, honsya.y, bombAudioAsset);
    });
}

function setBg(group_bg_back, scene) {
    
    const font = new g.DynamicFont({
        game: g.game,
        fontFamily: "sans-serif",
        size: 15
    });
    let w_width = 25;

    const rect_bg = new g.FilledRect({
        scene,
        cssColor: "white",
        x: 0,
        y: 0,
        width: g.game.width,
        height: g.game.height,
        parent: group_bg_back
      });

    for (let y=0; y < g.game.height / w_width; y++) {
        let label = new g.Label({
            scene: scene,
            font: font,
            text: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
            fontSize: w_width,
            textColor: "green",
            x: -10,
            y: (-10 + w_width * y),
            parent: group_bg_back
        });
    }
}

function destroyRect(lgbtq, label, group_couple, scene, y, bombAudioAsset) {

    bombAudioAsset.play().changeVolume(0.01);
    // bombAudioAsset.play();
    if (lgbtq === GAY || lgbtq === BIAN) {
        point -= 1000;
    } else {
        point += (1000 - y);
    }
    // scene.onUpdate.remove();
    scene.setTimeout(() => {
        if (group_couple != null) {
            group_couple.destroy();
            group_couple = null;
        }
        point -= 100;
    }, 500);
    label.text = point + "pt";
    label.invalidate();
  }
module.exports = main;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}
let point = 0;
const GAY = 8;
const BIAN = 9;
const CHILD = 0;
function main(param) {
    let scene = new g.Scene({
        game: g.game,
        // このシーンで利用するアセットのIDを列挙し、シーンに通知します
        assetIds: ["hotel", "dan", "jo", "bakuhatsu", "bomber", "honsya"]
    });
    scene.onLoad.add(function () {
        // g.game.audio.sound.volume = 0.25;
        // ここからゲーム内容を記述します
        // 各アセットオブジェクトを取得します
        var hotelImageAsset = scene.asset.getImageById("hotel");
        var bakuhatsuImageAsset = scene.asset.getImageById("bakuhatsu");
        var danImageAsset = scene.asset.getImageById("dan");
        var joImageAsset = scene.asset.getImageById("jo");
        var honsyaImageAsset = scene.asset.getImageById("honsya");
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


        // プレイヤーの初期座標を、画面の中心に設定します
        // player.x = (g.game.width - player.width) / 2;
        // player.y = (g.game.height - player.height) / 2;
        // player.onUpdate.add(function () {
        //     // 毎フレームでY座標を再計算し、プレイヤーの飛んでいる動きを表現します
        //     // ここではMath.sinを利用して、時間経過によって増加するg.game.ageと組み合わせて
        //     player.y = (g.game.height - player.height) / 2 + Math.sin(g.game.age % (g.game.fps * 10) / 4) * 10;
        //     // プレイヤーの座標に変更があった場合、 modified() を実行して変更をゲームに通知します
        //     player.modified();
        // });
        // // 画面をタッチしたとき、SEを鳴らします
        // scene.onPointDownCapture.add(function () {
        //     seAudioAsset.play();
        //     // プレイヤーが発射する弾を生成します
        //     var shot = new g.Sprite({
        //         scene: scene,
        //         src: shotImageAsset,
        //         width: shotImageAsset.width,
        //         height: shotImageAsset.height
        //     });
        //     // 弾の初期座標を、プレイヤーの少し右に設定します
        //     shot.x = player.x + player.width;
        //     shot.y = player.y;
        //     shot.onUpdate.add(function () {
        //         // 毎フレームで座標を確認し、画面外に出ていたら弾をシーンから取り除きます
        //         if (shot.x > g.game.width)
        //             shot.destroy();
        //         // 弾を右に動かし、弾の動きを表現します
        //         shot.x += 10;
        //         // 変更をゲームに通知します
        //         shot.modified();
        //     });
        //     scene.append(shot);
        // });
        // scene.append(player);
        // ここまでゲーム内容を記述します

        scene.setInterval(() => {
            showCouple(label, scene, danImageAsset, joImageAsset, bakuhatsuImageAsset, group_score, bombAudioAsset);
        }, 1000);
        
        scene.setTimeout(() => {
            showHonsya(label, scene, honsyaImageAsset, bakuhatsuImageAsset, group_score, bombAudioAsset);
        }, 2000);    
});
    g.game.pushScene(scene);
}
function showCouple(label, scene, danImageAsset, joImageAsset, bakuhatsuImageAsset, group_score, bombAudioAsset) {
    let human_width = 48;
    let start_x = g.game.random.get(0, g.game.width - human_width * 2)
    let lgbtq = g.game.random.get(0, 9);
    let speed = g.game.random.get(1, 20);
    let age = g.game.random.get(0, 10);
    
    let group_couple = new g.E({ scene: scene });

    // let human2 = new g.FilledRect({
    //     scene: scene,
    //     cssColor: "red",
    //     width: human_width,
    //     height: 50,
    //     x: start_x + human_width,
    //     y: 0,
    //     opacity: 1
    // });
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
        if (g.game.height + 300 < human1.y) {
            // human1.y = g.game.height;
            // group_couple.destroy();
        } else {
            human2.y = human1.y;
            bakuhatsu.y = human1.y;
            human1.modified();
            human2.modified();
            bakuhatsu.modified();
        }
    });

    human1.onPointUp.add(() => {
        bakuhatsu.opacity = 1.0;
        bakuhatsu.modified();
        destroyRect(lgbtq, label, group_couple, scene, human1.y, bombAudioAsset);
    });
    human2.onPointUp.add(() => {
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
        if (g.game.height + 300 < honsya.y) {
            bakuhatsu.y = honsya.y;
            // human1.y = g.game.height;
            // group_couple.destroy();
        } else {
            honsya.modified();
            bakuhatsu.modified();
        }
    });

    honsya.onPointUp.add(() => {
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
    // if (rect.opacity > 0) {
    //     rect.opacity -= 0.1;
    // }
    // console.log(human1.x);
    // group_couple.append(bakuhatsu);
    // human1.opacity = 0;
    // human1.modified();
    // human2.opacity = 0;
    // human2.modified();
    // bombAudioAsset.changeVolume(0.4);
    bombAudioAsset.play().changeVolume(0.01);
    // bombAudioAsset.play();
    if (lgbtq === GAY || lgbtq === BIAN) {
        point -= 1000;
    } else {
        point += (1000 - y);
    }
    // scene.onUpdate.remove();
    scene.setTimeout(() => {
        group_couple.destroy();
        point -= 100;
    }, 500);
    label.text = point + "pt";
    label.invalidate();
  }
module.exports = main;

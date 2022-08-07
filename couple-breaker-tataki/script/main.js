let point = 0;
function main(param) {
    let scene = new g.Scene({
        game: g.game,
        // このシーンで利用するアセットのIDを列挙し、シーンに通知します
        // assetIds: ["player", "shot", "se"]
    });
    scene.onLoad.add(function () {
        const font = new g.DynamicFont({
            game: g.game,
            fontFamily: "sans-serif",
            size: 15
        });
        let label = new g.Label({
            scene: scene,
            font: font,
            text: point + "pt",
            fontSize: 15,
            textColor: "blue"
        });
        scene.append(label);

        scene.setInterval(() => {
            showCouple(label, scene);
        }, 2000);
        // ここからゲーム内容を記述します
        // 各アセットオブジェクトを取得します
        // var playerImageAsset = scene.asset.getImageById("player");
        // var shotImageAsset = scene.asset.getImageById("shot");
        // var seAudioAsset = scene.asset.getAudioById("se");
        // // プレイヤーを生成します
        // var player = new g.Sprite({
        //     scene: scene,
        //     src: playerImageAsset,
        //     width: playerImageAsset.width,
        //     height: playerImageAsset.height
        // });
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
    });
    g.game.pushScene(scene);
}
function showCouple(label, scene) {
    let human_width = 50;
    let start_x = g.game.random.get(0, g.game.width - human_width * 2)
    let boy = new g.FilledRect({
        scene: scene,
        cssColor: "blue",
        width: human_width,
        height: 50,
        x: start_x,
        y: 0,
        opacity: 1
    });
    boy.touchable = true;
    scene.append(boy);
    let girl = new g.FilledRect({
        scene: scene,
        cssColor: "red",
        width: human_width,
        height: 50,
        x: start_x + human_width,
        y: 0,
        opacity: 1
    });
    girl.touchable = true;
    scene.append(girl);
    scene.onUpdate.add(() => {
        boy.y += 3;
        girl.y += 3;
        if (g.game.height < boy.y) {
            boy.y = 0;
            girl.y = 0;
        }
        boy.modified();
        girl.modified();
    });
    boy.onPointUp.add(() => {
        destroyRect(boy, girl, label);
    });
    girl.onPointUp.add(() => {
        destroyRect(boy, girl, label);
    });

}
function destroyRect(boy, girl, label) {
    // if (rect.opacity > 0) {
    //     rect.opacity -= 0.1;
    // }
    boy.opacity = 0;
    boy.modified();
    girl.opacity = 0;
    girl.modified();
    point++;
    label.text = point + "pt";
    label.invalidate();
  }
module.exports = main;

function main() {
  const scene = new g.Scene({
    game: g.game,
    assetIds: ["se"]
  });
  scene.onLoad.add(() => {
    scene.onPointDownCapture.add(ev => {
      const size = 20;
      const rect = new g.FilledRect({
        scene: scene,
        x: ev.point.x - size / 2,
        y: ev.point.y - size / 2,
        width: size,
        height: size,
        cssColor: "blue"
      });
      scene.append(rect);
      scene.asset.getAudioById("se").play();
    });
    const font = new g.DynamicFont({
      game: g.game,
      fontFamily: "sans-serif",
      size: 15
    });
    const label = new g.Label({
      scene: scene,
      font: font,
      text: "Hello World!",
      fontSize: 15,
      textColor: "blue"
    });
    scene.append(label);
  });
  g.game.pushScene(scene);
}

module.exports = main;


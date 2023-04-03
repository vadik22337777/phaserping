import Phaser from "phaser";

let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "mainmenu" });
  },
  preload: function preload() {},
  create: function () {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);


    this.add.text(200, 300, "Press 1 for a 1 player game.");
    this.add.text(250, 330, "Press 2 for a 2 player game");
  },
  update: function () {
    let one = this.input.keyboard.addKey("ONE");
    let two = this.input.keyboard.addKey("TWO");

    if (Phaser.Input.Keyboard.JustDown(one)) {
      this.scene.start("game");
    }
    if (Phaser.Input.Keyboard.JustDown(two)) {
      this.scene.start("2pmenu");
    }
  },
});

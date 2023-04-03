import Phaser from "phaser";

let graphics;
let cursors;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "2pmenu" });
  },
  create: function () {
    cursors = this.input.keyboard.createCursorKeys();

    graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(0, 0, 800, 600);

    this.add.text(270, 300, "Press space to start.");
    this.add.text(270, 315, "To serve press right for P1 or A for P2");
    this.add.text(270, 330, "Move with up, down, left, right.");
    this.add.text(270, 345, "Press spacebar to brake.");
    this.add.text(270, 445, "Press left to return to main menu.");
  },
  update: function () {
    if (cursors.space.isDown) {
      this.scene.start("2pgame");
    }

    if (cursors.left.isDown) {
      this.scene.start("mainmenu");
    }
  },
});

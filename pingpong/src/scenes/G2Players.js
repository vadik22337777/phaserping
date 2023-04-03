import Phaser from "phaser";
import paddle from "../assets/paddle.png";
import ballimg from "../assets/ball.png";
import { accelerate, decelerate } from "../utils";

let paddleP1;
let paddleP2;
let cursors;
let ball;
let score1_text;
let score2_text;
let p1Text;
let cpuText;
let ball_launched;
let ball_velocity;
let p1scored = false;
let p2scored = false;
let firstLaunch = true;

let score1;
let score2;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "2pgame" });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("paddle", paddle);
    this.load.image("ballimg", ballimg);
  },
  create: function create() {
    this.add.image("paddle", paddle);
    this.add.image("ballimg", ballimg);

    score1 = 0;
    score2 = 0;

    ball_launched = false;
    ball_velocity = 400;

    score1_text = this.add.text(128, 10, "0", {
      font: "12px Gabriella",
      fill: "#ffffff",
      align: "center",
    });

    score2_text = this.add.text(672, 10, "0", {
      font: "12px Gabriella",
      fill: "#ffffff",
      align: "center",
    });

    p1Text = this.add.text(40, 20, "P1:", {
      font: "12px Gabriella",
      fill: "#ffffff",
      align: "center",
    });

    cpuText = this.add.text(550, 20, "CPU:", {
      font: "12px Gabriella",
      fill: "#ffffff",
      align: "center",
    });

    ball = this.physics.add.image(100, 300, "ballimg");
    ball.setScale(1.5, 1.5);
    ball.setBounce(1, 1);

    ball.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    paddleP1 = this.physics.add.image(10, 300, "paddle");

    paddleP2 = this.physics.add.image(790, 300, "paddle");

    this.physics.add.collider(ball, paddleP1);

    this.physics.add.collider(ball, paddleP2);
    this.physics.add.collider(paddleP1, paddleP2);

    paddleP1.setCollideWorldBounds(true);

    paddleP2.setCollideWorldBounds(true);
  },
  update: function () {
    const launch_ball = () => {
      if (!ball_launched) {
        paddleP1.body.maxVelocity.x = 0;
        paddleP1.body.maxVelocity.y = 0;
        paddleP2.body.maxVelocity.x = 0;
        paddleP2.body.maxVelocity.y = 0;
        if (cursors.right.isDown && p2scored) {
          ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9));
          ball.setVelocityX(100);
          ball.setVelocityY(150 - Math.random() * 400);
          paddleP1.body.maxVelocity.x = 250;
          paddleP1.body.maxVelocity.y = 250;
          paddleP2.body.maxVelocity.x = 250;
          paddleP2.body.maxVelocity.y = 250;
          p2scored = false;
          return (ball_launched = true);
        }

        if (cursors.right.isDown && firstLaunch) {
          ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9));
          ball.setVelocityX(100);
          ball.setVelocityY(150 - Math.random() * 400);
          paddleP1.body.maxVelocity.x = 250;
          paddleP1.body.maxVelocity.y = 250;
          paddleP2.body.maxVelocity.x = 250;
          paddleP2.body.maxVelocity.y = 250;
          firstLaunch = false;
          return (ball_launched = true);
        }

        if (this.keys.left.isDown && p1scored) {
          p1scored = false;
          ball.setBounceY(Phaser.Math.FloatBetween(0.5, 0.9));
          ball.setVelocityX(-100);
          ball.setVelocityY(150 - Math.random() * 400);
          paddleP1.body.maxVelocity.x = 250;
          paddleP1.body.maxVelocity.y = 250;
          paddleP2.body.maxVelocity.x = 250;
          paddleP2.body.maxVelocity.y = 250;
          return (ball_launched = true);
        }
      }
    };

    const checkWin = () => {
      if (score1 === 7) {
        this.add.text(300, 300, "PLayer win!", {
          font: "30px Gabriella",
          fill: "#ffffff",
          align: "center",
        });
        setTimeout(() => {
          this.scene.start("mainmenu");
        } , 3000)
      }
      if (score2 === 7) {
        this.add.text(300, 300, "Cpu win!", {
          font: "30px Gabriella",
          fill: "#ffffff",
          align: "center",
        });
        setTimeout(() => {
          this.scene.start("mainmenu");
        } , 3000)
      }
    };

    checkWin();
    launch_ball();
    const { velocity } = paddleP1.body;

    score1_text.text = score1;
    score2_text.text = score2;

    const resetSceneWhenP2Scores = () => {
      let x = 0;
      let y = 0;
      paddleP1.body.x = 10;
      paddleP1.body.y = 300;
      paddleP2.body.x = 790;
      paddleP2.body.y = 300;
      paddleP1.setVelocity(x, y);
      ball.body.x = 100;
      ball.body.y = 300;
      ball.setVelocity(0, 0);
    };

    const resetSceneWhenP1Scores = () => {
      let x = 0;
      let y = 0;
      paddleP1.body.x = 10;
      paddleP1.body.y = 300;
      paddleP2.body.x = 790;
      paddleP2.body.y = 300;
      paddleP1.setVelocity(x, y);
      ball.body.x = 700;
      ball.body.y = 300;
      ball.setVelocity(0, 0);
    };

    if (ball.body.blocked.left) {
      score2++;
      resetSceneWhenP2Scores();
      p2scored = true;
      ball_launched = false;
    } else if (ball.body.blocked.right) {
      score1++;
      resetSceneWhenP1Scores();
      p1scored = true;
      ball_launched = false;
    }

    if (cursors.space.isDown) {
      const x = decelerate(velocity.x);
      const y = decelerate(velocity.y);
      paddleP1.setVelocity(x, y);
    }

    if (cursors.up.isDown) paddleP1.setVelocityY(accelerate(velocity.y, -1));
    if (cursors.right.isDown) paddleP1.setVelocityX(accelerate(velocity.x, 1));
    if (cursors.down.isDown) paddleP1.setVelocityY(accelerate(velocity.y, 1));
    if (cursors.left.isDown) paddleP1.setVelocityX(accelerate(velocity.x, -1));

    if (this.keys.up.isDown) paddleP2.setVelocityY(accelerate(0, -15));
    if (this.keys.right.isDown) paddleP2.setVelocityX(accelerate(0, 15));
    if (this.keys.down.isDown) paddleP2.setVelocityY(accelerate(0, 15));
    if (this.keys.left.isDown) paddleP2.setVelocityX(accelerate(0, -15));
  },
});

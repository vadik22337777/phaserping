import Phaser from "phaser";
import MainMenu from "./scenes/MM";
import Game from "./scenes/G1Player";
import TwoPlayerMenu from "./scenes/2PlayersMM";
import TwoPlayer from "./scenes/G2Players";

const resolution = {
  width: 800,
  height: 640,
};

const config = {
  type: Phaser.AUTO,
  width: resolution.width,
  height: resolution.height,
  physics: {
    default: "arcade",
  },
  scene: [
    MainMenu,
    TwoPlayerMenu,
    Game,
    TwoPlayer,
  ],
};

const game = new Phaser.Game(config);

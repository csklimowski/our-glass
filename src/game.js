import { MainState } from './states/main';
import { LoadState } from './states/load';

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

game.state.add('load', LoadState);
game.state.add('main', MainState);

game.state.start('load');

export default game;
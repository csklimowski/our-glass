import { MainState } from './states/main';

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

game.state.add('main', MainState);

game.state.start('main');

export default game;
import { MainState } from './states/main';
import { LoadState } from './states/load';
import { TitleState } from './states/title';

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

game.state.add('load', LoadState);
game.state.add('title', TitleState);
game.state.add('main', MainState);

game.state.start('load');

export default game;
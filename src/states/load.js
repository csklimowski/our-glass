import game from '../game';

export class LoadState extends Phaser.State {
    preload() {
        game.load.image('sand-particle', 'img/sand-particle.png');
    }

    create() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.windowConstraints.bottom = 'layout';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.state.start('title');
    }
}
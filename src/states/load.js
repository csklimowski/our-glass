import game from '../game';

export class LoadState extends Phaser.State {
    preload() {
        game.load.image('sand-particle', 'img/sand-particle.png');
        game.load.image('cactus', 'img/cactus.png');
        game.load.image('chest', 'img/chest.png');
        game.load.image('anchor', 'img/sprites/anchor.png');
        game.load.image('light-sand-particle', 'image/light-sand-particle.png');
        game.load.spritesheet('sway', 'img/sprites/sway.png', 150, 150);
    }

    create() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.windowConstraints.bottom = 'layout';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.state.start('title');
    }
}
import game from '../game';

export class LoadState extends Phaser.State {
    preload() {
        game.load.image('sand-particle', 'img/sand-particle.png');
        game.load.image('cactus', 'img/cactus.png');
        game.load.image('chest', 'img/chest.png');
        game.load.image('anchor', 'img/anchor.png');
        game.load.image('light-sand-particle', 'image/light-sand-particle.png');
        game.load.spritesheet('sway', 'img/sprites/sway.png', 150, 150);
        game.load.audio('hit_chest','audio/anchor_hit_chest.ogg');
        game.load.audio('hit_glass','audio/anchor_hit_glass.ogg');
        game.load.audio('hit_ground','audio/anchor_hit_ground.ogg');
        game.load.audio('bury_chest','audio/bury_chest.ogg');
        game.load.audio('anchor_fall','audio/falling_anchor.ogg');
        game.load.audio('flip', 'hourglass_flip.ogg');
    }

    create() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.windowConstraints.bottom = 'layout';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.state.start('title');

        game.sfx = {
            hit_chest: game.add.sound('hit_chest'),
            hit_glass: game.add.sound('hit_glass'),
            hit_ground: game.add.sound('hit_ground'),
            bury: game.add.sound('bury_chest'),
            fall: game.add.sound('anchor_fall'),
            flip: game.add.sound('flip')
        };
    }
}
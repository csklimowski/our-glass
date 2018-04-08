import game from '../game';

export class LoadState extends Phaser.State {
    preload() {
        game.load.image('sand-particle', 'img/sand-particle.png');
        game.load.image('chest', 'img/chest.png');
        game.load.image('anchor', 'img/sprites/anchor.png');
        game.load.image('light-sand-particle', 'img/light-sand-particle.png');
        game.load.spritesheet('swayblue', 'img/sprites/swayblue.png', 150, 150);
        game.load.spritesheet('sway', 'img/sprites/sway.png', 150, 150);
        game.load.spritesheet('cactus', 'img/sprites/sway.png', 110, 200)
        game.load.audio('hit_chest','audio/anchor_hit_chest.ogg');
        game.load.audio('hit_glass','audio/anchor_hit_glass.ogg');
        game.load.audio('hit_ground','audio/anchor_hit_ground.ogg');
        game.load.audio('bury_chest','audio/bury_chest.ogg');
        game.load.audio('anchor_fall','audio/falling_anchor.ogg');
        game.load.audio('whoosh', 'audio/hourglass_flip_whoosh.ogg');
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
            whoosh: game.add.sound('whoosh', 2)
        };
    }
}
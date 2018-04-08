import game from '../game';

export class LoadState extends Phaser.State {
    preload() {
        game.load.image('sand-particle', 'img/sand-particle.png');
        game.load.image('chest', 'img/sprites/chest.png');
        game.load.image('anchor', 'img/sprites/anchor.png');
        game.load.image('light-sand-particle', 'img/light-sand-particle.png');
        game.load.image('hourglass', 'img/sprites/hourglass.png');
        game.load.spritesheet('swayblue', 'img/sprites/swayblue.png', 150, 150);
        game.load.spritesheet('sway', 'img/sprites/sway.png', 150, 150);
        game.load.spritesheet('cactus_dance', 'img/sprites/cactus_dance.png', 140, 150);
        game.load.spritesheet('cactus_fall', 'img/sprites/cactus_fall.png', 128, 149);
        game.load.spritesheet('outofsand', 'img/sprites/outofsand.png', 150, 150);
        game.load.spritesheet('bug', 'img/sprites/bug.png', 50, 50);
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
            hit_chest: game.add.sound('hit_chest', 0.2),
            hit_glass: game.add.sound('hit_glass', 1),
            hit_ground: game.add.sound('hit_ground', 1),
            bury: game.add.sound('bury_chest', 1),
            fall: game.add.sound('anchor_fall', 1),
            whoosh: game.add.sound('whoosh', 2)
        };
    }
}
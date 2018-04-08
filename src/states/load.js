import game from '../game';

export class LoadState extends Phaser.State {
    preload() {
        //game.add.text(game.width/2, game.height/2, 'Loading...', {font: '30px sans-serif', color: '#fff'});
        game.add.text(game.width/2, game.height/2, 'Loading...', { font: '30px sans-serif', fill: '#ffffff', align: 'center'}).anchor.set(0.5);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.windowConstraints.bottom = 'layout';
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        

        game.load.image('sand-particle', 'img/sand-particle.png');
        game.load.image('chest', 'img/sprites/chest.png');
        game.load.image('anchor', 'img/sprites/anchor.png');
        game.load.image('light-sand-particle', 'img/light-sand-particle.png');
        game.load.image('hourglass', 'img/sprites/hourglass.png');
        game.load.image('grad5', 'img/sprites/gradient5.png');
        game.load.image('grad1', 'img/sprites/gradient1.png');
        game.load.image('grad2', 'img/sprites/gradient2.png');
        game.load.image('grad3', 'img/sprites/gradient3.png');
        game.load.spritesheet('swayblue', 'img/sprites/swayblue.png', 150, 150);
        game.load.spritesheet('sway', 'img/sprites/sway.png', 150, 150);
        game.load.spritesheet('cactus_dance', 'img/sprites/cactus_dance.png', 140, 150);
        game.load.spritesheet('cactus_fall', 'img/sprites/cactus_fall.png', 128, 149);
        game.load.spritesheet('outofsand', 'img/sprites/outofsand.png', 150, 150);
        game.load.spritesheet('bug', 'img/sprites/bug.png', 120, 120);
        game.load.spritesheet('left', 'img/sprites/titleleft.png', 231, 355);
        game.load.spritesheet('right', 'img/sprites/titleright.png', 231, 355);
        game.load.spritesheet('middle', 'img/sprites/titlemid.png', 211, 186);
        game.load.audio('hit_chest','audio/anchor_hit_chest.ogg');
        game.load.audio('hit_glass','audio/anchor_hit_glass.ogg');
        game.load.audio('hit_ground','audio/anchor_hit_ground.ogg');
        game.load.audio('bury_chest','audio/bury_chest.ogg');
        game.load.audio('anchor_fall','audio/falling_anchor.ogg');
        game.load.audio('whoosh', 'audio/hourglass_flip_whoosh.ogg');
        game.load.audio('jojoba_voice', 'audio/jojoba_voice.ogg');
        game.load.audio('cholla_voice', 'audio/cholla_voice.ogg');
        game.load.audio('orange', 'audio/orange_music.ogg');
        game.load.audio('purple', 'audio/purple_music.ogg');
        game.load.audio('bug_bad', 'audio/bug_bad.ogg');
    }

    create() {
        game.sfx = {
            hit_chest: game.add.sound('hit_chest', 0.2),
            hit_glass: game.add.sound('hit_glass', 1),
            hit_ground: game.add.sound('hit_ground', 1),
            bury: game.add.sound('bury_chest', 1),
            fall: game.add.sound('anchor_fall', 1),
            whoosh: game.add.sound('whoosh', 2),
            jojoba_voice: game.add.sound('jojoba_voice', 0.3),
            cholla_voice: game.add.sound('cholla_voice', 0.3),
            orange: game.add.sound('orange'),
            purple: game.add.sound('purple'),
            bug_bad: game.add.sound('bug_bad', 1)
        };
        game.state.start('title');
    }
}
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
        game.load.image('chest', 'img/chest.png');
        game.load.image('anchor', 'img/anchor.png');
        game.load.image('hourglass', 'img/hourglass.png');
        game.load.image('game-bg', 'img/game-bg.png');
        game.load.image('title-bg', 'img/title-bg.png');
        game.load.image('logo', 'img/logo.png');
        game.load.image('player1', 'img/player1.png');
        game.load.image('player2', 'img/player2.png');
        game.load.image('press', 'img/press.png');
        game.load.image('ready', 'img/ready.png');
        game.load.image('tutorial-1', 'img/tutorial-1.png');
        game.load.image('tutorial-2', 'img/tutorial-2.png');
        game.load.image('tutorial-3', 'img/tutorial-3.png');
        

        game.load.spritesheet('w', 'img/w.png', 80, 74);
        game.load.spritesheet('a', 'img/a.png', 80, 74);
        game.load.spritesheet('s', 'img/s.png', 80, 74);
        game.load.spritesheet('d', 'img/d.png', 80, 74);
        game.load.spritesheet('i', 'img/i.png', 80, 74);
        game.load.spritesheet('j', 'img/j.png', 80, 74);
        game.load.spritesheet('k', 'img/k.png', 80, 74);
        game.load.spritesheet('l', 'img/l.png', 80, 74);
        game.load.spritesheet('play', 'img/play.png', 140, 76);
        game.load.spritesheet('play-again', 'img/play-again.png', 326, 76);
        game.load.spritesheet('winner', 'img/winner.png', 502, 60);

        game.load.spritesheet('sway', 'img/sway-green.png', 150, 150);
        game.load.spritesheet('swayblue', 'img/sway-blue.png', 150, 150);
        game.load.spritesheet('cactus-dance', 'img/cactus-dance.png', 140, 150);
        game.load.spritesheet('cactus-fall', 'img/cactus-fall.png', 128, 149);
        game.load.spritesheet('chest-bury', 'img/chest-bury.png', 150, 150);
        game.load.spritesheet('bug', 'img/bug.png', 120, 120);
        game.load.spritesheet('left', 'img/title-left.png', 231, 355);
        game.load.spritesheet('right', 'img/title-right.png', 231, 355);

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
        game.load.audio('titlemusic', 'audio/title_music.ogg');
    }

    create() {
        let data = localStorage.getItem('our_glass_data');
        if (false) {
            data = JSON.parse(data);
        } else {
            data = {tutorial: true};
            localStorage.setItem('our_glass_data', JSON.stringify(data))
        }

        game.tutorial = data.tutorial;

        game.sfx = {
            hit_chest: game.add.sound('hit_chest', 0.2),
            hit_glass: game.add.sound('hit_glass', 1),
            hit_ground: game.add.sound('hit_ground', 1),
            bury: game.add.sound('bury_chest', 1),
            fall: game.add.sound('anchor_fall', 1),
            whoosh: game.add.sound('whoosh', 2),
            jojoba_voice: game.add.sound('jojoba_voice', 0.5),
            cholla_voice: game.add.sound('cholla_voice', 0.5),
            orange: game.add.sound('orange', 1),
            purple: game.add.sound('purple', 1),
            bug_bad: game.add.sound('bug_bad', 1),
            title: game.add.sound('titlemusic', 1)
        };
        game.state.start('title');
    }
}
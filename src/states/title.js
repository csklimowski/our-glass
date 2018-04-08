import game from '../game';

export class TitleState extends Phaser.State{
    preload() {

    }

    create() {
        game.add.image(0, 0, 'grad1');

        new TitleLeft();
        new TitleRight();
        new TitleMiddle();

        let text = game.add.text(game.width/2, game.height/2, "Play", { font: 'normal 40px Serif', fill: '#FFFFFF' });
        text.inputEnabled = true;
        text.anchor.set(0.5);
        text.events.onInputDown.add(function() {
            game.tutorial = false;
            game.state.start('main');
        });

        let control = game.add.text(game.width/2, game.height/2+100, "Controls", { font: 'normal 40px Serif', fill: '#FFFFFF' });
        control.inputEnabled = true;
        control.anchor.set(0.5);
        control.events.onInputDown.add(function() {
            game.state.start('control');
        });

        let tutorial = game.add.text(game.width/2, game.height/2+50, "Tutorial", { font: 'normal 40px Serif', fill: '#fff'});
        tutorial.inputEnabled = true;
        tutorial.anchor.set(0.5);
        tutorial.events.onInputDown.add(function() {
            game.tutorial = true;
            game.state.start('main');
        });

        game.sfx.title.play('', 0, 1, true);
    }
}

class TitleLeft extends Phaser.Sprite{
    constructor(){
        super(game, 0, 0, 'left');
        game.add.existing(this);

        this.scale.set(1.25);
        this.anchor.set(0.5, 1);

        this.x = 130;
        this.y = game.height;

        this.animations.add('left', _.range(60), 30, true);
        this.animations.play('left');
    }
}

class TitleRight extends Phaser.Sprite{
    constructor(){
        super(game, 0, 0, 'right');
        game.add.existing(this);

        this.scale.set(1.25);
        this.anchor.set(0.5, 1);

        this.x = game.width - 130;
        this.y = game.height;

        this.animations.add('right', _.range(60), 30, true);
        this.animations.play('right');
    }
}

class TitleMiddle extends Phaser.Sprite{
    constructor(){
        super(game, 0, 0, 'middle');
        game.add.existing(this);

        this.scale.set(2);
        this.anchor.set(0.5);

        this.x = game.width/2;
        this.y = 150;

        this.animations.add('middle', _.range(60), 30, true);
        this.animations.play('middle');
    }
}
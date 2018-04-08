import game from '../game';

export class TitleState extends Phaser.State{
    preload() {

    }

    create() {
        game.state.backgroundColor = 0x000000;

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

    }
}
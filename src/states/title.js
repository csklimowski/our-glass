import game from '../game';

export class TitleState extends Phaser.State{
    preload() {

    }

    create() {
        game.state.backgroundColor = 0x000000;

        let text = game.add.text(game.width/2, game.height/2, "Start Game", { font: 'normal 40px Serif', fill: '#FFFFFF' });
        text.inputEnabled = true;
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.events.onInputDown.add(function() {
            game.state.start('main');
        });

        let control = game.add.text(game.width/2, game.height/2+50, "Controls", { font: 'normal 40px Serif', fill: '#FFFFFF' });
        control.inputEnabled = true;
        control.anchor.x = 0.5;
        control.anchor.y = 0.5;
        control.events.onInputDown.add(function() {
            game.state.start('control');
        });

    }
}
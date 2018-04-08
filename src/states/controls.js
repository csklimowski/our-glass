import game from '../game';

export class ControlState extends Phaser.State {

    preload() {

    }

    create() {
        game.state.backgroundColor = 0x000000;
        
        let text = game.add.text(game.width/2, game.height/2, "W or UpArrow: Up\nA or LeftArrow: Left\nS or DownArrow: Down\nD or RightArrow: Right\n Q or /: Drop Anchor", { font: 'normal 40px Serif', fill: '#FFFFFF' });
        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.align = 'center';

        let back = game.add.text(game.width, game.height,"Back", { font: 'normal 40px Serif', fill: '#FFFFFF' });
        back.anchor.x = 1;
        back.anchor.y = 1;
        back.inputEnabled = true;
        back.events.onInputDown.add(function(){
            game.state.start('title');
        });
    }
}
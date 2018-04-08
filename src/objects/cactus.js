import game from '../game';
import { glassWidth, glassHeight, sandPos } from '../util/math';

export class Cactus extends Phaser.Sprite {
    constructor(){
        super(game, 0, 0, 'cactus');
        game.add.existing(this);

        this.scale.set(.25);
        
        this.x = (game.width/2 - 400) + Math.random() * 800;
        this.y = (game.height/2 - 400) + Math.random() * 800;
    }

    update() { 
        
    }
}
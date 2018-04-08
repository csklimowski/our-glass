import game from '../game';
import { glassWidth, glassHeight, sandPos } from '../util/math';

export class Cactus extends Phaser.Sprite {
    constructor(){
        super(game, 0, 0, 'cactus');
        game.add.existing(this);

        this.scale.set(.2);
        this.anchor.set(0.5, 1);

        let a = glassWidth(game.timer);
        let b = glassHeight(game.timer);
        
        this.x = (game.width/2 - a) + Math.random() * (a * 2);
        this.y = sandPos(game.timer) - (b/2) + Math.random() * (b * 2);

        let angleToCenter = Math.atan2(this.y, this.x);
        let r = (a*b)/Math.sqrt(a*a*Math.sin(angleToCenter)*Math.sin(angleToCenter) + b*b*Math.cos(b)*Math.cos(b));
        let linelength = Math.sqrt((x-a)*(x-a) + (y-b)*(y-b));
        if(lineLength > r) {
            
        }


        // let sandRadius = glassWidth(game.timer);
        // let distFromCenter = Math.sqrt(this.x*this.x + this.y*this.y);
        // if (distFromCenter > sandRadius) {
        //     let angleToCenter = Math.atan2(this.y, this.x);
        //     this.y = Math.sin(angleToCenter)*sandRadius;
        //     this.x = Math.cos(angleToCenter)*sandRadius;
        // }
        
    }

    update() { 

    }
}
import game from '../game';
import { glassWidth, glassHeight, sandPos } from '../util/math';

export class Cactus extends Phaser.Sprite {
    constructor(disappear){
        super(game, 0, 0, 'cactus');
		game.add.existing(this);

        this.d = disappear;
        this.anchor.set(0.5, 1);
        
        this.animations.add('cactus',  _.range(60), 30, true);
        this.animations.play('cactus');

        this.angleToCenter = Math.random()*2*Math.PI;
        this.p = Math.random();
        let distFromCenter = this.p*glassWidth(game.timer);
        this.py = Math.sin(this.angleToCenter)*distFromCenter;
        this.px = Math.cos(this.angleToCenter)*distFromCenter;
        this.y = sandPos(game.timer) + this.py *.25;
        this.x = game.width/2 + this.px;

        this.scale.set(0.8 * this.y/game.height, 0.5 * this.y/game.height);
    }

    update() { 
        let distFromCenter = this.p*glassWidth(game.timer);
        this.py = Math.sin(this.angleToCenter)*distFromCenter;
        this.px = Math.cos(this.angleToCenter)*distFromCenter;
        this.y = sandPos(game.timer) + this.py *.25;
        this.x = game.width/2 + this.px;

        this.scale.set(0.8 * this.y/game.height, 0.5 * this.y/game.height);

        if (game.timer > this.d) {
            this.alpha = 0;
        } else {
            this.alpha = 1;
        }
    }

}
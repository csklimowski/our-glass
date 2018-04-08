import game from '../game';
import { glassWidth, glassHeight, sandPos } from '../util/math';

export class Cactus extends Phaser.Sprite {
    constructor(disappear){
        super(game, 0, 0, 'cactus');

        this.d = disappear;
        this.anchor.set(0.5, 1);

        let a = glassWidth(game.timer);
        let b = glassHeight(game.timer);

        this.angleToCenter = Math.random()*2*Math.PI;
        this.p = Math.random();
        let distFromCenter = this.p*glassWidth(game.timer);
        this.py = Math.sin(this.angleToCenter)*distFromCenter;
        this.px = Math.cos(this.angleToCenter)*distFromCenter;
        this.y = sandPos(game.timer) + this.py *.25;
        this.x = game.width/2 + this.px;

        this.scale.set(.25 * this.y/game.height);
    }

    update() { 
        let distFromCenter = this.p*glassWidth(game.timer);
        this.py = Math.sin(this.angleToCenter)*distFromCenter;
        this.px = Math.cos(this.angleToCenter)*distFromCenter;
        this.y = sandPos(game.timer) + this.py *.25;
        this.x = game.width/2 + this.px;

        if(this.d >= glassWidth(game.timer)) {
            this.destroy();
        }
    }

}
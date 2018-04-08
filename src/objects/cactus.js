import game from '../game';
import { glassWidth, glassHeight, sandPos } from '../util/math';

export class Cactus extends Phaser.Sprite {
    constructor(disappear){
        super(game, 0, 0, 'cactus_dance');
        game.add.existing(this);
        
        this.animations.add('dance', _.range(60), 30, true);
        this.animations.add('fall', _.range(10, 29).reverse(), 30, false);
        this.animations.play('dance');
        this.standing = true;

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

        this.scale.set(.65 * this.y/game.height);
    }

    update() { 
        let distFromCenter = this.p*glassWidth(game.timer);
        this.py = Math.sin(this.angleToCenter)*distFromCenter;
        this.px = Math.cos(this.angleToCenter)*distFromCenter;
        this.y = sandPos(game.timer) + this.py *.25;
        this.x = game.width/2 + this.px;

        this.scale.set(.65 + 0.0005*this.py);

        if (game.timer > this.d) {
            if (this.standing) {
                this.loadTexture('cactus_fall');
                this.animations.play('fall');
                this.standing = false;
            }
        } else {
            if (!this.standing) {
                this.loadTexture('cactus_dance');
                this.animations.play('dance');
                this.standing = true;
            }
        }
    }

}
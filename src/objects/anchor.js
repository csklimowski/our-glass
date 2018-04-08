import game from '../game';
import { glassWidth, glassHeight, sandPos } from '../util/math';

const FLYING = 0;
const DROPPING = 1;
const DROPPED = 2;
const RISING = 3;

export class Anchor extends Phaser.Sprite {
    constructor(hider) {
        super(game, 0, 0, 'anchor');
        this.shadow = game.add.graphics(0, 0);
        game.add.existing(this);

        let particles = game.add.emitter();
		particles.makeParticles('sand-particle');
		particles.width = 60;
		particles.height = 10;
		particles.minParticleScale = 0.5;
		particles.maxParticleScale = 1.2;
		particles.setXSpeed(-40, 40);
        particles.setYSpeed(-200, -300);
        particles.gravity = 700;
        this.exploder = particles;

        let lizard = game.add.sprite(0, 0, 'sway');
        lizard.animations.add('sway', _.range(60), 30, true);
        lizard.animations.play('sway');
        lizard.anchor.set(0.9, 1);
        this.addChild(lizard);
        this.lizard = lizard;
        
        this.x  = 0; // position to draw
        this.y  = 0; 
        
        this.px = 0; // actual position
        this.py = 0;
        
        this.vx = 0; // velocity
        this.vy = 0;
        
        this.ax = 0; // acceleration
        this.ay = 0;
        
        this.tx = 0; // target to follow
        this.ty = 0;

        this.altitude = 200;
        this.speed = 400;
        this.hider = hider;
        this.state = FLYING;

        this.anchor.set(0.5, 1);

        this.keys = {
            up: game.input.keyboard.addKey(Phaser.KeyCode.UP),
            left: game.input.keyboard.addKey(Phaser.KeyCode.LEFT),
            down: game.input.keyboard.addKey(Phaser.KeyCode.DOWN),
            right: game.input.keyboard.addKey(Phaser.KeyCode.RIGHT),
            drop: game.input.keyboard.addKey(Phaser.KeyCode.SHIFT)
        };

        this.keys.drop.onDown.add(this.dropAnchor, this);
    }

    update() {
        let dt = game.time.elapsedMS / 1000;

        // controls
        if (this.state == FLYING || this.state == RISING) {
            if (this.keys.left.isDown && this.keys.right.isDown) {
                this.tx = 0;
            } else if (this.keys.left.isDown) {
                this.tx = -1;
            } else if (this.keys.right.isDown) {
                this.tx = 1;
            } else {
                this.tx = 0;
            }
            if (this.keys.up.isDown && this.keys.down.isDown) {
                this.ty = 0;
            } else if (this.keys.up.isDown) {
                this.ty = -1;
            } else if (this.keys.down.isDown) {
                this.ty = 1;
            } else {
                this.ty = 0;
            }
        } else {
            this.tx = 0;
            this.ty = 0;
        }

        // normalize acceleration
        let mag = Math.sqrt(this.tx*this.tx + this.ty*this.ty);
        if (mag == 0) {
            this.ax = 0;
            this.ay = 0;
        } else {
            this.ax = (this.tx / mag)*this.speed;
            this.ay = (this.ty / mag)*this.speed;
        }
        // accelerate smoothly
        this.vx += 10*(this.ax - this.vx)*dt;
        this.vy += 10*(this.ay - this.vy)*dt;
        // update real position
        this.px += this.vx*dt;
        this.py += this.vy*dt;
        this.scale.set(1 + 0.0002*this.py);
        // boundaries
        let distFromCenter = Math.sqrt(this.px*this.px + this.py*this.py);
        if (distFromCenter > 400) {
            let angleToCenter = Math.atan2(this.py, this.px);
            this.py = Math.sin(angleToCenter)*400;
            this.px = Math.cos(angleToCenter)*400;
        }
        // add sway
        if (this.state == RISING || this.state == FLYING) {
            this.rotation = 0.1*Math.cos((game.time.now / 1000)*Math.PI);
            this.px += Math.sin((game.time.now/1000)*Math.PI);
        }
        // update sprite position
        this.x = game.width/2 + this.px;
        this.y = this.altitude + this.py*0.25;
        // draw shadow
        this.shadow.clear();
        if (distFromCenter < glassWidth(game.timer)) {
            let shadowWidth = 60 - 0.1*(sandPos(game.timer) - this.y);
            this.shadow.x = this.x;
            this.shadow.y = sandPos(game.timer) + this.py*0.25;
            this.shadow.beginFill(0x000000, 0.3);
            this.shadow.drawEllipse(0, 0, shadowWidth, 0.25*shadowWidth);
        }

        // dropping/rising behavior
        if (this.state == DROPPED) {
            this.altitude = sandPos(game.timer);
        }
        if (this.state == RISING) {
            this.altitude = Math.max(this.altitude - 500*dt, 200)
            if (this.altitude == 200) {
                this.state = FLYING;
            }
        }
        if (this.state == DROPPING) {
            this.altitude = Math.min(this.altitude + 1000*dt, sandPos(game.timer));
            if (this.altitude == sandPos(game.timer)) {
                this.exploder.x = this.x;
                this.exploder.y = this.y; 
                if (distFromCenter < glassWidth(game.timer)) {
                    this.exploder.start(true, 800, null, 20);
                    this.state = DROPPED;
                    game.time.events.add(1000, function() {
                        this.state = RISING;
                    }, this);
                } else {
                    this.state = RISING;
                }
            }
        }
    }

    dropAnchor() {
        if (this.state == FLYING) {
            this.state = DROPPING;
        }
    }

    destroy() {
        this.shadow.destroy();
        super.destroy();
    }
}
import game from '../game';
import { glassWidth, glassHeight, sandPos } from '../util/math';

export const MOVING = 0;
export const FOUND = 1;

export class Hider extends Phaser.Sprite {
    constructor() {
        super(game, 0, 0, 'chest-bury', 19);
        game.add.existing(this);

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

        this.speed = 200;
        this.state = MOVING;

        this.anchor.set(0.5);

        let particles = game.add.emitter();
		particles.makeParticles('sand-particle');
		particles.width = 15;
		particles.height = 5;
		particles.minParticleScale = 0.5;
		particles.maxParticleScale = 1.2;
		particles.setXSpeed(-20, 20);
		particles.setYSpeed(-50, -30);
		particles.gravity = 400;
		particles.start(false, 300, 70);
        this.particles = particles;
    }

    update() {
        let dt = game.time.elapsedMS / 1000;
        // normalize acceleration
        let mag = Math.sqrt(this.tx*this.tx + this.ty*this.ty);
        if (mag == 0) {
            this.ax = 0;
            this.ay = 0;
            this.particles.on = false;
        } else {
            this.particles.on = true;
            this.ax = (this.tx / mag)*this.speed;
            this.ay = (this.ty / mag)*this.speed;
        }
        // accelerate smoothly
        this.vx += 10*(this.ax - this.vx)*dt;
        this.vy += 10*(this.ay - this.vy)*dt;
        // update real position
        this.px += this.vx*dt;
        this.py += this.vy*dt;
        // boundaries
        let sandRadius = glassWidth(game.timer);
        let distFromCenter = Math.sqrt(this.px*this.px + this.py*this.py);
        if (distFromCenter > sandRadius) {
            let angleToCenter = Math.atan2(this.py, this.px);
            this.py = Math.sin(angleToCenter)*sandRadius;
            this.px = Math.cos(angleToCenter)*sandRadius;
        }
        // update sprite position
        this.x = game.width/2 + this.px;
        this.y = sandPos(game.timer) + this.py*0.25;
        // update particle position
        this.particles.x = this.x;
        this.particles.y = sandPos(game.timer) + this.py*0.25;
    }
}

export class WanderingHider extends Hider {
    constructor() {
        super();
        // pick random position
        let angleToCenter = Math.random()*2*Math.PI;
        let distFromCenter = Math.random()*glassWidth(game.timer);
        this.py = Math.sin(angleToCenter)*distFromCenter;
        this.px = Math.cos(angleToCenter)*distFromCenter;
        // pick random starting angle
        let targetAngle = Math.random()*2*Math.PI;
        this.ty = Math.sin(targetAngle);
        this.tx = Math.cos(targetAngle);
        // pick random lifespan
        this.lifetime = 0.5 + Math.random()*2;
    }

    update() {
        let dt = game.time.elapsedMS / 1000;

        this.lifetime -= dt;
        if (this.lifetime < 0) {
            // die completely
            this.particles.destroy();
            this.destroy();
        } else if (this.lifetime < 0.3) {
            // stop moving before death to let particles finish
            this.tx = 0;
            this.ty = 0;
        } else {
            // change target position randomly and polar-ly
            let targetAngle = Math.atan2(this.ty, this.tx);
            targetAngle += (Math.random()*10*Math.PI - 5*Math.PI)*dt;
            // avoid boundaries
            let futureDist = Math.sqrt((this.px+this.vx)*(this.px+this.vx) + (this.py+this.vy)*(this.py+this.vy));
            let sandRadius = glassWidth(game.timer);
            if (sandRadius - futureDist < -120) {
                targetAngle += Math.PI;
            }

            this.ty = Math.sin(targetAngle);
            this.tx = Math.cos(targetAngle);
        }

        super.update();
    }
}

export class ControlledHider extends Hider {
    constructor() {
        super();

        this.keys = {
            up: game.input.keyboard.addKey(Phaser.KeyCode.W),
            left: game.input.keyboard.addKey(Phaser.KeyCode.A),
            down: game.input.keyboard.addKey(Phaser.KeyCode.S),
            right: game.input.keyboard.addKey(Phaser.KeyCode.D)
        };

        this.stillClock = 3;
        this.appeared = false;

        this.animations.add('appear', _.range(14, 20).reverse(), 20, false);
        this.animations.add('disappear', _.range(14, 20), 20, false);
        this.animations.add('bury', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].concat(_.range(20)), 30, false);
        if (game.tutorial) {
            this.animations.play('bury');
        }
    }

    update() {
        
        let dt = game.time.elapsedMS / 1000;

        if (this.state == MOVING) {
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
            
            if (this.tx == 0 && this.ty == 0) {
                this.stillClock -= dt;
                if (this.stillClock < 0 && !this.appeared) {
                    this.animations.play('appear');
                    this.appeared = true;
                }
            } else {
                if (this.appeared) {
                    this.animations.play('disappear');
                    this.appeared = false;
                }
                this.stillClock = 3;
            }

        } else {
            this.stillClock = 3;
            this.tx = 0;
            this.ty = 0;
        }

        super.update();
    }
}
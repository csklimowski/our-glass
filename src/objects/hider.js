import game from '../game';
import { glassWidth, glassHeight, sandPos } from '../util/math';

export class Hider extends Phaser.Sprite {
    constructor() {
        super(game, 0, 0, 'chest');
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

        this.scale.set(0.5);

        this.speed = 200;

        this.anchor.set(0.5);

        let particles = game.add.emitter(0, 0);
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
        this.y = game.height/2 + this.py;
        // update particle position
        this.particles.x = this.x;
        this.particles.y = sandPos(game.timer) + this.py*0.25;
    }
}

export class WanderingHider extends Hider {
    constructor() {
        super();
    }

    update() {
        
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
    }

    update() {
        game.debug.text(Math.cos((this.px/glassWidth(game.timer)) * (Math.PI/2))*glassWidth(game.timer), 100, 100);
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

        super.update();
    }
}
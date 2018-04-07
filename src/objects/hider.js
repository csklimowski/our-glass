import game from '../game';

export class Hider extends Phaser.Sprite {
    constructor() {
        super(game, 0, 0);
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;

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
}
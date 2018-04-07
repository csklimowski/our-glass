import game from '../game';

export class MainState extends Phaser.State {
	preload() {
		game.load.image('sand-particle', 'img/sand-particle.png');
	}
	
	create() {
		game.stage.backgroundColor = 0x55aaee;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.windowConstraints.bottom = 'layout';
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;

		this.graphics = game.add.graphics(0, 0);

		this.timer = 0;
		this.hider = {
			x: 0,
			y: 0,
			vx: 0,
			vy: 0
		};
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
		this.hider.particles = particles;

		this.sand = {
			x: game.width/2,
			y: game.height/2,
			width: 500,
			height: 75,
			color: 0xfddf77,
			shadeColor: 0xecce66
		};

	}

	update() {
		let dt = game.time.elapsedMS / 1000;
		this.timer += dt / 30;

		let h = this.hider;
		h.x = 0.5*Math.cos(game.time.now/1000);
		h.y = 0.5*Math.sin(game.time.now/1000);

		

		let s = this.sand;
		s.width = 200*(Math.cos(this.timer*2.5) + 1.15);
		s.height = 50*(Math.cos(this.timer*2.5) + 1.15);
		s.y = 350 + this.timer*400;

		h.particles.x = s.x + h.x*(s.width);
		h.particles.y = s.y + h.y*(s.height);
		
		// draw everything
		let g = this.graphics;
		g.clear();
		g.beginFill(s.shadeColor);
		for (let t = this.timer; t < 1; t += 0.05) {
			g.drawEllipse(game.width/2, 350 + t*400, 200*(Math.cos(t*2.5) + 1.15), 50*(Math.cos(t*2.5) + 1.15));
		}
		g.beginFill(s.color);
		g.drawEllipse(s.x, s.y, s.width, s.height);
	}
}
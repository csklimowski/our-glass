import game from '../game';
import { Hider, ControlledHider, WanderingHider } from '../objects/hider';
import { Sand } from '../objects/sand';
import { Cactus } from '../objects/cactus';
import { glassWidth, glassHeight, sandPos } from '../util/math';

export class MainState extends Phaser.State {

	create() {
        game.stage.backgroundColor = 0x55aaee;
		this.graphics = game.add.graphics(0, 0);
		game.timer = 0.4;
		this.sand = new Sand();
		this.hider = new ControlledHider();
		new WanderingHider();
		this.cacti = [ new Cactus(100) , new Cactus(250) , new Cactus(400) ];
		this.spawnClock = Math.random();
		for(let i = 0; i < 3; i++) {
			for(let j = i + 1; j < 3; j++)
			{
				if(this.cacti[i].y > this.cacti[j].y){
					let temp = this.cacti[i];
					this.cacti[i] = this.cacti[j];
					this.cacti[j] = temp;
				}
			}
		}
		for(let i = 0; i < 3; i++) {
			game.add.existing(this.cacti[i]);
		}
	}

	update() {
		let dt = game.time.elapsedMS / 1000;
		game.timer += dt / 40;

		this.spawnClock -= dt;
		if (this.spawnClock < 0) {
			new WanderingHider();
			this.spawnClock = 0.5 + Math.random()*0.5;
		}


		// let h = this.hider;
		// let s = this.sand;
		// h.x = 0.5*Math.cos(game.time.now/1000);
		// h.y = 0.5*Math.sin(game.time.now/1000);

		// h.particles.x = s.ellipse.x + h.x*(s.ellipse.width);
		// h.particles.y = s.ellipse.y + h.y*(s.ellipse.height);
	}
}

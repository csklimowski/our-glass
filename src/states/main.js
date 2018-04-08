import game from '../game';
import { Hider, ControlledHider, WanderingHider } from '../objects/hider';
import { Sand } from '../objects/sand';
import { Cactus } from '../objects/cactus';
import { glassWidth, glassHeight, sandPos } from '../util/math';

export class MainState extends Phaser.State {

	create() {
        game.stage.backgroundColor = 0x55aaee;
		this.graphics = game.add.graphics(0, 0);
		game.timer = 0.5;
		this.sand = new Sand();
		this.hider = new ControlledHider();
		this.cacti = [ new Cactus() , new Cactus() , new Cactus() ];
	}

	update() {
		let dt = game.time.elapsedMS / 1000;
		//game.timer += dt / 30;

		// let h = this.hider;
		// let s = this.sand;
		// h.x = 0.5*Math.cos(game.time.now/1000);
		// h.y = 0.5*Math.sin(game.time.now/1000);

		// h.particles.x = s.ellipse.x + h.x*(s.ellipse.width);
		// h.particles.y = s.ellipse.y + h.y*(s.ellipse.height);
	}
}

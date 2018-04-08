import game from '../game';
import { Hider, ControlledHider, WanderingHider } from '../objects/hider';
import { Anchor } from '../objects/anchor';
import { Sand } from '../objects/sand';
import { Cactus } from '../objects/cactus';
import { glassWidth, glassHeight, sandPos } from '../util/math';

export class MainState extends Phaser.State {

	create() {
        game.stage.backgroundColor = 0x55aaee;
		this.graphics = game.add.graphics(0, 0);
		game.timer = 0.4;

		
		this.group2 = game.add.group();
		this.sand = new Sand();
		this.group2.add(this.sand);
		
		let g = game.add.group();
		this.hider = new ControlledHider();
		g.add(this.hider);
		this.anchor = new Anchor(this.hider);
		g.add(this.anchor);
		g.add(new WanderingHider());
		this.group = g;

		this.cacti = [ new Cactus(100) , new Cactus(250) , new Cactus(400) ];
		this.spawnClock = Math.random();
		for(let i = 0; i < 3; i++) {
			g.add(this.cacti[i]);
		}
		game.world.bringToTop(g);
		g.sort('py', Phaser.Group.SORT_ASCENDING);
	}

	update() {
		let dt = game.time.elapsedMS / 1000;
		game.timer += dt / 40;
		let g = this.group;

		this.spawnClock -= dt;
		if (this.spawnClock < 0) {
			g.add(new WanderingHider());
			this.spawnClock = 1.0 + Math.random()*0.5;
		}

		game.world.bringToTop(g)
		g.sort('py', Phaser.Group.SORT_ASCENDING);
	}
}

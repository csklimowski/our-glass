import game from '../game';
import { Hider, ControlledHider, WanderingHider } from '../objects/hider';
import { Anchor, DROPPING, DROPPED, FLYING, RISING } from '../objects/anchor';
import { Sand } from '../objects/sand';
import { Cactus } from '../objects/cactus';
import { glassWidth, glassHeight, sandPos } from '../util/math';

const PLAYING = 0;
const FLIP1 = 1;
const FLIP2 = 2;

export class MainState extends Phaser.State {

	create() {
        game.stage.backgroundColor = 0x55aaee;
		game.timer = 0.4;

		this.group2 = game.add.group();
		this.sand = new Sand();
		this.group2.add(this.sand);
		this.group2.pivot.set(game.width/2, 1.5*game.height);
		this.group2.x = game.width/2;
		this.group2.y = 1.5*game.height;
		this.tween2 = game.add.tween(this.group2);
		
		let g = game.add.group();
		this.hider = new ControlledHider();
		g.add(this.hider);
		this.anchor = new Anchor(this.onAnchorLand, this);
		g.add(this.anchor);
		g.add(new WanderingHider());
		this.group = g;
		g.pivot.set(game.width/2, 1.5*game.height);
		g.x = game.width/2;
		g.y = 1.5*game.height;
		this.tween1 = game.add.tween(g);

		this.cacti = [ new Cactus(100) , new Cactus(250) , new Cactus(400) ];
		this.spawnClock = Math.random();
		this.state = PLAYING;
		// for(let i = 0; i < 3; i++) {
		// 	for(let j = i + 1; j < 3; j++)
		// 	{
		// 		if(this.cacti[i].y > this.cacti[j].y){
		// 			let temp = this.cacti[i];
		// 			this.cacti[i] = this.cacti[j];
		// 			this.cacti[j] = temp;
		// 		}
		// 	}
		// }
		for(let i = 0; i < 3; i++) {
			game.add.existing(this.cacti[i]);
			g.add(this.cacti[i]);
		}
		game.world.bringToTop(this.group);
		g.sort('py', Phaser.Group.SORT_ASCENDING);
	}

	update() {
		let dt = game.time.elapsedMS / 1000;
		game.timer += dt / 40;

		this.spawnClock -= dt;
		if (this.spawnClock < 0) {
			new WanderingHider();
			this.spawnClock = 1.0 + Math.random()*0.5;
		}

		this.group.sort('py', Phaser.Group.SORT_ASCENDING);

		if (this.state == FLIP1 || this.state == FLIP2) {
			this.group.rotation += Math.PI*dt;
			this.group2.rotation += Math.PI*dt;
		}

		if (this.state == FLIP1 && this.group.rotation > Math.PI/2) {
			this.group.rotation = -Math.PI/2;
			this.group2.rotation = -Math.PI/2;
			this.anchor.altitude = 200;
			this.anchor.state = FLYING;
			game.timer = 1 - game.timer;
			this.state = FLIP2;
		}

		if (this.state == FLIP2 && this.group.rotation >= 0) {
			this.state = PLAYING;
			this.anchor.shadow.on = true;
			this.spawnClock = Math.random();
			this.group.rotation = 0;
			this.group2.rotation = 0;
		}
	}

	onAnchorLand() {
		let distance = Math.sqrt(Math.pow(this.anchor.px - this.hider.px, 2) + Math.pow(this.anchor.py - this.hider.py, 2));
		if (distance < 100) {
			this.spawnClock = 10000;
			game.time.events.add(1000, function() {
				this.anchor.shadow.on = false;
				this.state = FLIP1;
			}, this);
		} else {
			game.time.events.add(1000, function() {
				this.anchor.state = RISING;
			}, this);
		}
	}
}

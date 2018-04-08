import game from '../game';
import { ControlledHider, WanderingHider, MOVING, FOUND } from '../objects/hider';
import { Anchor, DROPPING, DROPPED, FLYING, RISING } from '../objects/anchor';
import { Sand } from '../objects/sand';
import { Cactus } from '../objects/cactus';
import { glassWidth, glassHeight, sandPos } from '../util/math';

const PLAYING = 0;
const FLIP1 = 1;
const FLIP2 = 2;
const VICTORY = 3;

export class MainState extends Phaser.State {

	create() {
        game.stage.backgroundColor = 0x55aaee;
		game.timer = 0.4;
		this.state = PLAYING;

		this.group2 = game.add.group();
		this.sand = new Sand();
		this.group2.add(this.sand);

		this.group2.pivot.set(game.width/2, 1.5*game.height);
		this.group2.x = game.width/2;
		this.group2.y = 1.5*game.height;
		
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

		this.cacti = [ new Cactus(0.5) , new Cactus(0.65) , new Cactus(0.8) ];
		this.spawnClock = Math.random();
		for(let i = 0; i < 3; i++) {
			g.add(this.cacti[i]);
		}
		game.world.bringToTop(g);
		g.sort('py', Phaser.Group.SORT_ASCENDING);

		this.greenOnTop = true;
		let greenDrop = game.input.keyboard.addKey(Phaser.KeyCode.QUESTION_MARK);
		greenDrop.onDown.add(function() {
			if (this.greenOnTop && this.anchor.state == FLYING && this.state != VICTORY) {
				this.anchor.state = DROPPING;
			}
		}, this);
		let blueDrop = game.input.keyboard.addKey(Phaser.KeyCode.Q);
		blueDrop.onDown.add(function() {
			if (!this.greenOnTop && this.anchor.state == FLYING && this.state != VICTORY) {
				this.anchor.state = DROPPING;
			}
		}, this);
	}

	update() {
		let dt = game.time.elapsedMS / 1000;

		if (this.state == VICTORY) {
			game.timer = Math.min(game.timer + dt, 2);
		}
		if (this.state == PLAYING) {
			game.timer += dt / 40;
			if (game.timer > 0.85) {
				this.state = VICTORY;
			}
		}
		
		let g = this.group;
		this.spawnClock -= dt;
		if (this.spawnClock < 0) {
			g.add(new WanderingHider());
			this.spawnClock = 1.0 + Math.random()*0.5;
		}

		game.world.bringToTop(g)
		g.sort('py', Phaser.Group.SORT_ASCENDING);
		this.group.sort('py', Phaser.Group.SORT_ASCENDING);

		if (this.state == FLIP1 || this.state == FLIP2) {
			this.group.rotation += Math.PI*dt;
			this.group2.rotation += Math.PI*dt;
		}

		if (this.state == FLIP1 && this.group.rotation > Math.PI/2) {
			this.group.rotation = -Math.PI/2;
			this.group2.rotation = -Math.PI/2;
			
			game.timer = 1 - game.timer;

			// random new position for player
			let angleToCenter = Math.random()*2*Math.PI;
			let distFromCenter = Math.random()*glassWidth(game.timer);
			this.hider.py = Math.sin(angleToCenter)*distFromCenter;
			this.hider.px = Math.cos(angleToCenter)*distFromCenter;
			this.hider.frame = 19;
			this.hider.appeared = false;

			// swap anchor stuff
			this.anchor.altitude = 200;
			this.anchor.state = FLYING;
			if (this.greenOnTop) {
				this.anchor.lizard.loadTexture('swayblue');
			} else {
				this.anchor.lizard.loadTexture('sway');
			}
			this.greenOnTop = !this.greenOnTop;
			this.anchor.lizard.animations.play('sway');

			let temp = this.anchor.keys;
			this.anchor.keys = this.hider.keys;
			this.hider.keys = temp;

			this.state = FLIP2;
			game.sfx.whoosh.play();
		}

		if (this.state == FLIP2 && this.group.rotation >= 0) {
			this.state = PLAYING;
			this.hider.state = MOVING;
			this.anchor.shadow.on = true;
			this.spawnClock = Math.random();
			this.group.rotation = 0;
			this.group2.rotation = 0;
		}
	}

	onAnchorLand() {
		let distance = Math.sqrt(Math.pow(this.anchor.px - this.hider.px, 2) + Math.pow(this.anchor.py - this.hider.py, 2));
		game.sfx.hit_ground.play();
		if (distance < 100) {
			this.spawnClock = 10000;
			this.hider.state = FOUND;
			game.time.events.add(1000, function() {
				this.anchor.shadow.on = false;
				this.state = FLIP1;
			}, this);
			game.sfx.hit_chest.play();
		} else {
			game.time.events.add(1000, function() {
				this.anchor.state = RISING;
			}, this);
		}
	}
}

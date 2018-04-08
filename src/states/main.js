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
const TUTORIAL = 4;

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
		let wander = new WanderingHider();
		g.add(wander);
		this.group = g;

		this.wanders = game.add.group();
		this.wanders.add(wander);

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

		if (game.tutorial) {
			this.state = TUTORIAL;
			this.tutorial1 = game.add.text(30, 30, 'As a pirate, drop anchor \nto uncover treasure!', {font: 'normal 30px sans-serif', fill: '#000'});
			this.tutorial2 = game.add.text(800, 250, 'As the haunted treasure, keep \nmoving to stay buried and blend \nin with the local wildlife!', {font: 'normal 30px sans-serif', fill: '#000'});
		}

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
				let victoryText = '';
				if (this.greenOnTop) {
					victoryText = 'Captain Cholla wins!';
				} else {
					victoryText = 'Captain Jojoba wins!';
				}
				let victory1 = game.add.text(game.width/2, game.height/2, victoryText, {
					font: 'normal 40px sans-serif', 
					fill: '#000'
				});
				victory1.anchor.set(0.5);

				let victory2 = game.add.text(game.width/2, game.height/2 + 100, 'Play again', {
					font: 'normal 40px sans-serif',
					fill: '#000'
				});
				victory2.anchor.set(0.5);
				victory2.inputEnabled = true;
				victory2.events.onInputDown.add(function() {
					game.tutorial = false;
					game.state.restart();
				});

				let victory3 = game.add.text(game.width/2, game.height/2 + 150, 'Main manu', {
					font: 'normal 40px sans-serif',
					fill: '#000'
				});
				victory3.anchor.set(0.5);
				victory3.inputEnabled = true;
				victory3.events.onInputDown.add(function() {
					game.state.start('title');
				});
			}
		}
		
		let g = this.group;
		this.spawnClock -= dt;
		if (this.spawnClock < 0) {
			let wander = new WanderingHider();
			g.add(wander);
			this.wanders.add(wander);
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
			
			game.timer = 0.85 - game.timer;

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

			if (game.tutorial) {
				if (this.tutorial1.y > 125) {
					this.tutorial1.text = '';
					this.tutorial2.text = '';
				} else {
					this.tutorial1.y = 150;
					this.tutorial1.text = 'If the treasure if caught, \nyour roles are reversed!';
					this.tutorial2.x = 900;
					this.tutorial2.y = 150;
					this.tutorial2.text = 'If the sands of time run \nout, the treasure wins!';
				}
			}

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
		this.anchor.foundSomething = false;
		let distance = Math.sqrt(Math.pow(this.anchor.px - this.hider.px, 2) + Math.pow(this.anchor.py - this.hider.py, 2));
		game.sfx.hit_ground.play();
		if (distance < 100) {
			this.anchor.foundSomething = true;
			this.anchor.whatIFound.loadTexture('chest');
			this.spawnClock = 10000;
			this.hider.state = FOUND;
			this.hider.frame = 19;
			game.time.events.add(1000, function() {
				this.anchor.shadow.on = false;
				this.state = FLIP1;
			}, this);
			game.sfx.hit_chest.play();
		} else {
			for (let w of this.wanders.getAll()) {
				let distance = Math.sqrt(Math.pow(this.anchor.px - w.px, 2) + Math.pow(this.anchor.py - w.py, 2));
				if(distance < 100){
					this.anchor.foundSomething = true;
				}
			}
			game.time.events.add(1000, function() {
				this.anchor.state = RISING;
			}, this);
		}
	}
}

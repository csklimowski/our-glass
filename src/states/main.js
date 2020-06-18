import game from '../game';
import { ControlledHider, WanderingHider, MOVING, FOUND } from '../objects/hider';
import { Anchor, DROPPING, DROPPED, LOWERING, FLYING, RISING } from '../objects/anchor';
import { Sand } from '../objects/sand';
import { Cactus } from '../objects/cactus';
import { glassWidth, glassHeight, sandPos } from '../util/math';

const PLAYING = 0;
const FLIP1 = 1;
const FLIP2 = 2;
const VICTORY = 3;
const TUTORIAL = 4;

const TREASURE = 0;
const ANCHOR = 1;
const SWITCH = 2;
const FINISHED = 3;

export class MainState extends Phaser.State {

	create() {
		game.sfx.title.pause();
        game.stage.backgroundColor = 0x55aaee;
		game.timer = 0.3;
		this.totalTime = 0;

		this.state = PLAYING;
		this.tutorialState = TREASURE;

		game.add.image(0, 0, 'game-bg');

		this.group2 = game.add.group();
		this.sand = new Sand();
		this.group2.add(this.sand);

		this.group2.pivot.set(game.width/2, 1.24*game.height);
		this.group2.x = game.width/2;
		this.group2.y = 1.24*game.height;
		
		let g = game.add.group();
		this.hider = new ControlledHider();
		g.add(this.hider);
		this.anchor = new Anchor(this.onAnchorLand, this);
		g.add(this.anchor);
		let wander = new WanderingHider();
		g.add(wander);
		this.group = g;

		if (!game.tutorial) {
			let angleToCenter = Math.random()*2*Math.PI;
			let distFromCenter = Math.random()*glassWidth(game.timer);
			this.hider.py = Math.sin(angleToCenter)*distFromCenter;
			this.hider.px = Math.cos(angleToCenter)*distFromCenter;
		}


		this.wanders = game.add.group();
		this.wanders.add(wander);
		
		g.pivot.set(game.width/2, 1.24*game.height);
		g.x = game.width/2;
		g.y = 1.24*game.height;
		
		this.cacti = [ new Cactus(0.5) , new Cactus(0.65) , new Cactus(0.8) ];
		this.spawnClock = Math.random();
		for(let i = 0; i < 3; i++) {
			g.add(this.cacti[i]);
		}
		
		this.hourglass = game.add.sprite(game.width/2, 1.24*game.height, 'hourglass');
		this.hourglass.anchor.set(0.5);
		this.hourglass.scale.set(1.4);
		
		this.tutorialStuff = game.add.group();
		if (game.tutorial) {
			this.state = TUTORIAL;
			this.tutorial1 = game.add.image(640, -200, 'tutorial-1');
			this.tutorial1.anchor.set(0.5);
			this.tutorial1.dy = 180;
			this.tutorial2 = game.add.image(640, 920, 'tutorial-2');
			this.tutorial2.anchor.set(0.5);
			this.tutorial2.dy = 920;
			this.tutorial3 = game.add.image(-600, 360, 'tutorial-3');
			this.tutorial3.anchor.set(0.5); 
			this.tutorial3.dx = -600;
			this.tutorialStuff.add(this.tutorial1);
			this.tutorialStuff.add(this.tutorial2);
			this.tutorialStuff.add(this.tutorial3);			
			this.anchor.shadow.on = false;
			this.anchor.altitude = -200;
			game.timer = 0.4;
		}

		this.greenOnTop = false;

		let drop = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
		drop.onDown.add(function() {
			if (this.state == TUTORIAL && this.tutorialState == TREASURE) return;
			if (this.anchor.state == FLYING && this.state != VICTORY) {
				this.anchor.state = DROPPING;
				if (this.tutorialState == ANCHOR) {
					this.tutorial2.dy = 920;
				}
			}
		}, this);

		game.sfx.orange.play('', 0, 0, true);
		game.sfx.purple.play('', 0, 1, true);
	}

	update() {
		let dt = game.time.elapsedMS / 1000;

		this.totalTime += dt;

		if (this.state == VICTORY) {
			game.timer = Math.min(game.timer + dt, 2);
		}
		if (this.state == PLAYING) {
			game.timer += (dt / 40) + (this.totalTime / 150000);
			if (game.timer > 0.85) {
				this.state = VICTORY;
				this.anchor.state = RISING;

				if (game.tutorial) {
					this.tutorial3.dx = -600;
					localStorage.setItem('our_glass_data', JSON.stringify({
						tutorial: false
					}));
				}

				let victoryText = game.add.image(370, 250, 'winner');
				this.tutorialStuff.add(victoryText);
				if (this.greenOnTop) {
					victoryText.frame = 1;
				} else {
					victoryText.frame = 0;
				}

				game.add.button(460, 400, 'play-again', function() {
					game.tutorial = false;
					game.state.restart();
				}, this, 1, 0);
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
		game.world.bringToTop(this.tutorialStuff);
		g.sort('py', Phaser.Group.SORT_ASCENDING);

		if (this.state == FLIP1 || this.state == FLIP2) {
			this.hourglass.rotation += Math.PI*dt;
			this.group.rotation += Math.PI*dt;
			this.group2.rotation += Math.PI*dt;
		}

		if (this.state == FLIP1 && this.group.rotation > Math.PI/2) {
			this.group.rotation = -Math.PI/2;
			this.group2.rotation = -Math.PI/2;
			this.hourglass.rotation = -Math.PI/2;
			
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

			this.state = FLIP2;
			game.sfx.whoosh.play();
			if(this.greenOnTop) {
				game.sfx.purple.fadeOut(1000);
				game.sfx.orange.fadeIn(1000, true);
			} else {
				game.sfx.orange.fadeOut(1000);
				game.sfx.purple.fadeIn(1000, true);
			}
		}

		if (this.state == FLIP2 && this.group.rotation >= 0) {
			if (this.tutorialState == ANCHOR) {
				this.tutorial3.dx = 640;
				this.tutorialState = SWITCH;
				this.totalTime = 0;
			}
			this.state = PLAYING;
			this.hider.state = MOVING;
			this.anchor.shadow.on = true;
			this.spawnClock = Math.random();
			this.group.rotation = 0;
			this.group2.rotation = 0;
			this.hourglass.rotation = 0;
			if (this.greenOnTop) {
				game.sfx.jojoba_voice.play();
			} else {
				game.sfx.cholla_voice.play();
			}
		}

		if (game.tutorial) {
			if (this.tutorialState == TREASURE) {
				if (this.totalTime > 15) {
					this.tutorialState = ANCHOR;
					this.tutorial2.dy = 550;
					this.tutorial1.dy = -200;
					this.anchor.state = LOWERING;
					this.anchor.shadow.on = true;
				}
			}
			if (this.tutorialState == ANCHOR) {
				if (this.totalTime > 25) {
					this.tutorial2.dy = 920;
				}
			}
			this.tutorial1.y += 0.1*(this.tutorial1.dy - this.tutorial1.y);
			this.tutorial2.y += 0.1*(this.tutorial2.dy - this.tutorial2.y);
			this.tutorial3.x += 0.1*(this.tutorial3.dx - this.tutorial3.x);
		}
	}

	onAnchorLand() {
		if (this.state == VICTORY) return;
		this.anchor.foundSomething = false;
		let distance = Math.sqrt(Math.pow(this.anchor.px - this.hider.px, 2) + Math.pow(this.anchor.py - this.hider.py, 2));
		game.sfx.hit_ground.play();
		if (distance < 90) {
			this.anchor.foundSomething = true;
			this.anchor.whatIFound = this.anchor.chest;
			this.spawnClock = 10000;
			this.hider.state = FOUND;
			this.hider.frame = 19;
			game.time.events.add(1000, function() {
				if (this.state != VICTORY) {
					this.anchor.shadow.on = false;
					this.state = FLIP1;
				}
			}, this);
			if (this.tutorialState == SWITCH) {
				this.tutorial3.dx = -600;
				this.tutorialState = FINISHED;
			}
			game.sfx.hit_chest.play();
		} else {
			this.wanders.forEach(function(w) {
				let distance = Math.sqrt(Math.pow(this.anchor.px - w.px, 2) + Math.pow(this.anchor.py - w.py, 2));
				if(distance < 150){
					this.anchor.foundSomething = true;
					this.anchor.whatIFound = this.anchor.bug;
					game.sfx.bug_bad.play();
				}
			}, this);
			game.time.events.add(1000, function() {
				this.anchor.state = RISING;
			}, this);
		}
	}
}

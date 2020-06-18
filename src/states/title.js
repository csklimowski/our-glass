import game from '../game';

export class TitleState extends Phaser.State{
    create() {
        game.add.image(0, 0, 'title-bg');

        this.left = game.add.sprite(350, 500, 'left');
        this.left.anchor.set(0.5);
        this.left.animations.add('left', _.range(60), 30, true);
        this.left.animations.play('left');
        this.left.dx = 350;

        this.right = game.add.sprite(game.width - 350, 500, 'right');
        this.right.anchor.set(0.5);
        this.right.animations.add('right', _.range(60), 30, true);
        this.right.animations.play('right');
        this.right.dx = game.width-350;

        this.logo = game.add.image(game.width/2, 150, 'logo');
        this.logo.anchor.set(0.5);
        this.logo.dy = 150;

        this.credits = game.add.button(game.width/2, 560, 'credits', function() {
            this.left.dx = 200;
            this.right.dx = game.width-200;

            this.play.dy -= 720;
            this.logo.dy -= 720;
            this.credits.dy -= 720;
            this.createdBy.dy -= 720;
            this.back.dy -= 720;
        }, this, 1, 0);
        this.credits.dy = 560;
        this.credits.anchor.set(0.5);

        this.play = game.add.button(game.width/2, 450, 'play', function() {
            this.logo.dy = -200;
            this.leftStart.dx = 350;
            this.rightStart.dx = game.width-350;
            this.play.dy = 900;
            this.credits.dy = 1010;
            this.play.frame = 0;
            
        }, this, 1, 0);
        this.play.dy = 450;
        this.play.anchor.set(0.5);

        this.back = game.add.button(game.width/2, 1350, 'back', function() {
            this.left.dx = 350;
            this.right.dx = game.width - 350;
            this.play.dy += 720;
            this.logo.dy += 720;
            this.credits.dy += 720;
            this.createdBy.dy += 720;
            this.back.dy += 720;
        }, this, 1, 0);
        this.back.dy = 1350,
        this.back.anchor.set(0.5);

        this.createdBy = game.add.image(game.width/2, 1000, 'created-by');
        this.createdBy.anchor.set(0.5);
        this.createdBy.dy = 1000;

        this.player1 = game.add.image(0, 0, 'player1');
        this.player1.anchor.set(0.5);
        this.press1 = game.add.image(-250, 100, 'press');
        this.ready1 = game.add.image(0, -200, 'ready');
        this.ready1.anchor.set(0.5);
        this.w = game.add.image(-60, 85, 'w');
        this.a = game.add.image(20, 85, 'a');
        this.s = game.add.image(80, 85, 's');
        this.d = game.add.image(150, 85, 'd');
        this.leftStart = game.add.group();
        this.leftStart.x = -250;
        this.leftStart.dx = -250;
        this.leftStart.y = 100;
        this.leftStart.add(this.player1);
        this.leftStart.add(this.press1);
        this.leftStart.add(this.ready1);
        this.leftStart.add(this.w);
        this.leftStart.add(this.a);
        this.leftStart.add(this.s);
        this.leftStart.add(this.d);

        this.player2 = game.add.image(0, 0, 'player2');
        this.player2.anchor.set(0.5);
        this.press2 = game.add.image(-230, 100, 'press');
        this.ready2 = game.add.image(0, -200, 'ready');
        this.ready2.anchor.set(0.5);
        this.i = game.add.image(-40, 85, 'i');
        this.j = game.add.image(20, 85, 'j');
        this.k = game.add.image(95, 85, 'k');
        this.l = game.add.image(170, 85, 'l');
        this.rightStart = game.add.group();
        this.rightStart.x = game.width+250;
        this.rightStart.dx = game.width+250;
        this.rightStart.y = 100;
        this.rightStart.add(this.player2);
        this.rightStart.add(this.press2);
        this.rightStart.add(this.ready2);
        this.rightStart.add(this.i);
        this.rightStart.add(this.j);
        this.rightStart.add(this.k);
        this.rightStart.add(this.l);

        game.sfx.title.play('', 0, 1, true);

        game.input.keyboard.addKey(Phaser.KeyCode.W).onDown.add(function() {
            this.pressedLetter.call(this, ['w'])
        }, this);
        game.input.keyboard.addKey(Phaser.KeyCode.A).onDown.add(function() {
            this.pressedLetter.call(this, ['a'])
        }, this);
        game.input.keyboard.addKey(Phaser.KeyCode.S).onDown.add(function() {
            this.pressedLetter.call(this, ['s'])
        }, this);
        game.input.keyboard.addKey(Phaser.KeyCode.D).onDown.add(function() {
            this.pressedLetter.call(this, ['d'])
        }, this);
        game.input.keyboard.addKey(Phaser.KeyCode.I).onDown.add(function() {
            this.pressedLetter.call(this, ['i'])
        }, this);
        game.input.keyboard.addKey(Phaser.KeyCode.J).onDown.add(function() {
            this.pressedLetter.call(this, ['j'])
        }, this);
        game.input.keyboard.addKey(Phaser.KeyCode.K).onDown.add(function() {
            this.pressedLetter.call(this, ['k'])
        }, this);
        game.input.keyboard.addKey(Phaser.KeyCode.L).onDown.add(function() {
            this.pressedLetter.call(this, ['l'])
        }, this);
    }

    pressedLetter(letter) {
        this[letter].frame = 1;

        if (this.w.frame && this.a.frame && this.s.frame && this.d.frame) {
            this.w.y = -200;
            this.a.y = -200;
            this.s.y = -200;
            this.d.y = -200;
            this.press1.y = -200;
            this.ready1.y = 120;
        }

        if (this.i.frame && this.j.frame && this.k.frame && this.l.frame) {
            this.i.y = -200;
            this.j.y = -200;
            this.k.y = -200;
            this.l.y = -200;
            this.press2.y = -200;
            this.ready2.y = 120;
        }

        if (this.w.frame && this.a.frame && this.s.frame && this.d.frame &&
            this.i.frame && this.j.frame && this.k.frame && this.l.frame) {
            
            game.time.events.add(1000, function() {
                game.state.start('main');
            }, this)

        }
    }

    update() {
        let dt = game.time.elapsedMS / 1000;
        

        this.logo.y += 3*(this.logo.dy - this.logo.y)*dt + Math.cos(game.time.time/500);
        this.play.y += 3*(this.play.dy - this.play.y)*dt;
        this.credits.y += 3*(this.credits.dy - this.credits.y)*dt;
        this.leftStart.x += 3*(this.leftStart.dx - this.leftStart.x)*dt;
        this.rightStart.x += 3*(this.rightStart.dx - this.rightStart.x)*dt;
        this.left.x += 3*(this.left.dx - this.left.x)*dt;
        this.right.x += 3*(this.right.dx - this.right.x)*dt;
        this.back.y += 3*(this.back.dy - this.back.y)*dt;
        this.createdBy.y += 3*(this.createdBy.dy - this.createdBy.y)*dt;
    }
}
import game from '../game';
import { glassWidth, glassHeight, sandPos } from '../util/math';

export class Sand extends Phaser.Graphics {
    constructor() {
        super(game, 0, 0);
        game.add.existing(this);

        this.ellipse = {
            x: game.width/2,
            y: 0,
            width: 0,
            height: 0,
            color: 0xfddf77,
            shadeColor: 0xecce66
        }
    }

    update() {
        let e = this.ellipse;
        e.width = glassWidth(game.timer);
		e.height = glassHeight(game.timer);
		e.y = sandPos(game.timer);
		
		this.clear();
		this.beginFill(e.shadeColor);
		for (let t = game.timer; t < 1; t += 0.05) {
			this.drawEllipse(game.width/2, sandPos(t), glassWidth(t), glassHeight(t));
		}
		this.beginFill(e.color);
		this.drawEllipse(e.x, e.y, e.width, e.height);
    }
}
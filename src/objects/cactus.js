import game from '../game';

export class Cactus extends Phaser.Sprite {
    constructor(){
        super(game, 0, 0, 'cactus');

        game.add.existing(this);

        this.x = 0;
        this.y = 0;
    }

    update() {

    }
}
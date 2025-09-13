class GameoverScene extends Phaser.Scene {
    constructor() {
        super('gameoverScene')  ;
    }

    preload() {
        this.load.image('backgroud', 'assets/images/background.png');
        this.load.image('gameoverText', '../assets/images/endGame/gameover.png');
        this.load.image('jogarNovamente', 'assets/images/endGame/jogarNovamente.png')
        this.load.image('menu', 'assets/images/endGame/menu.png')
    }

    create() {
        this.createBackgroud();
    }

    createBackgroud() {
        this.bg = this.add.tileSprite(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            'background'
        );
    }
} 
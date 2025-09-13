class QuemSomos extends Phaser.Scene {
    constructor () {
        super('quemSomos');
        this.scrollSpeed = 1.5;
    }

    preload(){
        this.load.image('background','assets/images/background.png');
    }

    create() {
        this.createBackgroud();
    }

    createBackgroud() {
        this.bgMenu = this.add.tileSprite(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            'background'
        );
    }

     update() {
        // efeito de movimentação do fundo
        this.bgMenu.tilePositionY -= this.scrollSpeed;
    }

}
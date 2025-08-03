class SceneGame extends Phaser.Scene{
    constructor(){
        super('sceneGame');
        this.scrollSpeed = 1;
    }

    preload(){
        this.load.image('background', 'assets/images/background.png');
    }

    create(){
       this.bg = this.add.tileSprite(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            'background'
       );

       this.scale.on('resize', (gameSize) => {
            this.bg.setSize(gameSize.width, gameSize.height);
            this.bg.setPosition(gameSize.width /  2,  gameSize.height / 2);
       });
    }

    update(){
        this.bg.tilePositionY -= this.scrollSpeed;
    }
}
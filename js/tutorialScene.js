class TutorialScene extends Phaser.Scene {
    constructor() {
        super('tutorialScene');
        this.scrollSpeed = 1.5;
    }

    preload() {
        this.load.image('backgroundMenu', 'assets/images/background.png');
        this.load.image('tutorial', 'assets/images/tutorial/tutorial.png');
    }

    create() {
        this.createBackgroud();
        this.createResizeConfig();
        this.createTutorial();
        this.createPlayButton();
    }

    createBackgroud() {
        this.bgMenu = this.add.tileSprite(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            'backgroundMenu'
        );
    }

    createResizeConfig() {
        this.scale.on('resize', (gameSize) => {
            this.bgMenu.setSize(gameSize.width, gameSize.height);
            this.bgMenu.setPosition(gameSize.width /  2,  gameSize.height / 2);
        });
    }

    createTutorial() {
        this.add.image(
            this.scale.width/2,
            this.scale.height/2-60,
            'tutorial'
        ).setScale(0.7);
    }

    createPlayButton() {
        const btnJogar = this.add.image(
            this.scale.width/2,
            this.scale.height/2+270,
            'btnJogar'
        ).setInteractive();

        this.setupPlayButtonAnimation(btnJogar);
        this.setupPlayButtonInteractions(btnJogar);
    }
    
    setupPlayButtonAnimation(button) {
        button.on('pointerover', () => {
            this.applyHoverEffect(button, 1.1);
        });

        button.on('pointerout', () => {
            this.applyHoverEffect(button, 1.0);
        });
    }

    setupPlayButtonInteractions(button) {
        button.on('pointerdown', () => {
            this.startSelectScene();
        });
    }

    applyHoverEffect(element, scale) {
        this.tweens.add({
                targets: element,
                scaleX: scale,
                scaleY: scale,
                duration: 200,
                ease: 'Power2'
            });
    }

    startSelectScene() {
        this.scene.start('selectScene');
    }

    update() {
        // efeito de movimentação do fundo
        this.bgMenu.tilePositionY -= this.scrollSpeed;
    }
}
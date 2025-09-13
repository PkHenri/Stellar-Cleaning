class GameoverScene extends Phaser.Scene {
    constructor() {
        super('gameoverScene')  ;
    }


    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('gameoverText', 'assets/images/endGame/gameover.png');
        this.load.image('jogarNovamente', 'assets/images/endGame/jogarNovamente.png')
        this.load.image('menu', 'assets/images/endGame/menu.png')
    }

    create() {
        this.createBackground();
        this.createResizeConfig();
        this.createGameoverText();
        this.createScoreText();
        this.createReplayButton();
        this.createMenuButton();
    }

    createBackground() {
        this.bg = this.add.tileSprite(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            'background'
        );
    }

    createResizeConfig() {
        this.scale.on('resize', (gameSize) => {
            this.bg.setSize(gameSize.width, gameSize.height);
            this.bg.setPosition(gameSize.width /  2,  gameSize.height / 2);
        });
    }

    createGameoverText() {
        const gameoverText = this.add.image(
            this.scale.width/2,
            this.scale.height/2-120,
            'gameoverText'
        ).setScale(0).setAlpha(0);

        this.applyTextAnimation(gameoverText);
    }

    createScoreText() {
        this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 + 80,
            `Pontuação: ${localStorage.pontuacaoFinal}`,
            window.gameStyles.defaultText
        ).setOrigin(0.5);
    }

    createReplayButton() {
        const jogarNovamente = this.add.image(
            this.scale.width/2,
            this.scale.height/2+190,
            'jogarNovamente'
        ).setInteractive();
        
        this.applyHoverAnimation(jogarNovamente);

        jogarNovamente.on('pointerdown', () => {
            this.scene.start('selectScene');
        });
    }

    createMenuButton() {
        const menu = this.add.image(
            this.scale.width/2, 
            this.scale.height/2+300, 
            'menu'
        ).setInteractive();

        this.applyHoverAnimation(menu);

        menu.on('pointerdown', () => {
            this.scene.start('menuScene');
        });
    }

    applyHoverAnimation(button) {
        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 200,
                ease: 'Power2'
            });
        });

        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scaleX: 1.0,
                scaleY: 1.0,
                duration: 200,
                ease: 'Power2'
            });
        });
    }

    applyTextAnimation(text) {
        this.tweens.add({
            targets: text,
            scaleX: 1.4,
            scaleY: 1.4,
            alpha: 1,
            duration: 600,
            ease: 'Back.easeOut',
            delay: 500,
            onComplete: () => {
                this.tweens.add({
                    targets: text,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    duration: 800,
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1
                });

                this.tweens.add({
                    targets: text,
                    angle: { from: -5, to: 5},
                    duration: 1500,
                    ease: 'Sine.easeInOut',
                    yoyo: true,
                    repeat: -1,
                    delay: 200
                });
            }
        });
    }
} 
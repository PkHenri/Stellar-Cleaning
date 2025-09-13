class VictoryScene extends Phaser.Scene {
    constructor() {
        super('victoryScene');
    }

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('star', 'assets/images/endGame/star.png')
        this.load.image('victoryText', 'assets/images/endGame/vitoria.png');
        this.load.image('jogarNovamente', 'assets/images/endGame/jogarNovamente.png')
        this.load.image('menu', 'assets/images/endGame/menu.png')
    }

    create() {
        this.createBackground();
        this.createResizeConfig();
        this.createStarParticles();
        this.createVictoryText();
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
            this.placarText.setPosition(gameSize.width - 30, 20);
        });
    }

    createStarParticles() {
        this.add.particles(0, 0, 'star', {
        x: { min: 0, max: this.scale.width },
        y: { min: -50, max: 0 },
        speedY: { min: 50, max: 150 },
        scale: { start: 0.5, end: 0 },
        lifespan: 3000,
        rotate: { start: 0, end: 360 },
        });
    }

    createVictoryText() {
        const victoryText = this.add.image(
            this.scale.width/2,
            this.scale.height/2-80,
            'victoryText'
        ).setScale(0).setAlpha(0);

        this.applyTextAnimation(victoryText);
    }

    applyTextAnimation(text) {
        this.tweens.add({
            targets: text,
            scaleX: 1.4,
            scaleY: 1.4,
            alpha: 1,
            duration: 600,
            ease: 'Back.easeOut',
            deley: 500,
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
        
        this.createHoverAnimation(jogarNovamente);

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

        this.createHoverAnimation(menu);

        menu.on('pointerdown', () => {
            this.scene.start('menuScene');
        });
    }

    createHoverAnimation(button) {
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

}
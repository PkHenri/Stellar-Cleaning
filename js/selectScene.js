class SelectScene extends Phaser.Scene {
    constructor() {
        super('selectScene');
        this.scrollSpeed = 1.5;
        this.shipButtons = [];
        this.currentIndex = 0; // índice da nave atual em foco
    }

    preload() {
        this.load.image('background', 'assets/images/sceneSelect/background.png');
        this.load.image('selectN1', 'assets/images/sceneSelect/selectN1.png');
        this.load.image('selectN2', 'assets/images/sceneSelect/selectN2.png');
        this.load.image('selectN3', 'assets/images/sceneSelect/selectN3.png');
        this.load.image('arrowRight', 'assets/images/sceneSelect/arrowRight.png'); // seta
        this.load.image('arrowLeft', 'assets/images/sceneSelect/arrowLeft.png');   // seta esquerda (opcional)
    }

    create() {
        this.createBackgroud();
        this.createResizeConfig();
        this.createShipSelectionButtons();
        this.createNavigationButtons();
    }

    createBackgroud() {
        this.bgSelect = this.add.tileSprite(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            'background'
        );
    }

    createResizeConfig() {
        this.scale.on('resize', (gameSize) => {
            this.bgSelect.setSize(gameSize.width, gameSize.height);
            this.bgSelect.setPosition(gameSize.width / 2, gameSize.height / 2);
        });
    }

    createShipSelectionButtons() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const btnSelectN1 = this.add.image(centerX, centerY, 'selectN1').setInteractive().setScale(0.5);
        const btnSelectN2 = this.add.image(centerX + this.scale.width, centerY, 'selectN2').setInteractive().setScale(0.5);
        const btnSelectN3 = this.add.image(centerX + 2 * this.scale.width, centerY, 'selectN3').setInteractive().setScale(0.5);

        this.setupShipButtonInteraction(btnSelectN1, 'naveUm');
        this.setupShipButtonInteraction(btnSelectN2, 'naveDois');
        this.setupShipButtonInteraction(btnSelectN3, 'naveTres');

        this.shipButtons.push(btnSelectN1, btnSelectN2, btnSelectN3);
    }

    setupShipButtonInteraction(button, shipType) {
        button.on('pointerover', () => button.setScale(0.6));
        button.on('pointerout', () => button.setScale(0.5));
        button.on('pointerdown', () => this.selectShipAndStartGame(shipType));
    }

    selectShipAndStartGame(shipType) {
        window.gameData.naveEscolhida = shipType;
        this.scene.start('gameScene');
    }

    createNavigationButtons() {
        const centerY = this.scale.height / 2;

        // Seta direita
        const arrowRight = this.add.image(this.scale.width - 100, centerY, 'arrowRight')
            .setInteractive()
            .setScale(0.15); //ajuste no tamanho da seta
        arrowRight.on('pointerdown', () => this.nextShip());

        // Seta esquerda (opcional)
        const arrowLeft = this.add.image(100, centerY, 'arrowLeft')
            .setInteractive()
            .setScale(0.15);
        arrowLeft.on('pointerdown', () => this.previousShip());
    }

    nextShip() {
        this.currentIndex = (this.currentIndex + 1) % this.shipButtons.length;
        this.updateShipPositions();
    }

    previousShip() {
        this.currentIndex = (this.currentIndex - 1 + this.shipButtons.length) % this.shipButtons.length;
        this.updateShipPositions();
    }

    updateShipPositions() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        const spacing = this.scale.width;

        // Posiciona a nave em foco no centro e as outras fora da tela
        this.shipButtons.forEach((btn, i) => {
            const offset = (i - this.currentIndex) * spacing;
            this.tweens.add({
                targets: btn,
                x: centerX + offset,
                y: centerY,
                duration: 500,
                ease: 'Cubic.easeOut'
            });
        });
    }

    update() {
        this.bgSelect.tilePositionY -= this.scrollSpeed;
    }
}
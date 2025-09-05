class SelectScene extends Phaser.Scene{
    constructor() {
        super('selectScene');
        this.scrollSpeed = 1.5;
    }

    preload() {
        // Carrega a imagem do background
        this.load.image('background', 'assets/images/sceneSelect/background.png');
        
        // Carrega os cards das naves
        this.load.image('selectN1', 'assets/images/sceneSelect/selectN1.png');
        this.load.image('selectN2', 'assets/images/sceneSelect/selectN2.png');
        this.load.image('selectN3', 'assets/images/sceneSelect/selectN3.png');
    }

    create() {
        this.createBackgroud();
        this.createResizeConfig();
        this.createShipSelectionButtons();
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
        this.createShipButton1();
        this.createShipButton2();
        this.createShipButton3();
    }

    createShipButton1() {
        const btnSelectN1 = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2,
            'selectN1'
        ).setInteractive().setScale(0.5);

        this.setupShipButtonInteraction(btnSelectN1, 'naveUm');
    }

    createShipButton2() {
        const btnSelectN2 = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2 + 200,
            'selectN2'
        ).setInteractive().setScale(0.5);

        this.setupShipButtonInteraction(btnSelectN2, 'naveDois');
    }

    createShipButton3() {
        const btnSelectN3 = this.add.image(
            this.scale.width / 2,
            this.scale.height / 2 - 200,
            'selectN3'
        ).setInteractive().setScale(0.5);

        this.setupShipButtonInteraction(btnSelectN3, 'naveTres');
    }

    setupShipButtonInteraction(button, shipType) {
        button.on('pointerdown', () => {
            this.selectShipAndStartGame(shipType);
        });
    }

    selectShipAndStartGame(shipType) {
        window.gameData.naveEscolhida = shipType;
        this.scene.start('gameScene');
    }

    update() {
        // Efeito de movimentação do fundo
        this.bgSelect.tilePositionY -= this.scrollSpeed;
    }
}
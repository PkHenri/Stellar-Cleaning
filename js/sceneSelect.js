class SceneSelect extends Phaser.Scene{
    constructor() {
        super('sceneSelect');
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
        // Criação do fundo
        this.bgSelect = this.add.tileSprite(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            'background'
        );

        // Tornando o background responsivo
        this.scale.on('resize', (gameSize) => {
            this.bgSelect.setSize(gameSize.width, gameSize.height);
            this.bgSelect.setPosition(gameSize.width / 2, gameSize.height / 2);
        });

        //Select Nave 1
        const btn_selecionarN1 = this.add.image(this.scale.width / 2, this.scale.height / 2 - 200, 'selectN1').setInteractive().setScale(0.5); // Ajuste de Y e escala
            //click
            btn_selecionarN1.on('pointerdown', () => {
            this.scene.start('sceneGame');
        });

        //Select Nave 2
        const btn_selecionarN2 = this.add.image(this.scale.width / 2, this.scale.height / 2 + 1, 'selectN2').setInteractive().setScale(0.5); // Ajuste de Y e escala
            //click
            btn_selecionarN2.on('pointerdown', () => {
            this.scene.start('sceneGame');
        });

        //Select Nave 3
        const btn_selecionarN3 = this.add.image(this.scale.width / 2, this.scale.height / 2 + 200, 'selectN3').setInteractive().setScale(0.5); // Ajuste de Y e escala
            //click
            btn_selecionarN3.on('pointerdown', () => {
            this.scene.start('sceneGame');
        });

    }

    update() {
        // Efeito de movimentação do fundo
        this.bgSelect.tilePositionY -= this.scrollSpeed;
    }
}
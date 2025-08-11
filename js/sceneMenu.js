class SceneMenu extends Phaser.Scene {
    constructor () {
        super('sceneMenu');
        this.scrollSpeed = 1.5;
    }

    preload() {
        this.load.image('backgroundMenu', 'assets/images/background.png');
        this.load.image('configIcon', 'assets/images/Menu/ConfigIcon.png');
        this.load.image('audioDesmutado', 'assets/images/Menu/audioDesmutado.png');
        this.load.image('audioMutado', 'assets/images/Menu/audioMutado.png');
        this.load.image('logo', 'assets/images/Menu/logo.png');
        this.load.image('btnJogar', 'assets/images/Menu/btnJogar.png');
    }

    create() {
        // Criação do fundo e reajuste automatico de tamanho
        this.bgMenu = this.add.tileSprite(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            'backgroundMenu'
        );
        
        this.scale.on('resize', (gameSize) => {
            this.bgMenu.setSize(gameSize.width, gameSize.height);
            this.bgMenu.setPosition(gameSize.width /  2,  gameSize.height / 2);
        });

        // Engrenagem (botão configurações)
        this.add.image(40, 40, 'configIcon').setScale(0.7).setInteractive();

        // botão audio
        let audioStatus = Array('audioDesmutado', 'audioMutado');
        let audioIndex = 0;
        let btnAudio = this.add.image(this.scale.width-40, 40, audioStatus[audioIndex]).setScale(0.7).setInteractive();

        // clique botão audio
        btnAudio.on('pointerdown', () => {
            audioIndex = (audioIndex + 1) % audioStatus.length;
            btnAudio.setTexture(audioStatus[audioIndex]);
        });

        // logo
        this.add.image(this.scale.width/2, this.scale.height/2-80, 'logo').setScale(1.2);
        // botão jogar
        const btnJogar = this.add.image(this.scale.width/2, this.scale.height/2+250, 'btnJogar').setInteractive();

        // clique no botão jogar
        btnJogar.on('pointerdown', () => {
            this.scene.start('sceneSelect');
        });
        
    }

    update() {
        // efeito de movimentação do fundo
        this.bgMenu.tilePositionY -= this.scrollSpeed;
    }

}
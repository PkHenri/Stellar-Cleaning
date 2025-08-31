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

        // Engrenagem (botão configurações) e animação
        const btnConfig = this.add.image(40, 40, 'configIcon').setScale(0.7).setInteractive();

        btnConfig.on('pointerover', () => {
            btnConfig.setScale(0.8);

            this.tweens.add({
                targets: btnConfig,
                rotation: btnConfig.rotation + (Math.PI * 2),
                duration: 500,
                ease: 'Power2'
            });
        });

        btnConfig.on('pointerout', () => {
            btnConfig.setScale(0.7);

            this.tweens.killTweensOf(btnConfig);
        });

        // botão audio
        let audioStatus = Array('audioDesmutado', 'audioMutado');
        let audioIndex = 0;
        let btnAudio = this.add.image(this.scale.width-40, 40, audioStatus[audioIndex]).setScale(0.7).setInteractive();

        // animação botão audio

        btnAudio.on('pointerover', () => {
            btnAudio.setScale(0.8);
        });

        btnAudio.on('pointerout', () => {
            btnAudio.setScale(0.7);
        });

        // clique botão audio
        btnAudio.on('pointerdown', () => {
            audioIndex = (audioIndex + 1) % audioStatus.length;
            btnAudio.setTexture(audioStatus[audioIndex]);
        });

        // logo
        this.add.image(this.scale.width/2, this.scale.height/2-80, 'logo').setScale(1.2);
        // botão jogar
        const btnJogar = this.add.image(this.scale.width/2, this.scale.height/2+250, 'btnJogar').setInteractive();

        // destaque btn jogar

        btnJogar.on('pointerover', () => {
            this.tweens.add({
                targets: btnJogar,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 200,
                ease: 'Power2'
            });
        });

        btnJogar.on('pointerout', () => {
            this.tweens.add({
                targets: btnJogar,
                scaleX: 1.0,
                scaleY: 1.0,
                duration: 200,
                ease: 'Power2'
            });
        });

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
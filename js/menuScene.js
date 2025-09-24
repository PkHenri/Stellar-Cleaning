class MenuScene extends Phaser.Scene {
    constructor () {
        super('menuScene');
        this.scrollSpeed = 1.5;
    }

    preload() {
        this.load.image('backgroundMenu', 'assets/images/background.png');
        this.load.image('configIcon', 'assets/images/Menu/ConfigIcon.png');
        this.load.image('audioDesmutado', 'assets/images/Menu/audioDesmutado.png');
        this.load.image('audioMutado', 'assets/images/Menu/audioMutado.png');
        this.load.image('logo', 'assets/images/Menu/logo.png');
        this.load.image('btnJogar', 'assets/images/Menu/btnJogar.png');

        this.load.audio('musicaMenu', 'assets/sounds/musicaMenu.mp3');
    }

    create() {
        this.createBackgroud();
        this.createResizeConfig();
        this.createConfigButton();
        this.createAudioButton();
        this.createLogo();
        this.createPlayButton();
        this.createMenuMusic();
    }

    createMenuMusic() {
        if (window.gameAudio.enabled) {
            if (!this.musicaMenu) {
                this.musicaMenu = this.sound.add('musicaMenu', {
                    volume: window.gameAudio.volume * 0.008,
                    loop: true
                });
            }
            
            if (!this.musicaMenu.isPlaying) {
                this.musicaMenu.play();
            }
        }
    }

    stopMenuMusic() {
        if (this.musicaMenu && this.musicaMenu.isPlaying) {
            this.musicaMenu.stop();
        }
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

    createConfigButton() {
        const btnConfig = this.add.image(
            40,
            40,
            'configIcon'
        ).setScale(0.7).setInteractive();

        this.setupConfigButtonAnimation(btnConfig);
        this.setupConfigButtonInteractions(btnConfig);
    }

    //adiciona efeitos visuais (hover e rotação)
    setupConfigButtonAnimation(button) { 
        button.on('pointerover', () => {
            this.applyHoverEffect(button, 0.8);
            this.applyRotationEffect(button);  
        });

        button.on('pointerout', () => {
            this.applyHoverEffect(button,  0.7);
            this.tweens.killTweensOf(button);
        });
    }

    //define a ação quando o botão é clicado
    setupConfigButtonInteractions(button) {
        button.on('pointerdown', () => {
            this.startQuemSomos();
        });
    }

    createAudioButton() {
        let btnAudio = this.add.image(
            this.scale.width-40,
            40,
            window.gameAudio.enabled ? 'audioDesmutado' : 'audioMutado'
        ).setScale(0.7).setInteractive();

        this.setupAudioButtonAnimation(btnAudio);

        btnAudio.on('pointerdown', () => {
            window.gameAudio.enabled = !window.gameAudio.enabled;

            btnAudio.setTexture(window.gameAudio.enabled ? 'audioDesmutado' : 'audioMutado');

            if (!window.gameAudio.enabled) {
                this.sound.stopAll();
                if (this.musicaMenu) {
                    this.musicaMenu.stop();
                }
            } else {
                if (this.musicaMenu && !this.musicaMenu.isPlaying) {
                    this.musicaMenu.play();
                } else if (!this.musicaMenu) {
                    this.createMenuMusic();
                }
            }
        });
    }

    setupAudioButtonAnimation(button) {
        button.on('pointerover', () => {
            this.applyHoverEffect(button, 0.8);
        });

        button.on('pointerout', () => {
            this.applyHoverEffect(button, 0.7);
        });
    }


    createLogo() {
        this.add.image(
            this.scale.width/2,
            this.scale.height/2-80,
            'logo'
        ).setScale(1.2);
    }

    createPlayButton() {
        const btnJogar = this.add.image(
            this.scale.width/2,
            this.scale.height/2+250,
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
            this.startTutorialScene();
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

    applyRotationEffect(element)  {
        this.tweens.add({
                targets: element,
                rotation: element.rotation + (Math.PI * 2),
                duration: 500,
                ease: 'Power2'
            });
    }

    startTutorialScene() {
        this.stopMenuMusic();
        this.scene.start('tutorialScene');
    }

    startQuemSomos(){
        this.scene.start('quemSomos')
    }
    
    update() {
        // efeito de movimentação do fundo
        this.bgMenu.tilePositionY -= this.scrollSpeed;
    }
}
class SceneGame extends Phaser.Scene{
    constructor(){
        super('sceneGame');
        this.scrollSpeed = 1.5;
    }

    preload(){
        this.load.image('background', 'assets/images/background.png'); // carrega a imagem de fundo
        // carrega os sprites da nave(player)
        this.load.image('naveDano0', 'assets/images/Nave/naveDano0.png');
        this.load.image('naveDano1', 'assets/images/Nave/naveDano1.png');
        this.load.image('naveDano2', 'assets/images/Nave/naveDano2.png');
        this.load.image('naveDano3', 'assets/images/Nave/naveDano3.png');

        //carrega os sprites do tiro da nave
        this.load.image('tiroPrincipal', 'assets/images/Projeteis/tiroPrincipal.png');
    }

    create(){
        // Criação do fundo e reajuste automatico de tamanho
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
        // criação da nave(player) no centro em baixo
        this.player = this.add.sprite(
            this.scale.width / 2,
            this.scale.height - 80,
            'naveDano0'
        );

        // animação do tiro
        this.anims.create({
            key: 'tiro_anim',
            frames: this.anims.generateFrameNumbers('tiroPrincipal', {start: 0, end: 7}),
            frameRate: 15,
            repeat: -1
        });

        // grupo para os tiros
        this.tiros = this.physics.add.group();

        // adiciona controles do teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // adicionando WASD pra movimentação
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');

        // tecla espaço
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        // efeito de movimento do fundo
        this.bg.tilePositionY -= this.scrollSpeed;

        // movimentação da  nave esquerda e ddwireita
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.player.x -= 6;
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.player.x += 6;
        }
        // movimentação da nave cima e baixo
        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            this.player.y -= 6;
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            this.player.y += 6;
        }
        // disparo tiro da nave
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            const tiro = this.tiros.create(this.player.x, this.player.y - 40, 'tiroPrincipal');
            tiro.setVelocityY(-400); // velocidade do tiro
            tiro.setScale(0.5); // ajusta o tamanho do tiro
            console.log('espaço funcionando')
        }
        // remover tiros que sairem da tela
        this.tiros.children.each(function(tiro) {
            if (tiro.y < -20) {
                tiro.destroy();
            }
        }, this);

        // limita a nave dentro da tela
        this.player.x = Phaser.Math.Clamp(this.player.x, 0, this.scale.width);
        
    }
}
class SceneGame extends Phaser.Scene{
    constructor(){
        super('sceneGame');
        this.scrollSpeed = 1.5;
    }

    preload(){
        this.load.image('background', 'assets/images/background.png'); // carrega a imagem de fundo
        // carrega os sprites da nave(player)
        this.load.image('naveUm', 'assets/images/Nave/naveUm.png');
        this.load.image('naveDois', 'assets/images/Nave/naveDois.png');
        this.load.image('naveTres', 'assets/images/Nave/naveTres.png');

        // destruição das naves
        this.load.spritesheet('explosaoN1', 'assets/images/Nave/destruicaoNave/explosaoN1.png', {frameWidth: 64, frameHeight: 64});

        // carrega os sprites do tiro da nave
        this.load.image('tiroPrincipal', 'assets/images/Projeteis/tiroPrincipal.png');

        // carrega sprites dos inimigos
        this.load.image('inimigoA', 'assets/images/Inimigos/inimigo1.png');
        this.load.image('inimigoB', 'assets/images/Inimigos/inimigo2.png');
        this.load.image('inimigoC', 'assets/images/Inimigos/inimigo3.png');
        this.load.image('inimigoD', 'assets/images/Inimigos/inimigo4.png');
        this.load.image('inimigoE', 'assets/images/Inimigos/inimigo5.png');
        this.load.image('inimigoF', 'assets/images/Inimigos/inimigo6.png');
        this.load.image('inimigoG', 'assets/images/Inimigos/inimigo7.png');
        this.load.image('inimigoH', 'assets/images/Inimigos/inimigo8.png');
        this.load.image('inimigoI', 'assets/images/Inimigos/inimigo9.png');
    }

    create(){
        // Criação do fundo
        this.bg = this.add.tileSprite(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            'background'
        );

        
        // criação da nave(player) no centro em baixo
        let nave = Array('naveUm', 'naveDois', 'naveTres');
        this.player = this.physics.add.sprite(
            this.scale.width / 2,
            this.scale.height - 80,
            nave[0]
        );
        this.player.setScale(1.5);

        // animação da explosão da nave
        this.anims.create({
            key: 'explodir',
            frames: this.anims.generateFrameNumbers('explosaoN1', {start: 2, end: 8}),
            frameRate: 20,
            hideOnComplete: true
        });

        // Inimigos (lixo)

        let inimigos = Array('inimigoA', 'inimigoB', 'inimigoC', 'inimigoD', 'inimigoE', 'inimigoF', 'inimigoG', 'inimigoH', 'inimigoI', );

        // configuração dos inimigos
        this.inimigosConfig = [
            {key: 'inimigoA', vida: 30, velocidade: 80, pontos: 3},
            {key: 'inimigoB', vida: 30, velocidade: 80, pontos: 3},
            {key: 'inimigoC', vida: 20, velocidade: 110, pontos: 2},
            {key: 'inimigoD', vida: 20, velocidade: 110, pontos: 2},
            {key: 'inimigoE', vida: 20, velocidade: 110, pontos: 2},
            {key: 'inimigoF', vida: 10, velocidade: 140, pontos: 1},
            {key: 'inimigoG', vida: 10, velocidade: 140, pontos: 1},
            {key: 'inimigoH', vida: 10, velocidade: 140, pontos: 1},
            {key: 'inimigoI', vida: 20, velocidade: 110, pontos: 2}
        ];

        this.inimigos = this.physics.add.group();
        this.inimigosRestantes = 50;
        this.maxInimigosNaTela = 1;
        this.spawnInterval = 2000; //ms

        // aumentar a dificuldade com o tempo
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                if (this.maxInimigosNaTela <8) this.maxInimigosNaTela++;
                if (this.spawnInterval > 600) this.spawnInterval -= 200;
            },
            callbackScope: this,
            loop: true
        });

        // timer para spawnar inimigos
        this.time.addEvent({
            delay: 500,
            callback: this.spawnInimigo,
            callbackScope: this,
            loop: true
        });

        
        // grupo para os tiros
        this.tiros = this.physics.add.group();

        // colisão entre tiros e inimigos
        this.physics.add.overlap(this.tiros, this.inimigos, (tiro, inimigo) => {
            inimigo.vida -= 5; // dano do tiro
            tiro.destroy();
            if (inimigo.vida <= 0) {
                let explosao = this.add.sprite(inimigo.x, inimigo.y, 'explosao').setScale(1.2);
                explosao.play('explodir');
                // adiciona pontos
                this.pontuacao += inimigo.getData('pontos') || 0;
                this.placarText.setText('Pontos: ' + this.pontuacao);
                inimigo.destroy();
            }
        }, null, this);

        // colisão entre nave e inimigos
        this.physics.add.overlap(this.player, this.inimigos, (player, inimigo) => {
            let explosao = this.add.sprite(player.x, player.y, 'explosao').setScale(1.2);
            explosao.play('explodir')
        }, null, this);

        // pontuação
        this.pontuacao = 0;
        this.placarText = this.add.text(this.scale.width - 30, 20, 'Pontos: 0', {
            fontSize: '28px',
            color: '#fff'
        }).setOrigin(1, 0).setDepth(10);

        // adiciona controles do teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        // adicionando WASD pra movimentação
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');

        // tecla espaço
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // raguste da tela
        this.scale.on('resize', (gameSize) => {
            this.bg.setSize(gameSize.width, gameSize.height);
            this.bg.setPosition(gameSize.width /  2,  gameSize.height / 2);
            this.placarText.setPosition(gameSize.width - 30, 20);
        });
    }

    spawnInimigo() {
        if (this.inimigos.countActive(true) >= this.maxInimigosNaTela || this.inimigosRestantes <= 0) return;

        // sorteia o inimigo
        let tipo = Phaser.Utils.Array.GetRandom(this.inimigosConfig);
        let x = Phaser.Math.Between(50, this.scale.width - 50);
        let y = -50;
        let inimigo = this.inimigos.create(x, y, tipo.key);
        inimigo.vida = tipo.vida;
        inimigo.setVelocityY(tipo.velocidade);
        inimigo.setData('tipo', tipo.key);
        inimigo.setData('pontos', tipo.pontos);

        this.inimigosRestantes--;
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
        }
        // remover tiros que sairem da tela
        this.tiros.children.each(function(tiro) {
            if (tiro.y < -20) {
                tiro.destroy();
            }
        }, this);

        // remover inimigos que sairem da tela
        this.inimigos.children.each(function(inimigo) {
            if (inimigo.y > this.scale.height + 50) {
                inimigo.destroy();
            } else {
                inimigo.rotation += 0.03;
            }
        }, this);

        // limita a nave dentro da tela
        this.player.x = Phaser.Math.Clamp(this.player.x, 0, this.scale.width);
        this.player.y = Phaser.Math.Clamp(this.player.y, 0, this.scale.height);
        
    }
}
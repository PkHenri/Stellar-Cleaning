class GameScene extends Phaser.Scene{
    constructor(){
        super('gameScene');
        this.scrollSpeed = 1.5;
    }

    preload(){
        this.load.image('background', 'assets/images/background.png'); // carrega a imagem de fundo

        // carrega os sprites da nave
        this.load.image('nave1', '../assets/images/Nave/naveUm.png');
        this.load.image('nave2', '../assets/images/Nave/naveDois.png');
        this.load.image('nave3', '../assets/images/Nave/naveTres.png');

        // destruição das naves
        this.load.spritesheet('explosao', 'assets/images/Nave/destruicaoNave/explosao.png', {frameWidth: 64, frameHeight: 64});

        // carrega os sprites do tiro da nave
        this.load.spritesheet('tiroNave1', '/assets/images/Projeteis/nave1Tiro.png', {frameWidth: 18, frameHeight: 38});
        this.load.spritesheet('tiro2Nave1', '/assets/images/Projeteis/nave1Tiro2.png', {frameWidth: 18, frameHeight: 38});
        this.load.spritesheet('tiro3Nave1', '/assets/images/Projeteis/nave1Tiro3.png', {frameWidth: 18, frameHeight: 38});

        this.load.spritesheet('tiroNave2', '/assets/images/Projeteis/nave2Tiro.png', {frameWidth: 10, frameHeight: 16});
        this.load.spritesheet('tiro2Nave2', '/assets/images/Projeteis/nave2Tiro2.png', {frameWidth: 10, frameHeight: 16});
        this.load.spritesheet('tiro3Nave2', '/assets/images/Projeteis/nave2Tiro3.png', {frameWidth: 10, frameHeight: 16});

        this.load.spritesheet('tiroNave3', '/assets/images/Projeteis/nave3Tiro.png', {frameWidth: 64, frameHeight: 48});
        this.load.spritesheet('tiro2Nave3', '/assets/images/Projeteis/nave3Tiro2.png', {frameWidth: 64, frameHeight: 48});
        this.load.spritesheet('tiro3Nave3', '/assets/images/Projeteis/nave3Tiro3.png', {frameWidth: 64, frameHeight: 48});

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
        this.createBackground();
        this.createPlayer();
        this.createResizeConfig();
        this.createExplosionAnimation();
        this.createShotAnimation();
        this.createEnemyConfig();
        this.createTimeDificulty();
        this.createSpawnTimer();
        this.createShotCollision();
        this.createShipCollision();
        this.createScore();
        this.createGameKeys();
    }

    update(){
        // efeito de movimento do fundo
        this.bg.tilePositionY -= this.scrollSpeed;
        this.updateShipMovement();
        this.updateShipShooting();
        this.updateRemoveShotOutScreen();
        this.updateRemoveEnemyOutScreen();
        this.updateLimitScreen();
        this.startVictoryScene();
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

    createEnemyConfig() {
        this.inimigosConfig = [
            // categoria Pesada - tiro L - mais vida, mais lentos, mais pontos
            {key: 'inimigoA', vida: 80, velocidade: 60, pontos: 15, categoria: 'pesado'},
            {key: 'inimigoB', vida: 80, velocidade: 60, pontos: 15, categoria: 'pesado'},

            // categoria Média - tiro K - vida média, velocidade média
            {key: 'inimigoC', vida: 50, velocidade: 90, pontos: 8, categoria: 'medio'},
            {key: 'inimigoD', vida: 50, velocidade: 90, pontos: 8, categoria: 'medio'},
            {key: 'inimigoE', vida: 50, velocidade: 90, pontos: 8, categoria: 'medio'},

            // categoria leve - tiro básico - menos vida, mais rapido
            {key: 'inimigoF', vida: 25, velocidade: 140, pontos: 4, categoria: 'leve'},
            {key: 'inimigoG', vida: 25, velocidade: 140, pontos: 4, categoria: 'leve'},
            {key: 'inimigoH', vida: 25, velocidade: 140, pontos: 4, categoria: 'leve'},
            {key: 'inimigoI', vida: 25, velocidade: 110, pontos: 4, categoria: 'leve'}
        ];

        this.inimigos = this.physics.add.group();
        this.inimigosRestantes = 100;
        this.maxInimigosNaTela = 2;
        this.spawnInterval = 1800;
    }

    createTimeDificulty() {
        // aumentar a dificuldade com o tempo
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                if (this.maxInimigosNaTela < 8) this.maxInimigosNaTela++;
                if (this.spawnInterval > 600) this.spawnInterval -= 200;
            },
            callbackScope: this,
            loop: true
        });
    }

    createSpawnTimer() {
        // timer para spawnar inimigos
        this.time.addEvent({
            delay: 500,
            callback: this.spawnInimigo,
            callbackScope: this,
            loop: true
        });
    }

    createExplosionAnimation() {
        this.anims.create({
            key: 'explodir',
            frames: this.anims.generateFrameNumbers('explosao', {start: 2, end: 8}),
            frameRate: 10,
            hideOnComplete: true
        });
    }

    createShotAnimation() {
        this.anims.create({
            key: 'animTiroNave1',
            frames: this.anims.generateFrameNumbers('tiroNave1', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'animTiroNave2',
            frames: this.anims.generateFrameNumbers('tiroNave2', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'animTiroNave3',
            frames: this.anims.generateFrameNumbers('tiroNave3', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
        key: 'animTiro2Nave1',
        frames: this.anims.generateFrameNumbers('tiro2Nave1', {start: 0, end: 3}),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'animTiro3Nave1',
        frames: this.anims.generateFrameNumbers('tiro3Nave1', {start: 0, end: 3}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
        key: 'animTiro2Nave2',
        frames: this.anims.generateFrameNumbers('tiro2Nave2', {start: 0, end: 3}),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'animTiro3Nave2',
        frames: this.anims.generateFrameNumbers('tiro3Nave2', {start: 0, end: 3}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
        key: 'animTiro2Nave3',
        frames: this.anims.generateFrameNumbers('tiro2Nave3', {start: 0, end: 5}),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'animTiro3Nave3',
        frames: this.anims.generateFrameNumbers('tiro3Nave3', {start: 0, end: 5}),
        frameRate: 15,
        repeat: -1
    });
    }

    createPlayer() {
        let naveEscolhida = window.gameData.naveEscolhida;
        let naveStats = window.gameData.naveConfig[naveEscolhida];

        // criação da nave(player) no centro em baixo
        this.player = this.physics.add.sprite(
            this.scale.width / 2,
            this.scale.height - 80,
            naveStats.sprite
        );
        this.player.setScale(1.5);

        // define os satars da nave
        this.playerStats = {
            dano: naveStats.dano,
            velocidadeTiro: naveStats.velocidadeTiro,
            velocidade: naveStats.velocidade,
            tiroSprite: naveStats.tiroSprite
        };
    }

    createShotCollision() {
        // grupo para os tiros
        this.tiros = this.physics.add.group();
        // controle de delay do tiro
        this.ultimoDisparo = 0;
        this.ultimoDisparo2 = 0;
        this.ultimoDisparo3 = 0;

        this.physics.add.overlap(this.tiros, this.inimigos, (tiro, inimigo) => {
            let danoBase = tiro.getData('dano') || this.playerStats.dano;
            let tipoTiro = tiro.getData('tipoTiro') || 'basico';
            let categoriaInimigo = inimigo.getData('categoria');

            let {danoFinal, pontosBonus, efetividade} = this.calcularEfetividade (danoBase, tipoTiro, categoriaInimigo);

            inimigo.vida -= danoFinal;

            this.mostrarEfeitoEfetividade(inimigo.x, inimigo.y, efetividade);

            tiro.destroy();

            if (inimigo.vida <= 0) {
                let explosao = this.add.sprite(inimigo.x, inimigo.y, 'explosao').setScale(1.2);
                explosao.play('explodir');
                // adiciona pontos
                this.pontosBase = inimigo.getData('pontos') || 0;
                let pontosTotal = this.pontosBase + pontosBonus;

                this.pontuacao += pontosTotal;

                this.placarText.setText('Pontos: ' + this.pontuacao);
                inimigo.destroy();
            }
        }, null, this);
    }

    mostrarEfeitoEfetividade(x, y, efetividade) {
    let cor = '#FFFFFF';
    let texto = '';
    
    switch(efetividade) {
        case 'super_efetivo':
            cor = '#00FF00';
            texto = 'SUPER EFETIVO!';
            break;
        case 'efetivo':
            cor = '#FFFF00';
            texto = 'Efetivo';
            break;
        case 'pouco_efetivo':
            cor = '#FF4444';
            texto = 'Pouco efetivo';
            break;
        default:
            return; // Não mostra texto para dano normal
    }
    
    let feedbackText = this.add.text(x, y - 30, texto, {
        fontSize: '14px',
        color: cor,
        fontFamily: 'stellarFont'
    }).setOrigin(0.5);
    
    // Animação do texto subindo e desaparecendo
    this.tweens.add({
        targets: feedbackText,
        y: y - 60,
        alpha: 0,
        duration: 1000,
        ease: 'Power2',
        onComplete: () => feedbackText.destroy()
    });
}

    calcularEfetividade(danoBase, tipoTiro, categoriaInimigo) {
        let multiplicadorDano = 1;
        let pontosBonus = 0;
        let efetividade = 'normal';

        switch (tipoTiro) {
            case 'basico': // espaço e J
                if (categoriaInimigo === 'leve') {
                    multiplicadorDano = 1.5;
                    pontosBonus = 2;
                    efetividade = 'efetivo';
                }
                break;
            case 'medio': // K
                if (categoriaInimigo === 'medio') {
                    multiplicadorDano = 2.0;
                    pontosBonus = 5;
                    efetividade = 'super_efetivo';
                } else if (categoriaInimigo === 'leve' || categoriaInimigo === 'pesado') {
                    multiplicadorDano = 0.5;
                    pontosBonus = 0;
                    efetividade = 'pouco_efetivo';
                }
                break;

            case 'pesado': // L
                if (categoriaInimigo === 'pesado') {
                    multiplicadorDano  = 2.5;
                    pontosBonus = 10;
                    efetividade = 'super_efetivo'; 
                } else {
                    multiplicadorDano = 0.3;
                    pontosBonus = 0;
                    efetividade = 'pouco_efetivo';
                }
                break;
        }

        return {
            danoFinal: Math.floor(danoBase * multiplicadorDano),
            pontosBonus: pontosBonus,
            efetividade: efetividade
        };
    }

    createShipCollision() {
        this.physics.add.overlap(this.player, this.inimigos, (player, inimigo) => {
            let explosao = this.add.sprite(player.x, player.y, 'explosao').setScale(1.2);
            explosao.play('explodir');
   
            this.time.delayedCall(250, () => {
                this.startGameoverScene();
            });
        }, null, this);
    }

    createScore() {
        this.pontuacao = 0;
        this.placarText = this.add.text(
            this.scale.width - 30, 20,
            'Pontos: 0',
            window.gameStyles.scoreText).setOrigin(1, 0).setDepth(10);
    }

    createGameKeys() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,A,S,D');
        this.shot = this.input.keyboard.addKeys('J,K,L');
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
        inimigo.setData('categoria', tipo.categoria);

        this.inimigosRestantes--;
    }

    updateShipMovement() {
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
    }

    updateShipShooting() {
        let naveEscolhida = window.gameData.naveEscolhida;
        let naveStats = window.gameData.naveConfig[naveEscolhida];
        let tempoAtual = this.time.now;
        
        if (this.shot.J.isDown) {
            if (tempoAtual - this.ultimoDisparo > naveStats.tiroDelay){
                this.createShot(
                    naveStats.tiroSprite, 
                    naveStats.tiroAnim, 
                    naveStats.tiroScale,
                    naveStats.dano,
                    'basico'
                );

                this.ultimoDisparo = tempoAtual;
            }
        }

        if (this.shot.K.isDown) {
            if (tempoAtual - this.ultimoDisparo2 > naveStats.tiroNum2.delay) {
                this.createShot(
                    naveStats.tiroNum2.sprite,
                    naveStats.tiroNum2.anim,
                    naveStats.tiroScale,
                    naveStats.tiroNum2.dano,
                    'medio'
                );

                this.ultimoDisparo2 = tempoAtual;
            }
        }

        if (this.shot.L.isDown) {
            if (tempoAtual - this.ultimoDisparo3 > naveStats.tiroNum3.delay) {
                this.createShot(
                    naveStats.tiroNum3.sprite,
                    naveStats.tiroNum3.anim,
                    naveStats.tiroScale,
                    naveStats.tiroNum3.dano,
                    'pesado'
                );

                this.ultimoDisparo3 = tempoAtual;
            }
        }
    }

    createShot(sprite, animation, scale, dano, tipoTiro = 'basico') {
        const tiro = this.tiros.create(this.player.x, this.player.y - 40, sprite);
                tiro.setVelocityY(-400); // velocidade do tiro
                tiro.setScale(scale); // ajusta o tamanho do tiro
                tiro.play(animation);
                tiro.setData('dano', dano);
                tiro.setData('tipoTiro', tipoTiro)
    }

    updateRemoveShotOutScreen() {
        this.tiros.children.each(function(tiro) {
            if (tiro.y < -20) {
                tiro.destroy();
            }
        }, this);
    }

    updateRemoveEnemyOutScreen() {
        this.inimigos.children.each(function(inimigo) {
            if (inimigo.y > this.scale.height + 50) {
                inimigo.destroy();
            } else {
                inimigo.rotation += 0.03;
            }
        }, this);
    }

    updateLimitScreen() {
        // limita a nave dentro da tela
        this.player.x = Phaser.Math.Clamp(this.player.x, 0, this.scale.width);
        this.player.y = Phaser.Math.Clamp(this.player.y, 0, this.scale.height);
    }

    startVictoryScene() {
        if (this.inimigosRestantes <= 0 && this.inimigos.countActive(true) == 0) {
                localStorage.setItem('pontuacaoFinal', this.pontuacao);
                this.scene.start('victoryScene');
        }
    }
    startGameoverScene() {
        localStorage.setItem('pontuacaoFinal', this.pontuacao);
        this.scene.start('gameoverScene');
    }
}
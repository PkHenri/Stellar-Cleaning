window.gameStyles = {
    defaultText: {
        fontSize: '28px',
        color: '#fff',
        fontFamily: 'stellarFont'
    },

    scoreText: {
        fontSize: '28px',
        color: '#fff',
        fontFamily: 'stellarFont'
    }
}

window.gameData = {
        naveEscolhida: null,
        naveConfig: {
            'naveUm': {
                sprite: 'nave1',
                tiroSprite: 'tiroNave1',
                tiroAnim: 'animTiroNave1',
                tiroScale: 0.8,
                tiroDelay: 150,
                dano: 20,
                velocidadeTiro: 400,
                velocidade: 6,

                tiroNum2: {
                    sprite: 'tiro2Nave1',
                    anim: 'animTiro2Nave1',
                    dano: 35,
                    delay: 300
                },

                tiroNum3: {
                    sprite: 'tiro3Nave1',
                    anim: 'animTiro3Nave1',
                    dano: 60,
                    delay: 500
                }
            },

            'naveDois': {
                sprite: 'nave2',
                tiroSprite: 'tiroNave2',
                tiroAnim: 'animTiroNave2',
                tiroScale: 2.5,
                tiroDelay: 250,
                dano: 25,
                velocidadeTiro: 350,
                velocidade: 5,

                tiroNum2: {
                    sprite: 'tiro2Nave2',
                    anim: 'animTiro2Nave2',
                    dano: 40,
                    delay: 400
                },

                tiroNum3: {
                    sprite: 'tiro3Nave2',
                    anim: 'animTiro3Nave2',
                    dano: 70,
                    delay: 600
                }
            },

            'naveTres': {
                sprite: 'nave3',
                tiroSprite: 'tiroNave3',
                tiroAnim: 'animTiroNave3',
                tiroScale: 1.9,
                tiroDelay: 200,
                dano: 22,
                velocidadeTiro: 380,
                velocidade: 7,

                tiroNum2: {
                    sprite: 'tiro2Nave3',
                    anim: 'animTiro2Nave3',
                    dano: 38,
                    delay: 350
                },

                tiroNum3: {
                    sprite: 'tiro3Nave3',
                    anim: 'animTiro3Nave3',
                    dano: 65,
                    delay: 550
                }
            }
        }
    }

window.onload = function() {
    function getGameSize() {
        return {
            width: 600,
            height: Math.max(document.documentElement.clientHeight, 400)
        };
    }

    

    const size = getGameSize();

    const config = {
        type: Phaser.AUTO,
        width: size.width,
        height: size.height,
        parent: 'game-area',
        scene: [MenuScene, TutorialScene, SelectScene, GameScene, VictoryScene, GameoverScene],
        physics: {
            default: 'arcade',
            arcade: {}
        },
    };

    let game = new Phaser.Game(config);

    window.addEventListener('resize', () => {
        const newSize = getGameSize();
        game.scale.resize(newSize.width, newSize.height);
        if (game.canvas) {
            game.canvas.style.height =  newSize.height + 'px';
            game.canvas.style.width = newSize.width + 'px';
        }
    });
}

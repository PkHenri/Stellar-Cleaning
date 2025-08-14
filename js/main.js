window.gameData = {
        naveEscolhida: null,
        naveConfig: {
            'naveUm': {
                sprite: 'nave1',
                tiroSprite: 'tiroNave1',
                tiroAnim: 'animTiroNave1',
                tiroScale: 0.8,
                tiroDelay: 200,
                dano: 5,
                velocidadeTiro: 400,
                velocidade: 6
            },
            'naveDois': {
                sprite: 'nave2',
                tiroSprite: 'tiroNave2',
                tiroAnim: 'animTiroNave2',
                tiroScale: 2.0,
                tiroDelay: 600,
                dano: 10,
                velocidadeTiro: 10,
                velocidade: 5
            },
            'naveTres': {
                sprite: 'nave3',
                tiroSprite: 'tiroNave3',
                tiroAnim: 'animTiroNave3',
                tiroScale: 1.9,
                tiroDelay: 400,
                dano: 8,
                velocidadeTiro: 320,
                velocidade: 7
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
        scene: [SceneMenu, SceneSelect, SceneGame],
        physics: {
            default: 'arcade',
            arcade: {
                
            }
        }
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

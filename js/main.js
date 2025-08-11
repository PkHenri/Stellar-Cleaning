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

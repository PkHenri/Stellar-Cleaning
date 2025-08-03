window.onload = function() {
    function getGameSize() {
        return {
            width: 800,
            height: document.documentElement.clientHeight
        };
    }

    const size = getGameSize();

    const config = {
        type: Phaser.AUTO,
        width: size.width,
        height: size.height,
        scene: [SceneGame]
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

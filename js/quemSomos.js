class QuemSomos extends Phaser.Scene {
    constructor () {
        super('quemSomos');
        this.scrollSpeed = 1.5;
    }

    preload(){
        this.load.image('background','assets/images/background.png');
        this.load.image('Giovanna', 'assets/images/quemSomos/Giovanna2.png');
        this.load.image('Petrick', 'assets/images/quemSomos/Petrick.png');
        this.load.image('Maria', 'assets/images/quemSomos/Maria2.png');
    }

    create() {
        this.createBackgroud();

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        const radius = 80;   // raio do círculo
        const spacing = 200; // distância entre as imagens (reduzida para aproximar)
        const border = 8;    // espessura da borda
        const borderColor = 0xFFD700; // dourado

        // Giovanna à esquerda
        this.createCircularImage(centerX - spacing, centerY, 'Giovanna', radius, border, borderColor);

    // Petrick no centro, um pouco mais acima
    const petrickYOffset = -30; // sobe Petrick 30 pixels
    this.createCircularImage(centerX, centerY + petrickYOffset, 'Petrick', radius, border, borderColor);

        // Maria à direita
        this.createCircularImage(centerX + spacing, centerY, 'Maria', radius, border, borderColor);
    }

    createBackgroud() {
        this.bgMenu = this.add.tileSprite(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            'background'
        );
    }

    createCircularImage(x, y, key, radius, border, borderColor) {
        // Desenha a borda dourada
        const g = this.add.graphics();
        g.fillStyle(borderColor, 1);
        g.fillCircle(x, y, radius + border);

        // Adiciona a imagem
        const img = this.add.image(x, y, key);

        // 🔥 Ajusta escala proporcional para caber dentro do círculo
        const maxSize = radius * 2;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        img.setScale(scale);

        // Máscara circular alinhada ao centro da imagem
        const maskShape = this.make.graphics({ add: false });
        maskShape.fillStyle(0xffffff);
        maskShape.fillCircle(x, y, radius);

        const mask = maskShape.createGeometryMask();
        img.setMask(mask);

        return img;
    }

    update() {
        this.bgMenu.tilePositionY -= this.scrollSpeed;
    }
}

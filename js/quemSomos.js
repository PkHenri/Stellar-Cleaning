class QuemSomos extends Phaser.Scene {
    constructor () {
        super('quemSomos');
    }

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('QuemSomos', 'assets/images/quemSomos/quemSomosText.png');
        this.load.image('Giovanna', 'assets/images/quemSomos/Giovanna.jpeg');
        this.load.image('Petrick', 'assets/images/quemSomos/Petrick.png');
        this.load.image('Maria', 'assets/images/quemSomos/Maria.png');
        this.load.image('Voltar', 'assets/images/quemSomos/btnVoltar.png')
    }

    create() {
        this.createBackgroud();

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
            const radius = 80;      // raio do círculo
            const spacing = 190;    // distância entre as imagens
            const border = 8;       // espessura da borda
            let borderColor = 0xFFD700; // fallback: dourado

        const quemSomos = this.add.image(centerX, -20, 'QuemSomos');
        quemSomos.setOrigin(0.5, 0); // centraliza pela parte de cima
        quemSomos.setScale(0.7);     // ajusta se for grande

        // Tenta amostrar a cor do texto da imagem 'QuemSomos' e usar nas bordas
        try {
            const srcImage = this.textures.get('QuemSomos').getSourceImage();
            if (srcImage && srcImage.width && srcImage.height) {
                const canvas = document.createElement('canvas');
                canvas.width = srcImage.width;
                canvas.height = srcImage.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(srcImage, 0, 0);
                // amostrar na região inferior-central onde normalmente está o texto
                const sampleX = Math.floor(srcImage.width / 2);
                const sampleY = Math.floor(srcImage.height * 0.65);
                const pixel = ctx.getImageData(sampleX, sampleY, 1, 1).data;
                // converter r,g,b para 0xRRGGBB
                borderColor = (pixel[0] << 16) | (pixel[1] << 8) | (pixel[2]);
            }
        } catch (e) {
            // se houver problema com CORS ou leitura, mantemos o fallback dourado
            // console.warn('Não foi possível amostrar a cor de QuemSomos:', e);
        }

        // Giovanna à esquerda
        this.createCircularImage(centerX - spacing, centerY, 'Giovanna', radius, border, borderColor);

        // Petrick no centro, um pouco mais acima
        const petrickYOffset = -40;
        this.createCircularImage(centerX, centerY + petrickYOffset, 'Petrick', radius, border, borderColor);


            // Texto informativo abaixo das fotos
            const infoText = "Somos alunos do 2º Informática da ETEC Dr. Emílio Hernandez Aguilar e criamos o Stellar Cleaning para a Feira do Empreendedor.\nNosso jogo une criatividade, tecnologia e diversão, mostrando o potencial dos jovens empreendedores em transformar ideias em experiências únicas.";
            const textStyle = {
                fontFamily: 'stellarFont',
                fontSize: '18px',
                color: '#ffffff',
                align: 'center',
                wordWrap: { width: Math.max(300, this.scale.width - 80) }
            };

            const textY = centerY + radius + border + 30;
            const info = this.add.text(centerX, textY, infoText, textStyle).setOrigin(0.5, 0);
        // Maria à direita
        this.createCircularImage(centerX + spacing, centerY, 'Maria', radius, border, borderColor);

        this.createbtVoltar();
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

        // Ajusta escala proporcional para caber dentro do círculo
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

    createbtVoltar(){
        const btnVoltar = this.add.image(
            this.scale.width/2, 
            this.scale.height/2+270, 
            'Voltar'
        ).setInteractive().setScale(0.7);

        this.createHoverAnimation(btnVoltar);

        btnVoltar.on('pointerdown', () => {
            this.scene.start('menuScene');
        });
        
    }

    createHoverAnimation(button) {
        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scaleX: 0.9,
                scaleY: 0.9,
                duration: 200,
                ease: 'Power2'
            });
        });

        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scaleX: 0.7,
                scaleY: 0.7,
                duration: 200,
                ease: 'Power2'
            });
        });
    }

    
}

// Configurações Físicas
const FRICTION = 0.985; // Quanto menor, mais rápido a bola para (atrito)
const WALL_BOUNCE = 0.7; // Perda de energia ao bater na borda

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velX = 0; // Velocidade Horizontal
        this.velY = 0; // Velocidade Vertical
    }

    update() {
        // Aplica o atrito
        this.velX *= FRICTION;
        this.velY *= FRICTION;

        // Para a bola se a velocidade for muito baixa
        if (Math.abs(this.velX) < 0.1) this.velX = 0;
        if (Math.abs(this.velY) < 0.1) this.velY = 0;

        // Atualiza posição
        this.x += this.velX;
        this.y += this.velY;

        // Colisão com bordas (Rebote)
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velX = -this.velX * WALL_BOUNCE;
            this.x = this.x < this.radius ? this.radius : canvas.width - this.radius;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velY = -this.velY * WALL_BOUNCE;
            this.y = this.y < this.radius ? this.radius : canvas.height - this.radius;
        }
    }
}

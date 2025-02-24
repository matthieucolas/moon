export  interface ParticleConfig {
    x: number;
    y: number;
    size: number;
    speed: number;
    angle?: number;
    color?: string;
    alpha: number;
}

export class Particle implements ParticleConfig {
    private renderingCtx: CanvasRenderingContext2D | null = null;
    public speed: number;
    public angle: number;
    public color: string;
    public x: number;
    public y: number;
    public size: number;
    public vx: number;
    public vy: number;
    public alpha: number;

    constructor(config: ParticleConfig, renderingCtx: CanvasRenderingContext2D | null) {
        this.x = config.x;
        this.y = config.y;
        this.speed = config.speed;
        this.size = config.size;
        this.color = config.color || '#FFFFFF';
        this.angle = config.angle || Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.alpha = config.alpha;
        if(renderingCtx){
            this.renderingCtx = renderingCtx;
        }
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        if(!this.renderingCtx){
            return;
        }
        this.renderingCtx.globalAlpha = this.alpha;
        this.renderingCtx.fillStyle = this.color;
        this.renderingCtx.beginPath();
        this.renderingCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.renderingCtx.fill();
      }
}
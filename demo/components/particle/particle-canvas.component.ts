import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Particle, ParticleConfig } from './particle';

@Component({
    selector: 'particle-canvas',
    templateUrl: 'particle-canvas.component.html',
    styleUrls: ['particle-canvas.component.scss']
})

export class ParticleCanvasComponent implements AfterViewInit, OnDestroy {
    @ViewChild('canvas', { static: true, read: ElementRef })
    public canvas: ElementRef<HTMLCanvasElement>;

    public particles: Particle[] = [];

    @Input()
    public numParticlesPerAnimationFrame: number;

    @Input()
    public particleConfigGetter: (canvas: HTMLCanvasElement) => ParticleConfig;

    @Input()
    public animation: boolean = false;

    private renderingContext: CanvasRenderingContext2D | null = null;

    private lastTimeStamp: DOMHighResTimeStamp = 0;

    @Input()
    public maxParticleNumber: number = 100;

    public ngAfterViewInit(): void {
        this.canvas.nativeElement.width = document.body.clientWidth;
        this.canvas.nativeElement.height = document.body.clientHeight;
        this.renderingContext = this.canvas.nativeElement.getContext('2d');
        this.init();
    }

    public init(){
        if(this.animation){
            this.animate();
        } else {
            this.createParticles();    
            this.particles.forEach(particle => {
                particle.draw();
            });
        }
    }

    private createParticles() {
        for (let i = 0; i < this.numParticlesPerAnimationFrame; i++) {
            const particleConfig = this.particleConfigGetter(this.canvas.nativeElement);
            this.particles.push(new Particle(
                particleConfig,
                this.renderingContext
            ))
        }
    }

    private animate(timestamp: DOMHighResTimeStamp = 0) {
        if (!this.lastTimeStamp) this.lastTimeStamp = timestamp;
        const deltaTime = timestamp - this.lastTimeStamp;

        if(deltaTime > 16){
            this.renderingContext.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
            if(this.particles.length < this.maxParticleNumber){
                this.createParticles();
            }
            this.particles.forEach((particle, index) => {
                particle.update();
                particle.draw();
                const outOfScreen = (particle: Particle) => {
                    return (
                        particle.x < 0 ||
                        particle.x > this.canvas.nativeElement.width ||
                        particle.y < 0 ||
                        particle.y > this.canvas.nativeElement.height
                    );
                }
    
                if (outOfScreen(particle)) {
                    this.particles.splice(index, 1);
                }
            });
            this.lastTimeStamp = timestamp;
        }


        requestAnimationFrame(this.animate.bind(this));
    }
    
    public ngOnDestroy(): void {
        this.particles = [];
    }
}
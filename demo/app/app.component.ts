import { Component } from '@angular/core';
import { ParticleConfig } from '../components/particle/particle';

/**
 * The demo app Component that carries the entire app
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public staticStarBackgroundParticleConfig: (canvas: HTMLCanvasElement) => ParticleConfig;
    public animatedStarBackgroundParticleConfig: (canvas: HTMLCanvasElement) => ParticleConfig;
    
    constructor() {
        this.staticStarBackgroundParticleConfig = (canvas: HTMLCanvasElement) => ({
            alpha: Math.random(),
            size: Math.random(),
            speed:0,
            x: canvas.width * Math.random(),
            y: canvas.height * Math.random(),
        } as ParticleConfig);

        this.animatedStarBackgroundParticleConfig = (canvas: HTMLCanvasElement) => ({
            alpha: 1,
            size: Math.random(),
            speed: Math.random() * 5,
            x: canvas.width / 2,
            y: canvas.height / 2,
        } as ParticleConfig);
    }

}

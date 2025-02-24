import { Component, inject } from '@angular/core';
import { ParticleConfig } from '../components/particle/particle';
import { ConfigurationService } from '../services/configuration.service';
import { Configuration } from '../services/configuration';
import { map, Observable, Subject } from 'rxjs';
 
/**
 * The demo app Component that carries the entire app
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private configurationService: ConfigurationService = inject(ConfigurationService);
    public staticStarBackgroundParticleConfig: (canvas: HTMLCanvasElement) => ParticleConfig;
    public animatedStarBackgroundParticleConfig: (canvas: HTMLCanvasElement) => ParticleConfig;
    public configuration: Observable<Configuration>;
    public moonImgAnimator: Subject<string[]> = new Subject();
    public moonImg: Observable<string>;
    public moonImages: string[];

    constructor() {
        this.configuration = this.configurationService.configuration$;

        this.staticStarBackgroundParticleConfig = (canvas: HTMLCanvasElement) => ({
            alpha: Math.random(),
            size: Math.random(),
            speed: 0,
            x: canvas.width * Math.random(),
            y: canvas.height * Math.random(),
        });

        this.animatedStarBackgroundParticleConfig = (canvas: HTMLCanvasElement) => ({
            alpha: Math.random(),
            size: Math.random() * 2,
            speed: Math.random() * 10,
            x: canvas.width / 2,
            y: canvas.height / 2,
        });
    }
}

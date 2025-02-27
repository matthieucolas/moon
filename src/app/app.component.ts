import { Component, HostListener, inject } from '@angular/core';
import { ParticleConfig } from '../components/particle/particle';
import { ConfigurationService } from '../services/configuration.service';
import { TableauConfiguration } from '../services/configuration';
import { Observable } from 'rxjs';
 
export interface NavigationEvent {
    action: () => void; // The action to be executed when the event is triggered
}

export type NavigationEventKey = 'ArrowLeft' | 'ArrowRight';

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
    public configuration: Observable<TableauConfiguration>;
    private navigationEvents: Map<NavigationEventKey, NavigationEvent> = new Map();

    constructor() {
        this.configuration = this.configurationService.configuration$;

        this.navigationEvents.set('ArrowRight', {
            action: this.handleArrowRight.bind(this)
        });

        this.navigationEvents.set('ArrowLeft', {
            action: this.handleArrowLeft.bind(this)
        })

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
            speed: Math.random() + 0.1,
            ...this.computePossibleStartPositions(canvas),
        });

    }

    private computePossibleStartPositions(canvas: HTMLCanvasElement): { x: number, y: number } {
        const possibleStartPositions = [
            { x: 0, y: 0 },
            { x: 0, y: canvas.height},
            { x: canvas.width, y: 0 },
            { x: canvas.width, y: canvas.height }
        ]

        return possibleStartPositions[Math.floor(Math.random() * possibleStartPositions.length)];
    }

    @HostListener('window:keydown', ['$event'])
    public handleKeydown(event: KeyboardEvent) {
        const nav = this.navigationEvents.get(event.key as NavigationEventKey);
        nav?.action();
    }

    private handleArrowRight() {
        this.configurationService.loadNextTableau();
    }

    private handleArrowLeft() {
        this.configurationService.loadTableauConfiguration('moon1');
    }
}

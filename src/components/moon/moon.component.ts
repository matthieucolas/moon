import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';
import { IMG_LOCATION } from '../../services/path.helper';

@Component({
    selector: 'moon',
    templateUrl: 'moon.component.html',
    styleUrls: ['moon.component.scss']
})

export class MoonComponent implements OnInit, OnDestroy {
    @Input()
    public moonTranslateAnimationDuration: number;
    public translateDuration: string;
    
    @Input()
    public moonCycleAnimationDuration: number;
    public cycleDuration: string;

    @Input()
    public moonRotationAnimationDuration: number;
    public rotationDuration: string;

    @Input()
    public imgSources: string[];
    public imgSrc: string;
    private subscription: Subscription;

    ngOnInit(): void {
        this.translateDuration = `${this.moonTranslateAnimationDuration}s`;
        this.cycleDuration = `${this.moonCycleAnimationDuration}s`;
        this.rotationDuration = `${this.moonRotationAnimationDuration}s`;
        this.imgSrc = `${IMG_LOCATION}${this.imgSources[0]}`;
        const changeImageTime = this.moonTranslateAnimationDuration * 1000; 

        this.subscription = interval(changeImageTime).pipe(
            map(index => (this.imgSources[index % this.imgSources.length]))
        ).subscribe(src => {
            this.imgSrc = src;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
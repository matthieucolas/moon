import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'moon',
    templateUrl: 'moon.component.html',
    styleUrls: ['moon.component.scss']
})

export class MoonComponent implements OnInit {
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
    public changeImageTime: number;

    @Input()
    public imgSrc: string;

    ngOnInit(): void {
        this.translateDuration = `${this.moonTranslateAnimationDuration}s`;
        this.cycleDuration = `${this.moonCycleAnimationDuration}s`;
        this.rotationDuration = `${this.moonRotationAnimationDuration}s`;
    }
}
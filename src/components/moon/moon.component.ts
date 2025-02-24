import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'moon',
    templateUrl: 'moon.component.html',
    styleUrls: ['moon.component.scss']
})

export class MoonComponent implements OnInit {
    @Input()
    public duration: number;
    
    public globalAnimationTime: string;
    public cycleAnimationTime: string;

    ngOnInit(): void {
        this.globalAnimationTime = `${this.duration}s`;
        this.cycleAnimationTime = `${this.duration * 0.5}s`; 
    }
}
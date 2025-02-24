import { NgModule } from '@angular/core';

import { ParticleCanvasComponent } from './particle-canvas.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    exports: [ParticleCanvasComponent],
    declarations: [ParticleCanvasComponent],
    providers: [],
})
export class ParticleCanvasModule { }

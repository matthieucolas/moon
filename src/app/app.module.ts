import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoonComponentModule } from '../components/moon/moon.component.module';
import { ParticleCanvasModule } from '../components/particle/particle.module';

/**
 * Needed modules for the app root
 */
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        MoonComponentModule,
        ParticleCanvasModule
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

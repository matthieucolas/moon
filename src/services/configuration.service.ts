import { inject, Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
import { IMG_LOCATION } from './path.helper';

@Injectable({providedIn: 'root'})
export class ConfigurationService {
    
    public configuration$: Subject<Configuration> = new Subject();
    private httpClient: HttpClient = inject(HttpClient);

    constructor(){
        this.httpClient.get<Configuration>('assets/configuration.json').pipe(
            map(configuration => this.addPathToImages(configuration))
        ).subscribe(
            {
                next: (configuration: Configuration) => this.configuration$.next(configuration),
                error: (error: any) => console.error('Error loading configuration', error)
            }
        );
    }

    public addPathToImages(configuration: Configuration): Configuration {
        return {
            ...configuration,
            moonImages: configuration.moonImages.map(image => `${IMG_LOCATION}${image}`)
        };
    }
}
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TableauConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';
import { IMG_LOCATION } from './path.helper';
import { TableauId } from './tableau-id';

@Injectable({providedIn: 'root'})
export class ConfigurationService {
    
    public configuration$: BehaviorSubject<TableauConfiguration> = new BehaviorSubject(null);
    private httpClient: HttpClient = inject(HttpClient);
    private configuration: Map<TableauId, TableauConfiguration> = new Map();

    constructor(){
        this.httpClient.get<TableauConfiguration[]>('assets/configuration.json').pipe(
        ).subscribe(
            {
                next: (configuration: TableauConfiguration[]) => this.parseConfiguration(configuration),
                error: (error: any) => console.error('Error loading configuration', error)
            }
        );
    }

    public loadNextTableau(){
        const currentConfiguration = this.configuration$.value;
        const currentConfigurationIndex = Array.from(this.configuration.keys()).indexOf(currentConfiguration.id);
        const nextConfigurationIndex = (currentConfigurationIndex + 1) % this.configuration.size;
        const nextConfigurationId = Array.from(this.configuration.keys())[nextConfigurationIndex];
        this.loadTableauConfiguration(nextConfigurationId);
    }

    public loadTableauConfiguration(id: TableauId) {
        const configuration = this.configuration.get(id);
        if(configuration){
            this.configuration$.next(configuration);
        } else {
            console.error(`Configuration with id ${id} not found`);
        }
    }

    private parseConfiguration(configuration: TableauConfiguration[]){
        for(const config of configuration){
            config.moonImageSrc = `${IMG_LOCATION}${config.moonImageSrc}`;
            config.logoSrc = `${IMG_LOCATION}${config.logoSrc}`;
            this.configuration.set(config.id, config);
        }
        this.loadTableauConfiguration(configuration[0].id);
    }
}
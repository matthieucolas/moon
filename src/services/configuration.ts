import { TableauId } from './tableau-id';

export interface TableauConfiguration {
    /**
     * The id of the tableau configuration
     */
    id: TableauId;
    /**
     * The duration of the moon cycle animation in seconds
     */
    moonCycleAnimationDuration: number;
    /**
     * The duration of the moon translation animation in seconds
     */
    moonTranslateAnimationDuration: number;
    /**
     * The duration of the moon rotation animation in seconds
     */
    moonRotationAnimationDuration: number;
    /**
     * The number of static stars to be displayed
     */
    numberOfStaticStars: number;
    /**
     * The maximum number of shooting stars that can be displayed at once
     */
    maxNumberOfShootingStars: number;
    /**
     * The name of the moon image
     */
    moonImageSrc: string;
    /**
     * How often the moon image should change in seconds
     */
    moonChangeImageTime: number;
    /**
     * The name of the logo image
     */
    logoSrc: string;
}
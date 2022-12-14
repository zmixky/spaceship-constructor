import { SpaceshipConstructorService } from './spaceship-constructor.service';
import { Spaceship } from './speceship.interface';
export declare class SpaceshipConstructorController {
    private _constructorService;
    constructor(_constructorService: SpaceshipConstructorService);
    construct(weightLimit: number, priceLimit: number, distanceLimit: number): Promise<Spaceship[]>;
}

import { Controller, Get, Query } from '@nestjs/common';
import { SpaceshipConstructorService } from './spaceship-constructor.service';
import { Spaceship } from './speceship.interface';

const LIMIT = 10;

@Controller('/spaceship/constructor')
export class SpaceshipConstructorController {
    constructor(private _constructorService: SpaceshipConstructorService) {}

    @Get()
    public async construct(
        @Query('weight') weightLimit: number,
        @Query('max_price') priceLimit: number,
        @Query('journey_distance') distanceLimit: number
    ): Promise<Spaceship[]> {
        return await this._constructorService.constructSpaceshipList(weightLimit, priceLimit, distanceLimit, LIMIT);
    }
}
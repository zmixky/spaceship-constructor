import { SpaceshipBody } from "../detail/body/spaceship-body.schema";
import { SpaceshipFuelTank } from "../detail/fuel-tank/spaceship-fuel-tank.schema";
import { SpaceshipScanner } from "../detail/scanner/spaceship-scanner.schema";
import { SpaceshipThruster } from "../detail/thruster/spaceship-thruster.schema";
export interface Spaceship {
    weight: number;
    price: number;
    distance: number;
    body: SpaceshipBody;
    fuelTank: SpaceshipFuelTank;
    scanner: SpaceshipScanner;
    thruster: SpaceshipThruster;
}

import { SpaceshipScannerDto } from './spaceship-scanner.dto';
import { SpaceshipScanner } from './spaceship-scanner.schema';
import { SpaceshipScannerService } from './spaceship-scanner.service';
export declare class SpaceshipScannerController {
    private _scannerService;
    constructor(_scannerService: SpaceshipScannerService);
    create(input: SpaceshipScannerDto): Promise<SpaceshipScanner>;
    findAll(): Promise<SpaceshipScanner[]>;
    findOne(id: string): Promise<SpaceshipScanner>;
    update(id: string, input: SpaceshipScannerDto): Promise<void>;
    remove(id: string): Promise<SpaceshipScanner>;
}

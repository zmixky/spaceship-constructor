import { Model } from 'mongoose';
import { SpaceshipScannerDto } from './spaceship-scanner.dto';
import { SpaceshipScanner, SpaceshipScannerDocument } from './spaceship-scanner.schema';
export declare class SpaceshipScannerService {
    private _model;
    constructor(_model: Model<SpaceshipScannerDocument>);
    create(input: SpaceshipScannerDto): Promise<SpaceshipScanner>;
    findOne(id: string): Promise<SpaceshipScanner | null>;
    findAll(): Promise<SpaceshipScanner[]>;
    update(id: string, input: SpaceshipScannerDto): Promise<boolean>;
    remove(id: string): Promise<SpaceshipScanner | null>;
}

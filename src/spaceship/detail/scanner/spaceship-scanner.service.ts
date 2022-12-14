import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SpaceshipScannerDto } from './spaceship-scanner.dto';
import { SpaceshipScanner, SpaceshipScannerDocument } from './spaceship-scanner.schema';

@Injectable()
export class SpaceshipScannerService {
    constructor(@InjectModel(SpaceshipScanner.name) private _model: Model<SpaceshipScannerDocument>) {}

    public async create(input: SpaceshipScannerDto): Promise<SpaceshipScanner> {
        return await this._model.create(input);
    }

    async findOne(id: string): Promise<SpaceshipScanner | null> {
        return await this._model.findOne({ _id: id }).exec();
    }

    public async findAll(): Promise<SpaceshipScanner[]> {
        return await this._model.find().exec();
    }

    public async update(id: string, input: SpaceshipScannerDto): Promise<boolean> {
        const result = await this._model.updateOne({ _id: id }, input).exec();
        return result.acknowledged;
    }

    public async remove(id: string): Promise<SpaceshipScanner | null> {
        return await this._model.findByIdAndDelete({ _id: id }).exec();
    }
}
import { Controller, Post, Get, Put, Delete, HttpCode, Body, Param, BadRequestException } from '@nestjs/common';
import { SpaceshipScannerDto } from './spaceship-scanner.dto';
import { SpaceshipScanner } from './spaceship-scanner.schema';
import { SpaceshipScannerService } from './spaceship-scanner.service';

@Controller('/spaceship/scanner')
export class SpaceshipScannerController {
    constructor(private _scannerService: SpaceshipScannerService) {}

    @Post()
    @HttpCode(204)
    public async create(@Body() input: SpaceshipScannerDto): Promise<SpaceshipScanner> {
        return await this._scannerService.create(input);
    }

    @Get()
    public async findAll(): Promise<SpaceshipScanner[]> {
        return await this._scannerService.findAll();
    }

    @Get(':id')
    public async findOne(@Param('id') id: string): Promise<SpaceshipScanner> {
        const result = await this._scannerService.findOne(id);

        if (result === null) {
            throw new BadRequestException('entry does not exist');
        }

        return result; 
    }

    @Put(':id')
    public async update(@Param('id') id: string, @Body() input: SpaceshipScannerDto): Promise<void> {
        const result = await this._scannerService.update(id, input);

        if (result === null) {
            throw new BadRequestException('entry does not exist');
        }
    }

    @Delete(':id')
    public async remove(@Param('id') id: string): Promise<SpaceshipScanner> {
        const result = await this._scannerService.remove(id);

        if (result === null) {
            throw new BadRequestException('entry does not exist');
        }

        return result;
    }
}
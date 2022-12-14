import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceshipBody, SpaceshipBodySchema } from './detail/body/spaceship-body.schema';
import { SpaceshipFuelTank, SpaceshipFuelTankSchema } from './detail/fuel-tank/spaceship-fuel-tank.schema';
import { SpaceshipScanner, SpaceshipScannerSchema } from './detail/scanner/spaceship-scanner.schema';
import { SpaceshipThruster, SpaceshipThrusterSchema } from './detail/thruster/spaceship-thruster.schema';
import { SpaceshipScannerService } from './detail/scanner/spaceship-scanner.service';
import { SpaceshipScannerController } from './detail/scanner/spaceship-scanner.controller';
import { SpaceshipConstructorService } from './constructor/spaceship-constructor.service';
import { SpaceshipConstructorController } from './constructor/spaceship-costructor.controller';



@Module({
  imports: [MongooseModule.forFeature([
    { name: SpaceshipBody.name, schema: SpaceshipBodySchema },
    { name: SpaceshipFuelTank.name, schema: SpaceshipFuelTankSchema },
    { name: SpaceshipScanner.name, schema: SpaceshipScannerSchema },
    { name: SpaceshipThruster.name, schema: SpaceshipThrusterSchema },
  ])],
  controllers: [SpaceshipScannerController, SpaceshipConstructorController],
  providers: [SpaceshipScannerService, SpaceshipConstructorService],
})

export class SpaceshipModule {}

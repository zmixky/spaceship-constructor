"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceshipModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const spaceship_body_schema_1 = require("./detail/body/spaceship-body.schema");
const spaceship_fuel_tank_schema_1 = require("./detail/fuel-tank/spaceship-fuel-tank.schema");
const spaceship_scanner_schema_1 = require("./detail/scanner/spaceship-scanner.schema");
const spaceship_thruster_schema_1 = require("./detail/thruster/spaceship-thruster.schema");
const spaceship_scanner_service_1 = require("./detail/scanner/spaceship-scanner.service");
const spaceship_scanner_controller_1 = require("./detail/scanner/spaceship-scanner.controller");
const spaceship_constructor_service_1 = require("./constructor/spaceship-constructor.service");
const spaceship_costructor_controller_1 = require("./constructor/spaceship-costructor.controller");
let SpaceshipModule = class SpaceshipModule {
};
SpaceshipModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: spaceship_body_schema_1.SpaceshipBody.name, schema: spaceship_body_schema_1.SpaceshipBodySchema },
                { name: spaceship_fuel_tank_schema_1.SpaceshipFuelTank.name, schema: spaceship_fuel_tank_schema_1.SpaceshipFuelTankSchema },
                { name: spaceship_scanner_schema_1.SpaceshipScanner.name, schema: spaceship_scanner_schema_1.SpaceshipScannerSchema },
                { name: spaceship_thruster_schema_1.SpaceshipThruster.name, schema: spaceship_thruster_schema_1.SpaceshipThrusterSchema },
            ])],
        controllers: [spaceship_scanner_controller_1.SpaceshipScannerController, spaceship_costructor_controller_1.SpaceshipConstructorController],
        providers: [spaceship_scanner_service_1.SpaceshipScannerService, spaceship_constructor_service_1.SpaceshipConstructorService],
    })
], SpaceshipModule);
exports.SpaceshipModule = SpaceshipModule;
//# sourceMappingURL=spaceship.module.js.map
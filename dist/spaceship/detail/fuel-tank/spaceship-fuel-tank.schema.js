"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceshipFuelTankSchema = exports.SpaceshipFuelTank = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let SpaceshipFuelTank = class SpaceshipFuelTank {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SpaceshipFuelTank.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SpaceshipFuelTank.prototype, "capacity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SpaceshipFuelTank.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SpaceshipFuelTank.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SpaceshipFuelTank.prototype, "vendor", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SpaceshipFuelTank.prototype, "price", void 0);
SpaceshipFuelTank = __decorate([
    (0, mongoose_1.Schema)()
], SpaceshipFuelTank);
exports.SpaceshipFuelTank = SpaceshipFuelTank;
exports.SpaceshipFuelTankSchema = mongoose_1.SchemaFactory.createForClass(SpaceshipFuelTank);
//# sourceMappingURL=spaceship-fuel-tank.schema.js.map
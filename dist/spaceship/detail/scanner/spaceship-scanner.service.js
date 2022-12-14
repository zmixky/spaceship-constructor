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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceshipScannerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const spaceship_scanner_schema_1 = require("./spaceship-scanner.schema");
let SpaceshipScannerService = class SpaceshipScannerService {
    constructor(_model) {
        this._model = _model;
    }
    async create(input) {
        return await this._model.create(input);
    }
    async findOne(id) {
        return await this._model.findOne({ _id: id }).exec();
    }
    async findAll() {
        return await this._model.find().exec();
    }
    async update(id, input) {
        const result = await this._model.updateOne({ _id: id }, input).exec();
        return result.acknowledged;
    }
    async remove(id) {
        return await this._model.findByIdAndDelete({ _id: id }).exec();
    }
};
SpaceshipScannerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(spaceship_scanner_schema_1.SpaceshipScanner.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SpaceshipScannerService);
exports.SpaceshipScannerService = SpaceshipScannerService;
//# sourceMappingURL=spaceship-scanner.service.js.map
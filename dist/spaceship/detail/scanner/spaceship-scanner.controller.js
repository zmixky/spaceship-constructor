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
exports.SpaceshipScannerController = void 0;
const common_1 = require("@nestjs/common");
const spaceship_scanner_dto_1 = require("./spaceship-scanner.dto");
const spaceship_scanner_service_1 = require("./spaceship-scanner.service");
let SpaceshipScannerController = class SpaceshipScannerController {
    constructor(_scannerService) {
        this._scannerService = _scannerService;
    }
    async create(input) {
        return await this._scannerService.create(input);
    }
    async findAll() {
        return await this._scannerService.findAll();
    }
    async findOne(id) {
        const result = await this._scannerService.findOne(id);
        if (result === null) {
            throw new common_1.BadRequestException('entry does not exist');
        }
        return result;
    }
    async update(id, input) {
        const result = await this._scannerService.update(id, input);
        if (result === null) {
            throw new common_1.BadRequestException('entry does not exist');
        }
    }
    async remove(id) {
        const result = await this._scannerService.remove(id);
        if (result === null) {
            throw new common_1.BadRequestException('entry does not exist');
        }
        return result;
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [spaceship_scanner_dto_1.SpaceshipScannerDto]),
    __metadata("design:returntype", Promise)
], SpaceshipScannerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpaceshipScannerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpaceshipScannerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, spaceship_scanner_dto_1.SpaceshipScannerDto]),
    __metadata("design:returntype", Promise)
], SpaceshipScannerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpaceshipScannerController.prototype, "remove", null);
SpaceshipScannerController = __decorate([
    (0, common_1.Controller)('/spaceship/scanner'),
    __metadata("design:paramtypes", [spaceship_scanner_service_1.SpaceshipScannerService])
], SpaceshipScannerController);
exports.SpaceshipScannerController = SpaceshipScannerController;
//# sourceMappingURL=spaceship-scanner.controller.js.map
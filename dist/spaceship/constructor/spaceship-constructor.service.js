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
exports.SpaceshipConstructorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const spaceship_body_schema_1 = require("../detail/body/spaceship-body.schema");
const spaceship_fuel_tank_schema_1 = require("../detail/fuel-tank/spaceship-fuel-tank.schema");
const spaceship_scanner_schema_1 = require("../detail/scanner/spaceship-scanner.schema");
const spaceship_thruster_schema_1 = require("../detail/thruster/spaceship-thruster.schema");
function stoperGenerator() {
    let counter = 0;
    return async () => {
        if (50 < counter) {
            counter = 0;
            await new Promise((res, rej) => setTimeout(() => res(), 25));
        }
        counter++;
    };
}
const LONIC_FUEL = 24.4;
let SpaceshipConstructorService = class SpaceshipConstructorService {
    constructor(_bodyModel, _fuelTankModel, _scannerModel, _thrusterModel) {
        this._bodyModel = _bodyModel;
        this._fuelTankModel = _fuelTankModel;
        this._scannerModel = _scannerModel;
        this._thrusterModel = _thrusterModel;
    }
    async constructSpaceshipList(weightLimit, priceLimit, distanceLimit, count) {
        const indexationList = await this._findSpaceshipIndexationList(weightLimit, priceLimit, distanceLimit, count);
        const spaceshipList = [];
        for (const indexation of indexationList) {
            const spaceship = await this._findSpaceship(indexation);
            spaceshipList.push(spaceship);
        }
        return spaceshipList.sort((a, b) => a.price - b.price);
    }
    async _findSpaceshipIndexationList(weightLimit, priceLimit, distanceLimit, count) {
        const [minBodyWeight, minFuelTankWeight, minScannerWeight, minThrusterWeight, minBodyPrice, minFuelTankPrice, minScannerPrice, minThrusterPrice] = await Promise.all([
            this._findMinBodyWeight(),
            this._findMinFuelTankWeight(),
            this._findMinScannerWeight(),
            this._findMinThrusterWeight(),
            this._findMinBodyPrice(),
            this._findMinFuelTankPrice(),
            this._findMinScannerPrice(),
            this._findMinThrusterPrice(),
        ]);
        const [fuelTankList, thrusterList] = await Promise.all([
            this._fuelTankModel
                .find({
                'weight': { $lt: weightLimit - minBodyWeight - minScannerWeight - minThrusterWeight },
                'price': { $lt: priceLimit - minBodyPrice - minScannerPrice - minFuelTankPrice }
            }, '_id weight price capacity')
                .lean(),
            this._thrusterModel
                .find({
                'weight': { $lt: weightLimit - minBodyWeight - minScannerWeight - minFuelTankWeight },
                'price': { $lt: priceLimit - minBodyPrice - minScannerPrice - minThrusterPrice }
            }, '_id weight price efficiency')
                .lean(),
        ]);
        let indexationList = [];
        const bodyScannerList = await this._bodyInnerJoinScanner(weightLimit, priceLimit, count);
        const findCurrentIndex = function search(from, to, weightLimitation) {
            if (to - from < 2) {
                return from;
            }
            const middle = Math.floor((from + to) / 2);
            const weight = bodyScannerList[middle].weight;
            return weightLimitation < weight ? search(from, middle, weightLimitation) : search(middle, to, weightLimitation);
        };
        const stoper = stoperGenerator();
        for (const fuelTank of fuelTankList) {
            for (const thruster of thrusterList) {
                await stoper();
                const weightLimitation = Math.min(weightLimit - fuelTank.weight - thruster.weight, LONIC_FUEL * fuelTank.capacity * thruster.efficiency / distanceLimit - fuelTank.weight - thruster.weight);
                if (weightLimitation < bodyScannerList[0].weight) {
                    break;
                }
                const currentIndex = (bodyScannerList[bodyScannerList.length - 1].weight <= weightLimitation)
                    ? findCurrentIndex(0, bodyScannerList.length, weightLimitation)
                    : bodyScannerList.length - 1;
                const currentIndexationList = bodyScannerList[currentIndex].minByPricePreviousIndexList
                    .map(index => {
                    const current = bodyScannerList[index];
                    return {
                        bodyId: current.bodyId,
                        fuelTankId: fuelTank._id.toString(),
                        scannerId: current.scannerId,
                        thrusterId: thruster._id._id.toString(),
                        priceLimitation: priceLimit - fuelTank.price - thruster.price - current.price,
                    };
                })
                    .filter(indexation => 0 <= indexation.priceLimitation);
                indexationList = [...indexationList, ...currentIndexationList]
                    .sort((a, b) => b.priceLimitation - a.priceLimitation)
                    .slice(0, count);
            }
        }
        return indexationList;
    }
    async _bodyInnerJoinScanner(weightLimit, priceLimit, count) {
        const [minBodyWeight, minFuelTankWeight, minScannerWeight, minThrusterWeight, minBodyPrice, minFuelTankPrice, minScannerPrice, minThrusterPrice] = await Promise.all([
            this._findMinBodyWeight(),
            this._findMinFuelTankWeight(),
            this._findMinScannerWeight(),
            this._findMinThrusterWeight(),
            this._findMinBodyPrice(),
            this._findMinFuelTankPrice(),
            this._findMinScannerPrice(),
            this._findMinThrusterPrice(),
        ]);
        const [bodyList, scannerList] = await Promise.all([
            this._bodyModel
                .find({
                'weight': { $lt: weightLimit - minFuelTankWeight - minScannerWeight - minThrusterWeight },
                'price': { $lt: priceLimit - minFuelTankPrice - minScannerPrice - minThrusterPrice }
            }, '_id weight price')
                .lean(),
            this._scannerModel
                .find({
                'weight': { $lt: weightLimit - minBodyWeight - minFuelTankWeight - minThrusterWeight },
                'price': { $lt: priceLimit - minFuelTankPrice - minBodyPrice - minThrusterPrice }
            }, '_id weight price')
                .lean(),
        ]);
        const stoper = stoperGenerator();
        let bodyScannerList = [];
        for (const body of bodyList) {
            for (const scanner of scannerList) {
                await stoper();
                const weight = body.weight + scanner.weight;
                if (weightLimit - minFuelTankWeight - minThrusterWeight < weight) {
                    break;
                }
                const price = body.price + scanner.weight;
                if (priceLimit - minFuelTankPrice - minThrusterPrice < price) {
                    break;
                }
                bodyScannerList.push({
                    bodyId: body._id.toString(),
                    scannerId: scanner._id.toString(),
                    weight: weight,
                    price: price,
                    minByPricePreviousIndexList: [],
                });
            }
        }
        bodyScannerList = bodyScannerList.sort((a, b) => a.weight - b.weight);
        bodyScannerList[0].minByPricePreviousIndexList = [0];
        for (let i = 1; i < bodyScannerList.length; ++i) {
            await stoper();
            const previous = bodyScannerList[i - 1].minByPricePreviousIndexList;
            const current = [i, ...previous].sort((i, j) => bodyScannerList[i].price - bodyScannerList[j].price);
            if (count < current.length) {
                current.pop();
            }
            bodyScannerList[i].minByPricePreviousIndexList = current;
        }
        return bodyScannerList;
    }
    async _findMinBodyWeight() {
        return (await this._bodyModel.find({}).sort('weight').limit(1).exec())[0].weight;
    }
    async _findMinFuelTankWeight() {
        return (await this._fuelTankModel.find({}).sort('weight').limit(1).exec())[0].weight;
    }
    async _findMinScannerWeight() {
        return (await this._scannerModel.find({}).sort('weight').limit(1).exec())[0].weight;
    }
    async _findMinThrusterWeight() {
        return (await this._thrusterModel.find({}).sort('weight').limit(1).exec())[0].weight;
    }
    async _findMinBodyPrice() {
        return (await this._bodyModel.find({}).sort('price').limit(1).exec())[0].price;
    }
    async _findMinFuelTankPrice() {
        return (await this._fuelTankModel.find({}).sort('price').limit(1).exec())[0].price;
    }
    async _findMinScannerPrice() {
        return (await this._scannerModel.find({}).sort('price').limit(1).exec())[0].price;
    }
    async _findMinThrusterPrice() {
        return (await this._thrusterModel.find({}).sort('price').limit(1).exec())[0].price;
    }
    async _findSpaceship(id) {
        const [body, fuelTank, scanner, thruster] = await Promise.all([
            this._bodyModel.findById(id.bodyId).lean(),
            this._fuelTankModel.findById(id.fuelTankId).lean(),
            this._scannerModel.findById(id.scannerId).lean(),
            this._thrusterModel.findById(id.thrusterId).lean(),
        ]);
        if (body == null || fuelTank == null || scanner == null || thruster == null) {
            throw new Error('Incorrect spaceship indexation');
        }
        return {
            weight: body.weight + fuelTank.weight + scanner.weight + thruster.weight,
            price: body.price + fuelTank.price + scanner.price + thruster.price,
            distance: LONIC_FUEL * fuelTank.capacity * thruster.efficiency / (body.weight + fuelTank.weight + scanner.weight + thruster.weight),
            body: body,
            fuelTank: fuelTank,
            scanner: scanner,
            thruster: thruster,
        };
    }
    async initiation(count) {
        const bodyList = [];
        const fuelTankList = [];
        const scannerList = [];
        const thrusterList = [];
        for (let i = 0; i < count; ++i) {
            bodyList.push(this._createBody());
            fuelTankList.push(this._createFuelTank());
            scannerList.push(this._createScanner());
            thrusterList.push(this._createThruster());
        }
        await Promise.all([
            this._bodyModel.create(bodyList),
            this._fuelTankModel.create(fuelTankList),
            this._scannerModel.create(scannerList),
            this._thrusterModel.create(thrusterList),
        ]);
    }
    _createBody() {
        const body = {
            weight: 50,
            caseWeight: 0,
            fullStorageWeight: 0,
            name: "",
            type: "",
            vendor: "",
            price: 0,
        };
        const seed = 1 - Math.random();
        body.weight += 250 * seed;
        body.caseWeight = body.weight * seed;
        body.fullStorageWeight = body.weight - body.caseWeight;
        body.name = `B_NAME:${Math.pow(body.weight, 2)}`;
        body.type = `B_TYPE:${Math.pow(body.weight, 3)}`;
        body.vendor = `B_VENDOR:${Math.pow(body.weight, 4)}`;
        const sign = seed < 0.5 ? 1 : -1;
        body.price = 10 * body.weight * (1 + 0.25 * sign * seed);
        return body;
    }
    _createFuelTank() {
        const body = {
            weight: 25,
            capacity: 0,
            name: "",
            type: "",
            vendor: "",
            price: 0,
        };
        const seed = 1 - Math.random();
        body.weight += 250 * seed;
        const signF = seed < 0.5 ? 1 : -1;
        body.capacity = body.weight * (1 + 0.05 * signF * seed);
        body.name = `FT_NAME:${Math.pow(body.weight, 2)}`;
        body.type = `FT_TYPE:${Math.pow(body.weight, 3)}`;
        body.vendor = `FT_VENDOR:${Math.pow(body.weight, 4)}`;
        const signS = seed < 0.5 ? 1 : -1;
        body.price = body.weight * (1 + 0.35 * signS * seed);
        return body;
    }
    _createScanner() {
        const body = {
            weight: 1,
            name: "",
            type: "",
            vendor: "",
            price: 25,
        };
        const seed = 1 - Math.random();
        body.weight += 0.75 * seed;
        body.name = `S_NAME:${Math.pow(body.weight, 2)}`;
        body.type = `S_TYPE:${Math.pow(body.weight, 3)}`;
        body.vendor = `S_VENDOR:${Math.pow(body.weight, 4)}`;
        body.price += 0.75 * seed * body.price;
        return body;
    }
    _createThruster() {
        const body = {
            weight: 2.5,
            efficiency: 0.175,
            name: "",
            type: "",
            vendor: "",
            price: 25,
        };
        const seed = 1 - Math.random();
        body.weight += 20 * seed;
        body.efficiency += 0.75 * seed;
        body.name = `T_NAME:${Math.pow(body.weight, 2)}`;
        body.type = `T_TYPE:${Math.pow(body.weight, 3)}`;
        body.vendor = `T_VENDOR:${Math.pow(body.weight, 4)}`;
        const sign = seed < 0.5 ? 1 : -1;
        body.price += 10 * body.weight * (1 + 0.2 * sign * seed);
        return body;
    }
};
SpaceshipConstructorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(spaceship_body_schema_1.SpaceshipBody.name)),
    __param(1, (0, mongoose_1.InjectModel)(spaceship_fuel_tank_schema_1.SpaceshipFuelTank.name)),
    __param(2, (0, mongoose_1.InjectModel)(spaceship_scanner_schema_1.SpaceshipScanner.name)),
    __param(3, (0, mongoose_1.InjectModel)(spaceship_thruster_schema_1.SpaceshipThruster.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SpaceshipConstructorService);
exports.SpaceshipConstructorService = SpaceshipConstructorService;
//# sourceMappingURL=spaceship-constructor.service.js.map
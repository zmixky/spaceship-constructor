import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class SpaceshipFuelTank {
    @Prop()
    weight: number;

    @Prop()
    capacity: number;

    @Prop()
    name: string;

    @Prop()
    type: string;

    @Prop()
    vendor: string;

    @Prop()
    price: number;
}

export type SpaceshipFuelTankDocument = HydratedDocument<SpaceshipFuelTank>;

export const SpaceshipFuelTankSchema = SchemaFactory.createForClass(SpaceshipFuelTank);

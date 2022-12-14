import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class SpaceshipThruster {
    @Prop()
    weight: number;

    @Prop()
    efficiency: number;

    @Prop()
    name: string;

    @Prop()
    type: string;

    @Prop()
    vendor: string;

    @Prop()
    price: number;
}

export type SpaceshipThrusterDocument = HydratedDocument<SpaceshipThruster>;

export const SpaceshipThrusterSchema = SchemaFactory.createForClass(SpaceshipThruster);

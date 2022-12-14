import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class SpaceshipBody {
    @Prop()
    weight: number;

    @Prop()
    caseWeight: number;

    @Prop()
    fullStorageWeight: number;

    @Prop()
    name: string;

    @Prop()
    type: string;

    @Prop()
    vendor: string;

    @Prop()
    price: number;
}

export type SpaceshipBodyDocument = HydratedDocument<SpaceshipBody>;

export const SpaceshipBodySchema = SchemaFactory.createForClass(SpaceshipBody);

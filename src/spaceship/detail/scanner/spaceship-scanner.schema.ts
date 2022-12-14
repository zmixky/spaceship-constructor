import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class SpaceshipScanner {
    @Prop()
    weight: number;

    @Prop()
    name: string;

    @Prop()
    type: string;

    @Prop()
    vendor: string;

    @Prop()
    price: number;
}

export type SpaceshipScannerDocument = HydratedDocument<SpaceshipScanner>;

export const SpaceshipScannerSchema = SchemaFactory.createForClass(SpaceshipScanner);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
    @Prop()
    name: String;

    @Prop()
    qty: Number;

    @Prop()
    description: String;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

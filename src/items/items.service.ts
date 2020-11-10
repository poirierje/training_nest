import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>) { }

    async findAll(): Promise<Item[]> {
        return await this.itemModel.find().exec();
    }

    async findOne(id: string): Promise<Item> {
        return await this.itemModel.findOne({ _id: id });
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const newItem = new this.itemModel(createItemDto);
        return await newItem.save();
    }

    async update(id: string, item: Item): Promise<Item> {
        return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
    }

    async delete(id: string): Promise<Item> {
        return await this.itemModel.findByIdAndRemove(id);
    }
}
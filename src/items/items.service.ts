import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ItemDTO } from './dto/item.dto';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
    constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) { }

    async findAll(): Promise<Item[]> {
        return await this.itemModel.find().exec();
    }

    async findOne(id: string): Promise<Item> {
        return await this.itemModel.findOne({ _id: id });
    }

    async create(itemDto: ItemDTO): Promise<Item> {
        const newItem = new this.itemModel(itemDto);
        return await newItem.save();
    }

    async update(id: string, item: Item): Promise<Item> {
        return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
    }

    async delete(id: string): Promise<Item> {
        return await this.itemModel.findByIdAndRemove(id);
    }
}
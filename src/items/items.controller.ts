import { Controller, Get, Post, Delete, Body, Param, Put } from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './schemas/item.schema'

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get('findAll')
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    // http://localhost:3000/items/findOne/14/true
    @Get('findOne/:id/:debug')
    async find(@Param() param, @Param('debug') debug): Promise<Item> {
        if (debug === 'true') {
            console.log('Activated debug mode');
        };
        return this.itemsService.findOne(param.id);
    }

    @Post()
    create(@Body() createItemDto: CreateItemDto): Promise<Item> {
        return this.itemsService.create(createItemDto);
    }

    @Delete('delete/:id')
    delete(@Param('id') id): string {
        return `Deleted item #${id}`
    }

    @Put('modify/:id')
    update(@Body() updateItemDto: CreateItemDto, @Param('id') id): string {
        return `Update item #${id} with :
        - Name: ${updateItemDto.name} 
        - Desc: ${updateItemDto.description}`;
    }
} 
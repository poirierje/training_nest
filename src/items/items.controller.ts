import { Controller, Get, Post, Delete, Body, Param, Put, UseFilters, ParseBoolPipe } from '@nestjs/common';
import { ItemDTO } from './dto/item.dto';
import { NoSuchItemException } from './exceptions/nosuchitem.exception';
import { NoSuchItemExceptionFilter } from './filters/nosuchitem.exception.filter';
import { Item } from './interfaces/item.interface';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get('findAll')
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    // http://localhost:3000/items/findOne/14/true
    @Get('findOne/:id/:debug')
    @UseFilters(new NoSuchItemExceptionFilter())
    async find(@Param() param, @Param('debug', ParseBoolPipe) debug): Promise<Item> {
        if (debug === 'true') {
            console.log('Activated debug mode');
        };

        const item = this.itemsService.findOne(param.id);

        return item
            .then((item) => {
                if (item)
                    return item;
                else
                    throw new NoSuchItemException(param.id);
            })
            .catch((message) => {
                throw new NoSuchItemException(param.id);
            });
    }

    @Post()
    create(@Body() itemDto: ItemDTO): Promise<Item> {
        return this.itemsService.create(itemDto);
    }

    @Delete('delete/:id')
    delete(@Param('id') id): string {
        return `Deleted item #${id}`
    }

    @Put('modify/:id')
    update(@Body() updateItemDto: ItemDTO, @Param('id') id): string {
        return `Update item #${id} with :
        - Name: ${updateItemDto.name} 
        - Desc: ${updateItemDto.description}`;
    }
} 
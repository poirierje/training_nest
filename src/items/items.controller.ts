import { Controller, Get, Post, Delete, Body, Param, Put, UseFilters, ParseBoolPipe, UseGuards } from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
import { ItemDTO } from './dto/item.dto';
import { NoSuchItemException } from './exceptions/nosuchitem.exception';
import { NoSuchItemExceptionFilter } from './filters/nosuchitem.exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Item } from './interfaces/item.interface';
import { ItemsService } from './items.service';
import { ForceBoolToTruePipe } from './pipes/forcebooltotrue.pipe';

@Controller('items')
@UseGuards(AuthGuard, RolesGuard)
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    home(): string {
        return 'Hello worlds of items !';
    }

    @Get('findAll')
    @Roles('user', 'manager', 'admin')
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }

    // http://localhost:3000/items/findOne/14/true
    @Get('findOne/:id/:debug')
    @Roles('user', 'manager', 'admin')
    @UseFilters(new NoSuchItemExceptionFilter())
    async find(@Param() param, @Param('debug', ParseBoolPipe, ForceBoolToTruePipe) debug): Promise<Item> {

        console.log('Debug mode : ' + debug);
        if (debug) {
            console.log('Activated debug mode');
        };

        const item = this.itemsService.findOne(param.id);

        // Managing exception cases
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
    @Roles('manager', 'admin')
    create(@Body() itemDto: ItemDTO): Promise<Item> {
        return this.itemsService.create(itemDto);
    }

    @Put('modify/:id')
    @Roles('manager', 'admin')
    update(@Body() updateItemDto: ItemDTO, @Param('id') id): string {
        return `Update item #${id} with :
        - Name: ${updateItemDto.name} 
        - Desc: ${updateItemDto.description}`;
    }

    @Delete('delete/:id')
    @Roles('admin')
    delete(@Param('id') id): string {
        return `Deleted item #${id}`
    }
} 
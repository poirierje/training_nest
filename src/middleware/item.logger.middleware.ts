import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ItemLoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        // throw new Error('Method not implemented.');
        console.log(`(web GET request on item API)`);
        next();
    }
}
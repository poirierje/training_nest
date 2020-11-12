import { HttpException, HttpStatus } from "@nestjs/common";

export class NoSuchItemException extends HttpException {
    constructor(itemId: string) {
        super(`No such item #${itemId}`, HttpStatus.NOT_FOUND);
    }
}
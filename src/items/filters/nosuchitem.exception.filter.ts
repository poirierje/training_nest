import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { NoSuchItemException } from '../exceptions/nosuchitem.exception';

@Catch(NoSuchItemException)
export class NoSuchItemExceptionFilter implements ExceptionFilter {
    catch(exception: NoSuchItemException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        console.log('NoSuchItemExceptionFilter occured.', exception);

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}
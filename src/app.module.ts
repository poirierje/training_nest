import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ItemLoggerMiddleware } from './middleware/item.logger.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] }), ItemsModule, MongooseModule.forRoot(config().mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {

    // Logger middleware for every GET request
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/**', method: RequestMethod.GET });

    // Item Logger middleware for every request on items
    consumer
      .apply(ItemLoggerMiddleware)
      .forRoutes({ path: '/items/**', method: RequestMethod.ALL });

  }
}

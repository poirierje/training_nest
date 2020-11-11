import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, load: [config]}), ItemsModule, MongooseModule.forRoot(config().mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

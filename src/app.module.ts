import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceshipModule } from './spaceship/spaceship.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const DB_URL = 'mongodb+srv://spaceship-constructor:FKbZXzS85SwRuSB4@internalcluster.gmobmpr.mongodb.net/?retryWrites=true&w=majority'; //todo: move to .env

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL),
    SpaceshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceshipModule } from './spaceship/spaceship.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mongodb_url = process.env.MONGODB_URL;

@Module({
  imports: [
    MongooseModule.forRoot(String(mongodb_url)),
    SpaceshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

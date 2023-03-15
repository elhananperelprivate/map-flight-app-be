import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DuffelApiModule } from './duffel-api/duffel-api.module';
import { DuffelModule } from './shared/duffel/duffel.module';

@Module({
  imports: [DuffelApiModule, DuffelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

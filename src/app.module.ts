import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DuffelApiModule } from './duffel-api/duffel-api.module';
import { DuffelModule } from './shared/duffel/duffel.module';
import { AmadeusApiModule } from './amadeus-api/amadeus-api.module';
import { AmadeusModule } from './shared/amadeus/amadeus.module';

@Module({
  imports: [DuffelApiModule, DuffelModule, AmadeusModule, AmadeusApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

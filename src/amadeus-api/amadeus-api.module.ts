import { AmadeusModule } from './../shared/amadeus/amadeus.module';
import { Module } from '@nestjs/common';
import { AmadeusApiController } from './amadeus-api.controller';
import { AmadeusApiService } from './amadeus-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AmadeusModule.register(
      process.env.AMADEUS_API_KEY,
      process.env.AMADEUS_API_SECRET,
    ),
    HttpModule,
  ],
  controllers: [AmadeusApiController],
  providers: [AmadeusApiService],
})
export class AmadeusApiModule {}

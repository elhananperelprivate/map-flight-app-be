import { AmadeusModule } from './../shared/amadeus/amadeus.module';
import { Module } from '@nestjs/common';
import { AmadeusApiController } from './amadeus-api.controller';
import { AmadeusApiService } from './amadeus-api.service';

@Module({
  imports: [
    AmadeusModule.register(
      'Vk9AfcO7ssAQxh5cDqEV83bjp4cGEISg',
      'AicjY78xb4L0yias',
    ),
  ],
  controllers: [AmadeusApiController],
  providers: [AmadeusApiService],
})
export class AmadeusApiModule {}

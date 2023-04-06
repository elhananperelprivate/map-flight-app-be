import { Module } from '@nestjs/common';
import { DuffelApiController } from './duffel-api.controller';
import { DuffelApiService } from './duffel-api.service';
import { DuffelModule } from '../shared/duffel/duffel.module';

@Module({
  imports: [DuffelModule.register(process.env.DUFFEL_API_KEY)],
  controllers: [DuffelApiController],
  providers: [DuffelApiService],
})
export class DuffelApiModule {}

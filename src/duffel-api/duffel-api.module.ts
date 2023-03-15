import { Module } from '@nestjs/common';
import { DuffelApiController } from './duffel-api.controller';
import { DuffelApiService } from './duffel-api.service';
import { DuffelModule } from '../shared/duffel/duffel.module';

@Module({
  imports: [
    DuffelModule.register(
      'duffel_test_aMdWgI3I6kFYbAWCDEmKOma4HA999VMbsg5UOu6YYIr',
    ),
  ],
  controllers: [DuffelApiController],
  providers: [DuffelApiService],
})
export class DuffelApiModule {}

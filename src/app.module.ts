import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmadeusApiModule } from './amadeus-api/amadeus-api.module';
import { AmadeusModule } from './shared/amadeus/amadeus.module';

@Module({
  imports: [AmadeusModule, AmadeusApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

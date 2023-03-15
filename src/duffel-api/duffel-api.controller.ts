import { Controller, Get } from '@nestjs/common';
import { DuffelApiService } from './duffel-api.service';

@Controller('duffel-api')
export class DuffelApiController {
  constructor(private readonly myDuffelService: DuffelApiService) {}

  @Get()
  async searchFlightTest() {
    return this.myDuffelService.searchFlightTest();
  }
}

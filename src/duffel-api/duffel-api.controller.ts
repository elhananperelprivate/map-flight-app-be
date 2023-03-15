import { Controller, Get, Param } from '@nestjs/common';
import { DuffelApiService } from './duffel-api.service';

@Controller('duffel-api')
export class DuffelApiController {
  constructor(private readonly service: DuffelApiService) {}

  @Get()
  async searchFlightTest() {
    return this.service.searchFlightTest();
  }

  @Get(':origin/:destination/:date')
  async getCheapestFlights(
    @Param('origin') originAirport: string,
    @Param('destination') destinationAirport: string,
    @Param('date') date: string,
  ) {
    const cheapestFlights = await this.service.getCheapestFlights(
      originAirport,
      destinationAirport,
      date,
    );
    return cheapestFlights;
  }
}

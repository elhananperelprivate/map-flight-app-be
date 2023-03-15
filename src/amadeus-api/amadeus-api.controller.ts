import { AmadeusApiService } from './amadeus-api.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('amadeus-api')
export class AmadeusApiController {
  constructor(private readonly service: AmadeusApiService) {}
  @Get()
  async findCheapestFlights(
    @Query('originCode') originCode: string,
    @Query('destinationCode') destinationCode: string,
    @Query('dateOfDeparture') dateOfDeparture: string,
  ) {
    const flightOffers = await this.service.searchFlights(
      originCode,
      destinationCode,
      dateOfDeparture,
    );
    return flightOffers;
  }
}

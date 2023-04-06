import { AmadeusApiService } from './amadeus-api.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('amadeus-api')
export class AmadeusApiController {
  constructor(private readonly service: AmadeusApiService) {}

  @Get('flights')
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

  @Get('airports')
  async findClosestMajorAirportsToPoint(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ) {
    const closesetAirports = await this.service.searchClosestAirportToPoint(
      lat,
      lng,
    );
    return closesetAirports;
  }
}

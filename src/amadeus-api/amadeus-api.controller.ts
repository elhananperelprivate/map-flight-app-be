import { AmadeusApiService } from './amadeus-api.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('amadeus-api') // Grouping the API endpoints
@Controller('amadeus-api')
export class AmadeusApiController {
  constructor(private readonly service: AmadeusApiService) {}

  @Get('flights')
  @ApiOperation({ summary: 'Find the cheapest flights' })
  @ApiQuery({
    name: 'originCode',
    type: String,
    description: 'Origin airport code',
    required: true,
    example: 'JFK'
  })
  @ApiQuery({
    name: 'destinationCode',
    type: String,
    description: 'Destination airport code',
    required: true,
    example: 'LHR'
  })
  @ApiQuery({
    name: 'dateOfDeparture',
    type: String,
    description: 'Date of departure in YYYY-MM-DD format',
    required: true,
    example: '2024-11-01'
  })
  @ApiResponse({ status: 200, description: 'List of cheapest flights' })
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
  @ApiOperation({ summary: 'Find the closest major airports to a point' })
  @ApiQuery({
    name: 'lat',
    type: String,
    description: 'Latitude of the location',
    required: true,
    example: '40.7128'
  })
  @ApiQuery({
    name: 'lng',
    type: String,
    description: 'Longitude of the location',
    required: true,
    example: '-74.0060'
  })
  @ApiResponse({ status: 200, description: 'List of closest airports' })
  async findClosestMajorAirportsToPoint(
      @Query('lat') lat: string,
      @Query('lng') lng: string,
  ) {
    const closestAirports = await this.service.searchClosestAirportToPoint(
        lat,
        lng,
    );
    return closestAirports;
  }

  @Get('flightRoute')
  @ApiOperation({ summary: 'Get flight route by flight number and date' })
  @ApiQuery({
    name: 'flightNumber',
    type: String,
    description: 'The full flight number (e.g., TP487)',
    required: true,
    example: 'TP487'
  })
  @ApiQuery({
    name: 'date',
    type: String,
    description: 'The scheduled departure date in YYYY-MM-DD format',
    required: true,
    example: '2024-11-01'
  })
  @ApiResponse({ status: 200, description: 'Flight route information' })
  async getFlightRoute(
      @Query('flightNumber') flightNumber: string,
      @Query('date') date: string,
  ) {
    const flightRoute = await this.service.getFlightRoute(flightNumber, date);
    return flightRoute;
  }
}

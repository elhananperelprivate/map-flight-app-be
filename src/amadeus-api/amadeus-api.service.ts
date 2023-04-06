import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import * as Amadeus from 'amadeus';

@Injectable()
export class AmadeusApiService {
  private readonly GEONAMES_API_URL = 'http://api.geonames.org';
  private readonly username = 'elpio';

  constructor(
    private httpService: HttpService,
    @Inject('AmadeusAPI') private readonly amadeusClient: Amadeus,
  ) {}

  async searchFlights(
    originCode: string,
    destinationCode: string,
    dateOfDeparture: string,
  ) {
    try {
      const response = await this.amadeusClient.shopping.flightOffersSearch.get(
        {
          originLocationCode: originCode,
          destinationLocationCode: destinationCode,
          departureDate: dateOfDeparture,
          adults: '1',
          max: '5',
        },
      );
      return response.result;
    } catch (error) {
      console.log('searchFlights - ', error);
      return null;
    }
  }

  async searchClosestAirportToPoint(lat: string, lng: string) {
    try {
      const response =
        await this.amadeusClient.referenceData.locations.airports.get({
          latitude: lat,
          longitude: lng,
          sort: 'distance',
        });
      return response.result;
    } catch (error) {
      console.log('searchClosestAirportToPoint - ', error);
      return null;
    }
  }
}

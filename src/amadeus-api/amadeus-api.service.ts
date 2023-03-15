import { Inject, Injectable } from '@nestjs/common';
import * as Amadeus from 'amadeus';

@Injectable()
export class AmadeusApiService {
  constructor(@Inject('AmadeusAPI') private readonly amadeusClient: Amadeus) {}

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
          max: '7',
        },
      );
      return response.result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

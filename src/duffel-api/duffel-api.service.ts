import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Duffel, DuffelError } from '@duffel/api';

@Injectable()
export class DuffelApiService {
  constructor(@Inject('DuffelAPI') private readonly duffelAPI: Duffel) {}

  async searchFlightTest() {
    try {
      const offerRequestResponse = await this.duffelAPI.offerRequests.create({
        slices: [
          {
            origin: 'NYC',
            destination: 'ATL',
            departure_date: '2023-06-21',
          },
        ],
        passengers: [{ type: 'adult' }],
        cabin_class: 'economy',
        return_offers: false,
      });

      console.log(offerRequestResponse.data.id);

      return offerRequestResponse;
    } catch (e) {
      console.log(e);
      return { error: e };
    }
  }

  async getCheapestFlights(
    originAirport: string,
    destinationAirport: string,
    date: string,
  ) {
    try {
      const offerRequest = await this.duffelAPI.offerRequests.create({
        slices: [
          {
            origin: originAirport,
            destination: destinationAirport,
            departure_date: new Date(date).toISOString().slice(0, 10),
          },
        ],
        passengers: [{ age: 21 }],
        return_offers: false,
      });

      const cheapestOffer = await this.duffelAPI.offers.list({
        offer_request_id: offerRequest.data.id,
        sort: 'total_amount',
        limit: 5,
      });

      return { data: cheapestOffer.data[0] };
    } catch (error: unknown) {
      if (error instanceof DuffelError) {
        return { error: error };
      }

      return new BadRequestException();
    }
  }
}

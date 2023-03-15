import { Inject, Injectable } from '@nestjs/common';
import { Duffel } from '@duffel/api';

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
}

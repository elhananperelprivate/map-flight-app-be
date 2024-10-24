import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import * as Amadeus from 'amadeus';

@Injectable()
export class AmadeusApiService {
    private readonly GEONAMES_API_URL = 'http://api.geonames.org';
    private readonly username = 'elpio';

    constructor(
        private readonly httpService: HttpService,
        @Inject('AmadeusAPI') private readonly amadeusClient: Amadeus
    ) {}

    /**
     * Searches for flight offers between the given origin and destination airports.
     *
     * @param {string} originCode - The IATA code of the origin airport.
     * @param {string} destinationCode - The IATA code of the destination airport.
     * @param {string} dateOfDeparture - The departure date in YYYY-MM-DD format.
     * @returns {Promise<any>} - Returns a Promise resolving with the flight search result or null in case of an error.
     */
    async searchFlights(
        originCode: string,
        destinationCode: string,
        dateOfDeparture: string
    ): Promise<any> {
        try {
            const response = await this.amadeusClient.shopping.flightOffersSearch.get({
                originLocationCode: originCode,
                destinationLocationCode: destinationCode,
                departureDate: dateOfDeparture,
                adults: '1',
                max: '5',
            });
            return response.result;
        } catch (error) {
            console.error('searchFlights error:', error.response?.data || error.message);
            return null;
        }
    }

    /**
     * Finds the closest airport to a given geographical point (latitude and longitude).
     *
     * @param {string} lat - The latitude of the location.
     * @param {string} lng - The longitude of the location.
     * @returns {Promise<any>} - Returns a Promise resolving with the closest airport data or null in case of an error.
     */
    async searchClosestAirportToPoint(lat: string, lng: string): Promise<any> {
        try {
            const response = await this.amadeusClient.referenceData.locations.airports.get({
                latitude: lat,
                longitude: lng,
                sort: 'distance',
            });
            return response.result;
        } catch (error) {
            console.error('searchClosestAirportToPoint error:', error.response?.data || error.message);
            return null;
        }
    }

    /**
     * Retrieves the flight route details for a specific flight based on its flight number and departure date.
     *
     * @param {string} flightNumber - The full flight number (e.g., TP487).
     * @param {string} date - The scheduled departure date in YYYY-MM-DD format.
     * @returns {Promise<any>} - Returns a Promise resolving with the flight route data or null in case of an error.
     */
    async getFlightRoute(flightNumber: string, date: string): Promise<any> {
        // Extract carrier code (first 2 characters or 3 (letters)) and flight number (rest)
        const carrierCodeLastIndex = flightNumber.search(/\d/);
        const carrierCode = flightNumber.substring(0, carrierCodeLastIndex);
        const flightNumberCode = flightNumber.substring(carrierCodeLastIndex);

        try {
            const response = await this.amadeusClient.schedule.flights.get({
                carrierCode,
                flightNumber: flightNumberCode,
                scheduledDepartureDate: date,
            });
            return response.result;
        } catch (error) {
            console.error('getFlightRoute error:', error.response?.data || error.message);
            return null;
        }
    }
}

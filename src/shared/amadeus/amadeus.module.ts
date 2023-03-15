import { DynamicModule, Module } from '@nestjs/common';
import * as Amadeus from 'amadeus';

@Module({})
export class AmadeusModule {
  static register(apiKey: string, apiSecret: string): DynamicModule {
    const amadeusProvider = {
      provide: 'AmadeusAPI',
      useValue: new Amadeus({
        clientId: apiKey,
        clientSecret: apiSecret,
      }),
    };
    return {
      module: AmadeusModule,
      providers: [amadeusProvider],
      exports: [amadeusProvider],
    };
  }
}

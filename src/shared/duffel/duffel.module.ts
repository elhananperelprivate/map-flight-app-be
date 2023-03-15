import { DynamicModule, Module } from '@nestjs/common';
import { Duffel } from '@duffel/api';

@Module({})
export class DuffelModule {
  static register(apiKey: string): DynamicModule {
    const duffelProvider = {
      provide: 'DuffelAPI',
      useValue: new Duffel({ token: apiKey }),
    };
    return {
      module: DuffelModule,
      providers: [duffelProvider],
      exports: [duffelProvider],
    };
  }
}

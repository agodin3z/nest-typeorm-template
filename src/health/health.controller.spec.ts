import { HttpModule } from '@nestjs/axios';
import { ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  TerminusModule,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;
  let health: HealthCheckService;
  let http: HttpHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule, HttpModule],
      controllers: [HealthController],
      providers: [
        ConfigService,
        {
          provide: 'TERMINUS_LOGGER',
          useValue: {
            setContext: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    health = module.get<HealthCheckService>(HealthCheckService);
    http = await module.resolve<HttpHealthIndicator>(HttpHealthIndicator);
  });

  describe('check', () => {
    it('should call pingCheck for each endpoint', async () => {
      const healthSpy = jest.spyOn(health, 'check');
      http.pingCheck = jest.fn();
      try {
        await controller.check();
        expect(healthSpy).toHaveBeenCalledTimes(1);

        expect(http.pingCheck).toHaveBeenCalledTimes(4);
        expect(http.pingCheck).toHaveBeenCalledWith(
          'api',
          'http://localhost:3000/api',
        );
        expect(http.pingCheck).toHaveBeenCalledWith(
          'docs',
          'http://localhost:3000/docs',
        );
      } catch (error) {
        expect(healthSpy).toHaveBeenCalledTimes(1);
        expect(error).toStrictEqual(
          new ServiceUnavailableException('Service Unavailable Exception'),
        );
      }
    });
  });
});

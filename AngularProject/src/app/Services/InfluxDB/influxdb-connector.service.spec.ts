import { TestBed } from '@angular/core/testing';

import { InfluxdbConnectorService } from './influxdb-connector.service';

describe('InfluxdbConnectorService', () => {
  let service: InfluxdbConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfluxdbConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

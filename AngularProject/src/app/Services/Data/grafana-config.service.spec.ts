import { TestBed } from '@angular/core/testing';

import { GrafanaConfigService } from './grafana-config.service';

describe('GrafanaConfigService', () => {
  let service: GrafanaConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrafanaConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

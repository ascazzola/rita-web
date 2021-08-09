import { TestBed } from '@angular/core/testing';

import { NgxRobocodeBlocklyService } from './ngx-robocode-blockly.service';

describe('NgxRobocodeBlocklyService', () => {
  let service: NgxRobocodeBlocklyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRobocodeBlocklyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

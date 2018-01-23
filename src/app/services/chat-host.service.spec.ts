import { TestBed, inject } from '@angular/core/testing';

import { ChatHostService } from './chat-host.service';

describe('ChatHostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatHostService]
    });
  });

  it('should be created', inject([ChatHostService], (service: ChatHostService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { DogGalleryService } from './dog-gallery.service';

describe('DogGalleryService', () => {
  let service: DogGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

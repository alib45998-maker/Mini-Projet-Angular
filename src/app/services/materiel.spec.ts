import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { MaterielService } from './materiel';

describe('MaterielService', () => {
  let service: MaterielService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(MaterielService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

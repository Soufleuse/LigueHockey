import { TestBed } from '@angular/core/testing';

import { EquipeStatistiquesService } from './equipe-statistiques.service';

describe('EquipeStatistiquesService', () => {
  let service: EquipeStatistiquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipeStatistiquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

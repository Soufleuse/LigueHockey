import { TestBed } from '@angular/core/testing';

import { JoueurStatistiquesService } from './joueur-statistiques.service';

describe('JoueurStatistiquesService', () => {
  let service: JoueurStatistiquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoueurStatistiquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

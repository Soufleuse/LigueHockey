import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeStatistiquesListeComponent } from './equipe-statistiques-liste.component';

describe('EquipeStatistiquesListeComponent', () => {
  let component: EquipeStatistiquesListeComponent;
  let fixture: ComponentFixture<EquipeStatistiquesListeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipeStatistiquesListeComponent]
    });
    fixture = TestBed.createComponent(EquipeStatistiquesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

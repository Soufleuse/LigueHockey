import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeStatistiquesAjouterComponent } from './equipe-statistiques-ajouter.component';

describe('EquipeStatistiquesAjouterComponent', () => {
  let component: EquipeStatistiquesAjouterComponent;
  let fixture: ComponentFixture<EquipeStatistiquesAjouterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipeStatistiquesAjouterComponent]
    });
    fixture = TestBed.createComponent(EquipeStatistiquesAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

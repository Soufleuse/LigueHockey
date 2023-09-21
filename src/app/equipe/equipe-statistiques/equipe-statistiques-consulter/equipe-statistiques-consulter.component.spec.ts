import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeStatistiquesConsulterComponent } from './equipe-statistiques-consulter.component';

describe('EquipeStatistiquesConsulterComponent', () => {
  let component: EquipeStatistiquesConsulterComponent;
  let fixture: ComponentFixture<EquipeStatistiquesConsulterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipeStatistiquesConsulterComponent]
    });
    fixture = TestBed.createComponent(EquipeStatistiquesConsulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

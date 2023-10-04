import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeStatistiquesModifierComponent } from './equipe-statistiques-modifier.component';

describe('EquipeStatistiquesModifierComponent', () => {
  let component: EquipeStatistiquesModifierComponent;
  let fixture: ComponentFixture<EquipeStatistiquesModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipeStatistiquesModifierComponent]
    });
    fixture = TestBed.createComponent(EquipeStatistiquesModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

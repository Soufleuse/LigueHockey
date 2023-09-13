import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurStatistiquesModifierComponent } from './joueur-statistiques-modifier.component';

describe('JoueurStatistiquesModifierComponent', () => {
  let component: JoueurStatistiquesModifierComponent;
  let fixture: ComponentFixture<JoueurStatistiquesModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoueurStatistiquesModifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurStatistiquesModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

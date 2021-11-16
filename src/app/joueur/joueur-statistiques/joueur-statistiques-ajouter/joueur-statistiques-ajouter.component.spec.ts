import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurStatistiquesAjouterComponent } from './joueur-statistiques-ajouter.component';

describe('JoueurStatistiquesAjouterComponent', () => {
  let component: JoueurStatistiquesAjouterComponent;
  let fixture: ComponentFixture<JoueurStatistiquesAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoueurStatistiquesAjouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurStatistiquesAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

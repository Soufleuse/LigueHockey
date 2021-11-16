import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurStatistiquesListeComponent } from './joueur-statistiques-liste.component';

describe('JoueurStatistiquesListeComponent', () => {
  let component: JoueurStatistiquesListeComponent;
  let fixture: ComponentFixture<JoueurStatistiquesListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoueurStatistiquesListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurStatistiquesListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

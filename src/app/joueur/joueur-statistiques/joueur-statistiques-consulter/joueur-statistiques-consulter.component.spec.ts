import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurStatistiquesConsulterComponent } from './joueur-statistiques-consulter.component';

describe('JoueurStatistiquesConsulterComponent', () => {
  let component: JoueurStatistiquesConsulterComponent;
  let fixture: ComponentFixture<JoueurStatistiquesConsulterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoueurStatistiquesConsulterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurStatistiquesConsulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

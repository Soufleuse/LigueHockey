import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeListeComponent } from './equipe-liste.component';

describe('EquipeListeComponent', () => {
  let component: EquipeListeComponent;
  let fixture: ComponentFixture<EquipeListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

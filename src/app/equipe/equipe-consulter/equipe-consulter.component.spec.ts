import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeConsulterComponent } from './equipe-consulter.component';

describe('EquipeConsulterComponent', () => {
  let component: EquipeConsulterComponent;
  let fixture: ComponentFixture<EquipeConsulterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipeConsulterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeConsulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

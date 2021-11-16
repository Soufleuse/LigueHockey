import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeModifierComponent } from './equipe-modifier.component';

describe('EquipeModifierComponent', () => {
  let component: EquipeModifierComponent;
  let fixture: ComponentFixture<EquipeModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipeModifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

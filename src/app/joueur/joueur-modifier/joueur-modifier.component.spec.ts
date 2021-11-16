import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurModifierComponent } from './joueur-modifier.component';

describe('JoueurModifierComponent', () => {
  let component: JoueurModifierComponent;
  let fixture: ComponentFixture<JoueurModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoueurModifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

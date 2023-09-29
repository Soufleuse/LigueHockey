import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignementModifierComponent } from './alignement-modifier.component';

describe('AlignementModifierComponent', () => {
  let component: AlignementModifierComponent;
  let fixture: ComponentFixture<AlignementModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlignementModifierComponent]
    });
    fixture = TestBed.createComponent(AlignementModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignementListeComponent } from './alignement-liste.component';

describe('AlignementListeComponent', () => {
  let component: AlignementListeComponent;
  let fixture: ComponentFixture<AlignementListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlignementListeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignementListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

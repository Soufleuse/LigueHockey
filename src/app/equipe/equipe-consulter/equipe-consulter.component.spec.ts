import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Equipe } from 'src/app/services/equipe';
import { EquipeService } from 'src/app/services/equipe.service';

import { EquipeConsulterComponent } from './equipe-consulter.component';

describe('EquipeConsulterComponent', () => {
  let component: EquipeConsulterComponent;
  let fixture: ComponentFixture<EquipeConsulterComponent>;
  let testBedService: NgControl;

  const faleActivatedRoute = {
    snapshot: { paramMap: { get(): string { return '1'; } } }
  };

  beforeEach(async () => {
    const equipeService = jasmine.createSpyObj<EquipeService>('EquipeService', ['obtenirEquipe']);
    equipeService.obtenirEquipe.and.returnValue(
      of(<Equipe>(<Equipe>{
        id: 1,
        nomEquipe: 'Canadiens',
        ville: 'Montréal',
        anneedebut: 1909,
        anneefin: -1,
        estDevenueEquipe: -1
      }))
    );

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ EquipeConsulterComponent ],
      providers: [
        FormBuilder,
        NgControl,
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: faleActivatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeConsulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
  it('devrait charger les données', inject([NgControl], (injectService: NgControl) => {
    let nomEquipe = component.equipeForm.controls['nomEquipe'];
    expect(nomEquipe.valid).toBeTruthy();
  }));
});

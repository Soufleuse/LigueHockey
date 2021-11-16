import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, NgControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Equipe } from 'src/app/services/equipe';
import { EquipeService } from 'src/app/services/equipe.service';

import { EquipeConsulterComponent } from './equipe-consulter.component';

describe('EquipeConsulterComponent', () => {
  let component: EquipeConsulterComponent;
  let fixture: ComponentFixture<EquipeConsulterComponent>;

  const faleActivatedRoute = {
    snapshot: { paramMap: { get(): string { return '1'; } } }
  };

  beforeEach(async () => {
    const equipeService = jasmine.createSpyObj<EquipeService>('EquipeService', ['obtenirEquipe']);
    equipeService.obtenirEquipe.and.returnValue(
      of(<Equipe>(<Equipe>{
        no_Equipe: 1,
        nom_Equipe: 'Canadiens',
        ville: 'Montréal',
        annee_debut: 1909,
        annee_fin: -1,
        est_Devenue_Equipe: -1
      }))
    );

    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ EquipeConsulterComponent ],
      providers: [
        FormBuilder,
        HttpClient,
        HttpHandler,
        NgControl,
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

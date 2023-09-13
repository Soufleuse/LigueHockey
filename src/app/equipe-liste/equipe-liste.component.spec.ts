import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Equipe } from '../services/equipe';
import { EquipeService } from '../services/equipe.service';

import { EquipeListeComponent } from './equipe-liste.component';

describe('EquipeListeComponent', () => {
  let component: EquipeListeComponent;
  let fixture: ComponentFixture<EquipeListeComponent>;

  beforeEach(async(() => {
    const equipeService = jasmine.createSpyObj<EquipeService>('EquipeService', ['obtenirListeEquipes']);

    equipeService.obtenirListeEquipes.and.returnValues(
      of<Equipe[]>(<Equipe[]>
        [
          <Equipe>{
            no_Equipe: 1,
            nom_Equipe: 'Canadiens',
            ville: 'Montréal',
            annee_debut: 1909,
            annee_fin: -1,
            est_Devenue_Equipe: -1
          },
          <Equipe>{
            no_Equipe: 2,
            nom_Equipe: 'Bruins',
            ville: 'Boston',
            annee_debut: 1917,
            annee_fin: -1,
            est_Devenue_Equipe: -1
          },
          <Equipe>{
            no_Equipe: 3,
            nom_Equipe: 'Maple Leafs',
            ville: 'Toronto',
            annee_debut: 1912,
            annee_fin: -1,
            est_Devenue_Equipe: -1
          }
        ]
      )
    );

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ EquipeListeComponent ],
      providers: [
        FormBuilder,
        {
          provide: EquipeService,
          useValue: equipeService
        }
      ]
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

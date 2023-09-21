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
            id: 1,
            nomEquipe: 'Canadiens',
            ville: 'Montréal',
            anneedebut: 1909,
            anneefin: -1,
            estDevenueEquipe: -1
          },
          <Equipe>{
            id: 2,
            nomEquipe: 'Bruins',
            ville: 'Boston',
            anneedebut: 1917,
            anneefin: -1,
            estDevenueEquipe: -1
          },
          <Equipe>{
            id: 3,
            nomEquipe: 'Maple Leafs',
            ville: 'Toronto',
            anneedebut: 1912,
            anneefin: -1,
            estDevenueEquipe: -1
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

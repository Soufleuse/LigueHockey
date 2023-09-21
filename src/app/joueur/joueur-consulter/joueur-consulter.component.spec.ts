import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurConsulterComponent } from './joueur-consulter.component';
import { JoueurService } from '../../services/joueur.service';
import { of } from 'rxjs';
import { JoueurDto } from '../../services/joueur';

describe('JoueurConsulterComponent', () => {
  let component: JoueurConsulterComponent;
  let fixture: ComponentFixture<JoueurConsulterComponent>;

  beforeEach(async () => {
    const joueurService = jasmine.createSpyObj<JoueurService>('JoueurService', ['obtenirJoueur']);
    const maDateNaissance = new Date();
    
    joueurService.obtenirJoueur.and.returnValue(
      of<JoueurDto>(<JoueurDto> {
        id: 1,
        prenom: 'Steve',
        nom: 'Lemieux',
        dateNaissance: maDateNaissance,
        villeNaissance: 'Levis',
        paysOrigine: 'Canada'
      })
    );

    await TestBed.configureTestingModule({
      declarations: [ JoueurConsulterComponent ],
      providers: [
        {
          provide: JoueurService,
          useValue: joueurService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurConsulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doit avoir 4 libellés', () => {
    let nbLibelle = fixture.nativeElement
  });
});

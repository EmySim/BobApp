import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JokesService } from "./services/jokes.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, BehaviorSubject } from 'rxjs';
import { Joke } from './model/joke.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;
  let jokesService: jasmine.SpyObj<JokesService>;
  let jokeSubject: BehaviorSubject<Joke | null>;

  beforeEach(async () => {
    // Créer un BehaviorSubject pour simuler le service
    jokeSubject = new BehaviorSubject<Joke | null>(null);
    
    const spy = jasmine.createSpyObj('JokesService', ['getRandomJoke', 'joke$']);
    spy.joke$.and.returnValue(jokeSubject.asObservable());

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: JokesService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    jokesService = TestBed.inject(JokesService) as jasmine.SpyObj<JokesService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a joke on ngOnInit', () => {
    spyOn(component, 'getRandomJoke');
    
    component.ngOnInit();
    
    expect(component.getRandomJoke).toHaveBeenCalled();
  });

  it('should call getRandomJoke when button is clicked', () => {
    component.getRandomJoke();
    
    expect(jokesService.getRandomJoke).toHaveBeenCalled();
  });

  it('should display joke content when joke is available', () => {
    const mockJoke: Joke = { joke: 'Test joke', response: 'Test response' };
    
    // Mettre à jour le subject avec une blague
    jokeSubject.next(mockJoke);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const jokeElement = compiled.querySelector('.joke');
    
    // Vérifier que la blague est affichée
    expect(jokeElement?.textContent?.trim()).toBe('Test joke');
  });

  it('should have correct title in toolbar', () => {
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('mat-toolbar span');
    
    expect(titleElement?.textContent?.trim()).toBe('Bob app');
  });
});
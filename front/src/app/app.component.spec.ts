// front/src/app/app.component.spec.ts (version améliorée)
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JokesService } from "./services/jokes.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: any;
  let jokesService: jasmine.SpyObj<JokesService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('JokesService', ['getRandomJoke', 'joke$']);

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
    const mockJoke = { joke: 'Test joke', response: 'Test response' };
    jokesService.joke$.and.returnValue(of(mockJoke));
    
    component.ngOnInit();
    
    expect(jokesService.getRandomJoke).toHaveBeenCalled();
  });

  it('should call getRandomJoke when button is clicked', () => {
    const mockJoke = { joke: 'Test joke', response: 'Test response' };
    jokesService.joke$.and.returnValue(of(mockJoke));
    
    component.getRandomJoke();
    
    expect(jokesService.getRandomJoke).toHaveBeenCalled();
  });

  it('should display joke content when joke is available', () => {
    const mockJoke = { joke: 'Test joke', response: 'Test response' };
    jokesService.joke$.and.returnValue(of(mockJoke));
    
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content')).toBeTruthy();
  });
});
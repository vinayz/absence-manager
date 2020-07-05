import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title logo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('Absence Manager');
  });

  it('should call mapMembersWithAbsences method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(app, 'mapMembersWithAbsences');
    app.ngOnInit();
    expect(app.mapMembersWithAbsences).toHaveBeenCalled(); 

  });

  it('should call search method on click of search button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const app = fixture.componentInstance;
    spyOn(app, 'search');
    app.ngOnInit();

    const compiled = fixture.nativeElement;
    app.userName = 'mike';

    compiled.querySelector('#search').click();

    expect(app.search).toHaveBeenCalled();
    
    if(app.userName == 'mike'){
      expect(app.absentMembers[0].name).toBe('Mike');
    }

  });

  it('should call download method on click of download button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(app, 'download');

    const compiled = fixture.nativeElement;
    compiled.querySelector('#download').click();

    expect(app.download).toHaveBeenCalled(); 

  });

  it('should test objects of absentMembers array has all keys', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(app, 'mapMembersWithAbsences');
    app.ngOnInit();

    app.absentMembers.forEach((element) =>{

      expect(Object.keys(element)).toContain('name');
      expect(Object.keys(element)).toContain('admitterNote');
      expect(Object.keys(element)).toContain('confirmedAt');
      expect(Object.keys(element)).toContain('createdAt');
      expect(Object.keys(element)).toContain('endDate');
      expect(Object.keys(element)).toContain('memberNote');
      expect(Object.keys(element)).toContain('rejectedAt');
      expect(Object.keys(element)).toContain('startDate');
      expect(Object.keys(element)).toContain('type');
      expect(Object.keys(element)).toContain('userId');

    });

  });

});


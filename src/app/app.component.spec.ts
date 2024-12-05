import { LocalStorageService } from './services/local-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './services/user.service';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let localStorageService: LocalStorageService;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    userService = TestBed.inject(UserService);
    localStorageService = TestBed.inject(LocalStorageService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to login when onClickLogin() is called', () => {
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickLogin();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should navigate to login when onClickSignup() is called', () => {
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickSignup();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call logout when onClickLogout is called', fakeAsync(() => {
    spyOn(userService, 'logout').and.returnValue(new Promise(() => {}));

    component.onClickLogout();
    tick();
    fixture.detectChanges();

    expect(userService.logout).toHaveBeenCalled();
  }));

  it('should call getItem() when ngOnInit() is called', () => {
    spyOn(localStorageService, 'getItem').and.callFake(() => '');

    component.ngOnInit();
    fixture.detectChanges();

    expect(localStorageService.getItem).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickHome() is called', () => {
    component.isLoggedIn = false;
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickHome();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });
});

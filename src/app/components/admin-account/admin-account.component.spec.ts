import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AdminAccountComponent } from './admin-account.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

describe('AdminAccountComponent', () => {
  let component: AdminAccountComponent;
  let fixture: ComponentFixture<AdminAccountComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [AdminAccountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAccountComponent);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call relevant functions when ngOnInit() is called', () => {
    spyOn(component, 'formInit').and.callThrough();
    spyOn(component, 'getParams').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.formInit).toHaveBeenCalled();
    expect(component.getParams).toHaveBeenCalled();
  });

  it('should call getUserData() when getAccountData() is called', fakeAsync(() => {
    spyOn(userService, 'getUserData').and.callFake(() => new Promise(() => {}));

    component.getAccountData();
    tick();
    fixture.detectChanges();

    expect(userService.getUserData).toHaveBeenCalled();
  }));

  it('should call router.navigate when onClickGoBack() is called', () => {
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickGoBack();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call getUserData() when createUser() is called', fakeAsync(() => {
    component.update = false;
    spyOn(userService, 'signup').and.callFake(() => new Promise(() => {}));

    component.createUser({});
    tick();
    fixture.detectChanges();

    expect(userService.signup).toHaveBeenCalled();
  }));
});

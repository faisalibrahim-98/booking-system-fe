import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppliedShiftsComponent } from './applied-shifts.component';
import { ShiftService } from 'src/app/services/shifts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

describe('AppliedShiftsComponent', () => {
  let component: AppliedShiftsComponent;
  let fixture: ComponentFixture<AppliedShiftsComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ShiftService],
      declarations: [AppliedShiftsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppliedShiftsComponent);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call relevant functions when ngOnInit() is called', () => {
    spyOn(component, 'getUserData').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should call getUserData() when getUserData() is called', fakeAsync(() => {
    spyOn(userService, 'getUserData').and.returnValue(new Promise(() => {}));

    component.getUserData();
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
});

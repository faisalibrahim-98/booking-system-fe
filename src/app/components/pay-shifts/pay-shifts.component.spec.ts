import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ShiftService } from 'src/app/services/shifts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { PayShiftsComponent } from './pay-shifts.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('PayShiftsComponent', () => {
  let component: PayShiftsComponent;
  let fixture: ComponentFixture<PayShiftsComponent>;
  let shiftService: ShiftService;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [ModalService, ShiftService],
      declarations: [PayShiftsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PayShiftsComponent);
    shiftService = TestBed.inject(ShiftService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getShiftsData() when ngOnInit() is called', () => {
    spyOn(component, 'getShiftsData').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.getShiftsData).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickGoBack() is called', () => {
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickGoBack();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call payShift() when payment() is called', fakeAsync(() => {
    spyOn(shiftService, 'payShift').and.callFake(() => new Promise(() => {}));

    component.payment({}, new Event('click'));
    tick();
    fixture.detectChanges();

    expect(shiftService.payShift).toHaveBeenCalled();
  }));

  it('should call getAllStaffData() when selectedShiftStaff() is called', fakeAsync(() => {
    spyOn(userService, 'getAllStaffData').and.callFake(
      () => new Promise(() => {})
    );

    component.selectedShiftStaff({});
    tick();
    fixture.detectChanges();

    expect(userService.getAllStaffData).toHaveBeenCalled();
  }));
});

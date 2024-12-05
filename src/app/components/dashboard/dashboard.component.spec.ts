import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShiftService } from 'src/app/services/shifts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let shiftService: ShiftService;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [ShiftService, ModalService],
      declarations: [DashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    shiftService = TestBed.inject(ShiftService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserData() when ngOnInit() is called', () => {
    spyOn(component, 'getUserData').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.getUserData).toHaveBeenCalled();
  });

  it('should call createDeleteForm() when ngOnInit() is called', () => {
    spyOn(component, 'createDeleteForm').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.createDeleteForm).toHaveBeenCalled();
  });

  it('should call getUserData() when getUserData() is called', () => {
    spyOn(userService, 'getUserData').and.returnValue(new Promise(() => {}));

    component.getUserData();
    fixture.detectChanges();

    expect(userService.getUserData).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickViewShifts() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickViewShifts();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickViewApplied() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickViewApplied();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickPayroll() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickPayroll();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickUpdate() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickUpdate();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickCreateShifts() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickCreateShifts();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickViewRatings() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickViewRatings();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call relevant functions when onClickAcceptInvite() is called', fakeAsync(() => {
    spyOn(shiftService, 'getShiftById').and.callFake(
      () => new Promise(() => {})
    );

    component.onClickAcceptInvite('6459b2d4278695875a0b4ffe');
    tick();
    fixture.detectChanges();

    expect(shiftService.getShiftById).toHaveBeenCalled();
  }));

  it('should set referPanel to null when onClickReferedShifts() is called', () => {
    component.referPanel = false;

    component.onClickReferedShifts();
    fixture.detectChanges();

    expect(component.referPanel).toBeTruthy();
  });

  it('should call router.navigate when onClickPayShifts() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickPayShifts();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickCreateSkill() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickCreateSkill();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickUpdateAdmin() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickUpdateAdmin();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickCreateAdmin() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickCreateAdmin();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickSearchStaff() is called', () => {
    component.userDetails._id = '6459b2d4278695875a0b4ffe';
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickSearchStaff();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should toggle adminPanel when onClickAdmin() is called', () => {
    component.adminPanel = false;
    fixture.detectChanges();

    component.onClickAdmin();
    fixture.detectChanges();

    expect(component.adminPanel).toBeTrue();
  });

  it('should call toggleModal() when onClickDeleteAdmin() is called', () => {
    spyOn(component, 'toggleModal').and.callThrough();

    component.onClickDeleteAdmin(new Event('click'));
    fixture.detectChanges();

    expect(component.toggleModal).toHaveBeenCalled();
  });

  it('should toggle referPanel when onClickReferedShifts() is called', () => {
    component.referPanel = false;
    fixture.detectChanges();

    component.onClickReferedShifts();
    fixture.detectChanges();

    expect(component.referPanel).toBeTrue();
  });

  it('should call createShift when onClickAcceptInvite() is called', fakeAsync(() => {
    spyOn(shiftService, 'getShiftById').and.callFake(
      () => new Promise(() => {})
    );

    component.onClickAcceptInvite('6459b2d4278695875a0b4ffe');
    tick();
    fixture.detectChanges();

    expect(shiftService.getShiftById).toHaveBeenCalled();
  }));
});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateShiftComponent } from './create-shift.component';
import { SkillsService } from 'src/app/services/skills.service';
import { ShiftService } from 'src/app/services/shifts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

describe('CreateShiftComponent', () => {
  let component: CreateShiftComponent;
  let fixture: ComponentFixture<CreateShiftComponent>;
  let skillService: SkillsService;
  let shiftService: ShiftService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [SkillsService, ShiftService],
      declarations: [CreateShiftComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateShiftComponent);
    component = fixture.componentInstance;
    shiftService = TestBed.inject(ShiftService);
    skillService = TestBed.inject(SkillsService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call formInit() when ngOnInit() is called', () => {
    spyOn(component, 'formInit').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.formInit).toHaveBeenCalled();
  });

  it('should call getSkills() when ngOnInit() is called', () => {
    spyOn(component, 'getSkills').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.getSkills).toHaveBeenCalled();
  });

  it('should call setDataForUpdate() when ngOnInit() is called', () => {
    spyOn(component, 'setDataForUpdate').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.setDataForUpdate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickGoBack() is called', () => {
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickGoBack();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call createShift when onSubmit() is called', fakeAsync(() => {
    component.eventId = '';
    spyOn(shiftService, 'createShift').and.callFake(
      () => new Promise(() => {})
    );

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(shiftService.createShift).toHaveBeenCalled();
  }));

  it('should call getShiftById() when getShiftData() is called', fakeAsync(() => {
    spyOn(shiftService, 'getShiftById').and.callFake(
      () => new Promise(() => {})
    );

    component.getShiftData();
    tick();
    fixture.detectChanges();

    expect(shiftService.getShiftById).toHaveBeenCalled();
  }));

  it('should call getAllSkills() when getSkills() is called', fakeAsync(() => {
    spyOn(skillService, 'getAllSkills').and.callFake(
      () => new Promise(() => {})
    );

    component.getSkills();
    tick();
    fixture.detectChanges();

    expect(skillService.getAllSkills).toHaveBeenCalled();
  }));
});

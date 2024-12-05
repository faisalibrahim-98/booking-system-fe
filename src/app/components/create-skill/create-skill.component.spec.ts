import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateSkillComponent } from './create-skill.component';
import { SkillsService } from 'src/app/services/skills.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

describe('CreateSkillComponent', () => {
  let component: CreateSkillComponent;
  let fixture: ComponentFixture<CreateSkillComponent>;
  let skillService: SkillsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [SkillsService],
      declarations: [CreateSkillComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSkillComponent);
    skillService = TestBed.inject(SkillsService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initForm() when ngOnInit() is called', () => {
    spyOn(component, 'initForm').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.initForm).toHaveBeenCalled();
  });

  it('should call createShift when onSubmit() is called', fakeAsync(() => {
    spyOn(skillService, 'createSkill').and.callFake(
      () => new Promise(() => {})
    );

    component.onSubmit();
    tick();
    fixture.detectChanges();

    expect(skillService.createSkill).toHaveBeenCalled();
  }));

  it('should call router.navigate when onClickGoBack() is called', () => {
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickGoBack();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });
});

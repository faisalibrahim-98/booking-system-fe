import { SkillsService } from 'src/app/services/skills.service';
import { ShiftService } from 'src/app/services/shifts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-create-shift',
  templateUrl: './create-shift.component.html',
  styleUrls: ['./create-shift.component.css'],
})
export class CreateShiftComponent {
  createShiftForm: FormGroup = new FormGroup({
    location: new FormControl(''),
    title: new FormControl(''),
    rate: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    date: new FormControl(''),
    eventType: new FormControl(''),
    role: new FormControl(''),
    status: new FormControl(''),
    skillsRequired: new FormArray([]),
  });

  successMessage = 'Shift Created';
  buttonText = 'Submit';
  submitted = false;
  userId = '';
  eventId = '';

  skills: Record<string, string>[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private skillsService: SkillsService,
    private shiftService: ShiftService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.queryParams['id'];
    this.formInit();
    this.getSkills();
    this.setDataForUpdate();
  }

  formInit() {
    this.createShiftForm = this.formBuilder.group({
      location: ['', Validators.required],
      title: ['', Validators.required],
      rate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      date: ['', Validators.required],
      eventType: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required],
      skillsRequired: new FormArray([]),
    });
  }

  onClickGoBack() {
    this.router.navigate(['/dashboard'], {
      queryParams: { id: this.userId },
    });
  }

  async onSubmit() {
    try {
      const shiftBody = {
        location: this.createShiftForm.value.location,
        title: this.createShiftForm.value.title,
        rate: this.createShiftForm.value.rate,
        start: new Date(
          `${this.createShiftForm.value.date} ${this.createShiftForm.value.startTime}`
        ),
        end: new Date(
          `${this.createShiftForm.value.date} ${this.createShiftForm.value.endTime}`
        ),
        eventType: this.createShiftForm.value.eventType,
        role: this.createShiftForm.value.role,
        status: this.createShiftForm.value.status,
        skillsRequired: this.createShiftForm.value.skillsRequired,
      };

      if (this.eventId) {
        await this.shiftService.updateShift(this.eventId, shiftBody);
      } else {
        await this.shiftService.createShift(shiftBody);
      }

      this.submitted = true;
    } catch (e) {
      console.log('API error', e);
    }
  }

  setDataForUpdate() {
    this.eventId = this.activatedRoute.snapshot.queryParams['eventId'];

    if (this.eventId) {
      this.buttonText = 'Update Shift';
      this.successMessage = 'Your shift has been Updated';
      this.getShiftData();
    }
  }

  async getShiftData() {
    try {
      const shiftData: Record<string, unknown> =
        await this.shiftService.getShiftById(this.eventId);

      this.setShiftData(shiftData);
    } catch {}
  }

  setShiftData(data: any) {
    this.createShiftForm.patchValue({
      location: data['location'],
      title: data['title'],
      rate: data['rate'],
      startTime: new Date(data.start).toTimeString().slice(0, 5),
      endTime: new Date(data.end).toTimeString().slice(0, 5),
      date: new Date(data.start).toISOString().split('T')[0],
      eventType: data['eventType'],
      role: data['role'],
      status: data['status'],
    });

    const formArray: FormArray = this.createShiftForm.get(
      'skillsRequired'
    ) as FormArray;

    data.skillsRequired.forEach((skill: string) => {
      formArray.push(new FormControl(skill));
    });

    this.skills = this.skills.map((skill: any) => {
      if (data.skillsRequired.includes(skill._id)) {
        skill.selected = true;
      }

      return skill;
    });
  }

  onCheckChange(event: any) {
    const formArray: FormArray = this.createShiftForm.get(
      'skillsRequired'
    ) as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: any) => {
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  async getSkills() {
    this.skills = await this.skillsService.getAllSkills();
  }
}

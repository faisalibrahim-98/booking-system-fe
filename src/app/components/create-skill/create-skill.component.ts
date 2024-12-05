import { SkillsService } from 'src/app/services/skills.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.css'],
})
export class CreateSkillComponent implements OnInit {
  skillForm: FormGroup = new FormGroup({
    skillName: new FormControl(''),
  });

  submitted = false;
  userId = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private skillService: SkillsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.userId = this.activatedRoute.snapshot.queryParams['id'];
  }

  initForm() {
    this.skillForm = this.formBuilder.group({
      skillName: ['', Validators.required],
    });
  }

  async onSubmit() {
    try {
      const skillBody = {
        skillName: this.skillForm.value.skillName,
      };

      await this.skillService.createSkill(skillBody);
      this.submitted = true;
    } catch {}
  }

  onClickGoBack() {
    this.router.navigate(['/dashboard'], {
      queryParams: { id: this.userId },
    });
  }
}

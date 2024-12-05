import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css'],
})
export class UpdateAccountComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    age: new FormControl(''),
  });

  submitted = false;
  userDetails: any = {};
  userId = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getUserData();
  }

  initForm() {
    this.accountForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      address: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  async getUserData(): Promise<void> {
    try {
      this.userId = this.activatedRoute.snapshot.queryParams['id'];
      this.userDetails = await this.userService.getUserData(this.userId);
      this.setAccountForm();
    } catch {}
  }

  setAccountForm() {
    this.accountForm.patchValue({
      fullName: this.userDetails.name,
      email: this.userDetails.email,
      address: this.userDetails.address,
      age: this.userDetails.age,
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.accountForm.invalid) {
      return;
    }

    const userBody = {
      name: this.accountForm.value.fullName,
      email: this.accountForm.value.email,
      address: this.accountForm.value.address,
      age: this.accountForm.value.age,
    };

    this.createUser(userBody);
  }

  async createUser(userBody: Record<string, unknown>) {
    try {
      await this.userService.updateUser(userBody);
    } catch {}
  }

  controlValid(control: string) {
    return (
      this.accountForm.get(control)?.invalid &&
      this.accountForm.get(control)?.touched
    );
  }

  onClickGoBack() {
    this.router.navigate(['/dashboard'], {
      queryParams: { id: this.userId },
    });
  }
}

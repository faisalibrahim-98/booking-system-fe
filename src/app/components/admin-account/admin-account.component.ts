import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css'],
})
export class AdminAccountComponent implements OnInit {
  adminAccountForm: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    age: new FormControl(''),
  });

  submitted = false;
  userId = '';
  update = false;
  heading = 'Create Admin Account';
  buttonText = 'Create Account';

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formInit();
    this.getParams();
  }

  getParams() {
    this.userId = this.activatedRoute?.snapshot.queryParams['id'];
    this.update = this.activatedRoute?.snapshot.queryParams['update'];

    if (this.update) {
      this.heading = 'Update Admin Account';
      this.buttonText = 'Update Account';
      this.getAccountData();
    }
  }

  async getAccountData() {
    try {
      const userData: Record<string, unknown> =
        await this.userService.getUserData(this.userId);

      this.setAccountData(userData);
    } catch {}
  }

  setAccountData(data: Record<string, unknown>) {
    this.adminAccountForm.patchValue({
      fullName: data['name'],
      email: data['email'],
      address: data['address'],
      age: data['age'],
    });
  }

  formInit() {
    this.adminAccountForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
        ],
      ],
      address: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  controlValid(control: string) {
    return (
      this.adminAccountForm.get(control)?.invalid &&
      this.adminAccountForm.get(control)?.touched
    );
  }

  onSubmit(): void {
    if (this.adminAccountForm.invalid) {
      return;
    }

    const userBody = {
      name: this.adminAccountForm.value.fullName,
      email: this.adminAccountForm.value.email,
      password: this.adminAccountForm.value.password,
      address: this.adminAccountForm.value.address,
      age: this.adminAccountForm.value.age,
      type: 'admin',
    };

    this.createUser(userBody);
  }

  async createUser(userBody: Record<string, unknown>) {
    try {
      if (this.update) {
        await this.userService.updateUser(userBody);
      } else {
        await this.userService.signup(userBody);
      }
      this.submitted = true;
    } catch {}
  }

  onClickGoBack() {
    this.router.navigate(['/dashboard'], {
      queryParams: { id: this.userId },
    });
  }
}

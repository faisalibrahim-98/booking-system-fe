import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { LocalStorageKeys } from 'src/app/shared.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    address: new FormControl(''),
    age: new FormControl(''),
  });

  submitted = false;

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
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

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    const userBody = {
      name: this.signupForm.value.fullName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      address: this.signupForm.value.address,
      age: this.signupForm.value.age,
      type: 'staff',
    };

    this.createUser(userBody);
  }

  async createUser(userBody: Record<string, unknown>) {
    try {
      const userData = await this.userService.signup(userBody);
      this.localStorageService.setItem(LocalStorageKeys.token, userData.token);
      this.router.navigate(['/dashboard'], {
        queryParams: { id: userData.user._id },
      });
    } catch {}
  }

  controlValid(control: string) {
    return (
      this.signupForm.get(control)?.invalid &&
      this.signupForm.get(control)?.touched
    );
  }
}

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageKeys } from 'src/app/shared.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    try {
      const userBody = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      const userData = await this.userService.login(userBody);

      this.localStorageService.setItem(LocalStorageKeys.token, userData.token);

      this.router.navigate(['dashboard'], {
        queryParams: { id: userData.user._id },
      });
    } catch {
      console.log('API error');
    }
  }

  onClickSignup() {
    this.router.navigate(['/signup']);
  }
}

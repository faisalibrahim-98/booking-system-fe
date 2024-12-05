import { ShiftService } from 'src/app/services/shifts.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  userDetails: any = {
    _id: '',
    username: '',
    email: '',
    password: '',
    type: '',
    notifications: [],
  };

  cvData: any = {};
  adminPanel = false;
  deleteSubmit = false;
  referPanel = false;

  deleteAccountForm: FormGroup = new FormGroup({
    idAdmin: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private shiftService: ShiftService,
    private modalService: ModalService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createDeleteForm();
    this.getUserData();
  }

  createDeleteForm() {
    this.deleteAccountForm = this.formBuilder.group({
      idAdmin: ['', Validators.required],
    });
  }

  async getUserData(): Promise<void> {
    try {
      const id = this.activatedRoute.snapshot.queryParams['id'];
      this.userDetails = await this.userService.getUserData(id);
    } catch {}
  }

  onClickViewShifts() {
    this.router.navigate(['/shiftsg'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  onClickViewRatings() {
    this.router.navigate(['/ratings'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  onClickViewApplied() {
    this.router.navigate(['/applied'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  onClickPayroll() {
    this.router.navigate(['/payroll'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  onClickUpdate() {
    this.router.navigate(['/updateAccount'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  onClickCreateShifts() {
    this.router.navigate(['/createshift'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  onClickSearchStaff() {
    this.router.navigate(['/search'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  onClickAdmin() {
    this.adminPanel = !this.adminPanel;
  }

  onClickCreateAdmin() {
    this.router.navigate(['/admin'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  onClickUpdateAdmin() {
    this.router.navigate(['/admin'], {
      queryParams: { id: this.userDetails._id, update: true },
    });
  }

  onClickDeleteAdmin(event: any) {
    this.toggleModal(event);
  }

  async onSubmitDelete() {
    try {
      this.deleteSubmit = true;

      if (this.deleteAccountForm.invalid) {
        return;
      }

      const userBody = {
        id: this.deleteAccountForm.value.idAdmin,
      };

      await this.userService.deleteUser(userBody);
    } catch {}
  }

  toggleModal(event: Event) {
    this.modalService.toggleModal(event, 'delete-admin');
  }

  onClickCreateSkill() {
    this.router.navigate(['/skill'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  onClickPayShifts() {
    this.router.navigate(['/pay'], {
      queryParams: { id: this.userDetails._id },
    });
  }

  onClickReferedShifts() {
    this.referPanel = !this.referPanel;
  }

  async onClickAcceptInvite(shiftId: any) {
    try {
      const shift = await this.shiftService.getShiftById(shiftId);

      const body = {
        shift,
        user: this.userDetails,
      };

      await this.shiftService.applyShift(body);
      await this.shiftService.removeNotification(body);

      await this.getUserData();
      this.referPanel = false;
    } catch {}
  }
}

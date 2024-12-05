import { RatingsService } from 'src/app/services/ratings.service';
import { ShiftService } from 'src/app/services/shifts.service';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-shifts',
  templateUrl: './pay-shifts.component.html',
  styleUrls: ['./pay-shifts.component.css'],
})
export class PayShiftsComponent implements OnInit {
  userId = '';
  shifts: any = [];
  ratingAll: any = '';
  allUsers: any = [];
  ratingDone = false;
  selectedShift: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ratingsService: RatingsService,
    private modalService: ModalService,
    private shiftService: ShiftService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.queryParams['id'];
    this.getShiftsData();
  }

  async getShiftsData() {
    this.shifts = await this.shiftService.getAllShift();
    this.shifts = this.shifts.filter((shift: any) => shift.status !== 'paid');
    this.shifts = this.shifts.map((shift: any) => {
      shift.date = new Date(shift.start).toDateString();
      return shift;
    });
  }

  onClickGoBack() {
    this.router.navigate(['/dashboard'], {
      queryParams: { id: this.userId },
    });
  }

  onClickPay(shiftDetails: any, event: any) {
    this.selectedShift = shiftDetails;

    const currentTime = new Date();
    const shiftEndTime = new Date(shiftDetails.end);
    if (shiftEndTime < currentTime) {
      this.payment(shiftDetails, event);
    } else {
      this.toggleEarlyPayModal(event);
    }
  }

  async payment(shiftDetails: any, event: any) {
    try {
      await this.shiftService.payShift(shiftDetails);
      this.shifts = this.shifts.filter(
        (shift: any) => shift._id !== shiftDetails._id
      );

      this.allUsers = await this.selectedShiftStaff(shiftDetails);

      this.modalService.toggleModal(event, 'rating');
    } catch {}
  }

  async selectedShiftStaff(shiftDetails: any) {
    let staff = await this.userService.getAllStaffData();
    staff = staff.filter((user: any) =>
      user.shifts.shiftsPaid.includes(shiftDetails._id)
    );
    return staff;
  }

  async onClickRateAll() {
    try {
      let shiftStaff = await this.selectedShiftStaff(this.selectedShift);

      shiftStaff = shiftStaff.map((staff: any) => {
        return staff._id;
      });

      const body = {
        userId: this.userId,
        rating: this.ratingAll,
        shiftStaff,
      };

      await this.ratingsService.rateAllStaff(body);

      this.ratingDone = true;
    } catch {}
  }

  async onClickRateIndividual(rating: any, staffId: any) {
    try {
      const body = {
        userId: this.userId,
        rating,
        staffId,
      };

      await this.ratingsService.rateIndividualStaff(body);

      this.allUsers = this.allUsers.filter((user: any) => user._id !== staffId);
    } catch {}
  }

  closeModal(event: Event) {
    this.modalService.toggleModal(event, 'rating');
    this.selectedShift = null;
    this.ratingAll = '';
    this.ratingDone = false;
  }

  toggleEarlyPayModal(event: any) {
    this.modalService.toggleModal(event, 'earlyPay');
  }
}

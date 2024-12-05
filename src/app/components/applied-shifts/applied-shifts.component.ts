import { ShiftService } from 'src/app/services/shifts.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applied-shifts',
  templateUrl: './applied-shifts.component.html',
  styleUrls: ['./applied-shifts.component.css'],
})
export class AppliedShiftsComponent implements OnInit {
  userDetails: any = {};
  shifts: any = [];
  userId = '';
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private shiftService: ShiftService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  async getUserData(): Promise<void> {
    try {
      this.userId = this.activatedRoute.snapshot.queryParams['id'] || '';
      this.userDetails = await this.userService.getUserData(this.userId);

      await this.getShiftData(this.userDetails.shifts.shiftsBooked);
      this.isLoading = false;
    } catch {}
  }

  async getShiftData(shiftsBooked: any) {
    for (let i = 0; i < shiftsBooked.length; i++) {
      try {
        const data = await this.shiftService.getShiftById(shiftsBooked[i]);
        data.date = new Date(data.start).toDateString();
        data.start = new Date(data.start).toTimeString().slice(0, 5);
        data.end = new Date(data.end).toTimeString().slice(0, 5);
        this.shifts.push(data);
      } catch {}
    }
  }

  onClickGoBack() {
    this.router.navigate(['/dashboard'], {
      queryParams: { id: this.userId },
    });
  }
}

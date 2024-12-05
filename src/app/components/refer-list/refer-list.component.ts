import { ShiftService } from 'src/app/services/shifts.service';
import { UserService } from 'src/app/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-refer-list',
  templateUrl: './refer-list.component.html',
  styleUrls: ['./refer-list.component.css'],
})
export class ReferListComponent implements OnInit {
  @Input() event: any = {};
  staffList: any = [];
  userId = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private shiftService: ShiftService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.queryParams['id'];
    this.getStaffData();
  }

  async getStaffData() {
    try {
      this.staffList = await this.userService.getAllStaffData();
      this.staffList = this.staffList.filter((staff: any) => {
        for (let i = 0; i < staff.experience.length; i++) {
          if (staff.experience[i].skillName === this.event.role) {
            return staff;
          }
        }
      });

      this.staffList = this.staffList.filter((staff: any) => {
        if (staff.notifications.length) {
          for (let i = 0; i < staff.notifications.length; i++) {
            if (staff.notifications[i].shiftId !== this.event._id) {
              return staff;
            }
          }
        } else {
          return staff;
        }
      });

      this.calRatingAvg(this.staffList);
    } catch {}
  }

  calRatingAvg(staffList: any) {
    staffList.forEach((staff: any) => {
      let avgStars = 0;
      for (let i = 0; i < staff.ratings.length; i++) {
        avgStars += staff.ratings[i].stars;
      }

      avgStars = avgStars / staff.ratings.length;

      staff.totalRating = avgStars;
    });
  }

  async onClickRefer(staffMember: any) {
    try {
      const body = {
        user: staffMember,
        shiftId: this.event._id,
        referer: this.userId,
      };

      await this.shiftService.referUser(body);

      this.staffList = this.staffList.filter(
        (staff: any) => staff._id !== staffMember._id
      );
    } catch {}
  }
}

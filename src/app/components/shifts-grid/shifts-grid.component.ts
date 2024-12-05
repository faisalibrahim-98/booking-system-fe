import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ShiftService } from 'src/app/services/shifts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shifts-grid',
  templateUrl: './shifts-grid.component.html',
  styleUrls: ['./shifts-grid.component.css'],
})
export class ShiftsGridComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    dayMaxEventRows: true,
    displayEventTime: false,
    events: [],
    eventDisplay: 'block',
    headerToolbar: {
      start: 'title',
      center: '',
      end: 'prev,next',
    },
    contentHeight: 'auto',
  };

  shifts: any = {};
  currentEvent: any = {};
  userId = '';
  userDetails: any = {};
  applied = false;
  userAvailable = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private shiftService: ShiftService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.queryParams['id'];
    this.getShiftsData();
    this.getUserData();

    this.calendarOptions['eventClick'] = (info) => {
      this.toggleModal(new MouseEvent('click'));
      this.setCurrentEvent(info);
    };
  }

  setCurrentEvent(info: any) {
    this.currentEvent = JSON.parse(JSON.stringify(this.shifts)).find(
      (shift: any) => shift._id === info.event._def.extendedProps['_id']
    );

    this.currentEvent.date = new Date(this.currentEvent.start).toDateString();
    this.currentEvent.start = new Date(this.currentEvent.start)
      .toTimeString()
      .slice(0, 5);
    this.currentEvent.end = new Date(this.currentEvent.end)
      .toTimeString()
      .slice(0, 5);

    this.isShiftOld();

    this.setApplied();
  }

  isShiftOld() {
    let today = new Date();
    let shiftDate = new Date(this.currentEvent.date);

    this.currentEvent.hideRefer = today > shiftDate;
  }

  setApplied() {
    if (this.userDetails.shifts.shiftsBooked.includes(this.currentEvent._id)) {
      this.applied = true;
    }
  }

  async getShiftsData() {
    this.shifts = await this.shiftService.getAllShift();
    this.shifts = this.shifts.filter((shift: any) => shift.status !== 'paid');
    this.calendarOptions.events = this.shifts as any;
  }

  async getUserData(): Promise<void> {
    try {
      this.userDetails = await this.userService.getUserData(this.userId);
    } catch {}
  }

  toggleModal(event: Event) {
    this.modalService.toggleModal(event, 'event-info');
  }

  closeModal(event: Event) {
    this.toggleModal(event);
    this.currentEvent = {};
    this.applied = false;
    this.userAvailable = true;
  }

  onClickEdit(): void {
    this.router.navigate(['/createshift'], {
      queryParams: {
        id: this.userId,
        eventId: this.currentEvent._id,
      },
    });
  }

  onClickGoBack() {
    this.router.navigate(['/dashboard'], {
      queryParams: { id: this.userId },
    });
  }

  async onClickApply() {
    try {
      const body = {
        shift: this.currentEvent,
        user: this.userDetails,
      };
      let userIsAvailable = await this.checkUserIsFree(this.currentEvent);

      if (userIsAvailable) {
        await this.shiftService.applyShift(body);
        await this.getUserData();
        this.applied = true;
      } else {
        this.userAvailable = false;
      }
    } catch {}
  }

  async checkUserIsFree(currentEvent: any) {
    await this.getUserData();

    const userShifts = await this.getUsersShifts();

    let currentEventDate = new Date(currentEvent.date).toDateString();
    let free = true;

    userShifts.forEach((shift: any) => {
      let userEvenDate = new Date(shift.start).toDateString();

      if (userEvenDate === currentEventDate) {
        free = false;
      }
    });

    return free;
  }

  async getUsersShifts() {
    let userShifts = [];

    for (let i = 0; i < this.userDetails.shifts.shiftsBooked.length; i++) {
      const shift = await this.shiftService.getShiftById(
        this.userDetails.shifts.shiftsBooked[i]
      );
      userShifts.push(shift);
    }

    return userShifts;
  }
}

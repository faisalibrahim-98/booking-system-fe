import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShiftService } from 'src/app/services/shifts.service';
import { ShiftsGridComponent } from './shifts-grid.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from 'src/app/services/modal.service';
import { FullCalendarModule } from '@fullcalendar/angular';

describe('ShiftsGridComponent', () => {
  let component: ShiftsGridComponent;
  let fixture: ComponentFixture<ShiftsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FullCalendarModule,
      ],
      providers: [ModalService, ShiftService],
      declarations: [ShiftsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShiftsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

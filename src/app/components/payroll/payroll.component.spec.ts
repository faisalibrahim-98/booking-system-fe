import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShiftService } from 'src/app/services/shifts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PayrollComponent } from './payroll.component';

describe('PayrollComponent', () => {
  let component: PayrollComponent;
  let fixture: ComponentFixture<PayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ShiftService],
      declarations: [PayrollComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

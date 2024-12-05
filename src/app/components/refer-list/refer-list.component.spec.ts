import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShiftService } from 'src/app/services/shifts.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ReferListComponent } from './refer-list.component';

describe('ReferListComponent', () => {
  let component: ReferListComponent;
  let fixture: ComponentFixture<ReferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ShiftService],
      declarations: [ReferListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { Router } from '@angular/router';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomepageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call router.navigate when onClickLogin() is called', () => {
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickLogin();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should call router.navigate when onClickSignup() is called', () => {
    spyOn(router, 'navigate').and.callFake(() => new Promise(() => {}));

    component.onClickSignup();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });
});

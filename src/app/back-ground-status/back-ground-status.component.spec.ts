import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackGroundStatusComponent } from './back-ground-status.component';

describe('BackGroundStatusComponent', () => {
  let component: BackGroundStatusComponent;
  let fixture: ComponentFixture<BackGroundStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackGroundStatusComponent]
    });
    fixture = TestBed.createComponent(BackGroundStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

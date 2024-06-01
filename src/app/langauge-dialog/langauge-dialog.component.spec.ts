import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangaugeDialogComponent } from './langauge-dialog.component';

describe('LangaugeDialogComponent', () => {
  let component: LangaugeDialogComponent;
  let fixture: ComponentFixture<LangaugeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LangaugeDialogComponent]
    });
    fixture = TestBed.createComponent(LangaugeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopTimerComponent } from './stop-timer.component';

describe('StopTimerComponent', () => {
  let component: StopTimerComponent;
  let fixture: ComponentFixture<StopTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

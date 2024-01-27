import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEventsComponent } from './detail-events.component';

describe('DetailEventsComponent', () => {
  let component: DetailEventsComponent;
  let fixture: ComponentFixture<DetailEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailEventsComponent]
    });
    fixture = TestBed.createComponent(DetailEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

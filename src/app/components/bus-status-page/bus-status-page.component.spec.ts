import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStatusPageComponent } from './bus-status-page.component';

describe('BusStatusPageComponent', () => {
  let component: BusStatusPageComponent;
  let fixture: ComponentFixture<BusStatusPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusStatusPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusStatusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

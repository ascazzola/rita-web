import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxRobocodeBlocklyComponent } from './ngx-robocode-blockly.component';

describe('NgxRobocodeBlocklyComponent', () => {
  let component: NgxRobocodeBlocklyComponent;
  let fixture: ComponentFixture<NgxRobocodeBlocklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxRobocodeBlocklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxRobocodeBlocklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

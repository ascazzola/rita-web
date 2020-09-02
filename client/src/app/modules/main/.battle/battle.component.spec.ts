import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBattleComponent } from './new-battle.component';

describe('BattleComponent', () => {
  let component: NewBattleComponent;
  let fixture: ComponentFixture<NewBattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

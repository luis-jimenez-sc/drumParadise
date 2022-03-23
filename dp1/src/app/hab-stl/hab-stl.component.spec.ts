import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabSTLComponent } from './hab-stl.component';

describe('HabSTLComponent', () => {
  let component: HabSTLComponent;
  let fixture: ComponentFixture<HabSTLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabSTLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabSTLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

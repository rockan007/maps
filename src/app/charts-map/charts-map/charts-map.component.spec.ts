import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsMapComponent } from './charts-map.component';

describe('ChartsMapComponent', () => {
  let component: ChartsMapComponent;
  let fixture: ComponentFixture<ChartsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

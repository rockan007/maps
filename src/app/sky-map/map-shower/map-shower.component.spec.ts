import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapShowerComponent } from './map-shower.component';

describe('MapShowerComponent', () => {
  let component: MapShowerComponent;
  let fixture: ComponentFixture<MapShowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapShowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

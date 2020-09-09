import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyMapComponent } from './sky-map.component';

describe('SkyMapComponent', () => {
  let component: SkyMapComponent;
  let fixture: ComponentFixture<SkyMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkyMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDetalleComponent } from './sensor-detalle.component';

describe('SensorDetalleComponent', () => {
  let component: SensorDetalleComponent;
  let fixture: ComponentFixture<SensorDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

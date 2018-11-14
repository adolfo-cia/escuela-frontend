import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoComponent } from './aviso.component';

describe('AvisoComponent', () => {
  let component: AvisoComponent;
  let fixture: ComponentFixture<AvisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPropertyComponent } from './manager-property.component';

describe('ManagerPropertyComponent', () => {
  let component: ManagerPropertyComponent;
  let fixture: ComponentFixture<ManagerPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

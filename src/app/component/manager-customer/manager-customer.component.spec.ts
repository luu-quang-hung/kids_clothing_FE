import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCustomerComponent } from './manager-customer.component';

describe('ManagerAccountComponent', () => {
  let component: ManagerCustomerComponent;
  let fixture: ComponentFixture<ManagerCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

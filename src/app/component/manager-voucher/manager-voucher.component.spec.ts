import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerVoucherComponent } from './manager-voucher.component';

describe('ManagerVoucherComponent', () => {
  let component: ManagerVoucherComponent;
  let fixture: ComponentFixture<ManagerVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

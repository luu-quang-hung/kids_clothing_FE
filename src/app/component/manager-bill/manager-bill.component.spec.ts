import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBillComponent } from './manager-bill.component';

describe('ManagerBillComponent', () => {
  let component: ManagerBillComponent;
  let fixture: ComponentFixture<ManagerBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

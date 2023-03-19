import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProductComponent } from './manager-product.component';

describe('ManagerProductComponent', () => {
  let component: ManagerProductComponent;
  let fixture: ComponentFixture<ManagerProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerQuantityComponent } from './manager-quantity.component';

describe('ManagerQuantityComponent', () => {
  let component: ManagerQuantityComponent;
  let fixture: ComponentFixture<ManagerQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

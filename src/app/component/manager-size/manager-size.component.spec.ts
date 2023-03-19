import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSizeComponent } from './manager-size.component';

describe('ManagerSizeComponent', () => {
  let component: ManagerSizeComponent;
  let fixture: ComponentFixture<ManagerSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

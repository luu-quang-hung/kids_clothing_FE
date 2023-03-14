import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultManagerComponent } from './default-manager.component';

describe('DefaultManagerComponent', () => {
  let component: DefaultManagerComponent;
  let fixture: ComponentFixture<DefaultManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

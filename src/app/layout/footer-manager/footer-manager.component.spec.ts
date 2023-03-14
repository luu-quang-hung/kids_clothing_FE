import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterManagerComponent } from './footer-manager.component';

describe('FooterManagerComponent', () => {
  let component: FooterManagerComponent;
  let fixture: ComponentFixture<FooterManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

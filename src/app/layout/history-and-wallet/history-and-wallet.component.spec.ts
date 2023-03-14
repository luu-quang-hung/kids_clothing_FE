import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAndWalletComponent } from './history-and-wallet.component';

describe('HistoryAndWalletComponent', () => {
  let component: HistoryAndWalletComponent;
  let fixture: ComponentFixture<HistoryAndWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryAndWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAndWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

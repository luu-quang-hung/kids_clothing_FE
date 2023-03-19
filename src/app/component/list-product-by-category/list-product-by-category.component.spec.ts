import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductByCategoryComponent } from './list-product-by-category.component';

describe('ListProductByCategoryComponent', () => {
  let component: ListProductByCategoryComponent;
  let fixture: ComponentFixture<ListProductByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

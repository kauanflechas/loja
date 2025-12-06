import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProduct } from './create-edit-product';

describe('CreateEditProduct', () => {
  let component: CreateEditProduct;
  let fixture: ComponentFixture<CreateEditProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

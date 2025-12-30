import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.model';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../shared/services/notification.service';
import { PRODUCT_MESSAGES } from '../../constants/product.contants';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  @Input() product?: Product;
  @Output() onClose = new EventEmitter<boolean>();

  private fb = inject(FormBuilder).nonNullable;
  private service = inject(ProductService);
  private notify = inject(NotificationService);

  readonly messages = PRODUCT_MESSAGES; 

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    if (this.product) {
      this.form.patchValue(this.product);
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue();

    const request$ = this.product
      ? this.service.update(this.product.id, data as Product)
      : this.service.create(data as Product);

    request$.subscribe({
      next: () => {
        this.notify.success(
          this.product
            ? this.messages.UPDATED
            : this.messages.CREATED
        );
        this.onClose.emit(true);
      },
      error: () => {
        this.notify.error(this.messages.CREATE_ERROR);
      },
    });
  }

  cancel(): void {
    this.onClose.emit(false);
  }
}

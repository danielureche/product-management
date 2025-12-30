import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../components/product-form/product-form.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { ProductService } from '../../../core/services/product.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { Product } from '../../../core/models/product.model';
import { Component, inject, OnInit } from '@angular/core';
import { ProductTableComponent } from '../components/product-table/product-table.component';
import { DELETE_MODAL_CONFIG, PRODUCT_LABELS, PRODUCT_MESSAGES } from '../constants/product.contants';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    ProductTableComponent,
    ProductFormComponent,
    ConfirmModalComponent,
  ],
  templateUrl: './product-list.page.html',
})
export class ProductListPage implements OnInit {
  private service = inject(ProductService);
  private notify = inject(NotificationService);

  products: Product[] = [];

  showFormModal = false;
  selectedProduct?: Product;

  showDeleteModal = false;
  productToDeleteId?: number;

  readonly labels = PRODUCT_LABELS;
  readonly deleteModalConfig = DELETE_MODAL_CONFIG;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.findAll().subscribe({
      next: (data) => (this.products = data),
    });
  }

  openForm(product?: Product): void {
    this.selectedProduct = product;
    this.showFormModal = true;
  }

  closeForm(refresh: boolean): void {
    this.showFormModal = false;
    this.selectedProduct = undefined;
    if (refresh) this.load();
  }

  toggle(product: Product): void {
    this.service.changeStatus(product.id, !product.active).subscribe({
      next: () => {
        this.notify.success(PRODUCT_MESSAGES.UPDATED);
        this.load();
      },
      error: () => this.notify.error(PRODUCT_MESSAGES.UPDATE_ERROR),
    });
  }

  openDeleteModal(product: Product): void {
    this.productToDeleteId = product.id;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.productToDeleteId = undefined;
  }

  confirmDelete(): void {
    if (!this.productToDeleteId) return;

    this.service.delete(this.productToDeleteId).subscribe({
      next: () => {
        this.notify.success(PRODUCT_MESSAGES.DELETED);
        this.load();
        this.closeDeleteModal();
      },
      error: () => this.notify.error(PRODUCT_MESSAGES.DELETE_ERROR),
    });
  }
}

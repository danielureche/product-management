import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Product } from "../../../../core/models/product.model";
import { PRODUCT_LABELS, TABLE_HEADERS } from "../../constants/product.contants";

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent {
  @Input() products: Product[] = [];

  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  @Output() toggle = new EventEmitter<Product>();

  readonly headers = TABLE_HEADERS;
  readonly labels = PRODUCT_LABELS;
}

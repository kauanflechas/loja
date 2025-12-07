import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { Product, ProdutoRequest } from '../../models/product.model';
import { ProductService } from '../../service/product.service';


@Component({
  selector: 'app-modal',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product, private readonly service: ProductService, private readonly ref: MatDialogRef<Modal>) { }

  cancel() {
    this.ref.close();
  }

  confirm() {
    this.service.deleteProduct(this.data.id).subscribe(() => this.ref.close());
  }
}
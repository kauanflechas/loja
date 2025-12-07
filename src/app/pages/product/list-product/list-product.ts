import { Component, signal } from '@angular/core';
import { Product, ProdutoRequest } from '../../../models/product.model';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Modal } from '../../../components/modal/modal';
import { MatIcon } from "@angular/material/icon";
import { CurrencyPipe } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table'
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-list-product',
  imports: [MatIcon,
    CurrencyPipe,
    MatTable,
    MatHeaderCellDef,
    MatCell,
    MatColumnDef,
    MatHeaderCell,
    MatCellDef,
    MatIconButton,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatHeaderRowDef],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css',
})
export class ListProduct {

  constructor(private readonly service: ProductService, public dialog: MatDialog, private readonly router: Router) {
  }

  products = signal<Product[]>([]);
  displayedColumns = ['nome', 'preco', 'codigoBarras', 'acoes', ];
  ngOnInit(): void {
    this.service.getProducts().subscribe(r => this.products.set(r));
  }

  async goToDetails(id: number) {
    await this.router.navigate(['/product/details', id]);
  }

  async goToEdit(id: number) {
    await this.router.navigate(['/product/edit', id]);
  }

  openDeleteModal(product: Product) {
    const dialogRef = this.dialog.open(Modal, {
      width: '350px',
      data: product
    });

    dialogRef.afterClosed().subscribe(() => this.getProducts());
  }

  getProducts() {
    this.service.getProducts().subscribe(r => this.products.set(r));
  }

}

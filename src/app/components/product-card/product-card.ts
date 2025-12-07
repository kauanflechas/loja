import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model'
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatIcon, MatButton, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  // @Input() permite que o componente pai passe o objeto 'product' para cá.
  @Input() product!: Product;

  // Método para calcular o preço final com desconto
  get discountedPrice(): number {
    return this.product.preco * (1 - (this.product.desconto ?? 0) / 100);
  }

  onAddToCart(): void {


  }
}

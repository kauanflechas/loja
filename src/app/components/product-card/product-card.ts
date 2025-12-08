import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model'
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { MatButton } from '@angular/material/button';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, MatIcon, MatButton, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {

  constructor(private readonly service: CartService) {
  }

  @Input() product!: Product;


  get discountedPrice(): number {
    return this.product.preco * (1 - (this.product.desconto ?? 0) / 100);
  }

  onAddToCart(produto: Product): void {

    produto.preco = this.discountedPrice
    const ok = this.service.addItem(produto);

    if (!ok) {
      alert("Este produto já está no carrinho!");
      return;
    }

    alert("Produto adicionado ao carrinho!");


  }
}

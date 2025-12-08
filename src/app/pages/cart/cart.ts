import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CurrencyPipe } from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  imports: [
    CurrencyPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  itens: any[] = [];
  total = 0;

  constructor(private readonly carrinhoService: CartService) { }


  ngOnInit(): void {
    this.atualizar();
  }

  atualizar() {
    this.itens = this.carrinhoService.getItems();
    this.total = this.carrinhoService.getTotal();
  }

  remover(id: number) {
    this.carrinhoService.removeItem(id);
    this.atualizar();
  }

  finalizar() {
    this.carrinhoService.clearCart();
    this.atualizar();
    alert('Compra finalizada com sucesso!');
  }
}
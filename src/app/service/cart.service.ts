import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly cartKey = 'cart_items';

  private cartItems: any[] = [];
  private readonly cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCart();
  }


  private loadCart() {
    const data = localStorage.getItem(this.cartKey);
    this.cartItems = data ? JSON.parse(data) : [];
    this.updateCount();
  }

  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    this.updateCount();
  }

  private updateCount() {
    this.cartCountSubject.next(this.cartItems.length);
  }

  getItems() {
    return this.cartItems;
  }

  exists(productId: number) {
    return this.cartItems.some(p => p.id === productId);
  }

  addItem(product: any): boolean {
    if (this.exists(product.id)) {
      return false; // já existe
    }

    this.cartItems.push(product);
    this.saveCart();
    return true;
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.preco, 0);
  }

}

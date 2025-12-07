import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProduct, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {

  }

  private apiUrl = 'http://localhost:8080/v1/produtos';

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(productData: CreateProduct) {
    return this.http.post(this.apiUrl, productData);
  }

}

import { Component, OnInit, signal } from '@angular/core';
import { Product, ProdutoRequest } from '../../../models/product.model';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { MatFormField, MatInput } from "@angular/material/input";
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-detail-product',
  imports: [CurrencyPipe, MatFormField, MatInput, MatButton],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css',
})
export class DetailProduct implements OnInit {

  id!: number;
  product = signal<Product | null>(null);
  constructor(private readonly route: ActivatedRoute, private readonly service: ProductService) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getProductById(this.id).subscribe(r => this.product.set(r));
  }

  back() {
    window.history.back();
  }

}

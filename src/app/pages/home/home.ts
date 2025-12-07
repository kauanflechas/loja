import { Component, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../models/product.model';
import { ProductCard } from "../../components/product-card/product-card";
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { ɵInternalFormsSharedModule } from "@angular/forms";


@Component({
  selector: 'app-home',
  imports: [
    MatButton,
    FaIconComponent,
    ProductCard,
    ɵInternalFormsSharedModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  constructor(private router: Router, private service: ProductService) { }

  protected readonly faFacebookF = faFacebookF;
  protected readonly faPlus = faPlus;
  public products = signal<Product[]>([]);

  toCreateProduct() {
    this.router.navigate(['/product/create-edit']);
  }
  ngOnInit(): void {
    this.service.getProducts().subscribe((products) => {
      this.products.set(products);
    }
    );
  }
}

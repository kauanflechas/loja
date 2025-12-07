import { CreateProduct } from './../../../models/product.model';
import { ProductService } from './../../../service/product.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-edit-product',
  imports: [MatFormField, MatLabel, MatInput, MatButton, ReactiveFormsModule],
  templateUrl: './create-edit-product.html',
  styleUrl: './create-edit-product.css',
})
export class CreateEditProduct implements OnInit {
  id?: number;
  constructor(private readonly route: ActivatedRoute, private router: Router, private productService: ProductService) {

  }

  productForm = new FormGroup({
    nome: new FormControl(''),
    descricao: new FormControl(''),
    preco: new FormControl(0),
    sku: new FormControl(''),
    categoriaId: new FormControl(0),
    quantidade: new FormControl(1)
  });

  save() {
    const request: CreateProduct = {
      produto: {
        nome: this.productForm.value.nome || '',
        descricao: this.productForm.value.descricao || '',
        preco: this.productForm.value.preco || 0,
        sku: this.productForm.value.sku || '',
        categoriaId: this.productForm.value.categoriaId || 0,
        ativo: true
      },
      quantidade: this.productForm.value.quantidade || 0
    };
    this.productService.createProduct(request).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
  back() {
    this.router.navigate(['/home']);
  }
  edit() {

  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {

      this.productService.getProductById(this.id).subscribe(r => {
        this.productForm.setValue({
          nome: r.nome,
          descricao: r.descricao,
          preco: r.preco,
          sku: r.sku,
          categoriaId: r.categoriaId,
          quantidade: r.quantidade
        });
      });

    }
  }

}

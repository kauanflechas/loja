import { CreateProduct, ProdutoRequest } from './../../../models/product.model';
import { ProductService } from './../../../service/product.service';
import { Component, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel, MatError } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../service/categoria.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';


@Component({
  selector: 'app-create-edit-product',
  imports: [MatFormField, MatLabel, MatInput, MatButton, ReactiveFormsModule, MatSelect, MatOption, MatIcon, MatError, CurrencyMaskModule,
    NgxMaskDirective
  ],
  templateUrl: './create-edit-product.html',
  styleUrl: './create-edit-product.css',
})
export class CreateEditProduct implements OnInit {
  id?: number;
  previewBase64 = signal<string | null | undefined>(null);   // para exibir
  imagemBase64: string | null | undefined = null;

  constructor(private readonly route: ActivatedRoute, private router: Router, private productService: ProductService, private categoriaService: CategoriaService) {

  }

  categorias = signal<Categoria[]>([]);
  productForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(250),
    Validators.minLength(5)]),
    descricao: new FormControl('', [Validators.required, Validators.maxLength(250),
    Validators.minLength(5)]),
    preco: new FormControl(0, Validators.required),
    sku: new FormControl('', [Validators.required, Validators.maxLength(4),
    Validators.minLength(4)]),
    codigoBarras: new FormControl('', [Validators.required, Validators.maxLength(20),
    Validators.minLength(5)]),
    categoriaId: new FormControl(0, Validators.required),
    quantidade: new FormControl(1, Validators.required),
    imagem: new FormControl<string | null | undefined>('', Validators.required)
  });

  save() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const request: CreateProduct = {
      produto: {
        nome: this.productForm.value.nome || '',
        descricao: this.productForm.value.descricao || '',
        preco: this.productForm.value.preco || 0,
        sku: this.productForm.value.sku || '',
        categoriaId: this.productForm.value.categoriaId || 0,
        ativo: true,
        imagem: this.productForm.value.imagem || '',
        quantidade: this.productForm.value.quantidade || 0,
        codigoBarras: this.productForm.value.codigoBarras || ''
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
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    const request: ProdutoRequest = {

      nome: this.productForm.value.nome || '',
      descricao: this.productForm.value.descricao || '',
      preco: this.productForm.value.preco || 0,
      sku: this.productForm.value.sku || '',
      categoriaId: this.productForm.value.categoriaId || 0,
      ativo: true,
      quantidade: this.productForm.value.quantidade,
      imagem: this.productForm.value.imagem || '',
      codigoBarras: this.productForm.value.codigoBarras || ''
    };
    this.productService.editProduct(this.id!, request).subscribe(() => {
      this.router.navigate(['/product/list']);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      this.previewBase64.set(base64);
      this.imagemBase64 = base64;
      this.productForm.patchValue({ imagem: base64 });
    };

    reader.readAsDataURL(file);
  }


  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(r => this.categorias.set(r));
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {

      this.productService.getProductById(this.id).subscribe(r => {
        this.productForm.setValue({
          nome: r.nome,
          descricao: r.descricao,
          preco: r.preco,
          sku: r.sku,
          categoriaId: r.categoriaId,
          quantidade: r.quantidade,
          imagem: r.imagem,
          codigoBarras: r.codigoBarras
        });
        this.previewBase64.set(r.imagem);
      });

    }
  }
  errorMessages: any = {
    required: 'Campo obrigatório.',
    minlength: 'Quantidade mínima inválida.',
    email: 'Email inválido.',
    min: 'Valor mínimo não atingido.',
    max: 'Valor máximo ultrapassado.'
  };
  getErrorMessage(campo: string): string | null {
    const control = this.productForm.get(campo);
    if (!control || !control.errors) return null;

    const firstError = Object.keys(control.errors)[0];
    return this.errorMessages[firstError] || 'Erro inválido';
  }

}

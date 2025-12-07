import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {

  constructor(private http: HttpClient) {

  }

  private apiUrl = 'http://localhost:8080/v1/categorias';
  getCategorias() {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}

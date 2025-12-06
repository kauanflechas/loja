import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './components/header/header';
import {Footer} from './components/footer/footer';
import { Product } from './components/models/product.model';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('loja');
}
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [Footer, Header, RouterOutlet]
})
export class AppComponent {
  products: Product[] = [
    {
      id: 1,
      title: 'Camiseta Preta',
      description: 'Camiseta de algodão 100%, confortável e estilosa.',
      price: 49.90,
      discountPercentage: 10,
      stock: 100,
      imageUrl: 'assets/camiseta_preta.jpg' // Use um caminho de imagem real
    },
    {
      id: 2,
      title: 'Tênis Running X-Treme', // Corrigido o título do protótipo
      description: 'Design esportivo de alta performance para treinos intensos.',
      price: 349.90,
      discountPercentage: 15,
      stock: 50,
      imageUrl: 'assets/tenis_verde.jpg' // Use um caminho de imagem real
    },
    {
      id: 3,
      title: 'Headphone SoundPro',
      description: 'Áudio de alta definição com cancelamento de ruído ativo.',
      price: 699.00,
      discountPercentage: 0,
      stock: 8,
      imageUrl: 'assets/headphone.jpg'
    },
  ];
}

import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faFacebookF} from '@fortawesome/free-brands-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../components/models/product.model';
import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-home',
  imports: [
    MatButton,
    FaIconComponent,
    ProductCard
],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  protected readonly faFacebookF = faFacebookF;
  protected readonly faPlus = faPlus;
  public products:Product[] = [{
    id: 1,
    title: "Blusa Azul",
    description: "Blusa sem manga, na cor azul, 90% algodão e 10% charme",
    price: 29.99,
    discountPercentage: 10,
    stock: 5,
    imageUrl: "https://m.magazineluiza.com.br/a-static/420x420/regata-machao-malha-fria-fenomenal-sem-elasticidade/fabricafenomenal/28114-28105/4940055aa87453e11763d933c1de0b48.jpeg"

  },
  {
    id: 1,
    title: "Blusa Azul",
    description: "Blusa manda curta na cor azul",
    price: 59.90,
    discountPercentage: 20,
    stock: 5,
    imageUrl: "https://m.magazineluiza.com.br/a-static/420x420/regata-machao-malha-fria-fenomenal-sem-elasticidade/fabricafenomenal/28114-28105/4940055aa87453e11763d933c1de0b48.jpeg"

  },
{
    id: 1,
    title: "Blusa Verde",
    description: "Blusa manda curta na cor verde",
    price: 59.90,
    discountPercentage: 20,
    stock: 5,
    imageUrl: "https://m.magazineluiza.com.br/a-static/420x420/regata-machao-malha-fria-fenomenal-sem-elasticidade/fabricafenomenal/28114-28105/4940055aa87453e11763d933c1de0b48.jpeg"

  },
{
    id: 1,
    title: "Blusa Rosa",
    description: "Blusa manda curta na cor rosa",
    price: 59.90,
    discountPercentage: 20,
    stock: 5,
    imageUrl: "https://m.magazineluiza.com.br/a-static/420x420/regata-machao-malha-fria-fenomenal-sem-elasticidade/fabricafenomenal/28114-28105/4940055aa87453e11763d933c1de0b48.jpeg"

  }];
}

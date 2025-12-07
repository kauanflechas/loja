import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CreateEditProduct } from './pages/product/create-edit-product/create-edit-product';
import { ListProduct } from './pages/product/list-product/list-product';
import { DetailProduct } from './pages/product/detail-product/detail-product';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'product/create-edit',
    component: CreateEditProduct
  },
  {
    path: 'product/list',
    component: ListProduct
  },
  {
    path: 'product/details/:id',
    component: DetailProduct
  },
  {
    path: 'cart',
    component: Cart
  }
];

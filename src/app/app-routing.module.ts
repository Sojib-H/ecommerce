import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './contents/cart-page/cart-page.component';
import { CheckoutComponent } from './contents/checkout/checkout.component';
import { HomeComponent } from './contents/home/home.component';
import { OrderPageComponent } from './contents/order-page/order-page.component';
import { ProductDetailsComponent } from './contents/product-details/product-details.component';
import { SearchComponent } from './contents/search/search.component';
import { SellerAddProductComponent } from './contents/seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './contents/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './contents/seller-home/seller-home.component';
import { SellerUpdateComponent } from './contents/seller-update/seller-update.component';
import { TestComponent } from './contents/test/test.component';
import { UserAuthComponent } from './contents/user-auth/user-auth.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'user-auth',
    component:UserAuthComponent
  },
  {
    path:'seller-auth',
    component:SellerAuthComponent
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'seller-add-product',
    component:SellerAddProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'seller-update/:id',
    component:SellerUpdateComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'search/:query',
    component:SearchComponent
  },
  {
    path:'details/:productId',
    component:ProductDetailsComponent
  },
  {
    path:'cart-page',
    component:CartPageComponent
  },
  {
    path:'checkout',
    component:CheckoutComponent
  },
  {
    path:'my-orders',
    component:OrderPageComponent
  },
  {
    path:'test',
    component:TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

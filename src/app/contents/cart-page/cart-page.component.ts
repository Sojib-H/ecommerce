import { Component, OnInit } from '@angular/core';
import { cart, priceSummary } from 'src/app/interface/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData: cart[] | undefined;
  cartLength = 0;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.Cart();
  }

  Cart() {
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      this.cartLength = this.cartData.length;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * item.quantity);
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 50;
      this.priceSummary.total = this.priceSummary.price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount;
    })
  }

  removeToCart(cartId: number | undefined) {
    cartId && this.productService.removeToCart(cartId).subscribe((result) => {
      if (result) {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);
        this.Cart();
      }
    })
  }


}

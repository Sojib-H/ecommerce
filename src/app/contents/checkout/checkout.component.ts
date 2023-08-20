import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cart, order } from 'src/app/interface/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  constructor(private productService: ProductService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.Cart();
  }

  Cart() {
    this.productService.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * item.quantity);
        }
      });
      this.totalPrice = price + (price / 10) + 50 - (price / 10);
    })
  }


  orderNow(Data: { email: string, address: string, contact: string }) {
    let userStore = localStorage.getItem('user');
    let userId = userStore && JSON.parse(userStore).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...Data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.productService.deleteCartItems(item.id);
        }, 500);
      })

      this.productService.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.toastr.clear();
          this.toastr.success('Order Placed Successfully');
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
          }, 600);
        }
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { order } from 'src/app/interface/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  orderData: order[] | undefined;
  orderLength = 0;
  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList() {
    this.productService.orderList().subscribe((result) => {
      this.orderData = result;
      this.orderLength = result.length;
    })
  }

  cancerOrder(orderId: number | undefined) {
    orderId && this.productService.cancelOrder(orderId).subscribe((result) => {
      if (result) {
        this.toastr.success('Order cancel successfully');
        this.getOrderList();
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderServiceService } from '../services/order-service.service';
import { ProductServiceService } from '../services/product-service.service';
import swal from 'sweetalert2/dist/sweetalert2.js';




@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})

export class PlaceOrderComponent implements OnInit {
  product: any;
  productName: string;
  productId: string;
  availableQuantity: number;
  totalPrice: number;
  unitPrice: number;
  orderedQuantity: number;





  constructor(private orderService: OrderServiceService, private productService: ProductServiceService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.productId = this.activatedRoute.snapshot.params.id;
    this.productService.getData().subscribe(result => {

      result.forEach(product => {
        if (product.productId == this.productId) {
          this.product = product;
          this.unitPrice = product["unitPrice"]
          this.totalPrice = this.unitPrice * this.orderedQuantity
          this.availableQuantity = product["availableQuantity"]
          this.productName = product["productName"]
         }
      })
    })
}

placeOrder() {
    var order = {
      productId: this.productId,
      quantity: this.orderedQuantity,
      totalPrice: this.unitPrice * this.orderedQuantity
    }
    this.orderService.placeOrder(order)
      .subscribe((result: any) => {
        swal.fire("Order placed successfully");
      },
        (error) => {
        swal.fire("Failed to order!!! ");

        })
  }
}

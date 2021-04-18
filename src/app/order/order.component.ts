import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]
  constructor(private orderServide: OrderService, 
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      emailConfirmation: this.formBuilder.control(''),
      address: this.formBuilder.control(''),
      number: this.formBuilder.control(''),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('')
    })
  }

  itemsValue(): number {
    return this.orderServide.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderServide.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderServide.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderServide.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderServide.remove(item)
  }



  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderServide.checkOrder(order)
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-sumary'])
        console.log(`Compra concluida: ${order}`)
        this.orderServide.clear()
      })
    console.log(order)
  }

}

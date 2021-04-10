import { Component, OnInit } from '@angular/core';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]
  constructor(private orderServide: OrderService) { }

  ngOnInit() {
  }

  itemsValue(): number{
    return this.orderServide.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderServide.cartItems()
  }

  increaseQty(item: CartItem){
    this.orderServide.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    this.orderServide.decreaseQty(item)
  }

  remove(item: CartItem){
    this.orderServide.remove(item)
  }

}

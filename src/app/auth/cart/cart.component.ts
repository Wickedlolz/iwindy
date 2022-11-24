import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // TODO!: implement load user items in cart and functionality <--

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Shopping Cart | iWindy');
  }
}

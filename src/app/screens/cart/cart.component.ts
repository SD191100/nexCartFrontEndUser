import { Component } from '@angular/core';
import { Cart } from '../../models/cart/cart.model';
import { CartService } from '../../services/cart.service';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})

export class CartComponent {
  cart: Cart | null = null;
  userId = 0; // Replace with actual user ID logic

  constructor(
    private cartService: CartService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId(): void {
    const userId = this.authService.getUserId(); // Directly call the synchronous method
    if (userId !== null) {
      this.userId = userId; // Assign the userId
      this.loadCart(); // Load the cart after setting userId
    } else {
      console.error('User ID is null. Unable to load the cart.');
      // Handle the case where userId is null (e.g., redirect to login)
    }
  }

  loadCart(): void {
    this.cartService.loadCart(this.userId);
    this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
      console.log(cart);
      console.log("Load Cart")
    });
  }

  getTotal(): number {
    return (this.cart?.cartItems || []).reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );
  }

  checkout(): void {
    alert('Proceeding to checkout...');
    // Implement checkout logic here
  }
}

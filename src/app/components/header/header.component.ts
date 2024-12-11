import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  categories :any[] = [];
  buttons = [
  { id: 1, icon: 'assets/fav.svg', link: '/favourites' },
  { id: 2, icon: 'assets/cart.svg', link: '/cart' },
  { id: 3, icon: 'assets/account.svg', link: '' },
];
  tokenAvailable: Signal<boolean>;
  constructor(private router: Router, private categoryService: CategoryService) {
    this.tokenAvailable = signal(!!localStorage.getItem('jwtToken'));
    console.log(this.tokenAvailable);
    // Update the account button link dynamically based on token presence
    effect(() => {
      this.buttons[2].link = this.tokenAvailable() ? '/account' : '/login';
    });
  }

ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: any) => {
        this.categories = categories;
        console.log(categories);
      },
      error: (err: any) => {
        console.error('Error fetching featured products:', err);
      }
    });
  }
}

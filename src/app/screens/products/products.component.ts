import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  productId: number = 0;
  productDetail = {
    category: null,
    categoryId: null,
    description: '',
    name: '',
    orderDetails: null,
    price: null,
    productId: null,
    productInventory: null,
    seller: null,
    sellerId: null,
    stock: null,
  };
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    // Get the category ID and name from the URL
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      this.fetchProductById();
    });
  }

  fetchProductById(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product: any) => {
        this.productDetail = product;
        console.log(product);
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error fetching products:', err);
        this.loading = false;
      },
    });
  }
}

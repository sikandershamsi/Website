import { Injectable } from '@nestjs/common';
import { findProduct } from '../content/products.data';

export interface CartLine {
  slug: string;
  name: string;
  price: number;
  size: string;
  qty: number;
}

@Injectable()
export class CartService {
  private carts = new Map<string, CartLine[]>();

  private ensure(cartId: string): CartLine[] {
    if (!this.carts.has(cartId)) this.carts.set(cartId, []);
    return this.carts.get(cartId) as CartLine[];
  }

  get(cartId: string): CartLine[] {
    return this.ensure(cartId);
  }

  count(cartId: string): number {
    return this.ensure(cartId).reduce((sum, line) => sum + line.qty, 0);
  }

  subtotal(cartId: string): number {
    return this.ensure(cartId).reduce((sum, line) => sum + line.qty * line.price, 0);
  }

  add(cartId: string, slug: string, qty: number): void {
    const product = findProduct(slug);
    if (!product) return;
    const lines = this.ensure(cartId);
    const existing = lines.find((l) => l.slug === slug);
    if (existing) {
      existing.qty += qty;
    } else {
      lines.push({ slug, name: product.name, price: product.price, size: product.size, qty });
    }
  }

  updateQty(cartId: string, slug: string, qty: number): void {
    const lines = this.ensure(cartId);
    const line = lines.find((l) => l.slug === slug);
    if (!line) return;
    if (qty <= 0) {
      this.remove(cartId, slug);
      return;
    }
    line.qty = qty;
  }

  remove(cartId: string, slug: string): void {
    const lines = this.ensure(cartId);
    this.carts.set(
      cartId,
      lines.filter((l) => l.slug !== slug),
    );
  }

  clear(cartId: string): void {
    this.carts.set(cartId, []);
  }
}

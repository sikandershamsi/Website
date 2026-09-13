import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument, CartLine } from './schemas/cart.schema';
import { ProductsService } from '../products/products.service';

export type CartKey = { userId: string } | { guestCartId: string };

function keyFilter(key: CartKey) {
  return 'userId' in key ? { userId: new Types.ObjectId(key.userId) } : { guestCartId: key.guestCartId };
}

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    private readonly productsService: ProductsService,
  ) {}

  private async ensure(key: CartKey): Promise<CartDocument> {
    const filter = keyFilter(key);
    let cart = await this.cartModel.findOne(filter).exec();
    if (!cart) {
      cart = await this.cartModel.create({ ...filter, lines: [] });
    }
    return cart;
  }

  async get(key: CartKey): Promise<CartLine[]> {
    const cart = await this.ensure(key);
    return cart.lines;
  }

  async count(key: CartKey): Promise<number> {
    const lines = await this.get(key);
    return lines.reduce((sum, line) => sum + line.qty, 0);
  }

  async subtotal(key: CartKey): Promise<number> {
    const lines = await this.get(key);
    return lines.reduce((sum, line) => sum + line.qty * line.price, 0);
  }

  async add(key: CartKey, slug: string, qty: number, isSubscription = false, size?: string): Promise<void> {
    const product = await this.productsService.findBySlug(slug);
    if (!product) throw new NotFoundException(`No active product found for slug "${slug}".`);
    const variants = (product as { variants?: { size: string; price: number }[] }).variants;
    // Never trust a client-submitted price — resolve the variant (or fall back to the default) server-side.
    const variant = variants?.length ? (variants.find((v) => v.size === size) ?? variants[0]) : undefined;
    const resolvedPrice = variant ? variant.price : product.price;
    const resolvedSize = variant ? variant.size : product.size;

    const cart = await this.ensure(key);
    const existing = cart.lines.find(
      (l) => l.slug === slug && l.isSubscription === isSubscription && l.size === resolvedSize,
    );
    if (existing) {
      existing.qty += qty;
    } else {
      cart.lines.push({
        productId: new Types.ObjectId(product.id as string),
        slug,
        name: product.name,
        price: resolvedPrice,
        size: resolvedSize,
        image: product.image,
        qty,
        isSubscription,
      } as CartLine);
    }
    await cart.save();
  }

  async updateQty(key: CartKey, slug: string, qty: number, size?: string, isSubscription?: boolean): Promise<void> {
    if (qty <= 0) return this.remove(key, slug, size, isSubscription);
    const cart = await this.ensure(key);
    const line = cart.lines.find((l) => this.matchesLine(l, slug, size, isSubscription));
    if (!line) return;
    line.qty = qty;
    await cart.save();
  }

  async remove(key: CartKey, slug: string, size?: string, isSubscription?: boolean): Promise<void> {
    const cart = await this.ensure(key);
    cart.lines = cart.lines.filter((l) => !this.matchesLine(l, slug, size, isSubscription)) as CartLine[];
    await cart.save();
  }

  /** A cart can hold multiple lines for the same slug (different sizes and/or one-time vs. subscription). */
  private matchesLine(line: CartLine, slug: string, size?: string, isSubscription?: boolean): boolean {
    if (line.slug !== slug) return false;
    if (size !== undefined && line.size !== size) return false;
    if (isSubscription !== undefined && line.isSubscription !== isSubscription) return false;
    return true;
  }

  async clear(key: CartKey): Promise<void> {
    const cart = await this.ensure(key);
    cart.lines = [];
    await cart.save();
  }

  /** Merges a guest cart's lines into the user's cart on login/registration, then removes the guest cart. */
  async mergeGuestCartIntoUser(guestCartId: string, userId: string): Promise<void> {
    const guestCart = await this.cartModel.findOne({ guestCartId }).exec();
    if (!guestCart || guestCart.lines.length === 0) return;
    const userCart = await this.ensure({ userId });
    for (const guestLine of guestCart.lines) {
      const existing = userCart.lines.find(
        (l) => l.slug === guestLine.slug && l.isSubscription === guestLine.isSubscription,
      );
      if (existing) {
        existing.qty += guestLine.qty;
      } else {
        userCart.lines.push(guestLine);
      }
    }
    await userCart.save();
    await this.cartModel.deleteOne({ _id: guestCart._id }).exec();
  }

  async findRawByKey(key: CartKey) {
    return this.cartModel.findOne(keyFilter(key)).exec();
  }
}

import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminDashboardController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  @Get()
  @Render('admin/dashboard')
  async dashboard() {
    const [products, recentOrders, activeSubscriptions, ordersThisWeek] = await Promise.all([
      this.productsService.findAllRaw(),
      this.ordersService.findAll(10),
      this.subscriptionsService.countActive(),
      this.ordersService.countRecent(7),
    ]);
    return {
      title: 'Dashboard',
      productCount: products.length,
      ordersThisWeek,
      activeSubscriptions,
      recentOrders,
    };
  }
}

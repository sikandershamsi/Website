import { Body, Controller, Get, NotFoundException, Param, Post, Query, Render, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { IsIn } from 'class-validator';
import { AdminGuard } from '../auth/guards/admin.guard';
import { OrdersService } from '../orders/orders.service';
import type { OrderStatus } from '../orders/schemas/order.schema';

class UpdateOrderStatusDto {
  @IsIn(['pending', 'paid', 'fulfilled', 'cancelled', 'refunded'])
  status: OrderStatus;
}

@Controller('admin/orders')
@UseGuards(AdminGuard)
export class AdminOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Render('admin/orders/index')
  async index(@Query('status') status?: OrderStatus, @Query('q') q?: string, @Query('page') page?: string) {
    const result = await this.ordersService.findAllPaged({ status, q, page: page ? Number(page) : 1 });
    return {
      title: 'Orders',
      orders: result.items,
      statusFilter: status || '',
      q: q || '',
      page: result.page,
      pages: result.pages,
      total: result.total,
    };
  }

  @Get(':id')
  @Render('admin/orders/show')
  async show(@Param('id') id: string) {
    const order = await this.ordersService.findById(id);
    if (!order) throw new NotFoundException('Order not found');
    return { title: `Order ${order.orderNumber}`, order };
  }

  @Post(':id/status')
  async updateStatus(@Param('id') id: string, @Body() body: UpdateOrderStatusDto, @Res() res: Response) {
    await this.ordersService.setStatus(id, body.status);
    res.redirect(303, `/admin/orders/${id}`);
  }
}

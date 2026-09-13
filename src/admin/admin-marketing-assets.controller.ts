import { Body, Controller, Get, Param, Post, Render, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AdminGuard } from '../auth/guards/admin.guard';
import { MarketingAssetsService } from '../marketing-assets/marketing-assets.service';
import { MarketingAssetDto } from './dto/marketing-asset.dto';

@Controller('admin/marketing-assets')
@UseGuards(AdminGuard)
export class AdminMarketingAssetsController {
  constructor(private readonly assetsService: MarketingAssetsService) {}

  @Get()
  @Render('admin/marketing-assets/index')
  async index() {
    const assets = await this.assetsService.listAll();
    return { title: 'Marketing Assets', assets };
  }

  @Post()
  async create(@Body() body: MarketingAssetDto, @Res() res: Response) {
    await this.assetsService.create(body);
    res.redirect(303, '/admin/marketing-assets');
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.assetsService.delete(id);
    res.redirect(303, '/admin/marketing-assets');
  }
}

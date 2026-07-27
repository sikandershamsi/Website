import { Module } from '@nestjs/common';
import { ScienceController } from './science.controller';

@Module({
  controllers: [ScienceController],
})
export class ScienceModule {}

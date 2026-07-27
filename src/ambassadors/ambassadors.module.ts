import { Module } from '@nestjs/common';
import { AmbassadorsController } from './ambassadors.controller';

@Module({
  controllers: [AmbassadorsController],
})
export class AmbassadorsModule {}

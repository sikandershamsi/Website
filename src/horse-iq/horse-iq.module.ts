import { Module } from '@nestjs/common';
import { HorseIqController } from './horse-iq.controller';

@Module({
  controllers: [HorseIqController],
})
export class HorseIqModule {}

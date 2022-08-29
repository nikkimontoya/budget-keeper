import { Module } from '@nestjs/common';
import { SpendingService } from './spending.service';

@Module({
  providers: [SpendingService]
})
export class SpendingModule {}

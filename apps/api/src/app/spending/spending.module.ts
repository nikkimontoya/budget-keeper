import {Module} from '@nestjs/common';
import {SpendingService} from './spending.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SpendingEntity} from './entities/spending.entity';
import {SpendingResolver} from './spending.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([SpendingEntity])],
    providers: [SpendingService, SpendingResolver]
})
export class SpendingModule {}

import {Module} from '@nestjs/common';
import {SpendingService} from './spending.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SpendingEntity} from './entities/spending.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SpendingEntity])],
    providers: [SpendingService]
})
export class SpendingModule {}

import {Query, Resolver} from '@nestjs/graphql';
import {SpendingModel} from './models/spending.model';
import {SpendingEntity} from './entities/spending.entity';
import {SpendingService} from './spending.service';

@Resolver((of) => SpendingModel)
export class SpendingResolver {
    constructor(private spendingService: SpendingService) {}

    @Query((returns) => [SpendingModel])
    async spendings(): Promise<SpendingEntity[]> {
        return this.spendingService.findAll();
    }
}

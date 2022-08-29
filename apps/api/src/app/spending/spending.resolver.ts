import {Query, Resolver} from '@nestjs/graphql';
import {SpendingModel} from './models/spending.model';
import {SpendingEntity} from './entities/spending.entity';

@Resolver((of) => SpendingModel)
export class SpendingResolver {
    @Query((returns) => [SpendingModel])
    async spendings(): Promise<SpendingEntity[]> {}
}

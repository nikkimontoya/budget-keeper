import {Args, ID, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {SpendingBookModel} from './models/spending-book.model';
import {SpendingBookEntity} from './entities/spending-book.entity';
import {SpendingBookService} from './spending-book.service';
import {UserEntity} from '../user/entities/user.entity';
import {UserService} from '../user/user.service';

@Resolver((of) => SpendingBookModel)
export class SpendingBookResolver {
    constructor(private bookService: SpendingBookService, private userService: UserService) {}

    @Query((returns) => [SpendingBookModel])
    async spendingBooks(
        @Args('ids', {type: () => [ID], nullable: true}) ids?: string[]
    ): Promise<SpendingBookEntity[]> {
        if (!ids) {
            return this.bookService.findAll();
        }

        return this.bookService.findByIds(ids.map((id) => parseInt(id, 10)));
    }

    @Mutation((returns) => SpendingBookModel)
    async createSpendingBook(
        @Args('name') name: string,
        @Args('userIds', {type: () => [ID]}) userIds: string[],
        @Args('personal', {type: () => Boolean}) personal: boolean
    ): Promise<SpendingBookEntity> {
        return this.bookService.create(
            name,
            userIds.map((id) => parseInt(id, 10)),
            personal
        );
    }

    @ResolveField()
    async users(@Parent() book: SpendingBookEntity): Promise<UserEntity[]> {
        return this.userService.getByIds(book.userIds);
    }
}

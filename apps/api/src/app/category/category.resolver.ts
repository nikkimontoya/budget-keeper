import {Args, ID, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {CategoryModel} from './models/category.model';
import {CategoryEntity} from './entities/category.entity';
import {CategoryService} from './category.service';
import {UserEntity} from '../user/entities/user.entity';
import {UserService} from '../user/user.service';

@Resolver((of) => CategoryModel)
export class CategoryResolver {
    constructor(private categoryService: CategoryService, private userService: UserService) {}

    @Query((returns) => [CategoryModel])
    async categories(@Args('ids', {type: () => [ID]}) ids: string[]): Promise<CategoryEntity[]> {
        return this.categoryService.getByIds(ids.map((id) => parseInt(id, 10)));
    }

    @Mutation((returns) => CategoryModel)
    async createCategory(
        @Args('name') name: string,
        @Args('userId', {type: () => ID}) userId: string
    ): Promise<CategoryEntity> {
        return this.categoryService.create(name, parseInt(userId, 10));
    }

    @ResolveField()
    user(@Parent() category: CategoryEntity): Promise<UserEntity> {
        return this.userService.getById(category.userId);
    }
}

import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {RegisterInput} from './models/register.input';
import {UserService} from './user.service';
import {UserEntity} from './entities/user.entity';
import {UserModel} from './models/user.model';
import {LoginModel} from './models/login.model';
import {CategoryEntity} from '../category/entities/category.entity';
import {CategoryService} from '../category/category.service';
import {SpendingBookEntity} from '../spending-book/entities/spending-book.entity';
import {SpendingBookService} from '../spending-book/spending-book.service';

@Resolver((of) => UserModel)
export class UserResolver {
    constructor(
        private userService: UserService,
        private categoryService: CategoryService,
        private bookService: SpendingBookService
    ) {}

    @Mutation((returns) => LoginModel)
    async register(@Args('data', {type: () => RegisterInput}) data: RegisterInput): Promise<LoginModel> {
        return this.userService.register(data.email, data.password, data.firstName, data.lastName);
    }

    @Mutation((returns) => LoginModel)
    async login(@Args('email') email: string, @Args('password') password: string): Promise<LoginModel> {
        return this.userService.login(email, password);
    }

    @Query((returns) => [UserModel])
    async users(): Promise<UserEntity[]> {
        return this.userService.getAll();
    }

    @ResolveField()
    async categories(@Parent() user: UserEntity): Promise<CategoryEntity[]> {
        return this.categoryService.getByUserId(user.id);
    }

    @ResolveField()
    async spendingBooks(
        @Parent() user: UserEntity,
        @Args('personal', {type: () => Boolean, nullable: true}) personal?: boolean
    ): Promise<SpendingBookEntity[]> {
        return this.bookService.findByUserId(user.id, personal);
    }
}

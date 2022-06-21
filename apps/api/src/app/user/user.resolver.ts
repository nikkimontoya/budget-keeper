import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {RegisterInput} from './models/register.input';
import {UserService} from './user.service';
import {UserEntity} from './entities/user.entity';
import {UserModel} from './models/user.model';
import {LoginModel} from './models/login.model';

@Resolver((of) => UserModel)
export class UserResolver {
    constructor(private userService: UserService) {}

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
}

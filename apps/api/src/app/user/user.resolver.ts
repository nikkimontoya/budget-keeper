import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {RegisterInput} from './models/register.input';
import {UserService} from './user.service';
import {UserEntity} from './entities/user.entity';
import {UserModel} from './models/user.model';

@Resolver((of) => UserModel)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Mutation((returns) => UserModel)
    async register(@Args('data', {type: () => RegisterInput}) data: RegisterInput): Promise<UserEntity> {
        return this.userService.register(data.email, data.password, data.firstName, data.lastName);
    }

    @Query((returns) => [UserModel])
    async users(): Promise<UserEntity[]> {
        return this.userService.getAll();
    }
}

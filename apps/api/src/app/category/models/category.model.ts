import {Field, ID, ObjectType} from '@nestjs/graphql';
import {UserModel} from '../../user/models/user.model';

@ObjectType()
export class CategoryModel {
    @Field((type) => ID)
    id: number;

    @Field()
    name: string;

    @Field((type) => UserModel)
    user: UserModel;
}

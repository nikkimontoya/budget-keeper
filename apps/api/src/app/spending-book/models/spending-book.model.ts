import {Field, ID, ObjectType} from '@nestjs/graphql';
import {UserModel} from '../../user/models/user.model';
import {SpendingModel} from '../../spending/models/spending.model';

@ObjectType()
export class SpendingBookModel {
    @Field((type) => ID)
    id: string;

    @Field()
    name: string;

    @Field((type) => [UserModel])
    users: UserModel[];

    @Field((type) => Boolean)
    personal: boolean;
}

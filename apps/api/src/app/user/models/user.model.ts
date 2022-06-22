import {Field, ID, ObjectType} from '@nestjs/graphql';
import {CategoryModel} from '../../category/models/category.model';

@ObjectType()
export class UserModel {
    @Field((type) => ID)
    id: number;

    @Field()
    email: string;

    @Field({nullable: true})
    firstName: string;

    @Field({nullable: true})
    lastName: string;

    @Field((type) => [CategoryModel])
    categories: CategoryModel[];
}

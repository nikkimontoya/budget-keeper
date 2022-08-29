import {Field, ID, ObjectType} from '@nestjs/graphql';
import {CategoryModel} from '../../category/models/category.model';
import {SpendingBookModel} from '../../spending-book/models/spending-book.model';

@ObjectType()
export class UserModel {
    @Field((type) => ID)
    id: string;

    @Field()
    email: string;

    @Field({nullable: true})
    firstName: string;

    @Field({nullable: true})
    lastName: string;

    @Field((type) => [CategoryModel])
    categories: CategoryModel[];

    @Field((type) => [SpendingBookModel])
    spendingBooks: SpendingBookModel[];
}

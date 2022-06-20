import {Field, ID, ObjectType} from '@nestjs/graphql';

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
}

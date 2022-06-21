import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class LoginModel {
    @Field((type) => ID)
    id: number;

    @Field()
    email: string;

    @Field({nullable: true})
    firstName: string;

    @Field({nullable: true})
    lastName: string;

    @Field()
    accessToken: string;
}

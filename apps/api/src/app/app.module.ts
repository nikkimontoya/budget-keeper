import {Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import {environment} from '../environments/environment';
import {UserModule} from './user/user.module';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {join} from 'path';
import {CategoryModule} from './category/category.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...environment.connection,
            entities: []
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'schema.gql')
        }),
        UserModule,
        CategoryModule
    ]
})
export class AppModule {}

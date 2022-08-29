import {Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import {environment} from '../environments/environment';
import {UserModule} from './user/user.module';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {join} from 'path';
import {CategoryModule} from './category/category.module';
import {SpendingBookModule} from './spending-book/spending-book.module';
import {SpendingModule} from './spending/spending.module';
import {LocalDateScalar} from './scalars/local-date.scalar';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...environment.connection,
            entities: []
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'schema.gql'),
            resolvers: {
                LocalDate: LocalDateScalar
            }
        }),
        UserModule,
        CategoryModule,
        SpendingBookModule,
        SpendingModule
    ]
})
export class AppModule {}

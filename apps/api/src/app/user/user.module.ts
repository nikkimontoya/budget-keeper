import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './entities/user.entity';
import {UserService} from './user.service';
import {UserResolver} from './user.resolver';
import {JwtModule} from '@nestjs/jwt';
import {environment} from '../../environments/environment';
import {PassportModule} from '@nestjs/passport';
import {CategoryModule} from '../category/category.module';
import {SpendingBookModule} from '../spending-book/spending-book.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({secret: environment.jwt.secret}),
        PassportModule,
        forwardRef(() => CategoryModule),
        forwardRef(() => SpendingBookModule)
    ],
    providers: [UserService, UserResolver],
    exports: [UserService]
})
export class UserModule {}

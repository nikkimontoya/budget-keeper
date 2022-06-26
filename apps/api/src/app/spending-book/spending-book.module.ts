import {forwardRef, Module} from '@nestjs/common';
import {SpendingBookService} from './spending-book.service';
import {UserModule} from '../user/user.module';
import {SpendingBookResolver} from './spending-book.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SpendingBookEntity} from './entities/spending-book.entity';

@Module({
    imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([SpendingBookEntity])],
    providers: [SpendingBookService, SpendingBookResolver],
    exports: [SpendingBookService]
})
export class SpendingBookModule {}

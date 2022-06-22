import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CategoryEntity} from './entities/category.entity';
import {CategoryService} from './category.service';
import {CategoryResolver} from './category.resolver';
import {UserModule} from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryEntity]), forwardRef(() => UserModule)],
    providers: [CategoryService, CategoryResolver],
    exports: [CategoryService]
})
export class CategoryModule {}

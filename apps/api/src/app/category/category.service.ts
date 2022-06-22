import {Injectable, NotFoundException} from '@nestjs/common';
import {DeleteResult, In, Repository} from 'typeorm';
import {CategoryEntity} from './entities/category.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {UserService} from '../user/user.service';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>,
        private userService: UserService
    ) {}

    async create(name: string, userId: number): Promise<CategoryEntity> {
        const user = this.userService.getById(userId);

        if (!user) {
            throw new NotFoundException(`No user with id ${userId}`);
        }

        const category = this.categoryRepository.create({name, userId});
        return this.categoryRepository.save(category);
    }

    async getByUserId(userId: number): Promise<CategoryEntity[]> {
        return this.categoryRepository.findBy({userId});
    }

    async getByIds(ids: number[]): Promise<CategoryEntity[]> {
        return this.categoryRepository.findBy({id: In(ids)});
    }

    async removeById(id: number): Promise<DeleteResult> {
        return this.categoryRepository.delete({id});
    }
}

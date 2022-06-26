import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ArrayContains, DeleteResult, FindOptionsWhere, In, Repository} from 'typeorm';
import {SpendingBookEntity} from './entities/spending-book.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {UserService} from '../user/user.service';
import {UserEntity} from '../user/entities/user.entity';

@Injectable()
export class SpendingBookService {
    constructor(
        @InjectRepository(SpendingBookEntity) private bookRepository: Repository<SpendingBookEntity>,
        private userService: UserService
    ) {}

    async create(name: string, userIds: number[], personal: boolean) {
        if (personal) {
            if (userIds.length > 1) {
                throw new BadRequestException('Personal book cannot belong to several users');
            }

            const personalBook = await this.findByUserId(userIds[0], true);

            if (personalBook.length) {
                throw new BadRequestException('A user cannot have more than one personal book');
            }
        }

        const users = await this.userService.getByIds(userIds);
        this.checkUserIds(userIds, users);

        const book = this.bookRepository.create({name, users, personal});
        return this.bookRepository.save(book);
    }

    async addUsers(bookId: number, userIds: number[]): Promise<SpendingBookEntity> {
        const book = await this.findById(bookId);

        if (!book) {
            throw new NotFoundException(`The book with id ${bookId} is not found`);
        }

        const users = await this.userService.getByIds(userIds);
        this.checkUserIds(userIds, users);

        book.userIds.push(...userIds);
        return this.bookRepository.save(book);
    }

    async findAll(): Promise<SpendingBookEntity[]> {
        return this.bookRepository.find();
    }

    async findById(id: number): Promise<SpendingBookEntity> {
        return this.bookRepository.findOneBy({id});
    }

    async findByIds(ids: number[]): Promise<SpendingBookEntity[]> {
        return this.bookRepository.findBy({id: In(ids)});
    }

    async findByUserId(userId: number, personal?: boolean): Promise<SpendingBookEntity[]> {
        if (personal === undefined) {
            return this.bookRepository.find({
                relations: ['users'],
                where: {users: {id: userId}}
            });
        }

        return this.bookRepository.find({
            relations: ['users'],
            where: {users: {id: userId}, personal}
        });
    }

    async removeById(id: number): Promise<DeleteResult> {
        return this.bookRepository.delete({id});
    }

    private checkUserIds(ids: number[], foundUsers: UserEntity[]): boolean {
        const foundUserIds = foundUsers.map((user) => user.id);
        const notFoundIds = ids.filter((id) => !foundUserIds.includes(id));

        if (notFoundIds.length) {
            throw new BadRequestException(`Users with following ids: ${notFoundIds.join(', ')} were not found`);
        }

        return true;
    }
}

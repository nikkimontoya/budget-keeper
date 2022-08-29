import {Injectable} from '@nestjs/common';
import {SpendingEntity} from './entities/spending.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class SpendingService {
    constructor(@InjectRepository(SpendingEntity) private spendingRepository: Repository<SpendingEntity>) {}

    async findByAuthorId(authorId: number): Promise<SpendingEntity[]> {
        return this.spendingRepository.findBy({authorId: authorId});
    }

    async findAll(): Promise<SpendingEntity[]> {
        return this.spendingRepository.find();
    }
}

import {Injectable} from '@nestjs/common';
import {SpendingEntity} from './entities/spending.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class SpendingService {
    constructor(@InjectRepository(SpendingEntity) private spendingRepository: Repository<SpendingEntity>) {}

    async findByUserId(userId: number): Promise<SpendingEntity[]> {
        this.spendingRepository.findBy({});
    }
}

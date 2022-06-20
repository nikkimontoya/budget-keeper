import {Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {UserEntity} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {genSalt, hash} from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async register(email: string, password: string, firstName = '', lastName = ''): Promise<UserEntity> {
        const salt = await genSalt(10);

        const newUser = this.userRepository.create({
            email,
            passwordHash: await hash(password, salt),
            firstName,
            lastName
        });

        return this.userRepository.save(newUser);
    }

    async getAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}

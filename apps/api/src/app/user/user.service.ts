import {BadRequestException, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {UserEntity} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {compare, genSalt, hash} from 'bcryptjs';
import {LoginModel} from './models/login.model';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

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

    async login(email: string, password: string): Promise<LoginModel> {
        const user = await this.userRepository.findOneBy({email});

        if (!user) {
            throw new BadRequestException('Wrong credentials');
        }

        const passwordIsCorrect = await compare(password, user.passwordHash);

        if (!passwordIsCorrect) {
            throw new BadRequestException('Wrong credentials');
        }

        return {...user, accessToken: await this.jwtService.signAsync({email})};
    }

    async getAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}

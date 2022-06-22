import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from '../../user/entities/user.entity';

@Entity({name: 'categories'})
export class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => UserEntity, (user) => user.categories)
    @JoinColumn({name: 'userId'})
    user: UserEntity;

    @Column()
    userId: number;
}

import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationId} from 'typeorm';
import {CategoryEntity} from '../../category/entities/category.entity';

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @OneToMany(() => CategoryEntity, (category) => category.user)
    categories: CategoryEntity[];

    @RelationId((user: UserEntity) => user.categories)
    categoryIds: number[];
}

import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId
} from 'typeorm';
import {UserEntity} from '../../user/entities/user.entity';
import {SpendingEntity} from '../../spending/entities/spending.entity';

@Entity({name: 'categories'})
export class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => UserEntity, (user) => user.categories)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @RelationId((category: CategoryEntity) => category.user)
    userId: number;

    @OneToMany(() => SpendingEntity, (spending) => spending.category)
    spendings: SpendingEntity[];

    @RelationId((category: CategoryEntity) => category.spendings)
    spendingIds: number[];
}

import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId
} from 'typeorm';
import {CategoryEntity} from '../../category/entities/category.entity';
import {SpendingBookEntity} from '../../spending-book/entities/spending-book.entity';
import {SpendingEntity} from '../../spending/entities/spending.entity';

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

    @ManyToMany(() => SpendingBookEntity)
    @JoinTable({
        name: 'users_spending_books',
        inverseJoinColumn: {
            name: 'spending_book_id',
            referencedColumnName: 'id'
        },
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    spendingBooks: SpendingBookEntity[];

    @RelationId((user: UserEntity) => user.spendingBooks)
    spendingBookIds: number[];

    @OneToMany(() => SpendingEntity, (spending) => spending.author)
    authoredSpendings: SpendingEntity[];

    @RelationId((user: UserEntity) => user.authoredSpendings)
    authoredSpendingIds: number[];
}

import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, RelationId} from 'typeorm';
import {UserEntity} from '../../user/entities/user.entity';
import {SpendingEntity} from '../../spending/entities/spending.entity';

@Entity({name: 'spending_books'})
export class SpendingBookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => UserEntity)
    @JoinTable({
        name: 'users_spending_books',
        joinColumn: {
            name: 'spending_book_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })
    users: UserEntity[];

    @RelationId((book: SpendingBookEntity) => book.users)
    userIds: number[];

    @Column()
    personal: boolean;

    @OneToMany(() => SpendingEntity, (spending) => spending.spendingBook)
    spendings: SpendingEntity[];

    @RelationId((spendingBook: SpendingBookEntity) => spendingBook.spendings)
    spendingIds: number[];
}

import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId} from 'typeorm';
import {LocalDate} from '@js-joda/core';
import {SpendingBookEntity} from '../../spending-book/entities/spending-book.entity';
import {CategoryEntity} from '../../category/entities/category.entity';
import {UserEntity} from '../../user/entities/user.entity';

@Entity({name: 'spendings'})
export class SpendingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    cost: number;

    @Column()
    currency: string;

    @Column({type: 'date'})
    date: LocalDate;

    @ManyToOne(() => SpendingBookEntity, (spendingBook) => spendingBook.spendings)
    @JoinColumn({name: 'spending_book_id'})
    spendingBook: SpendingBookEntity;

    @RelationId((spending: SpendingEntity) => spending.spendingBook)
    spendingBookId: number;

    @ManyToOne(() => CategoryEntity, (category) => category.spendings)
    @JoinColumn({name: 'category_id'})
    category: CategoryEntity;

    @RelationId((spending: SpendingEntity) => spending.category)
    categoryId: number;

    @ManyToOne(() => UserEntity, (user) => user.authoredSpendings)
    @JoinColumn({name: 'author_id'})
    author: UserEntity;

    @RelationId((spending: SpendingEntity) => spending.author)
    authorId: number;
}

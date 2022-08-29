import {Field, ID, ObjectType} from '@nestjs/graphql';
import {LocalDate} from '@js-joda/core';
import {Money} from '@budget-keeper/utils';
import {MoneyScalar} from '../../scalars/money.scalar';
import {LocalDateScalar} from '../../scalars/local-date.scalar';
import {SpendingBookModel} from '../../spending-book/models/spending-book.model';

@ObjectType()
export class SpendingModel {
    @Field((type) => ID)
    id: string;

    @Field()
    title: string;

    @Field((type) => MoneyScalar)
    cost: Money;

    @Field((type) => LocalDateScalar)
    date: LocalDate;
}

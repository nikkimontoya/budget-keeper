import {GraphQLScalarType} from 'graphql';
import {Money} from '@budget-keeper/utils';

export const MoneyScalar = new GraphQLScalarType({
    name: 'Money',
    description: 'Money representation using custom Money class',
    serialize: (value: Money) => value.toJson(),
    parseValue: (value: string) => Money.fromJson(value)
});

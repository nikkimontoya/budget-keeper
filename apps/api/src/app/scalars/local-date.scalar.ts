import {GraphQLScalarType} from 'graphql';
import {LocalDate} from '@js-joda/core';

export const LocalDateScalar = new GraphQLScalarType({
    name: 'LocalDate',
    description: 'JS Joda Local Date',
    serialize: (value: LocalDate) => value.toString(),
    parseValue: (value: string) => LocalDate.parse(value)
});

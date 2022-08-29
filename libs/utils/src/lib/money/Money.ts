import {Currency} from './Currency';

export class Money {
    constructor(public amount: number, public currency: Currency) {}

    toJson(): string {
        return JSON.stringify(this);
    }

    static fromJson(value: string): Money {
        const obj = JSON.parse(value);

        if (!Object.prototype.hasOwnProperty.call(obj, 'amount')) {
            throw new Error('Amount field not found');
        }

        if (!Object.prototype.hasOwnProperty.call(obj, 'currency')) {
            throw new Error('Currency field not found');
        }

        return new Money(obj.amount, obj.currency);
    }
}

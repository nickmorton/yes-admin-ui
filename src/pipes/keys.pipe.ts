import { Pipe, PipeTransform } from '@angular/core';

interface IKeyValue {
	value: number;
	key: string;
}

@Pipe({
	name: 'keys',
})
export class KeysPipe implements PipeTransform {
	public transform(value: any, args: string[]): Array<IKeyValue> {
		const keys: Array<IKeyValue> = Object.keys(value)
			.map((s: string): number => Number(s))
			.filter((n: number) => !isNaN(n))
			.map((n: number): IKeyValue => <IKeyValue>{ value: n, key: value[n] });
		return keys;
	}
}

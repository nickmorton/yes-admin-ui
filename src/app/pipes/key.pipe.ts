import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'key',
})
export class KeyPipe implements PipeTransform {
	public transform(value: any, keyMap: {[key: string]: string}): string {
		return Object.keys(keyMap).find(k => keyMap[k] === value);
	}
}

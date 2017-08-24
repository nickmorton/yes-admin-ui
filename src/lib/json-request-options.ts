import { BaseRequestOptions } from '@angular/http';

export class JsonRequestOptions extends BaseRequestOptions {
	constructor() {
		super();
		this.headers.append('Accept', 'application/json');
		this.headers.append('Accept', 'text/plain');
		this.headers.append('Accept', '*/*');
		this.headers.append('Content-Type', 'application/json');
	}
}

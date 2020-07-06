import { HttpParams } from '@angular/common/http';

export function buildHttpParams<TSource, TKey extends Extract<keyof TSource, string>>(source: TSource, ...keys: TKey[]): HttpParams {
    const result = Object.keys(source)
        .filter((key: TKey) => keys.includes(key))
        .reduce(
            (params: HttpParams, key: TKey) => {
                if (typeof source[key] === 'object') {
                    return params.append(key, JSON.stringify(source[key]));
                }

                return params.append(key, source[key].toString());
            },
            new HttpParams()
        );

    return result;
}

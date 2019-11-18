//@ts-ignore ts thinks this is unused
import jasmin from 'jasmine';

// Typescript > 3.0 version.
export function spyOnClass<T, U extends unknown[]> (type: new(...tArg1: U) => T, ...arg1: mapToSpied<U>) {
    let spyOnFunctions = function<W>(obj: W, extras: string[] = []): Spied<W> {
        [...Object.keys(obj), ...extras].forEach(p => {
            if (!!obj && !arg1.some(a => obj[p] === a)) {
                if (obj[p] instanceof Function) {
                    spyOn(obj, p as any);
                } else if (!!obj[p] && typeof obj[p] === 'object') {
                    obj[p] = spyOnFunctions(obj[p]);
                }
            }
        });
        return obj as Spied<W>;
    };

    let ctorObj = new type(...arg1 as unknown as U);
    let spied = spyOnFunctions(ctorObj, Object.getOwnPropertyNames(type.prototype).filter(p => p !== 'constructor'));

    return spied;
}

export function testClassFactory<T extends unknown[], U>(type: new (...args: T) => U, ...args: mapToSpied<T>) {
	return new type(...(args as any)) as U;
}

export type mapToSpied<T extends unknown[]> = { [K in keyof T]: Spied<T[K]> };

export type Spied<T> = { [K in keyof T]: T[K] extends Function ? jasmine.Spy : T[K] extends object ? Spied<T[K]> : T[K] };

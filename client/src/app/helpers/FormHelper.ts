import { ValidatorFn, AbstractControlOptions, AsyncValidatorFn, FormGroup, FormControl } from '@angular/forms';

export default function createFormGroup<T>(
    data: T = {} as T,
    validatorOrOpts: Partial<Record<
        keyof T,
        ValidatorFn |
        ValidatorFn[] |
        AbstractControlOptions>> = {} as any,
    asyncValidator: Partial<Record<
        keyof T,
        AsyncValidatorFn | AsyncValidatorFn[]>> = {} as any
    ) {
        const controls = {};
        Object.keys(data).map(k => controls[k] = new FormControl(data[k], validatorOrOpts[k], asyncValidator[k]));
        return new FormGroup(controls);
}

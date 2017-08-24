import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { IModelBase, IPropertyValidationRules, IValidationRule, IValidator, ValidationRuleType } from '@nickmorton/yes-admin-common';

export interface INgValidator {
	name: string;
	validatorFn: ValidatorFn;
	errorMessage: string;
}

@Injectable()
export class NgValidatorFactory {
	public getValidators = <TEntity extends IModelBase, TEntityValidator extends IValidator<TEntity>>(
		entityValidator: { new (): TEntityValidator; },
	): Map<string, Array<INgValidator>> => {
		const validatorInstance: TEntityValidator = new entityValidator();
		const propertyValidators: Map<string, Array<INgValidator>> = new Map<string, Array<INgValidator>>();

		validatorInstance.propertyRules.forEach((propertyRule: IPropertyValidationRules<TEntity>) => {
			const validators: Array<INgValidator> = propertyRule.rules
				.map((rule: IValidationRule<TEntity>) => this.resolveNgValidator(rule))
				.filter((v: INgValidator) => v !== null);

			if (validators.length > 0) {
				propertyValidators.set(propertyRule.propertyName, validators);
			}
		});

		return propertyValidators;
	}

	private resolveNgValidator = <TEntity extends IModelBase, TValidationRule extends IValidationRule<TEntity>>(
		validationRule: TValidationRule,
	): INgValidator => {
		let name: string;
		let validatorFn: ValidatorFn;
		switch (validationRule.ruleType) {
			case ValidationRuleType.minLength:
				name = 'minLength';
				validatorFn = Validators.minLength(validationRule.params.get('min'));
				break;

			case ValidationRuleType.maxLength:
				name = 'maxLength';
				validatorFn = Validators.maxLength(validationRule.params.get('max'));
				break;

			case ValidationRuleType.required:
				name = 'required';
				validatorFn = Validators.required;
				break;

			default:
				return null;
		}

		return {
			name: name,
			validatorFn: validatorFn,
			errorMessage: validationRule.failedMessage,
		};
	}
}

import { Component, Injectable, SimpleChange, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/rx';

import { FormBaseComponent, INgValidator, NgValidatorFactory } from '../../lib';
import { UserService } from './user.service';
import {
	IUser,
	UserValidator,
	CrisisSupportCode,
	EthnicityCode,
	FamilySupportCode,
	TGender,
	IResponse
} from '@nickmorton/yes-admin-common';
import { tansformSlideInOut } from './user-detail.animations';

export interface IUserDetailData {
	user: IUser;
}

interface IFormModel {
	crisisSupport: Array<CrisisSupportCode>;
	ethnicity: EthnicityCode;
	familySupport: FamilySupportCode;
	forename: string;
	gender: TGender;
	dob: Date;
	isDobApproximate: boolean;
	surname: string;
}

@Component({
	templateUrl: 'user-detail.template.html',
	styleUrls: ['user-detail.style.scss'],
	animations: [tansformSlideInOut]
})
export class UserDetailComponent extends FormBaseComponent implements OnInit {
	public user: IUser = <IUser>{};
	public validators: Map<string, Array<INgValidator>>;
	public crisisSupportCode: typeof CrisisSupportCode = CrisisSupportCode;
	public ethnicityCode: typeof EthnicityCode = EthnicityCode;
	public familySupportCode: typeof FamilySupportCode = FamilySupportCode;
	public formErrors: { [key: string]: Array<string> } = {};
	public form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
		validatorFactory: NgValidatorFactory,
	) {
		super();
		this.validators = validatorFactory.getValidators(UserValidator);
	}

	public ngOnInit() {
		this.buildForm();
		this.route.data.subscribe(
			(result: { data: IUserDetailData }) => {
				this.user = result.data.user || <IUser>{};
				this.copyDataToFormModel();
			},
		);
	}

	public onSubmit = (): void => {
		Object.assign(this.user, this.form.value);
		const service: Observable<IResponse<IUser>> = this.user._id
			? this.userService.update({ data: this.user })
			: this.userService.add({ data: this.user });
		service.subscribe((response: IResponse<IUser>) => this.user = response.entity);
	}

	public onReset = () => {
		this.copyDataToFormModel();
	}

	private buildForm = () => {
		this.form = this.formBuilder.group(this.createFormGroup(
			'crisisSupport',
			'dob',
			'ethnicity',
			'familySupport',
			'forename',
			'gender',
			'isDobApproximate',
			'surname',
		));

		this.form.valueChanges.subscribe((change: SimpleChange) => this.onValueChanged(change));
		this.onValueChanged();
	}

	private copyDataToFormModel = () => {
		const formModel: IFormModel = {
			crisisSupport: this.user.crisisSupport,
			dob: this.user.dob,
			ethnicity: this.user.ethnicity,
			familySupport: this.user.familySupport,
			forename: this.user.forename || '',
			gender: this.user.gender,
			isDobApproximate: this.user.isDobApproximate,
			surname: this.user.surname || '',
		};
		this.form.reset(formModel);
	}
}

@Injectable()
export class UserDetailResolve implements Resolve<IUserDetailData> {
	constructor(private userService: UserService) {
	}

	public resolve(route: ActivatedRouteSnapshot): Observable<IUserDetailData> {
		const id: string = route.params['userId'];
		if (id) {
			return this.userService.getById(id)
				.map((response: IResponse<IUser>) => <IUserDetailData>{ user: response.entity });
		}

		return Observable.of({ user: this.userService.create() });
	}
}

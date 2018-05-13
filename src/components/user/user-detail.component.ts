import { Component, Injectable, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/rx';

import {
	CrisisSupportCode,
	EmploymentStatusCode,
	EthnicityCode,
	FamilySupportCode,
	HousingStatusCode,
	IResponse,
	IUser,
	JobSearchFrequencyCode,
	TGender,
	UserValidator
} from '@nickmorton/yes-admin-common';
import { FormBaseComponent, INgValidator, NgValidatorFactory } from '../../lib';
import { tansformSlideInOut } from './user-detail.animations';
import { UserService } from './user.service';

export interface IUserDetailData {
	user: IUser;
}

interface IFormModel {
	crisisSupport: Array<CrisisSupportCode>;
	dob: Date;
	employmentStatus: EmploymentStatusCode;
	ethnicity: EthnicityCode;
	familySupport: FamilySupportCode;
	forename: string;
	gender: TGender;
	hasCurrentCV: boolean;
	hasSkillsToFindJob: boolean;
	housingStatus: HousingStatusCode;
	isDobApproximate: boolean;
	isSearchingForJob: boolean;
	jobInterviewsInLastMonth: number;
	jobSearchFrequency: JobSearchFrequencyCode;
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
	public employmentStatusCode: typeof EmploymentStatusCode = EmploymentStatusCode;
	public ethnicityCode: typeof EthnicityCode = EthnicityCode;
	public familySupportCode: typeof FamilySupportCode = FamilySupportCode;
	public housingStatusCode: typeof HousingStatusCode = HousingStatusCode;
	public jobSearchFrequencyCode: typeof JobSearchFrequencyCode = JobSearchFrequencyCode;
	public formErrors: { [key: string]: Array<string> } = {};
	public form: FormGroup;
	public readonly defaultDobYear = UserValidator.defaultDobYear;
	public readonly maximumDob = UserValidator.maximumDob;
	private returnUrl: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		validatorFactory: NgValidatorFactory,
	) {
		super();
		this.validators = validatorFactory.getValidators(UserValidator);
	}

	public ngOnInit() {
		this.addForDisposal(
			this.buildForm(),
			this.route.data.subscribe(
				(result: { data: IUserDetailData }) => {
					this.user = result.data.user || <IUser>{};
					this.copyDataToFormModel();
				},
			),
			this.route.queryParamMap.subscribe(p => this.returnUrl = p.get('ret'))
		);
	}

	public onSubmit() {
		Object.assign(this.user, this.form.value);
		const service: Observable<IResponse<IUser>> = this.user._id
			? this.userService.update({ data: this.user })
			: this.userService.add({ data: this.user });
		service.subscribe(response => {
			this.user = response.entity;
			this.navigateToReturnUrl();
		});
	}

	public onReset() {
		this.copyDataToFormModel();
	}

	public onCancel() {
		this.navigateToReturnUrl();
	}

	private buildForm = () => {
		this.form = this.formBuilder.group(this.createFormGroup(
			'crisisSupport',
			'dob',
			'employmentStatus',
			'ethnicity',
			'familySupport',
			'forename',
			'gender',
			'hasCurrentCV',
			'hasSkillsToFindJob',
			'housingStatus',
			'isDobApproximate',
			'isSearchingForJob',
			'jobInterviewsInLastMonth',
			'jobSearchFrequency',
			'surname',
		));

		this.onValueChanged();
		return this.form.valueChanges.subscribe((change: SimpleChange) => this.onValueChanged(change));
	}

	private copyDataToFormModel = () => {
		const formModel: IFormModel = {
			crisisSupport: this.user.crisisSupport,
			dob: this.user.dob,
			employmentStatus: this.user.employmentStatus,
			ethnicity: this.user.ethnicity,
			familySupport: this.user.familySupport,
			forename: this.user.forename || '',
			gender: this.user.gender,
			hasCurrentCV: this.user.hasCurrentCV,
			hasSkillsToFindJob: this.user.hasSkillsToFindJob,
			housingStatus: this.user.housingStatus,
			isDobApproximate: this.user.isDobApproximate,
			isSearchingForJob: this.user.isSearchingForJob,
			jobInterviewsInLastMonth: this.user.jobInterviewsInLastMonth || 0,
			jobSearchFrequency: this.user.jobSearchFrequency,
			surname: this.user.surname || '',
		};
		this.form.reset(formModel);
	}

	private navigateToReturnUrl() {
		if (this.returnUrl) {
			this.router.navigateByUrl(this.returnUrl);
		}
	}
}

@Injectable()
export class UserDetailResolve implements Resolve<IUserDetailData> {
	constructor(private userService: UserService) {
	}

	public resolve(route: ActivatedRouteSnapshot): Observable<IUserDetailData> {
		const id: string = route.params['userId'];
		if (id) {
			return this.userService.getById(id).pipe(
				map(response => <IUserDetailData>{ user: response.entity })
			);
		}

		return Observable.of({ user: this.userService.create() });
	}
}

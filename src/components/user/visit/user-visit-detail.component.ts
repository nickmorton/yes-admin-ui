import { Component, Injectable, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
	CrisisSupportCode,
	EmploymentStatusCode,
	EthnicityCode,
	FamilySupportCode,
	HousingStatusCode,
	IResponse,
	IssueCode,
	IUserVisit,
	JobSearchFrequencyCode,
	UserValidator
} from '@nickmorton/yes-admin-common';
import { FormBaseComponent, INgValidator, NgValidatorFactory } from '../../../lib';
import { tansformSlideInOut } from '../../../styles/animations';
import { UserVisitService } from './user-visit.service';

export interface IUserVisitDetailData {
	visit: IUserVisit;
}

interface IFormModel {
	crisisSupport: Array<CrisisSupportCode>;
	employmentStatus: EmploymentStatusCode;
	familySupport: FamilySupportCode;
	hasCurrentCV: boolean;
	hasSkillsToFindJob: boolean;
	housingStatus: HousingStatusCode;
	isSearchingForJob: boolean;
	jobInterviewsInLastMonth: number;
	jobSearchFrequency: JobSearchFrequencyCode;
}

@Component({
	templateUrl: 'user-visit-detail.template.html',
	styleUrls: ['user-visit-detail.style.scss'],
	animations: [tansformSlideInOut]
})
export class UserVisitDetailComponent extends FormBaseComponent implements OnInit {
	public visit: IUserVisit = <IUserVisit>{};
	public visitTableColumns = ['date', 'wasByAppointment', 'issue'];
	public readonly validators: Map<string, Array<INgValidator>>;
	public crisisSupportCode: typeof CrisisSupportCode = CrisisSupportCode;
	public employmentStatusCode: typeof EmploymentStatusCode = EmploymentStatusCode;
	public ethnicityCode: typeof EthnicityCode = EthnicityCode;
	public familySupportCode: typeof FamilySupportCode = FamilySupportCode;
	public housingStatusCode: typeof HousingStatusCode = HousingStatusCode;
	public jobSearchFrequencyCode: typeof JobSearchFrequencyCode = JobSearchFrequencyCode;
	public issueCode: typeof IssueCode = IssueCode;
	public formErrors: { [key: string]: Array<string> } = {};
	public form: FormGroup;
	public readonly defaultDobYear = UserValidator.defaultDobYear;
	public readonly maximumDob = UserValidator.maximumDob;
	public readonly today = new Date();
	private returnUrl: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserVisitService,
		validatorFactory: NgValidatorFactory,
	) {
		super();
		this.validators = validatorFactory.getValidators(UserValidator);
	}

	public ngOnInit() {
		this.addForDisposal(
			this.buildForm(),
			this.route.data.subscribe(
				(result: { data: IUserVisitDetailData }) => {
					this.visit = result.data.visit || <IUserVisit>{};
					this.copyDataToFormModel();
				},
			),
			this.route.queryParamMap.subscribe(p => this.returnUrl = p.get('ret')),
		);
	}

	public onSubmit() {
		Object.assign(this.visit, this.form.value);
		const service: Observable<IResponse<IUserVisit>> = this.visit._id
			? this.userService.update({ data: this.visit })
			: this.userService.add({ data: this.visit });
		service.subscribe(response => {
			this.visit = response.entity;
			this.navigateToReturnUrl();
		});
	}

	public onReset() {
		this.copyDataToFormModel();
	}

	public onCancel() {
		this.navigateToReturnUrl();
	}

	public onAddVisit(date: Date, issue?: IssueCode, wasByAppointment?: boolean) {
		// // this.visit.visits = [...this.visit.visits || [], { date, issue, wasByAppointment }];
	}

	private buildForm = () => {
		this.form = this.formBuilder.group(this.createFormGroup(
			'crisisSupport',
			'employmentStatus',
			'familySupport',
			'hasCurrentCV',
			'hasSkillsToFindJob',
			'housingStatus',
			'isSearchingForJob',
			'jobInterviewsInLastMonth',
			'jobSearchFrequency',
		));

		this.onValueChanged();
		return this.form.valueChanges.subscribe((change: SimpleChange) => this.onValueChanged(change));
	}

	private copyDataToFormModel = () => {
		const formModel: IFormModel = {
			crisisSupport: this.visit.crisisSupport,
			employmentStatus: this.visit.employmentStatus,
			familySupport: this.visit.familySupport,
			hasCurrentCV: this.visit.hasCurrentCV,
			hasSkillsToFindJob: this.visit.hasSkillsToFindJob,
			housingStatus: this.visit.housingStatus,
			isSearchingForJob: this.visit.isSearchingForJob,
			jobInterviewsInLastMonth: this.visit.jobInterviewsInLastMonth || 0,
			jobSearchFrequency: this.visit.jobSearchFrequency,
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
export class UserVisitDetailResolve implements Resolve<IUserVisitDetailData> {
	constructor(private userVisitsService: UserVisitService) {
	}

	public resolve(route: ActivatedRouteSnapshot): Observable<IUserVisitDetailData> {
		const userId: string = route.parent.paramMap.get('userId');
		const visitId: string = route.paramMap.get('visitId');
		if (visitId) {
			return this.userVisitsService.getById(visitId).pipe(
				map(response => <IUserVisitDetailData>{ visit: response.entity })
			);
		}

		return of({ visit: this.userVisitsService.create(userId) });
	}
}

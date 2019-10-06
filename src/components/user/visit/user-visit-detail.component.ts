import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
	ContactTypeCode,
	CrisisSupportCode,
	EmploymentStatusCode,
	EthnicityCode,
	FamilySupportCode,
	HousingStatusCode,
	IssueCode,
	IUserVisit,
	JobSearchFrequencyCode,
	UserValidator,
	VisitTimeCode
} from '@nickmorton/yes-admin-common';
import { FormBaseComponent, INgValidator, NgValidatorFactory } from '../../../lib';
import { SpinnerService, UserMessageService } from '../../../services';
import { tansformSlideInOut } from '../../../styles/animations';
import { UserVisitService } from './user-visit.service';

export interface IUserVisitDetailData {
	visit: IUserVisit;
}

type TFormModel = Pick<
	IUserVisit,
	'contactType' |
	'crisisSupport' |
	'date' |
	'employmentStatus' |
	'familySupport' |
	'hasCurrentCV' |
	'hasSkillsToFindJob' |
	'housingStatus' |
	'isSearchingForJob' |
	'issue' |
	'jobInterviewsInLastMonth' |
	'jobSearchFrequency' |
	'visitTime' |
	'wasByAppointment'
>;

@Component({
	templateUrl: 'user-visit-detail.template.html',
	styleUrls: ['user-visit-detail.style.scss'],
	animations: [tansformSlideInOut]
})
export class UserVisitDetailComponent extends FormBaseComponent implements OnInit {
	visit: IUserVisit = <IUserVisit>{};
	readonly validators: Map<string, Array<INgValidator>>;
	crisisSupportCode: typeof CrisisSupportCode = CrisisSupportCode;
	contactTypeCode: typeof ContactTypeCode = ContactTypeCode;
	employmentStatusCode: typeof EmploymentStatusCode = EmploymentStatusCode;
	ethnicityCode: typeof EthnicityCode = EthnicityCode;
	familySupportCode: typeof FamilySupportCode = FamilySupportCode;
	housingStatusCode: typeof HousingStatusCode = HousingStatusCode;
	jobSearchFrequencyCode: typeof JobSearchFrequencyCode = JobSearchFrequencyCode;
	issueCode: typeof IssueCode = IssueCode;
	visitTimeCode: typeof VisitTimeCode = VisitTimeCode;
	isBusy = false;

	formErrors: { [key: string]: Array<string> } = {};
	form: FormGroup;
	readonly defaultDobYear = UserValidator.defaultDobYear;
	readonly maximumDob = UserValidator.maximumDob;
	readonly today = new Date();
	private returnUrl: string;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly userService: UserVisitService,
		private readonly userMessageService: UserMessageService,
		private readonly spinnerService: SpinnerService,
		validatorFactory: NgValidatorFactory,
	) {
		super();
		this.validators = validatorFactory.getValidators(UserValidator);
	}

	ngOnInit() {
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

	onSubmit() {
		this.isBusy = true;
		this.spinnerService.show();

		Object.assign(this.visit, this.form.value);
		const service = this.visit._id
			? this.userService.update({ data: this.visit })
			: this.userService.add({ data: this.visit });
		service.subscribe(response => {
			this.visit = response.entity;
			this.userMessageService.savedSuccessfully();
			this.navigateToReturnUrl();
		}, () => {
			this.userMessageService.serverError(this.visit._id ? 'put' : 'post');
		}, () => {
			this.isBusy = false;
			this.spinnerService.hide();
		});
	}

	onReset() {
		this.copyDataToFormModel();
	}

	onCancel() {
		this.navigateToReturnUrl();
	}

	private buildForm() {
		this.form = this.formBuilder.group(this.createFormGroup(
			'contactType',
			'crisisSupport',
			'date',
			'employmentStatus',
			'familySupport',
			'hasCurrentCV',
			'hasSkillsToFindJob',
			'housingStatus',
			'isSearchingForJob',
			'issue',
			'jobInterviewsInLastMonth',
			'jobSearchFrequency',
			'visitTime',
			'wasByAppointment'
		));

		this.onValueChanged();
		return this.form.valueChanges.subscribe(() => this.onValueChanged());
	}

	private copyDataToFormModel() {
		const formModel: TFormModel = {
			contactType: this.visit.contactType,
			crisisSupport: this.visit.crisisSupport,
			date: this.visit.date,
			employmentStatus: this.visit.employmentStatus,
			familySupport: this.visit.familySupport,
			hasCurrentCV: this.visit.hasCurrentCV,
			hasSkillsToFindJob: this.visit.hasSkillsToFindJob,
			housingStatus: this.visit.housingStatus,
			isSearchingForJob: this.visit.isSearchingForJob,
			issue: this.visit.issue,
			jobInterviewsInLastMonth: this.visit.jobInterviewsInLastMonth || 0,
			jobSearchFrequency: this.visit.jobSearchFrequency,
			visitTime: this.visit.visitTime,
			wasByAppointment: this.visit.wasByAppointment
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
	constructor(private readonly userVisitsService: UserVisitService, private readonly userMessageService: UserMessageService) {
	}

	resolve(route: ActivatedRouteSnapshot): Observable<IUserVisitDetailData> {
		const userId: string = route.parent.paramMap.get('userId');
		const visitId: string = route.paramMap.get('visitId');

		if (visitId || route.data.latest) {
			const service = visitId ? this.userVisitsService.getById(visitId) : this.userVisitsService.getLatest(userId);
			return service.pipe(
				map(response => <IUserVisitDetailData>{ visit: response.entity }),
				catchError(error => {
					this.userMessageService.serverError('get');
					return throwError(error);
				})
			);
		}

		return this.userVisitsService.create(userId).pipe(
			map(visit => ({ visit })),
			catchError(error => {
				this.userMessageService.serverError('get');
				return throwError(error);
			})
		);
	}
}

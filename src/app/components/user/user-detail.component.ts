import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
    EthnicityCode,
    IResponse,
    IUser,
    TGender,
    UserValidator
} from '@nickmorton/yes-admin-common';
import { FormBaseComponent, INgValidator, NgValidatorFactory } from '../../lib';
import { SpinnerService, UserMessageService } from '../../services';
import { tansformSlideInOut } from '../../styles/animations';
import { UserService } from './user.service';

export interface IUserDetailData {
    user: IUser;
}

interface IFormModel {
    dob: Date;
    ethnicity: EthnicityCode;

    forename: string;
    gender: TGender;
    isDobApproximate: boolean;
    surname: string;
}

@Component({
    templateUrl: 'user-detail.component.html',
    styleUrls: ['user-detail.component.scss'],
    animations: [tansformSlideInOut]
})
export class UserDetailComponent extends FormBaseComponent implements OnInit {
    user: IUser = {} as IUser;
    visitTableColumns = ['date', 'wasByAppointment', 'issue'];
    validators: Map<string, Array<INgValidator>>;
    ethnicityCode: typeof EthnicityCode = EthnicityCode;
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
        private readonly userService: UserService,
        private readonly userMessageService: UserMessageService,
        private readonly spinnerService: SpinnerService,
        private readonly title: Title,
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
                    this.user = result.data.user || {} as IUser;
                    this.copyDataToFormModel();
                    this.title.setTitle(this.user._id ? `${this.user.forename} ${this.user.surname}` : '[NEW]');
                },
            ),
            this.route.queryParamMap.subscribe(p => this.returnUrl = p.get('ret'))
        );
    }

    public onSubmit() {
        this.isBusy = true;
        this.spinnerService.show();
        Object.assign(this.user, this.form.value);
        const service: Observable<IResponse<IUser>> = this.user._id
            ? this.userService.update(this.user._id, { data: this.user })
            : this.userService.add({ data: this.user });
        service.subscribe(response => {
            this.user = response.entity;
            this.userMessageService.savedSuccessfully();
            this.navigateToReturnUrl();
        }, () => {
            this.userMessageService.serverError(this.user._id ? 'put' : 'post');
        }, () => {
            this.isBusy = false;
            this.spinnerService.hide();
        });
    }

    public onReset() {
        this.copyDataToFormModel();
    }

    public onCancel() {
        this.navigateToReturnUrl();
    }

    private buildForm() {
        this.form = this.formBuilder.group(this.createFormGroup(
            'dob',
            'ethnicity',
            'forename',
            'gender',
            'isDobApproximate',
            'surname',
        ));

        this.onValueChanged();
        return this.form.valueChanges.subscribe(() => this.onValueChanged());
    }

    private copyDataToFormModel() {
        const formModel: IFormModel = {
            dob: this.user.dob,
            ethnicity: this.user.ethnicity,
            forename: this.user.forename || '',
            gender: this.user.gender,
            isDobApproximate: this.user.isDobApproximate,
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
    constructor(private userService: UserService, private readonly userMessageService: UserMessageService) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<IUserDetailData> {
        const id: string = route.paramMap.get('userId');
        if (id) {
            return this.userService.getById(id).pipe(
                map(response => ({ user: response.entity })),
                catchError(error => {
                    this.userMessageService.serverError('get');
                    return throwError(error);
                })
            );
        }

        return of({ user: this.userService.create() });
    }
}

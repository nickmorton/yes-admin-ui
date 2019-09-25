import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatNativeDateModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatSelectModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatTableModule,
	MatToolbarModule
} from '@angular/material';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule(
	{
		entryComponents: [MatSpinner],
		exports: [
			MatButtonModule,
			MatCardModule,
			MatCheckboxModule,
			MatDatepickerModule,
			MatIconModule,
			MatInputModule,
			MatListModule,
			MatNativeDateModule,
			MatProgressSpinnerModule,
			MatRadioModule,
			MatSelectModule,
			MatSidenavModule,
			MatSnackBarModule,
			MatTableModule,
			MatToolbarModule,
		],
		imports: [
			MatButtonModule,
			MatCardModule,
			MatCheckboxModule,
			MatDatepickerModule,
			MatIconModule,
			MatInputModule,
			MatListModule,
			MatNativeDateModule,
			MatProgressSpinnerModule,
			MatRadioModule,
			MatSelectModule,
			MatSidenavModule,
			MatSnackBarModule,
			MatToolbarModule,
			OverlayModule,
			PortalModule
		],
		providers: [
			{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
		]
	},
)
export class SharedModule {
}

import { NgModule } from '@angular/core';

// Material modules.
import {
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatNativeDateModule,
	MatRadioModule,
	MatSelectModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatTableModule,
	MatToolbarModule
} from '@angular/material';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule(
	{
		exports: [
			MatButtonModule,
			MatCardModule,
			MatCheckboxModule,
			MatDatepickerModule,
			MatIconModule,
			MatInputModule,
			MatListModule,
			MatNativeDateModule,
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
			MatRadioModule,
			MatSelectModule,
			MatSidenavModule,
			MatSnackBarModule,
			MatToolbarModule,
		],
		providers: [
			{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
		]
	},
)
export class SharedModule {
}

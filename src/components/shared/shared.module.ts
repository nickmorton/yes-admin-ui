import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

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

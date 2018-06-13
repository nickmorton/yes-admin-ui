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
	MatTableModule,
	MatToolbarModule
} from '@angular/material';

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
			MatToolbarModule,
		],
	},
)
export class SharedModule {
}

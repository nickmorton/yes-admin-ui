import { NgModule } from '@angular/core';

// Material modules.
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';

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

import { NgModule } from '@angular/core';

// Material modules.
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdRadioModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { MdTableModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';

@NgModule(
	{
		exports: [
			MdButtonModule,
			MdCardModule,
			MdCheckboxModule,
			MdDatepickerModule,
			MdIconModule,
			MdInputModule,
			MdListModule,
			MdNativeDateModule,
			MdRadioModule,
			MdSelectModule,
			MdSidenavModule,
			MdTableModule,
			MdToolbarModule,
		],
		imports: [
			MdButtonModule,
			MdCardModule,
			MdCheckboxModule,
			MdDatepickerModule,
			MdIconModule,
			MdInputModule,
			MdListModule,
			MdNativeDateModule,
			MdRadioModule,
			MdSelectModule,
			MdSidenavModule,
			MdToolbarModule,
		],
	},
)
export class SharedModule {
}

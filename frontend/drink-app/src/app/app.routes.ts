import { Routes } from '@angular/router';
import { DrinkListComponent } from './components/drink-list/drink-list.component';
import { DrinkFormComponent } from './components/drink-form/drink-form.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/drinks', pathMatch: 'full' },
	{ path: 'drinks', component: DrinkListComponent },
	{ path: 'drinks/new', component: DrinkFormComponent }
];

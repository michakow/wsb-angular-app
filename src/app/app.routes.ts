import { Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { CarEditFormComponent } from './components/car-form/car-edit-form.component';

export const routes: Routes = [
  {
    path: 'cars',
    children: [
      {
        path: '',
        component: CarListComponent,
      },
      {
        path: 'details',
        component: CarDetailsComponent,
      },
      {
        path: 'edit',
        component: CarEditFormComponent,
      },
      {
        path: 'new',
        component: CarFormComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'cars',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'cars',
  },
];

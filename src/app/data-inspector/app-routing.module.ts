import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FullListComponent} from './components/full-list/full-list.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'full-list',
    component: FullListComponent
  },
  { path: '',
    redirectTo: '/full-list',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

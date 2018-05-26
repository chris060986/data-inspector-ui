import { ListViewComponent } from './components/list-view/list-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'overview',
    component: ListViewComponent
  },
  { 
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    redirectTo: '/overview',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

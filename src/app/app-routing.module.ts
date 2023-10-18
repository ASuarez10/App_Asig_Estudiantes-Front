import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './shared/page404/page404.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('../app/modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'data_loading',
    loadChildren: () => import('../app/modules/data-loading/data-loading.module').then(m => m.DataLoadingModule)
  },
  {
    path: '**', component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

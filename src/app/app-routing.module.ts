import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
// import { AppComponent } from './app.component';
import { EngineerComponent } from './engineer/engineer.component';

const routes: Routes = [
  // {
  //   path: "", redirectTo: '/admin', pathMatch: 'full'
  
  // },
  {
    path: "",
    component: AdminComponent
  },
  {
    path:"engineer",
    component:EngineerComponent
  },
  { path: '**', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

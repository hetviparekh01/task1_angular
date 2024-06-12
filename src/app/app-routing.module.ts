import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { AgTableComponent } from './ag-table/ag-table.component';
const routes: Routes = [
  {
    path:"",
    component:FormComponent
  },
  {
    path:"data",
    component:AgTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

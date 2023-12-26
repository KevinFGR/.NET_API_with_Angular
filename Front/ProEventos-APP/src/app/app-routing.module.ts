import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventosComponent } from './components/eventos/eventos.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactsComponent } from './components/contacts/contacts.component';

const routes: Routes = [
  {path : 'events', component : EventosComponent},
  {path : 'profile', component : ProfileComponent},
  {path : 'contacts', component: ContactsComponent},
  {path : 'dashboard',component : DashboardComponent},
  {path : 'speakers', component : PalestrantesComponent},
  {path : '', redirectTo : 'dashboard', pathMatch : 'full'},
  {path : '**', redirectTo: 'dashboard', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

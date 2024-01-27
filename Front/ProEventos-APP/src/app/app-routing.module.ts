import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsComponent } from './components/events/events.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { UserComponent } from './components/user/user.component';
// childrens ...
import { ListEventsComponent } from './components/events/list-events/list-events.component';
import { DetailEventsComponent } from './components/events/detail-events/detail-events.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

const routes: Routes = [
  // {path:'events',redirectTo:'events/list'},
  {path : 'events', component: EventsComponent,
    children:[
      {path:'list', component: ListEventsComponent},
      {path:'details/:id', component: DetailEventsComponent},
      {path:'details', component: DetailEventsComponent}
    ]
  
  },
  {path : 'user', component:UserComponent,
    children:[
      {path:'login', component:LoginComponent},
      {path:'registration', component:RegistrationComponent}
    ]
  },
  {path : 'user/profile', component : ProfileComponent},
  {path : 'contacts', component: ContactsComponent},
  {path : 'dashboard',component : DashboardComponent},
  {path : 'speakers', component : SpeakersComponent},
  {path : '', redirectTo : 'dashboard', pathMatch : 'full'},
  {path : '**', redirectTo: 'dashboard', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

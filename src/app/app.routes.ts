import { RouterModule, Routes } from '@angular/router';

//component
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForoComponent } from './components/foro/foro.component';
import { UserdataComponent } from './components/userdata/userdata.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'foro', component: ForoComponent },
  { path: 'userdata', component: UserdataComponent },



  //poner encima de este
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

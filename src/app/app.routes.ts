import { RouterModule, Routes } from '@angular/router';

//component
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForoComponent } from './components/foro/foro.component';
import { UserdataComponent } from './components/userdata/userdata.component';
import { RegisterComponent } from './components/register/register.component';
import { TemasComponent } from './components/temas/temas.component';
import { HiloComponent } from './components/hilo/hilo.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userdata', component: UserdataComponent },
  { path: 'administracion', component: AdminComponent },
  { path: 'notfound', component: NotfoundComponent },

  { path: 'foro', component: ForoComponent },
  { path: 'temas/:id_grupo/:id_seccion', component: TemasComponent },
  { path: 'hilo/:id_grupo/:id_seccion/:id_tema', component: HiloComponent },

  //poner encima de este
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

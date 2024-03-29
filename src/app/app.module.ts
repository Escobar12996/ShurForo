import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
//Rutas
import { AppRoutingModule } from './app-routing.module';
import  { APP_ROUTING } from './app.routes';
//Servicios
import { FirebaseForoService } from './service/firebaseforo.service';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForoComponent } from './components/foro/foro.component';
import { UserdataComponent } from './components/userdata/userdata.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { ZonaforoComponent } from './components/zonaforo/zonaforo.component';
import { TemasComponent } from './components/temas/temas.component';
import { HiloComponent } from './components/hilo/hilo.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotfoundComponent } from './components/notfound/notfound.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForoComponent,
    UserdataComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    ZonaforoComponent,
    TemasComponent,
    HiloComponent,
    AdminComponent,
    NotfoundComponent,
  ],
  imports: [
    CKEditorModule,
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    FirebaseForoService
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

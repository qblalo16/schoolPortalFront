import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTING } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { LoginComponent } from './components/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule, Routes } from '@angular/router';
import { GradeGroupComponent } from './components/grade-group/grade-group.component';
import { HomeComponent } from './components/home/home.component';
import { NuevoGrupoComponent } from './components/nuevo-grupo/nuevo-grupo.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DocenteComponent } from './components/docente/docente.component';
import { DocenteMainComponent } from './components/docente-main/docente-main.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlumnosMainComponent } from './components/alumnos-main/alumnos-main.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      GradeGroupComponent,
      HomeComponent,
      NuevoGrupoComponent,
      CalendarioComponent,
      DocenteComponent,
      DocenteMainComponent,
      AlumnosMainComponent,
      AlumnosComponent
    ],
    imports: [
      APP_ROUTING,
      MatSelectModule,
      MatSnackBarModule,
      MatDialogModule,
      BrowserModule,
      FormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      FormsModule,
      FontAwesomeModule,
      MatIconModule,
      RecaptchaModule,
      RecaptchaFormsModule,
      RouterModule,
      MatFormFieldModule,
      MatIconModule,
      MatSlideToggleModule
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'es-Mx' },
    {provide: RECAPTCHA_SETTINGS, useValue: { siteKey:  '6LeufJUpAAAAAFRCn1-DkuPgQO5kC1Mpo-ASTDRD' as RecaptchaSettings} },
    {provide: RECAPTCHA_LANGUAGE, useValue: LOCALE_ID},
    provideAnimationsAsync() ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class AppModule { }


  
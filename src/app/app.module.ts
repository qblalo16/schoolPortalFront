import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTING } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { LoginComponent } from './components/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule, Routes } from '@angular/router';
import { GradeGroupComponent } from './components/grade-group/grade-group.component';
import { HomeComponent } from './components/home/home.component';
import { NuevoGrupoComponent } from './components/nuevo-grupo/nuevo-grupo.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatPseudoCheckbox, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DocenteComponent } from './components/docente/docente.component';
import { DocenteMainComponent } from './components/docente-main/docente-main.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlumnosMainComponent } from './components/alumnos-main/alumnos-main.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { AsistenciaMainComponent } from './components/asistencia-main/asistencia-main.component';
import { ConfirmComponent } from './components/SPA/confirm/confirm.component';
import { DangerComponent } from './components/SPA/danger/danger.component';
import { InfoComponent } from './components/SPA/info/info.component';
import { SuccessComponent } from './components/SPA/success/success.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HomeComponent as HomeComponentTutor} from './components/tutor/home/home.component';
import { AccountComponent as AccountComponentTutor} from './components/tutor/account/account.component';
import { AttendanceComponent as AttendanceComponentTutor} from './components/tutor/attendance/attendance.component';
import { CalendarComponent as CalendarComponentTutor} from './components/tutor/calendar/calendar.component';
import { PayComponent } from './components/tutor/pay/pay.component';
import { PerfilComponent } from './components/tutor/perfil/perfil.component'
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { FinanzasComponent } from './components/finanzas/finanzas.component';
import { ProccessPayComponent } from './components/tutor/proccess-pay/proccess-pay.component';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../enviroments/environment';
import { StripeCreditCardComponent } from './components/tutor/stripe-credit-card/stripe-credit-card.component';


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
      AlumnosComponent,
      AsistenciaComponent,
      AsistenciaMainComponent,
      ConfirmComponent,
      DangerComponent,
      InfoComponent,
      SuccessComponent,
      HomeComponentTutor,
      AccountComponentTutor,
      AttendanceComponentTutor,
      CalendarComponentTutor,
      PayComponent,
      PerfilComponent,
      FinanzasComponent,
      ProccessPayComponent,
      StripeCreditCardComponent
    ],
    imports: [
      APP_ROUTING,
      NgxStripeModule.forRoot(environment.stripePk),
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
      MatButtonModule,
      MatSlideToggleModule,
      MatTableModule,
      MatTooltipModule,
      NgxSpinnerModule,
      MatCheckboxModule,
      MatTabsModule,
      MatExpansionModule,
      MatInputModule,
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'es-Mx' },
    {provide: RECAPTCHA_SETTINGS, useValue: { siteKey:  '6LeufJUpAAAAAFRCn1-DkuPgQO5kC1Mpo-ASTDRD' as RecaptchaSettings} },
    {provide: RECAPTCHA_LANGUAGE, useValue: LOCALE_ID},
    provideAnimationsAsync() ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class AppModule { }


  
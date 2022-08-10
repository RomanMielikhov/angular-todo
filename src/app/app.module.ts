import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { FieldModule } from './shared/components/field/field.module';
import { ButtonModule } from './shared/components/button/button.module';
import { LayoutModule } from './shared/components/layout/layout.module';
import { ToolbarModule } from './shared/components/toolbar/toolbar.module';
import { AppHttpInterceptor } from './shared/interceptors/http.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FieldModule,
    LayoutModule,
    ButtonModule,
    BrowserModule,
    ToolbarModule,
    MatTabsModule,
    MatCardModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

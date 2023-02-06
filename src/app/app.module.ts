import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiInterceptor } from './interceptors/api/api.interceptor';
import { FieldModule } from './shared/components/field/field.module';
import { ButtonModule } from './shared/components/button/button.module';
import { LayoutModule } from './shared/components/layout/layout.module';
import { ToolbarModule } from './shared/components/toolbar/toolbar.module';

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
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

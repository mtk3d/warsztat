import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { DocumentService } from './_services/document.service';
import { DocumentPositionService } from './_services/documentPosition.service';
import { ConsumerService } from './_services/consumer.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { DocumentComponent } from './components/documents/document.component';
import { DocumentConsumerComponent } from './components/documents/document.consumer.component';
import { DocumentPositionsComponent } from './components/documents/document.positions.component';
import { ConsumersComponent } from './components/consumers/consumers.component';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    TimetableComponent,
    SettingsComponent,
    PageNotFoundComponent,
    SidebarComponent,
    BreadcrumbComponent,
    DocumentsComponent,
    DocumentComponent,
    DocumentConsumerComponent,
    DocumentPositionsComponent,
    ConsumersComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'documents',
        pathMatch: 'full'
      },
      {
          path: 'documents',
          component: DocumentsComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'documents/:id',
          component: DocumentComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'consumers',
          component: ConsumersComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'newdocument',
          component: DocumentsComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'orders',
          component: OrdersComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'settings',
          component: SettingsComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'timetable',
          component: TimetableComponent
      },
      {
          path: 'about',
          component: AboutComponent
      },
      {
          path: 'login',
          component: LoginComponent
      },
      {
          path: 'register',
          component: RegisterComponent,
          canActivate: [!AuthGuard]
      },
      {
          path: '**',
          component: PageNotFoundComponent
      }
    ])
  ],
  providers: [
      AuthGuard,
      AuthenticationService,
      DocumentService,
      DocumentPositionService,
      ConsumerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

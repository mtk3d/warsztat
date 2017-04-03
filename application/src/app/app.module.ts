import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { DocumentService } from './_services/document.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    DocumentsComponent,
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
          component: DocumentsComponent
      },
      {
          path: 'orders',
          component: OrdersComponent
      },
      {
          path: 'login',
          component: LoginComponent
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
      DocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

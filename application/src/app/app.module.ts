import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
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
          path: '**',
          component: PageNotFoundComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

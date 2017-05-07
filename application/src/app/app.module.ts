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
import { ServiceService } from './_services/service.service';
import { StoreService } from './_services/store.service';
import { EmployeeService } from './_services/employee.service';
import { UserDataService } from './_services/userData.service';
import { VehicleService } from './_services/vehicle.service';

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
import { DocumentAddComponent } from './components/documents/document.add.component';
import { DocumentPositionsComponent } from './components/documents/document.positions.component';
import { ConsumersComponent } from './components/consumers/consumers.component';
import { ConsumerAddComponent } from './components/consumers/consumer.add.component';
import { ConsumerInputComponent } from './components/consumers/consumer.input.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { VehicleAddComponent } from './components/vehicles/vehicle.add.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ServicesComponent } from './components/services/services.component';
import { ServiceAddComponent } from './components/services/service.add.component';
import { StoresComponent } from './components/stores/stores.component';
import { StoresAddComponent } from './components/stores/stores.add.component';
import { TiresComponent } from './components/tires/tires.component';
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
    DocumentAddComponent,
    DocumentPositionsComponent,
    ConsumersComponent,
    ConsumerAddComponent,
    ConsumerInputComponent,
    VehiclesComponent,
    VehicleAddComponent,
    EmployeesComponent,
    ServicesComponent,
    ServiceAddComponent,
    StoresComponent,
    StoresAddComponent,
    TiresComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'documents', pathMatch: 'full'},
      {path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard]},
      {path: 'documents/add', component: DocumentAddComponent, canActivate: [AuthGuard]},
      {path: 'documents/:id', component: DocumentComponent, canActivate: [AuthGuard]},
      {path: 'consumers', component: ConsumersComponent, canActivate: [AuthGuard]},
      {path: 'consumers/add', component: ConsumerAddComponent, canActivate: [AuthGuard]},
      {path: 'newdocument', component: DocumentsComponent, canActivate: [AuthGuard]},
      {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
      {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
      {path: 'timetable', component: TimetableComponent, canActivate: [AuthGuard]},
      {path: 'vehicles', component: VehiclesComponent, canActivate: [AuthGuard]},
      {path: 'vehicles/add', component: VehicleAddComponent, canActivate: [AuthGuard]},
      {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
      {path: 'services', component: ServicesComponent, canActivate: [AuthGuard]},
      {path: 'services/add', component: ServiceAddComponent, canActivate: [AuthGuard]},
      {path: 'stores', component: StoresComponent, canActivate: [AuthGuard]},
      {path: 'stores/add', component: StoresAddComponent, canActivate: [AuthGuard]},
      {path: 'tires', component: TiresComponent, canActivate: [AuthGuard]},
      {path: 'about', component: AboutComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent, canActivate: [!AuthGuard]},
      {path: '**', component: PageNotFoundComponent}
    ])
  ],
  providers: [
      AuthGuard,
      AuthenticationService,
      DocumentService,
      DocumentPositionService,
      ConsumerService,
      ServiceService,
      StoreService,
      EmployeeService,
      UserDataService,
      VehicleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

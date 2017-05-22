import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { DocumentService } from './_services/document.service';
import { DocumentPositionService } from './_services/documentPosition.service';
import { OrderService } from './_services/order.service';
import { ConsumerService } from './_services/consumer.service';
import { ServiceService } from './_services/service.service';
import { StoreService } from './_services/store.service';
import { EmployeeService } from './_services/employee.service';
import { UserDataService } from './_services/userData.service';
import { VehicleService } from './_services/vehicle.service';
import { CalendarService } from './_services/calendar.service';
import { BreadcrumbsService } from './_services/breadcrumbs.service';
import { pdfGeneratorService } from './_services/pdfGenerator.service';

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
import { DocumentParamsComponent } from './components/documents/document.params.component';
import { ConsumersComponent } from './components/consumers/consumers.component';
import { ConsumerComponent } from './components/consumers/consumer.component';
import { ConsumerAddComponent } from './components/consumers/consumer.add.component';
import { ConsumerDataComponent } from './components/consumers/consumer.data.component';
import { ConsumerInputComponent } from './components/consumers/consumer.input.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { VehicleComponent } from './components/vehicles/vehicle.component';
import { VehicleAddComponent } from './components/vehicles/vehicle.add.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ServicesComponent } from './components/services/services.component';
import { StoresComponent } from './components/stores/stores.component';
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
        DocumentParamsComponent,
        ConsumersComponent,
        ConsumerComponent,
        ConsumerAddComponent,
        ConsumerInputComponent,
        ConsumerDataComponent,
        VehiclesComponent,
        VehicleComponent,
        VehicleAddComponent,
        EmployeesComponent,
        ServicesComponent,
        StoresComponent,
        TiresComponent,
        OrdersComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'documents', pathMatch: 'full' },
            { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
            { path: 'documents/add', component: DocumentAddComponent, canActivate: [AuthGuard] },
            { path: 'documents/:id', component: DocumentComponent, canActivate: [AuthGuard] },
            { path: 'consumers', component: ConsumersComponent, canActivate: [AuthGuard] },
            { path: 'consumers/add', component: ConsumerAddComponent, canActivate: [AuthGuard] },
            { path: 'consumers/:id', component: ConsumerComponent, canActivate: [AuthGuard] },
            { path: 'newdocument', component: DocumentsComponent, canActivate: [AuthGuard] },
            { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
            { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
            { path: 'timetable', component: TimetableComponent, canActivate: [AuthGuard] },
            { path: 'vehicles', component: VehiclesComponent, canActivate: [AuthGuard] },
            { path: 'vehicles/add', component: VehicleAddComponent, canActivate: [AuthGuard] },
            { path: 'vehicles/:id', component: VehicleComponent, canActivate: [AuthGuard] },
            { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
            { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },
            { path: 'stores', component: StoresComponent, canActivate: [AuthGuard] },
            { path: 'tires', component: TiresComponent, canActivate: [AuthGuard] },
            { path: 'about', component: AboutComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent, canActivate: [!AuthGuard] },
            { path: '**', component: PageNotFoundComponent }
        ])
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        DocumentService,
        DocumentPositionService,
        OrderService,
        ConsumerService,
        ServiceService,
        StoreService,
        EmployeeService,
        UserDataService,
        VehicleService,
        CalendarService,
        BreadcrumbsService,
        pdfGeneratorService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [HttpModule]
})
export class AppComponent {}
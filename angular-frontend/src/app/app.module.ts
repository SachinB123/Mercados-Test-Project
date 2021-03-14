import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeBackendService } from './services/fake-backend.service';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FakeBackendService, {
      passThruUnknownUrl: true // for bypassing “angular-in-memory-web-api” for a specific url
    }),
    NgxPaginationModule
  ],
  providers: [FakeBackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }

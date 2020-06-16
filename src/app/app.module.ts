import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService} from './service/loader.service';
import {LoaderInterceptorService } from './service/interceptors/loader-interceptor.service'

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    LoaderService,
    {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

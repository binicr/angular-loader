import { Injectable } from '@angular/core';
import {HttpEvent,HttpClient ,HttpHandler,HttpRequest,HttpInterceptor, HttpResponse} from '@angular/common/http';
import { LoaderService } from '../loader.service';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor{
  private httpRequests :HttpRequest<any>[] = [];

  constructor(private loaderService :LoaderService) { }
  removeRequest(req:HttpRequest<any>){
    const i = this.httpRequests.indexOf(req);
    if(i>=0){
      this.httpRequests.splice(i,1);
    }
    this.loaderService.isLoading.next(this.httpRequests.length>0);
  }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    this.httpRequests.push(req);
    console.log("Number of requests- >"+this.httpRequests.length);
    this.loaderService.isLoading.next(true);
    return Observable.create(obsever =>{
      const subscription = next.handle(req)
      .subscribe(
        event =>{
          console.log("event->"+event);
          if (event instanceof HttpResponse){
            this.removeRequest(req);
          }
        },
        err =>{
          alert("Error"+err);
          this.removeRequest(req);
          obsever.error(err);
          
        },
        ()=>{
          console.log("())->"+event)
          this.removeRequest(req);
          obsever.complete();
        }
      );
      return ()=>{
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}

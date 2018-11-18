import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";


export class Interceptor implements HttpInterceptor {
  intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log('Intercepted Request:', req);
    const copiedReq = req.clone({params:req.params.set('auth','mytoken')})  
    return next.handle(copiedReq);
  }
}
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';


export class ResInterceptor implements HttpInterceptor {
intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(tap(
        event => {
            console.log('Intercepted Resposne:', event);  
        }
    ));

}
}
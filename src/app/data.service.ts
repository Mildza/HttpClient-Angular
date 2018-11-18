import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  dataUrl = "https://jsonplaceholder.typicode.com/posts"

  getData() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    }
    return this.http.get(this.dataUrl, httpOptions)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  getAllData():Observable<HttpResponse<Post>> {
    return  this.http.get<Post>(this.dataUrl, 
      {
        observe: 'response',
        headers: new HttpHeaders().set('Authorization', 'my-auth-token')
      })
  }

  getTextFile(filename: string) {
    return this.http.get(filename, {responseType: 'text'})
      .pipe(
        tap(
          data => console.log(filename, data),
          error => console.log(filename, error)
        )
      );
  }
  
  getEvent(){
    return this.http.get(this.dataUrl, {observe:'events'})
  }


  getParams(){
  return this.http.get(this.dataUrl, {
    observe:'body',
    params:new HttpParams().set('userId', '1')
  })
  }


progress(){
  const req = new HttpRequest('get','https://jsonplaceholder.typicode.com/photos', {
    reportProgress: true,
  })
  return this.http.request(req)
}



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}

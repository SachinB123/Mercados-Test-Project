import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }

  

  getBackendData() {
    let headers = new HttpHeaders(); // since HttpHeaders is immutable
    headers = headers.append('Content-Type', 'application/json');

    /* Added for IE11 API cache and not refecting changes Issue*/
    headers = headers.append('Content-Control', 'no-cache');
    headers = headers.append('Pragma', 'no-cache');

    const url = 'http://localhost:3000/api/test';
    return this.http.get(url, {headers});
  }
}

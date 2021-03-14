import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  private _hostName;
  private _serverBaseUrl;

  constructor(private http: HttpClient) {
    this._hostName = window.location.hostname;
    if (this._hostName === 'localhost' || this._hostName === '127.0.0.1') {
        this._serverBaseUrl = 'http://localhost:3000';
    } else {
        this._serverBaseUrl = 'window.location.origin';
    }
  } 

  getBackendData() {
    let headers = new HttpHeaders(); // since HttpHeaders is immutable
    headers = headers.append('Content-Type', 'application/json');

    /* Added for IE11 API cache and not refecting changes Issue*/
    headers = headers.append('Content-Control', 'no-cache');
    headers = headers.append('Pragma', 'no-cache');

    // const url = 'http://localhost:3000/.netlify/functions/server/api/getcsvdata'; // only local
    const url = this._serverBaseUrl + '/.netlify/functions/server' + '/api/getcsvdata';
    return this.http.get(url, {headers});
  }

  updateBackendData(data) {
    let headers = new HttpHeaders(); // since HttpHeaders is immutable
    headers = headers.append('Content-Type', 'application/json');

    /* Added for IE11 API cache and not refecting changes Issue*/
    headers = headers.append('Content-Control', 'no-cache');
    headers = headers.append('Pragma', 'no-cache');

    // const url = 'http://localhost:3000/.netlify/functions/server/api/setcsvdata'; // only local
    const url = this._serverBaseUrl + '/.netlify/functions/server' + '/api/getcsvdata';
    return this.http.post(url, data, {headers});
  }
}

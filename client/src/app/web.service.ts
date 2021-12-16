import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  readonly ROOTURL;

  constructor( private http: HttpClient) {
    this.ROOTURL = "http://localhost:1337";
  }

  get(uri: string){
    return this.http.get(`${this.ROOTURL}/${uri}`);
  }

  post(uri: string, payload: Object){
    return this.http.get(`${this.ROOTURL}/${uri}`, payload);
  }

  put(uri: string, payload: Object){
    return this.http.get(`${this.ROOTURL}/${uri}`, payload);
  }

  delete(uri: string){
    return this.http.get(`${this.ROOTURL}/${uri}`);
  }
}

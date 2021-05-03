import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  url:string = `${environment.urlActores}`;
  
  constructor(private http: HttpClient) { }

  getActores(){
    return this.http.get<any>(`${this.url}/actores`)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private url='https://jandrade.herokuapp.com/api/proyecto'

  constructor(private http:HttpClient) { }

  getProyecto():Observable<any>{
    return this.http.get(this.url);
  }
  addProyecto(proyecto:any):Observable<any>{
    return this.http.post(this.url+'/new',proyecto);
  }
  updateProyecto(proyecto:any):Observable<any>{
    return this.http.put(this.url +'/edit',proyecto);
  }
  deleteProyecto(id:number){
    return this.http.delete(this.url+`/delete/${id}`);
  }
}

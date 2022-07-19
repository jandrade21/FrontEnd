import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {

  private url='http://localhost:8080/api/tecnologia'

  constructor(private http:HttpClient) { }

  getTecnologia():Observable<any>{
    return this.http.get(this.url);
  }
  addTecnologia(tecnologia:any):Observable<any>{
    return this.http.post(this.url+'/new',tecnologia);
  }
  updateTecnologia(tecnologia:any):Observable<any>{
    return this.http.put(this.url +'/edit',tecnologia);
  }
  deleteTecnologia(id:number){
    return this.http.delete(this.url+`/delete/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Educacion } from '../class/educacion';
import { tipo_edu } from '../class/tipo_edu';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private url='https://jandrade.herokuapp.com/api/educacion'
  private url2='https://jandrade.herokuapp.com/educacion/tipo'


  constructor(private http: HttpClient) {}

  getEducacion():Observable<any>{
    return this.http.get(this.url);
  }
  getTipo(): Observable<Educacion[]> {
    return this.http.get(this.url + "/tipo").pipe(
      map(tipos => tipos as Educacion[])
    );
  }
  updateTipoEdu(tipoedu:tipo_edu):Observable<Educacion>{
    return this.http.put<Educacion>(this.url2 +'/edit',tipoedu);
  }
  addEducacion(educacion:any):Observable<any>{
    return this.http.post(this.url+'/new',educacion);
  }
  updateEducacion(educacion:any):Observable<any>{
    return this.http.put(this.url +'/edit',educacion);
  }
  deleteEducacion(id:number){
    return this.http.delete(this.url+`/delete/${id}`);
  }
}

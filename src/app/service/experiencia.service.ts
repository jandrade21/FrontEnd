import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Experiencia } from '../class/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private url='http://localhost:8080/api/experiencia'

  constructor(private http:HttpClient) { }

  getExperiencia():Observable<any>{
    return this.http.get(this.url);
  }

  getTipoExp(): Observable<Experiencia[]> {
    return this.http.get(this.url + "/tipo").pipe(
      map(tipos => tipos as Experiencia[])
    );
  }
  addExperiencia(experiencia:any):Observable<any>{
    return this.http.post(this.url+'/new',experiencia);
  }
  updateExperiencia(experiencia:any):Observable<any>{
    return this.http.put(this.url +'/edit',experiencia);
  }
  deleteExperiencia(id:number){
    return this.http.delete(this.url+`/delete/${id}`);
  }
}

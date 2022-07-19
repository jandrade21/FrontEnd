import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Persona } from '../class/persona';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ModalService {


  
  private url='http://localhost:8080/api/persona'
  


  constructor(private http: HttpClient) {}

  getPersona(){
    return this.http.get(this.url);
  }
  addPersona(persona:Persona):Observable<Persona>{
    return this.http.post<Persona>(this.url+"/add",persona);
  }
  updatePersona(persona:Persona):Observable<Persona>{
    return this.http.put<Persona>(this.url +'/edit',persona);
  }
  deletePersona(id:number){
    return this.http.delete(this.url+`/delete/${id}`);
  }
}



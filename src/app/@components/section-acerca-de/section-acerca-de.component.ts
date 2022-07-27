import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';
import { Persona } from 'src/app/class/persona';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-section-acerca-de',
  templateUrl: './section-acerca-de.component.html',
  styleUrls: ['./section-acerca-de.component.css']
})
export class SectionAcercaDeComponent implements OnInit {
  persona: Persona = new Persona;
  datatable:any=[];
  ulogged: string =""

  constructor(private modalservice:ModalService, private router:Router,private http:HttpClient,
    private route: ActivatedRoute, private LoginService:LoginService, private toastr: ToastrService) { 

  }

  ngOnInit(): void {
    this.onDateTable();
    this.ulogged = this.LoginService.getUserLogged();
  }
  
  onDateTable(){
    this.modalservice.getPersona().subscribe(res=>{
      this.datatable=res;
      console.log(res);
    });
  }
  onAddPersona(persona:Persona):void{
    this.modalservice.addPersona(persona).subscribe(res =>{
      if(res){
        alert(`La persona ${persona.sobre_mi} se ha registrado con exito!`);
        this.onDateTable();
        
      }
      else{
        alert(`error!`)
      }
    })
  }

  onUpdatePersona(persona:Persona):void{
    this.modalservice.updatePersona(persona).subscribe(res=>{
        this.toastr.success('La información personal se ha registrado con exito', 'Información registrada!');
        this.onDateTable();
        this.router.navigate(['portfolio'])
  });
}

  onSetData(select:any){
    this.persona.id=select.id;
    this.persona.nombre=select.nombre;
    this.persona.apellido=select.apellido;
    this.persona.fecha_nac=select.fecha_nac;
    this.persona.telefono=select.telefono;
    this.persona.correo=select.correo;
    this.persona.sobre_mi = select.sobre_mi;
    this.persona.url_img=select.url_img;
    this.persona.domicilio=select.domicilio;

  }
  
}


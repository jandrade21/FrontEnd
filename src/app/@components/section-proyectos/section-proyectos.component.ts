import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Proyecto } from 'src/app/class/proyecto';
import { LoginService } from 'src/app/service/login.service';
import { ProyectoService } from 'src/app/service/proyecto.service';

@Component({
  selector: 'app-section-proyectos',
  templateUrl: './section-proyectos.component.html',
  styleUrls: ['./section-proyectos.component.css']
})
export class SectionProyectosComponent implements OnInit {

  proyecto:Proyecto=new Proyecto;
  form:FormGroup;
  dataproyec:any=[];
  ulogged:string="";
  accion:string="agregar";
  id:number|undefined;

  constructor(private proyectoService:ProyectoService, private roter:Router,private http:HttpClient,private LoginService:LoginService,
    private toastr:ToastrService, private formBuilder:FormBuilder) { 
      this.form=this.formBuilder.group({
        id:[''],
        nombre: [''],
        descripcion: [''],
        imagen:[''],
        code:[''],
        })
    }

  ngOnInit(): void {
    this.ulogged=this.LoginService.getUserLogged();
    this.verProyecto();
  }
  verProyecto(){
    this.proyectoService.getProyecto().subscribe(res=>{
      this.dataproyec=res;
      console.log(res);
    })
  }
  agregarProyecto(){
    console.log(this.form);
    const proyecto:any={
      id: 0,
      nombre: this.form.get('nombre')?.value,
      descripcion: this.form.get('descripcion')?.value,
      imagen: this.form.get('imagen')?.value, 
      code:this.form.get('code')?.value,
    }
      if(this.id==undefined){
        //Agregar nueva experiencia
        this.proyectoService.addProyecto(proyecto).subscribe(res =>{
            this.toastr.success('El proyecto se ha registrado con exito', 'Información registrada!');
            this.verProyecto();
            this.form.reset();
        })  
    }
    else{
      //Editar Educación
      proyecto.id=this.id;
      this.proyectoService.updateProyecto(proyecto).subscribe(res=>{
        this.accion='Agregar'
        this.id==undefined;
        this.toastr.success('El proyecto se ha editado con exito', 'Información registrada!');
        this.verProyecto;
        this.form.reset();
      })
    }
  }
  editarProyecto(proyecto:any){
    console.log(proyecto)
    this.accion='Editar';
    this.id=proyecto.id
   
    this.form.patchValue({
          nombre:proyecto.nombre,
          descripcion:proyecto.descripcion,
          imagen:proyecto.imagen,
          code:proyecto.color,
        })
}
  onDeleteProyecto(id:number):void{
    this.proyectoService.deleteProyecto(id).subscribe(res =>{
        this.toastr.error('El proyecto se ha eliminado con exito!','Información eliminada');
        this.verProyecto();
        this.form.reset();
    });
  }
  onSetData(select:any){
    this.proyecto.id=select.id;
    this.proyecto.nombre=select.nombre;
    this.proyecto.descripcion=select.descripcion;
    this.proyecto.imagen=select.imagen;
    this.proyecto.code=select.code
  }
}



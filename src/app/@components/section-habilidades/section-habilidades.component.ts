import { HttpClient } from '@angular/common/http';
import { compileDeclarePipeFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnologia } from 'src/app/class/tecnologia';
import { LoginService } from 'src/app/service/login.service';
import { TecnologiaService } from 'src/app/service/tecnologia.service';

@Component({
  selector: 'app-section-habilidades',
  templateUrl: './section-habilidades.component.html',
  styleUrls: ['./section-habilidades.component.css']
})
export class SectionHabilidadesComponent implements OnInit {

  tecnologia:Tecnologia=new Tecnologia;
  form:FormGroup;
  datatecno:any=[];
  ulogged:string="";
  accion:string="agregar";
  id:number|undefined;

  constructor(private tecnologiaService:TecnologiaService, private router:Router,private http:HttpClient,private LoginService:LoginService,
    private toastr:ToastrService, private formBuilder:FormBuilder) {
      this.form=this.formBuilder.group({
        id:[''],
        nombre_tecno: [''],
        porcentaje: [0],
        color:[''],
        })
     }
     

  ngOnInit(): void {
    this.ulogged=this.LoginService.getUserLogged();
    this.verTecnologia();
  }
  verTecnologia(){
    this.tecnologiaService.getTecnologia().subscribe(res=>{
      this.datatecno=res;
      console.log(res);
    })
  }
  agregarTecnologia(){
    console.log(this.form);
    const tecnologia:any={
      id: 0,
      nombre_tecno: this.form.get('nombre_tecno')?.value,
      porcentaje: this.form.get('porcentaje')?.value,
      color:this.form.get('color')?.value,
    }
      if(this.id==undefined){
        //Agregar nueva Tecnologia
        this.tecnologiaService.addTecnologia(tecnologia).subscribe(res=>{
            this.toastr.success('La tecnología se ha registrado con exito', 'Información registrada!');
            this.verTecnologia();
            this.form.reset();
        })  
    }
    else{
      //Editar Tecnologia
      tecnologia.id=this.id;
      this.tecnologiaService.updateTecnologia(tecnologia).subscribe(res=>{
        this.form.reset();
        this.accion='Agregar'
        this.id==undefined;
        this.toastr.success('La tecnología se ha editado con exito', 'Información registrada!');
        this.verTecnologia();
        this.form.reset();
      })
    }
  }
  editarTecnologia(tecnologia:any){
    console.log(tecnologia)
    this.accion='Editar';
    this.id=tecnologia.id
   
    this.form.patchValue({
          nombre_tecno:tecnologia.nombre_tecno,
          porcentaje:tecnologia.porcenjate,
          color:tecnologia.color,
        })
}
  onDeleteTecnologia(id:number):void{
    this.tecnologiaService.deleteTecnologia(id).subscribe(res =>{
      this.toastr.error('La información tecnologica se ha eliminado con exito!','Información eliminada');
        this.verTecnologia();
        this.form.reset();
    });
  }
  onSetData(select:any){
    this.tecnologia.id=select.id;
    this.tecnologia.nombre_tecno=select.nombre_tecno;
    this.tecnologia.porcentaje=select.porcentaje;
    this.tecnologia.color=select.color
  }


}

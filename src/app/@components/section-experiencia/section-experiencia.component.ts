import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/class/experiencia';
import { tipo_empleo } from 'src/app/class/tipo_empleo';
import { ExperienciaService } from 'src/app/service/experiencia.service';
import { LoginService } from 'src/app/service/login.service';
import { ModalService } from 'src/app/service/modal.service';


@Component({
  selector: 'app-section-experiencia',
  templateUrl: './section-experiencia.component.html',
  styleUrls: ['./section-experiencia.component.css']
})
export class SectionExperienciaComponent implements OnInit {

 experiencia:Experiencia=new Experiencia;
 tipoemp:tipo_empleo=new tipo_empleo;
 form: FormGroup;
 dataexp:any=[];
 tipoexperiencia:Experiencia[]=[];
 ulogged:string="";
 tipo_empleo:any=[];
 accion:string="agregar";
 id:number|undefined;

  constructor(private experienciaService:ExperienciaService, private router:Router,private http:HttpClient,
    private LoginService:LoginService,private toastr:ToastrService,
    private formBuilder:FormBuilder) {
      this.form=this.formBuilder.group({
        id:[''],
        empresa: [''],
        actual: [''],
        fechaInicio: [''],
        fechaFin: [''],
        descripcion: [''],
        imagen:[''],
        tipo_empleo:this.formBuilder.group({
          id:[''],
          empleo_tipo:['""'],
        })
      })
     }

  ngOnInit(): void {
    this.onTipoExp();
    this.verExperiencia();
    this.ulogged=this.LoginService.getUserLogged();
  }
  verExperiencia(){
    this.experienciaService.getExperiencia().subscribe(res=>{
      this.dataexp=res;
      console.log(res);
    })
  }

  agregarExperiencia(){
    console.log(this.form);
    const experiencia:any={
      empresa: this.form.get('empresa')?.value,
      actual: this.form.get('actual')?.value,
      fechaInicio: this.form.get('fechaInicio')?.value,
      fechaFin: this.form.get('fechaFin')?.value,
      descripcion: this.form.get('descripcion')?.value,
      imagen: this.form.get('imagen')?.value,
      tipo_empleo: this.form.get('tipo_empleo')?.value,
      id: 0
    }
    if(this.id==undefined){
      //Agregar nueva experiencia
      this.experienciaService.addExperiencia(experiencia).subscribe(res =>{
          this.toastr.success('La información laboral se ha registrado con exito', 'Información registrada!');
          this.verExperiencia();
          this.form.reset();
      })
    }
    else{
      //Editar Educación
      experiencia.id=this.id;
      this.experienciaService.updateExperiencia(experiencia).subscribe(res=>{
        this.accion='Agregar'
        this.id==undefined;
        this.toastr.success('La información laboral se ha editado con exito', 'Información registrada!');
        this.verExperiencia();
        this.form.reset();
      })
    }
  }

  onTipoExp(){
    this.experienciaService.getTipoExp().subscribe(data=>{
      this.tipoexperiencia=data;
      console.log(data);
    });
  }

  editarExperiencia(experiencia:any){
    console.log(experiencia)
    this.accion='Editar';
    this.id=experiencia.id
   
    this.form.patchValue({
          empresa:experiencia.empresa,
          actual:experiencia.actual,
          fechaInicio: experiencia.fechaInicio,
          fechaFin:experiencia.fechaFin,
          descripcion:experiencia.descripcion,
          imagen:experiencia.imagen,
          tipo_empleo:experiencia.tipo_empleo
        })
}
  onDeleteExperiencia(id:number):void{
    this.experienciaService.deleteExperiencia(id).subscribe(res =>{
        this.toastr.error('La información laboral se ha eliminado con exito!','Información eliminada');
        this.verExperiencia();
        this.form.reset();
    });

  }
  onSetData(select:any){
    this.experiencia.id=select.id;
    this.experiencia.empresa=select.empresa;
    this.experiencia.actual=select.actual;
    this.experiencia.fechaInicio=select.fechaInicio;
    this.experiencia.FechaFin=select.fechaFin;
    this.experiencia.descripcion=select.descripcion;
    this.experiencia.imagen=select.imagen;
    this.tipo_empleo.empleo_tipo=select.empleo_tipo;
  }

}

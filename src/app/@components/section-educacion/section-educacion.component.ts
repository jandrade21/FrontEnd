import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducacionService } from 'src/app/service/educacion.service';
import { Educacion} from 'src/app/class/educacion';
import { LoginService } from 'src/app/service/login.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,FormGroup} from '@angular/forms';
import { tipo_edu } from 'src/app/class/tipo_edu';

@Component({
  selector: 'app-section-educacion',
  templateUrl: './section-educacion.component.html',
  styleUrls: ['./section-educacion.component.css']
})
export class SectionEducacionComponent implements OnInit {

 educacion:Educacion=new Educacion;
 tipoedu:tipo_edu=new tipo_edu;
  form: FormGroup;
  datatable:any=[]
  tipoeducacion:Educacion[]=[];
  ulogged: string =""
  tipo_edu:any=[];
  accion:string="agregar"
  id:number|undefined;

  constructor(private educacionService:EducacionService, private router:Router,private http:HttpClient,
    private route: ActivatedRoute, private LoginService:LoginService,private toastr: ToastrService,private formBuilder:FormBuilder) {

      this.form=this.formBuilder.group({
        id:[0],
        escuela: [''],
        titulo: [''],
        inicio: [''],
        fin: [''],
        imagen:[''],
        tipo_edu:this.formBuilder.group({
          id:[''],
          educacion_tipo:['""'],
        })
        
      })
  }

  ngOnInit(): void {
    this.onDateTable();
    this.onTipoEdu();
    this.ulogged = this.LoginService.getUserLogged();
  }
 
  onDateTable(){
    this.educacionService.getEducacion().subscribe(res=>{
      this.datatable=res;
      console.log(res);
    });
  }

  agregarEducacion(){
    console.log(this.form);
    const educacion:any={
      escuela: this.form.get('escuela')?.value,
      titulo: this.form.get('titulo')?.value,
      inicio: this.form.get('inicio')?.value,
      fin: this.form.get('fin')?.value,
      imagen: this.form.get('imagen')?.value,
      tipo_edu: this.form.get('tipo_edu')?.value,
      id: 0
    }
    if(this.id==undefined){
      //Agregar nueva Educación
      this.educacionService.addEducacion(educacion).subscribe(res =>{
          this.form.reset();
          this.toastr.success('La información académica se ha registrado con exito', 'Información registrada!');
          this.onDateTable();
          this.form.reset();
          
      })
    }
    else{
      //Editar Educación
      educacion.id=this.id;
      this.educacionService.updateEducacion(educacion).subscribe(res=>{
        this.accion='Agregar'
        this.id==undefined;
        this.toastr.success('La información académica se ha editado con exito', 'Información registrada!');
        this.onDateTable();
        this.form.reset();
      })
     
    }
  
   }
  
  onTipoEdu(){
    this.educacionService.getTipo().subscribe(data=>{
      this.tipoeducacion=data;
      console.log(data);
    });
  }

  editarEducacion(educacion:any){
    console.log(educacion)
    this.accion='Editar';
    this.id=educacion.id

    this.form.patchValue({
          escuela:educacion.escuela,
          titulo:educacion.titulo,
          inicio: educacion.inicio,
          fin:educacion.fin,
          imagen:educacion.imagen,
          tipo_edu:educacion.tipo_edu
        })
        
}

onDeleteEducacion(id:number):void{
  this.educacionService.deleteEducacion(id).subscribe(res =>{
    this.toastr.error('La información academica se ha eliminado con exito!','Información eliminada');
      this.onDateTable();
      this.router.navigate(['portfolio'])
  });
}

  onSetData(select:any){
    this.educacion.id=select.id;
    this.educacion.escuela=select.escuela;
    this.educacion.titulo=select.titulo;
    this.educacion.inicio=select.inicio;
    this.educacion.fin=select.fin;
    this.educacion.imagen=select.imagen;
    this.tipo_edu.educacion_tipo=select.educacion_tipo;
  }

}

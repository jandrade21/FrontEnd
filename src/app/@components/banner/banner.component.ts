import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/service/modal.service';
import { Persona } from 'src/app/class/persona';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  persona: Persona = new Persona;
  datatable:any=[];
  ulogged: string =""
  constructor(private LoginService:LoginService, private router:Router,
    private modalservice:ModalService) {
     }

  ngOnInit(): void {
    this.ulogged = this.LoginService.getUserLogged();
    this.onDateTable();
  }

  onDateTable(){
    this.modalservice.getPersona().subscribe(res=>{
      this.datatable=res;
      console.log(res);
    });
  }

      
}

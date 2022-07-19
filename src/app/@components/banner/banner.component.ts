import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  ulogged: string =""
  constructor(private LoginService:LoginService, private router:Router,private modalservice:ModalService) { }

  ngOnInit(): void {
    this.ulogged = this.LoginService.getUserLogged();


  }


}
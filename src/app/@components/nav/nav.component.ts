import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isNavbarCollapsed = true;

  ulogged: string =""

  constructor(private LoginService: LoginService, private router:Router) { }

  ngOnInit(): void {
    this.ulogged = this.LoginService.getUserLogged();
  }


  salir():void{
    this.LoginService.deleteToken();
    this.ulogged="";
    window.location.reload();
  }

  login():void {
    this.router.navigate(['/login'])
  }
}

import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { FormBuilder,FormGroup,MinLengthValidator,Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  username:string="";
  password:string="";
  loginerror:string="";

  constructor(private router:Router, private LoginService:LoginService, private route: ActivatedRoute, private formBuilder:FormBuilder) { 
    this.form=this.formBuilder.group(
      {
        username:['',[Validators.required]],
        password:['',[Validators.required, Validators.minLength(8)]],
      }
    )
  }

  login(){
    console.log(this.username);
    console.log(this.password);

    const user = {username: this.username, password:this.password};

    this.LoginService.login(user).subscribe( data => {
      console.log(data);
      if(data==null) this.loginerror = "Debe ingresar un usuario valido";
      else{
        this.loginerror = "";
        this.LoginService.setToken(data.id);
        this.router.navigate(['/portfolio'])

      }
    });
  }

  ngOnInit(): void {
  }
  get Username()
  {
    return this.form.get('username');
  }
  get Password()
  {
    return this.form.get('password')
  }
}

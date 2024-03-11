import { Component, OnInit } from '@angular/core';
import { ReCaptchaRequest } from '../../types/ReCaptchaRequest';
import {BackendService } from '../../services/backend.services'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Module } from '../../types/module';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
isDisabled: boolean=true;
public form!: FormGroup;
public modules: Array<Module> = [];

constructor(private service: BackendService,private fb: FormBuilder, private router: Router){
  this.buildForm(); 
}
  ngOnInit(): void {
   
  }

public errored(){
  this.isDisabled = true;
}

private buildForm(): void {
  this.form = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
    recaptchaReactive: ['', Validators.required],
  });
}


public resolved(captchaResponse: string) {
  console.log(`Resolved captcha with response: ${captchaResponse}`);
  this.isDisabled = false;
  var body: ReCaptchaRequest = { token: captchaResponse, remoteIp: ""};
  this.service.validateReCaptcha(body).subscribe({
    next: (recaptchaResp) => {
      console.log(recaptchaResp.success);
      if(recaptchaResp.success){
        this.isDisabled = false;
      }
      else{
        this.isDisabled = true;
      }
    },
    error: (err) =>
    {
      console.log("errror resp" + err);
      this.isDisabled = true;
    }
  });
}
login() {
  console.log(this.buildData());
  this.service.login(this.buildData()).subscribe((data:any)=>{
    console.log('Login');
    localStorage.setItem('usuario',this.form.get('user')?.value );
    this.router.navigate(['home']);
  });
  
}

buildData(){
  const data={
    "usuario":  this.form.get('user')?.value ,
  "password":  this.form.get('password')?.value 
  };
  return data;
}

}

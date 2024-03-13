import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReCaptchaRequest } from '../../types/ReCaptchaRequest';
import {BackendService } from '../../services/backend.services'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Router } from '@angular/router';
import { Module } from '../../types/module';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
isDisabled: boolean=true;
public form!: FormGroup;
public modules: Array<Module> = [];
@ViewChild('errorUserModal') public alertModal!: ElementRef;
constructor(private service: BackendService,private spinner: NgxSpinnerService,private fb: FormBuilder, private router: Router, private modalService: NgbModal){
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
public closeModal() {
  this.modalService.dismissAll();
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
  this.spinner.show();
  this.service.login(this.buildData()).subscribe({
    next: (recaptchaResp) => {
    console.log(recaptchaResp);
    localStorage.setItem('usuario',this.form.get('user')?.value );
    this.spinner.hide();
    this.router.navigate(['home']);
    },
    error: (err) =>{
      this.spinner.hide();
      console.log("errror resp" + err);
      this.modalService.open(this.alertModal, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
   
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

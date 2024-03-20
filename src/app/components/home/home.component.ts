import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from '../../types/module';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChild('sideNavbar') public sideNavbar: ElementRef | undefined;
  @ViewChild('content') public content: ElementRef | undefined;

  public fullName: string = "";
  public mouseout: boolean = true;
  public modules: Array<any> = [
    { Id: 1, ModuleName: 'Grados/Grupos', Path: 'grade-group', Icon: 'fa-solid fa-university', IsActive: false },
    { Id: 2, ModuleName: 'Docentes', Path: 'docentes-main', Icon: 'fa-solid fa-users', IsActive: false },
    { Id: 3, ModuleName: 'Alumnos', Path: 'alumnos-main', Icon: 'fa-solid  fa-graduation-cap', IsActive: false },
    { Id: 4, ModuleName: 'Calendario', Path: 'calendario', Icon: 'fa-solid fa-calendar', IsActive: false },
    { Id: 5, ModuleName: 'Finanzas', Path: 'finanzas', Icon: 'fa-solid fa-credit-card-alt', IsActive: false },
    { Id: 6, ModuleName: 'Asistencia', Path: 'asistencia-main', Icon: 'fa-solid fa-user', IsActive: false },
    { Id: 7, ModuleName: 'Planeación', Path: 'planeacion', Icon: 'fa-solid fa-chalkboard-user', IsActive: false },
  ];
  public logoCenter = {
    height: '55px',
    content: 'var(--urlLogo)',
    'min-width': '60px',
    position: 'fixed',
    top: '0px'
  };

  constructor(private router: Router, private aRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    //this.initUserInfo();
    var user = localStorage.getItem('usuario');
    this.fullName = user!;

  }

  ngAfterViewInit(): void {
    this.sideNavbar!.nativeElement.classList.toggle('active');
    this.content!.nativeElement.classList.toggle('active');
  }

  public redirect(module: any) {
    var item = this.modules.find(x => (x.IsActive));
    if (item != null) {
      item.IsActive = false;
    }
    module.IsActive = true;
    this.router.navigate([`home/${module.Path}`]);
  }

  private initUserInfo() {
    var data = localStorage.getItem("token");
    if (data) {
      var token = data;
      console.log(token);
      var decode = jwtDecode(token);
      console.log(decode);
      const jsonString = JSON.stringify(decode);
      const jsonObject = JSON.parse(jsonString);
      const expiracion = jsonObject['exp'];
      console.log(expiracion);
      const expiracionDate = new Date(expiracion * 1000); // Convertir a milisegundos
      const ahora = new Date();
      console.log(expiracionDate);
      if (expiracionDate > ahora) {
        console.log('Token válido');
        for (const key in jsonObject) {
          if (jsonObject.hasOwnProperty(key)) {
            const value = jsonObject[key];
            console.log(key)
            //this.elementos.push(new ClaimInterfaz(key ,value));
            if (key == "E-mail") {
              this.fullName = value;
            }
          }
        }
      } else {
        console.log('Token expirado');
        this.logout();
      }

    }

  }



  public onMenuClick(key: string) {
    this.mouseout = key == 'mouseout';
    this.sideNavbar!.nativeElement.classList.toggle('active');
    this.content!.nativeElement.classList.toggle('active');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}

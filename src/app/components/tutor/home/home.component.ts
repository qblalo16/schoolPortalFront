import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BackendService } from '../../../services/backend.services';
import { NgxSpinnerService } from 'ngx-spinner';

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
  public name:string="";
  public modules: Array<any> = [
    { Id: 1, ModuleName: 'Perfil', Path: 'perfil', Icon: 'fa-solid fa-user', IsActive: false },
    { Id: 2, ModuleName: 'Estado de Cuenta', Path: 'cuenta', Icon: 'fa-solid fa-money-bill', IsActive: false },
    { Id: 3, ModuleName: 'Calendario', Path: 'calendario', Icon: 'fa-solid fa-calendar-days', IsActive: false },
    { Id: 4, ModuleName: 'Asistencias', Path: 'asistencia', Icon: 'fa-solid fa-person-walking', IsActive: false },
    { Id: 5, ModuleName: 'Pagos', Path: 'pagos', Icon: 'fa-solid fa-cart-shopping', IsActive: false },
  ];
  public logoCenter = {
    height: '55px',
    content: 'var(--urlLogo)',
    'min-width': '60px',
    position: 'fixed',
    top: '0px'
  };

  constructor(private ws: BackendService, private spinner: NgxSpinnerService, private router: Router, private aRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    //this.initUserInfo();
    this.spinner.show();
    var user = JSON.parse(localStorage.getItem('usuario')!);
    this.fullName = user!;
   this.ws.getTutorById(user.id).subscribe(
    {
      next: (tutor:any) => {
    this.name=tutor.nombres + " "+ tutor.apellidoPaterno+ " "+ tutor.apellidoMaterno;
    this.spinner.hide();
      },
      error: (e:any) =>{
        console.error(`Error al obtener el tutor ${e}`);
        this.spinner.hide();
      }
  
    });


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
    this.router.navigate([`tutor/${module.Path}`]);
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

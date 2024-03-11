import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/environment';
import {ReCaptchaRequest} from '../types/ReCaptchaRequest';
import {ReCaptchaResponse} from '../types/ReCaptchaResponse';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  

  constructor(private httpClient: HttpClient) { }

  public validateReCaptcha(request: ReCaptchaRequest){
    return this.httpClient.post<ReCaptchaResponse>(environment.generalServices + 'Sec/ValidateCaptcha' + '?Subscription-Key=' + environment.generalServicesApiKey, request, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public getGroups(){
    return this.httpClient.get(environment.Backend + 'api/Grupo/GetbyAll', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }


  public getCatlog(id:number){
    return this.httpClient.get(environment.Backend + 'api/ContenidoCatalogo/GetbyIdContenido/'+id, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
}
public saveCalendario(calendario:any){
  return this.httpClient.post(environment.Backend + 'api/CalendarioEscolar/', calendario,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

public getCalendario(idMonth:number){
  return this.httpClient.get(environment.Backend + 'api/CalendarioEscolar/GetbyIdMonth/'+idMonth,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

public getDocentes(){
  return this.httpClient.get(environment.Backend + 'api/Docente/GetbyAll/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

public saveDocentes(docente:any){
  return this.httpClient.post(environment.Backend + 'api/Docente/', docente,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

public login(user:any){
  return this.httpClient.post(environment.Backend + 'api/Usuario/Login', user,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
}

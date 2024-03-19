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
    return this.httpClient.post<ReCaptchaResponse>(environment.Backend + 'api/Usuario/ValidateCaptcha' , request, {
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
  public saveGroups(grupo: any ){
    return this.httpClient.post(environment.Backend + 'api/Grupo', grupo,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public saveStudentGroup(studentGropu: any ){
    return this.httpClient.post(environment.Backend + 'api/EstudiantesGrupo', studentGropu,{
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

public getDocentesList(){
  return this.httpClient.get(environment.Backend + 'api/Docente/', {
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

public saveEstudent(estudent:any){
  return this.httpClient.post(environment.Backend + 'api/Estudiante/', estudent,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

public getEstudentes(){
  return this.httpClient.get(environment.Backend + 'api/Estudiante/GetReport',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
public getEstudentesList(){
  return this.httpClient.get(environment.Backend + 'api/Estudiante',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

public updateEstudent(estudent:any){
  return this.httpClient.put(environment.Backend + 'api/Estudiante/', estudent,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

  public saveFichaM(fichaM:any){
    return this.httpClient.post(environment.Backend + 'api/FichaMedica/', fichaM,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
}
public updateFichaM(fichaM:any){
  return this.httpClient.put(environment.Backend + 'api/FichaMedica/', fichaM,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

public saveTutor(tutor:any){
  return this.httpClient.post(environment.Backend + 'api/Tutor/', tutor,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
public updateTutor(tutor:any){
return this.httpClient.put(environment.Backend + 'api/Tutor/', tutor,{
  headers: {
    'Content-Type': 'application/json'
  }
});
}



public saveContacto(contacto:any){
  return this.httpClient.post(environment.Backend + 'api/Contacto/', contacto,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
public getContacts(idEstudiante:number){
  return this.httpClient.get(environment.Backend + 'api/Tutor/GetTutorByStudent/'+idEstudiante,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
public updateContacto(contacto:any){
return this.httpClient.put(environment.Backend + 'api/Contacto/', contacto,{
  headers: {
    'Content-Type': 'application/json'
  }
});
}

public saveUsuario(usuario:any){
  return this.httpClient.post(environment.Backend + 'api/Usuario/', usuario,{
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
public updateUsuario(usuario:any){
return this.httpClient.put(environment.Backend + 'api/Usuario/', usuario,{
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

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../services/backend.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnonymousCredential, BlobServiceClient, BlobUploadCommonResponse } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent  implements OnInit {
  [x: string]: any;
  fileImage: string="";
  certificadoMedico:string="";
  cartillaVacunacion:string="";
  itemsGrupos: any;
  selectedItem: any;
  form: FormGroup;
  formM: FormGroup;
  formP: FormGroup;
  apaterno: string="";
  nombres: string="";
  idEstudiante:number=0;
  idtutor:number=0;
  imagenContacto:string="";
  idUsuario:number=0;
  itemsCatalog:any;
  selectedRelation:any;
  tutoresList:any;
  ngOnInit(): void {
    this.fileImage='../../../assets/img/perfilAlumno.jpeg';
    this.ws.getCatlog(3).subscribe((data:any)=>{
      this.itemsCatalog=data;
      console.log(data);
    });
    this.ws.getContacts(this.idEstudiante).subscribe((data:any)=>{
      console.log(data);
      this.tutoresList=data;
    })
  }

@ViewChild('inputImagen') inputImagen!: ElementRef;
@ViewChild('inputImagenCertificadoM') inputImagenCertificadoM!: ElementRef;
@ViewChild('inputImagenCartilla') inputImagenCartilla!: ElementRef;
@ViewChild('inputImageContacto') inputImageContacto!: ElementRef;
  constructor(private ws:BackendService, private _snackBar: MatSnackBar,public fb: FormBuilder, public fbM: FormBuilder, public fbP: FormBuilder, ){
    this.form = this.fb.group({
      matricula :  [''],
      curp:  ['',[Validators.required, Validators.pattern('^[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[A-Z0-9]{18}$')]],
      nombres:  [''],
      apaterno:  [''],
      amaterno: [''],
      fnacimiento:  [''],
      direccion:  [''],
      codigopostal : ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      });
      this.formM = this.fbM.group({
        estatura: [''],
        peso: [''],
        tiposangre: [''],
        alergias: [''],
        lentes: [false],
        zapatosO: [false], 
      });

       this.formP = this.fbP.group({
      nombres: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: [''], // Suponiendo que este campo puede ser opcional
      direccion: ['', Validators.required],
      codigopostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]], // Código postal de 5 dígitos
      fnacimiento: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Celular de 10 dígitos
      curp: ['', [Validators.required, Validators.pattern('^[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[A-Z0-9]{18}$')]], // Patrón básico de CURP
      email: ['', [Validators.required]], // Patrón básico de CURP
      emergencia: [false],
      recoger: [false],
      contactoP: [false],
    });
  }
    
  
  submit() {
    console.log(this.buildData());
  this.ws.saveEstudent(this.buildData()).subscribe((data:any)=>{
    this.idEstudiante=data.id;
  console.log(data);
  });
  }
  seleccionarImagen(){
    this.inputImagen.nativeElement.click();
  }
  buildData(){
    console.log(this.form);
    const data={
        "id": 0,
        "matricula": this.form.get('matricula')?.value,
        "nombres": this.form.get('nombres')?.value,
        "apellidoPaterno": this.form.get('apaterno')?.value,
        "apellidoMaterno": this.form.get('amaterno')?.value,
        "fechaNacimiento": this.form.get('fnacimiento')?.value,
        "curp": this.form.get('curp')?.value,
        "direccion": this.form.get('direccion')?.value,
        "codigoPostal": this.form.get('codigopostal')?.value,
        "foto": this.fileImage,
        "fechaAlta": "2024-03-11T15:02:40.708Z",
        "activo": true
    };
  return data;
  }

  buildFichaMedica(){
    const data={
        "id": 0,
        "idEstudiante": this.idEstudiante,
        "estatura": this.formM.get('estatura')?.value,
        "tipoSangre": this.formM.get('tiposangre')?.value,
        "alergias": this.formM.get('alergias')?.value,
        "peso": this.formM.get('peso')?.value,
        "lentes": this.formM.get('lentes')?.value,
        "zapatosOrtopedicos": this.formM.get('zapatosO')?.value,
        "cerificadoMedico": this.certificadoMedico,
        "cartillaVacunacion": this.cartillaVacunacion,
        "fechaAlta": "2024-03-12T08:30:48.358Z",
        "activo": true
    }
    return data;
  }
  buildTutor(){
    const data={
      "id": 0,
      "idEstudiante": this.idEstudiante,
      "idUsuario": this.idUsuario,
      "nombres": this.formP.get('nombres')?.value,
      "apellidoPaterno": this.formP.get('apaterno')?.value,
      "apellidoMaterno": this.formP.get('amaterno')?.value,
      "fechaNacimiento": this.formP.get('fnacimiento')?.value,
      "curp": this.formP.get('curp')?.value,
      "celular": ""+this.formP.get('celular')?.value,
      "direccion": this.formP.get('direccion')?.value,
      "codigoPostal": ""+this.formP.get('codigopostal')?.value,
      "relacionEstudiante": this.selectedRelation.id,
      "permisoRecoger": this.formP.get('recoger')?.value,
      "emergencia": this.formP.get('emergencia')?.value,
      "contactoPrincipal": this.formP.get('contactoP')?.value,
      "foto": this.imagenContacto,
      "fechaAlta": "2024-03-12T15:22:36.756Z",
      "activo": true
    }
    return data;
  }
  buildContacto(){
    const data={
      "id": 0,
      "idEstudiante": this.idEstudiante,
      "idTutor": this.idtutor,
      "fechaAlta": "2024-03-12T15:22:36.716Z",
      "activo": true
    }
    return data;
  }
  buildUsuario(){
    const data={
      "id": 0,
    "usuario1": this.formP.get('email')?.value,
    "password":  uuidv4().substring(0,8),
    "fechaAlta": "2024-03-11T17:08:40.683",
    "estatus": 1,
    "perfil": 2
    }
    return data;
  }

saveContacto(){
  console.log(this.buildUsuario());
  this.ws.saveUsuario(this.buildUsuario()).subscribe((data:any)=>{
    console.log(data);
    this.idUsuario=data.id;
    this.ws.saveTutor(this.buildTutor()).subscribe((dataT:any)=>{
      console.log(data);
      this.idtutor=dataT.id;
      this.ws.saveContacto(this.buildContacto()).subscribe((dataC:any)=>{
        console.log(dataC);
        this.idtutor=dataC.id;
        
      });
    });
  });
}
  saveFichaMedica(){
    console.log(this.buildFichaMedica());
    this.ws.saveFichaM(this.buildFichaMedica()).subscribe((data:any)=>{
      console.log(data);
    })
  }
  cargarImagen(event:any) {
  
    const blobServiceClient = new BlobServiceClient('https://scholsoft.blob.core.windows.net/calendario?sp=racwdl&st=2024-03-10T02:47:59Z&se=2026-03-10T10:47:59Z&spr=https&sv=2022-11-02&sr=c&sig=m2Smpxg9WI1gS1reN%2Buw3z6gNv7qyp9L53gL1aGro8Q%3D',new  AnonymousCredential());
    console.log("Crea cliente")
    const containerClient = blobServiceClient.getContainerClient('');
    console.log("Obtine blob");
    const reader = new FileReader();
    console.log(event.target.files[0]);
  
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'image/jpeg' });
    
      const blobName =  uuidv4()+'.jpg';
      console.log(blobName);
      const blobClient = containerClient.getBlockBlobClient(blobName);
      const response: BlobUploadCommonResponse = await blobClient.upload(blob, blob.size);
    
      console.log('Blob uploaded successfully', response.requestId);
      this.fileImage='https://scholsoft.blob.core.windows.net/calendario/'+blobName;
    };
    
  }
  seleccionarCartilla(){
    console.log("cartilla");
    this.inputImagenCartilla.nativeElement.click();
  }
  
  cargarImagenCartilla(event:any) {
    console.log("cartilla");
    const blobServiceClient = new BlobServiceClient('https://scholsoft.blob.core.windows.net/calendario?sp=racwdl&st=2024-03-10T02:47:59Z&se=2026-03-10T10:47:59Z&spr=https&sv=2022-11-02&sr=c&sig=m2Smpxg9WI1gS1reN%2Buw3z6gNv7qyp9L53gL1aGro8Q%3D',new  AnonymousCredential());
    console.log("Crea cliente")
    const containerClient = blobServiceClient.getContainerClient('');
    console.log("Obtine blob");
    const reader = new FileReader();
    console.log(event.target.files[0]);
  
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'image/jpeg' });
    
      const blobName =  uuidv4()+'.jpg';
      console.log(blobName);
      const blobClient = containerClient.getBlockBlobClient(blobName);
      const response: BlobUploadCommonResponse = await blobClient.upload(blob, blob.size);
    
      console.log('Blob uploaded successfully', response.requestId);
      this.cartillaVacunacion='https://scholsoft.blob.core.windows.net/calendario/'+blobName;
    };
    
  }

  seleccionarCertificadoM(){
    this.inputImagenCertificadoM.nativeElement.click();
  }
  
  cargarImagenCedula(event:any) {
  
    const blobServiceClient = new BlobServiceClient('https://scholsoft.blob.core.windows.net/calendario?sp=racwdl&st=2024-03-10T02:47:59Z&se=2026-03-10T10:47:59Z&spr=https&sv=2022-11-02&sr=c&sig=m2Smpxg9WI1gS1reN%2Buw3z6gNv7qyp9L53gL1aGro8Q%3D',new  AnonymousCredential());
    console.log("Crea cliente")
    const containerClient = blobServiceClient.getContainerClient('');
    console.log("Obtine blob");
    const reader = new FileReader();
    console.log(event.target.files[0]);
  
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'image/jpeg' });
    
      const blobName =  uuidv4()+'.jpg';
      console.log(blobName);
      const blobClient = containerClient.getBlockBlobClient(blobName);
      const response: BlobUploadCommonResponse = await blobClient.upload(blob, blob.size);
    
      console.log('Blob uploaded successfully', response.requestId);
      this.certificadoMedico='https://scholsoft.blob.core.windows.net/calendario/'+blobName;
    };
    
  }
  
  seleccionarImagenContacto(){
    this.inputImageContacto.nativeElement.click();
  }
  cargarFotoContacto(event:any) {
  
    const blobServiceClient = new BlobServiceClient('https://scholsoft.blob.core.windows.net/calendario?sp=racwdl&st=2024-03-10T02:47:59Z&se=2026-03-10T10:47:59Z&spr=https&sv=2022-11-02&sr=c&sig=m2Smpxg9WI1gS1reN%2Buw3z6gNv7qyp9L53gL1aGro8Q%3D',new  AnonymousCredential());
    console.log("Crea cliente")
    const containerClient = blobServiceClient.getContainerClient('');
    console.log("Obtine blob");
    const reader = new FileReader();
    console.log(event.target.files[0]);
  
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = async () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'image/jpeg' });
    
      const blobName =  uuidv4()+'.jpg';
      console.log(blobName);
      const blobClient = containerClient.getBlockBlobClient(blobName);
      const response: BlobUploadCommonResponse = await blobClient.upload(blob, blob.size);
    
      console.log('Blob uploaded successfully', response.requestId);
      this.imagenContacto='https://scholsoft.blob.core.windows.net/calendario/'+blobName;
    };
    
  }

  saveContactos(){}
  saveStudent(){}
  }

  
  
  
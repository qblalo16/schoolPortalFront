import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendService } from '../../services/backend.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnonymousCredential, BlobServiceClient, BlobUploadCommonResponse } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent  implements OnInit {
  [x: string]: any;
  fileImage: string="";
  cedulafile:string="";
  curpfile:string="";
  itemsGrupos: any;
  selectedItem: any;
  form: FormGroup;
  formM: FormGroup;
  formP: FormGroup;
  apaterno: string="";
  nombres: string="";
  constructor(private ws:BackendService,private _snackBar: MatSnackBar,public fb: FormBuilder){
    this.form = this.fb.group({
      nombres:  [''],
      apaterno:  [''],
      amaterno: [''],
      fnacimiento:  [''],
      telefono:  [''],
      email:  [''],
      });
      this.formM =this.fb.group({
        anexo:  [''],
        });
      this.formP =this.fb.group({
          anexo:  [''],
          });
  }
    ngOnInit(): void {
      this.fileImage='../../../assets/img/perfilAlumno.jpeg';
    }
  
  @ViewChild('inputImagen') inputImagen!: ElementRef;
  @ViewChild('inputImagenCurp') inputImagenCurp!: ElementRef;
  @ViewChild('inputImagenCedula') inputImagenCedula!: ElementRef;
  submit() {
  this.ws.saveDocentes(this.buildData()).subscribe((data:any)=>{
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
    "nombres": this.form.get("nombres")?.value, 
    "apellidoPaterno": this.form.get("apaterno")?.value,
    "apellidoMaterno": this.form.get("amaterno")?.value,
    "fechaNacimiento": this.form.get("fnacimiento")?.value,
    "curp":this.curpfile,
    "telefono": this.form.get("telefono")?.value,
    "email": this.form.get("email")?.value,
    "cedulaProfesional":this.cedulafile,
    "estatus": 6,
    "anexo":this.formM.get("anexo")?.value,
    "fechaAlta": "2024-03-11T00:53:47.518Z",
    "activo": true,
    "foto": this.fileImage
  
    };
  return data;
  }

  saveFichaMedica(){
    
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
  seleccionarImagenCurp(){
    this.inputImagenCurp.nativeElement.click();
  }
  
  cargarImagenCurp(event:any) {
  
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
      this.curpfile='https://scholsoft.blob.core.windows.net/calendario/'+blobName;
    };
    
  }
  seleccionarImagenCedula(){
    this.inputImagenCedula.nativeElement.click();
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
      this.cedulafile='https://scholsoft.blob.core.windows.net/calendario/'+blobName;
    };
    
  }
  
  }
  
  
  
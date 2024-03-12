import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  imagenContacto:string="";
  constructor(private ws:BackendService, private _snackBar: MatSnackBar,public fb: FormBuilder, public fbM: FormBuilder, public fbP: FormBuilder, ){
    this.form = this.fb.group({
      matricula :  [''],
      curp:  [''],
      nombres:  [''],
      apaterno:  [''],
      amaterno: [''],
      fnacimiento:  [''],
      direccion:  [''],
      codigopostal : [''],
      telefono:  [''],
      email:  [''],
      });
      this.formM = this.fbM.group({
        estatura: [''],
        peso: [''],
        tiposangre: [''],
        alergias: [''],
        lentes: [''],
        zapatosO: [''], 
      });

       this.formP = this.fbP.group({
      nombres: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: [''], // Suponiendo que este campo puede ser opcional
      direccion: ['', Validators.required],
      codigopostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]], // Código postal de 5 dígitos
      fnacimiento: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Celular de 10 dígitos
      curp: ['', [Validators.required, Validators.pattern('^[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[A-Z0-9]{2}$')]], // Patrón básico de CURP
      emergencia: [false],
      recoger: [false],
      contactoP: [false],
    });
  }
    ngOnInit(): void {
      this.fileImage='../../../assets/img/perfilAlumno.jpeg';
    }
  
  @ViewChild('inputImagen') inputImagen!: ElementRef;
  @ViewChild('inputImagenCertificadoM') inputImagenCertificadoM!: ElementRef;
  @ViewChild('inputImagenCartilla') inputImagenCartilla!: ElementRef;
  @ViewChild('inputImageContacto') inputImageContacto!: ElementRef;
  
  submit() {
  this.ws.saveDocentes(this.buildData()).subscribe((data:any)=>{
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

  
  
  
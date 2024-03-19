import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnonymousCredential, BlobServiceClient, BlobUploadCommonResponse } from '@azure/storage-blob';
import { NgxSpinnerService } from 'ngx-spinner';
import { v4 as uuidv4 } from 'uuid';
import { Estudiante } from '../../types/Estudiante';
@Component({
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrl: './nuevo-grupo.component.scss'
})
export class NuevoGrupoComponent implements OnInit{
onDelete(row: any) {
console.log(row);
var rowDelete= this.studentsAdd.find((x: { id: number; })=>x.id==row);
console.log(rowDelete);
this.studentsAdd.pop(rowDelete);
this.studentsAdd=this.studentsAdd;
}
isChecked: boolean=false;

itemsCatalog: any;
selectedRelation: any;
formP: FormGroup;
fileImage:string="";
itemDocentes:any;
@ViewChild('inputImagen') inputImagen!: ElementRef;
selectGrado: any;
selectProfesor: any;
studentsDS: any;
studentsAux: Estudiante[]= [];
studentsAdd: any;
displayedColumns: string[] = ['Actions', 'Nombre', 'Matricula', 'CURP'];
displayedColumns2: string[] = [ 'Nombre', 'Matricula', 'CURP','Actions'];
selection: any;
constructor(private ws:BackendService,  public fbP: FormBuilder,private spinner: NgxSpinnerService ){
  this.formP = this.fbP.group({
    grupo: ['', Validators.required],
    buscar: ['', Validators.required]
  });
}



onchecked(t96: any) {
  console.log(t96);
  }
  onchange(row: any) {
  
    console.log(this.studentsAux);
    const student:Estudiante = {
      id: row.id,
      nombre: row.nombres +" " + row.apellidoPaterno +" " + row.apellidoMaterno,
      matricula: row.matricula,
      curp: row.curp
  };
  this.studentsAux.push(student); 
  
    
  }
  ngOnInit(): void {
    this.fileImage="../../../assets/img/noImage.png";
    this.spinner.show();
    this.ws.getCatlog(0).subscribe({
     next: (data) => {
      this.itemsCatalog=data;
     console.log(data);
     this.ws.getEstudentesList().subscribe({
      next: (data1) => {
        this.studentsDS=data1;
       console.log(data);
       this.spinner.hide();
       },
       error: (err) =>{
         this.spinner.hide();
         console.log("errror resp" + err);
        // this.modalService.open(this.alertModal, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
       }
      });
     this.ws.getDocentesList().subscribe({
      next: (data1) => {
        this.itemDocentes=data1;
       console.log(data1);
       this.spinner.hide();
       },
       error: (err) =>{
         this.spinner.hide();
         console.log("errror resp" + err);
        // this.modalService.open(this.alertModal, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
       }
     
    });
    
     },
     error: (err) =>{
       this.spinner.hide();
       console.log("errror resp" + err);
      // this.modalService.open(this.alertModal, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
     }
    });

  }

  SaveGroup(){
    this.spinner.show();
    this.ws.saveGroups(this.buildGroup()).subscribe({
      next:(data:any)=>{
        for (const elemento of this.studentsAdd) {
          console.log(elemento);
          const estudentGrupo={
            "id": 0,
            "idEstudiante": elemento.id,
            "idGrupo": data.id,
            "fechaAlta": "2024-03-19T06:57:51.258Z",
            "activo": true
          };
        this.ws.saveStudentGroup(estudentGrupo).subscribe({
          next:(data1:any)=>console.log(data1),
          error:(e)=>console.error(e)
        });
      }
        this.spinner.hide();
      },
        error: (err) =>{
          this.spinner.hide();
          console.log("errror resp" + err);
          this.spinner.hide();
          //this.modalService.open(this.alertModal, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
    })
   
  }
  
buildGroup(){
  const grupo={
    "id": 0,
    "grado": this.selectGrado.id,
    "nombre": this.formP.get('grupo')?.value,
    "idDocente": this.selectProfesor.id,
    "fotoSalon":this.fileImage,
    "fechaAlta": "2024-03-19T07:01:01.224Z",
    "activo": true
  };
  return grupo;
}

  addStudentGroup(){
   this.studentsAdd=this.studentsAux;
  }

  seleccionarImagen(){
    this.inputImagen.nativeElement.click();
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
}

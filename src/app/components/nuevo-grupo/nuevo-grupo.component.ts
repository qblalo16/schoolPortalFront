import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnonymousCredential, BlobServiceClient, BlobUploadCommonResponse } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrl: './nuevo-grupo.component.scss'
})
export class NuevoGrupoComponent implements OnInit{
isChecked: boolean=false;
onchecked(t96: any) {
console.log(t96);
}
onchange(_t96: any) {
  console.log(_t96);
}
itemsCatalog: any;
selectedRelation: any;
formP: FormGroup;
fileImage:string="";
itemDocentes:any;
@ViewChild('inputImagen') inputImagen!: ElementRef;
selectGrado: any;
selectProfesor: any;
studentsDS: any;
displayedColumns: string[] = ['Actions', 'Nombre', 'Matricula', 'CURP'];
selection: any;
constructor(private ws:BackendService,  public fbP: FormBuilder, ){
  this.formP = this.fbP.group({
    grupo: ['', Validators.required],
    buscar: ['', Validators.required]
  });
}
  ngOnInit(): void {
    this.fileImage="../../../assets/img/noImage.png";
    this.ws.getCatlog(0).subscribe((data:any)=>{
      this.itemsCatalog=data;
      this.ws.getDocentesList().subscribe((data1:any)=>{
        this.itemDocentes=data1;
        console.log(data1);
      });
    });
    this.ws.getEstudentesList().subscribe((data:any)=>{
      this.studentsDS=data;
    });
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

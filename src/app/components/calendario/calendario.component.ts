import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { FormControl, FormGroup } from '@angular/forms';
import { AnonymousCredential, BlobServiceClient, BlobUploadCommonResponse } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export class CalendarioComponent implements OnInit {
  @ViewChild('inputImagen') inputImagen!: ElementRef;
  itemsCatalog:any;
selectedItem: any;
calendarByMonth: any;
fileImage: string="";
form: FormGroup;
submit() {
  this.ws.saveCalendario(this.buildData()).subscribe((data:any)=>{
    console.log(data);
    this.cleanData();
    this.mostrarAlerta();
  });
}

buildData(){
  var month=this.selectedDate.getMonth()+1;
 const data={
  "id": 0,
  "nombreEvento":  this.form.get('evento')?.value,
  "mes": month,
  "archivoCalendario":this.fileImage,
  "fechaAlta": this.selectedDate,
  "activo": true
 }
return data;
}
  

  
  constructor(private ws:BackendService,private _snackBar: MatSnackBar){
   this.form = new FormGroup({
    evento: new FormControl('evento'),
    });
  }
  ngOnInit(): void {
    this.ws.getCatlog(2).subscribe((data:any)=>{
      this.itemsCatalog=data;
      console.log(data);
    });
  }
  catalogMonths:any;
  selectedDate: Date=new Date();

  onchange(){
    console.log();

  }
  onchangeMonth(){
    console.log(this.selectedItem)
    this.ws.getCalendario(this.selectedItem).subscribe((data: any) =>{
      this.calendarByMonth=data;
      console.log(this.calendarByMonth);
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

  cleanData(){
    const dataclean={
      'evento':''
    };
    this.form.reset();
    this.fileImage="";
  }

  mostrarAlerta(): void {
    this._snackBar.open('Se guardo con exito en el calendario.', 'Cerrar', {
      duration: 2000, // duración en milisegundos
    });
  }
}




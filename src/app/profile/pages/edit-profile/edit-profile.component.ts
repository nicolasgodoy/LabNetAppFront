import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { async, every } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public preview : string;
  public files : any = [];
  constructor(private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
  }

  captureFile(event: any) : any{

    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado)
    .then(( img : any) => {

      this.preview = img.base;
      console.log(img);
    })
    this.files.push(archivoCapturado);
    console.log();
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {

    try {
      
      const unsafeImg = window.URL.createObjectURL($event);
      const img = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({

          base: null
        })
      }
    } catch (error) {
      
      return null;
    }
  })
}
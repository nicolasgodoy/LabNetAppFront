import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'editProfilePipe'
})
export class EditProfilePipePipe implements PipeTransform {

constructor(private sanitizer : DomSanitizer){

}

  transform(url): unknown {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
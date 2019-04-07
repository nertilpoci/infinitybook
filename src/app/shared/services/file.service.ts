import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class FileService{
     ReadFile(inputFile) {
        const temporaryFileReader = new FileReader();
      
        return new Promise((resolve, reject) => {
          temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject("Problem parsing input file.");
          };
      
          temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
          };
          temporaryFileReader.readAsDataURL(inputFile);
        });
      };
}
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { Subject } from "rxjs";
import { environment } from "src/environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private imageListlistener = new Subject<any>();
  imageList = [];
  constructor(private http: HttpClient, private router: Router) {}

  getImages() {
    this.http.get<{status: string, images: any}>(environment.galleryGetUrl + '/api/uploading')
    .subscribe(result => {
      if (result.status === 'success') {
     const promises = result.images.map(image => {
          return {
            ...image,
            imagePath: environment.galleryGetUrl + '/gallery/' + image.imageName,
            src: environment.galleryGetUrl + '/gallery/' + image.imageName
          };
        });
        Promise.all(promises).then((result) => {
          this.imageList = result;
          this.imageListlistener.next(result);
        });

      } else {
        return {
          message: 'no_images'
        };
      }

    });

  }

  imageListGet() {
    return this.imageListlistener.asObservable();
  }


}

import { Component, OnInit } from '@angular/core';
import { Lightbox,
  LightboxConfig,
  LightboxEvent,
  LIGHTBOX_EVENT,
  IEvent,
  IAlbum } from 'ngx-lightbox';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { GalleryService } from '../services/galleryService';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-event-gallery',
  templateUrl: './event-gallery.component.html',
  styleUrls: ['./event-gallery.component.css']
})
export class EventGalleryComponent implements OnInit {
  public fileCount: any;
  public albums: Array<IAlbum>;
  private _subscription: Subscription;
  constructor(
    private router: Router,
    private http: HttpClient,
    private _lightbox: Lightbox,
    private _lightboxEvent: LightboxEvent,
    private _lighboxConfig: LightboxConfig,
    public galleryService: GalleryService
  ) {
    // this.http.get<{ message: string, fileCount: number }>(apiUrl + '/galleryCount')
    // .subscribe(data => {
    //   console.log(data.fileCount, typeof(data.fileCount));
    //   this.fileCount = data.fileCount;
    //   console.log(this.fileCount);
    //   for (let i = 1; i <= this.fileCount; i++) {
    //     console.log(this.fileCount);
    //     const src = '../../assets/images/gallery/image-' + i + '.jpg';
    //     const thumb = '../../assets/images/gallery/image-' + i + '.jpg';
    //     const album = {
    //        src: src,
    //        thumb: thumb
    //     };
    //     this.albums.push(album);
    //   }
    // });
    // this.albums = [];

    this.galleryService.getImages();
    this.galleryService.imageListGet().subscribe(result => {
      this.albums = result;
    });

    // set default config
    this._lighboxConfig.fadeDuration = 1;
  }

  ngOnInit() {
    this.router.events.subscribe((path) => {
      window.scrollTo(0, 0);
    });
  }

  open(index: number): void {
    this._subscription = this._lightboxEvent.lightboxEvent$
    .subscribe((event: IEvent) => this._onReceivedEvent(event));

    // override the default config
    this._lightbox.open(this.albums, index,
      { wrapAround: true, showImageNumberLabel: true });
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this._subscription.unsubscribe();
    }
  }
}

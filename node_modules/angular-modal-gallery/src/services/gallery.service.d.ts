import { EventEmitter } from '@angular/core';
export interface InternalGalleryPayload {
    galleryId: number | undefined;
    index: number;
}
export declare class GalleryService {
    navigate: EventEmitter<InternalGalleryPayload>;
    openGallery(galleryId: number | undefined, index: number): void;
}

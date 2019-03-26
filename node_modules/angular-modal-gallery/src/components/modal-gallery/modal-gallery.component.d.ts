import { ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ButtonEvent, ButtonsConfig } from '../../model/buttons-config.interface';
import { Image, ImageModalEvent } from '../../model/image.class';
import { Action } from '../../model/action.enum';
import { Description } from '../../model/description.interface';
import { KeyboardConfig } from '../../model/keyboard-config.interface';
import { LoadingConfig } from '../../model/loading-config.interface';
import { PreviewConfig } from '../../model/preview-config.interface';
import { SlideConfig } from '../../model/slide-config.interface';
import { AccessibilityConfig } from '../../model/accessibility.interface';
import { KeyboardService } from '../../services/keyboard.service';
import { GalleryService } from '../../services/gallery.service';
import { DotsConfig } from '../../model/dots-config.interface';
import { ImageLoadEvent } from '../current-image/current-image.component';
import { InternalLibImage } from '../../model/image-internal.class';
import { PlainGalleryConfig } from '../../model/plain-gallery-config.interface';
import { CurrentImageConfig } from '../../model/current-image-config.interface';
/**
 * Main Component of this library with both the plain and modal galleries.
 */
export declare class ModalGalleryComponent implements OnInit, OnDestroy, OnChanges {
    private keyboardService;
    private galleryService;
    private platformId;
    private changeDetectorRef;
    /**
     * Unique id (>=0) of the current instance of this library. This is useful when you are using
     * the service to call modal gallery without open it manually.
     * Right now is optional, but in upcoming major releases will be mandatory!!!
     */
    id: number | undefined;
    /**
     * Array of `Image` that represent the model of this library with all images, thumbs and so on.
     */
    modalImages: Image[];
    /**
     * Object of type `ButtonsConfig` to show/hide buttons.
     */
    buttonsConfig: ButtonsConfig;
    /**
     * Boolean to enable modal-gallery close behaviour when clicking
     * on the semi-transparent background. Enabled by default.
     */
    enableCloseOutside: boolean;
    /**
     * Interface to configure current image in modal-gallery.
     * For instance you can disable navigation on click on current image (enabled by default).
     */
    currentImageConfig: CurrentImageConfig;
    /**
     * Boolean required to enable image download with both ctrl+s/cmd+s and download button.
     * If you want to show enable button, this is not enough. You have to use also `buttonsConfig`.
     * TODO: this will be removed in version 6.0.0 because it will be into currentImageConfig
     */
    downloadable: boolean;
    /**
     * Object of type `LoadingConfig` that contains fields like enable/disable
     * and a way to choose a loading spinner.
     * TODO: this will be removed in version 6.0.0 because it will be into currentImageConfig
     */
    loadingConfig: LoadingConfig;
    /**
     * Object of type `Description` to configure and show image descriptions.
     * TODO: this will be removed in version 6.0.0 because it will be into currentImageConfig
     */
    description: Description;
    /**
     * Object of type `DotsConfig` to init DotsComponent's features.
     * For instance, it contains a param to show/hide dots.
     */
    dotsConfig: DotsConfig;
    /**
     * Object of type `PreviewConfig` to init PreviewsComponent's features.
     * For instance, it contains a param to show/hide previews.
     */
    previewConfig: PreviewConfig;
    /**
     * Object of type `SlideConfig` to init side previews and `infinite sliding`.
     */
    slideConfig: SlideConfig;
    /**
     * Object of type `AccessibilityConfig` to init custom accessibility features.
     * For instance, it contains titles, alt texts, aria-labels and so on.
     */
    accessibilityConfig: AccessibilityConfig;
    /**
     * Object of type `KeyboardConfig` to assign custom keys to ESC, RIGHT and LEFT keyboard's actions.
     */
    keyboardConfig: KeyboardConfig;
    /**
     * Object of type `PlainGalleryConfig` to configure the plain gallery.
     */
    plainGalleryConfig: PlainGalleryConfig;
    /**
     * Output to emit an event when the modal gallery is closed.
     */
    close: EventEmitter<ImageModalEvent>;
    /**
     * Output to emit an event when an image is changed.
     */
    show: EventEmitter<ImageModalEvent>;
    /**
     * Output to emit an event when the current image is the first one.
     */
    firstImage: EventEmitter<ImageModalEvent>;
    /**
     * Output to emit an event when the current image is the last one.
     */
    lastImage: EventEmitter<ImageModalEvent>;
    /**
     * Output to emit an event when the modal gallery is closed.
     */
    hasData: EventEmitter<ImageModalEvent>;
    /**
     * Output to emit an event when a button is clicked, but before that the action is triggered.
     */
    buttonBeforeHook: EventEmitter<ButtonEvent>;
    /**
     * Output to emit an event when a button is clicked, but after that the action is triggered.
     */
    buttonAfterHook: EventEmitter<ButtonEvent>;
    /**
     * Reference to the CurrentImageComponent to invoke methods on it.
     */
    currentImageComponent: any;
    /**
     * Boolean that it is true if the modal gallery is visible. False by default.
     */
    opened: boolean;
    /**
     * Boolean to open the modal gallery. False by default.
     */
    showGallery: boolean;
    /**
     * Array of `InternalLibImage` representing the model of this library with all images, thumbs and so on.
     */
    images: InternalLibImage[];
    /**
     * `Image` that is visible right now.
     */
    currentImage: InternalLibImage;
    private galleryServiceSubscription;
    /**
     * Constructor with the injection of ´KeyboardService´ and an object to support Server-Side Rendering.
     */
    constructor(keyboardService: KeyboardService, galleryService: GalleryService, platformId: Object, changeDetectorRef: ChangeDetectorRef);
    /**
     * Method ´ngOnInit´ to init images calling `initImages()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     */
    ngOnInit(): void;
    /**
     * Method ´ngOnChanges´ to re-init images if input is changed.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called before `ngOnInit()` and whenever one or more data-bound input properties change.
     * @param changes `SimpleChanges` object of current and previous property values provided by Angular.
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Method called by custom upper buttons.
     * @param {ButtonEvent} event payload
     */
    onCustomEmit(event: ButtonEvent): void;
    /**
     * Method called by the delete upper button.
     * @param {ButtonEvent} event payload
     */
    onDelete(event: ButtonEvent): void;
    /**
     * Method called by the navigate upper button.
     * @param {ButtonEvent} event payload
     */
    onNavigate(event: ButtonEvent): void;
    /**
     * Method called by the download upper button.
     * @param {ButtonEvent} event payload
     */
    onDownload(event: ButtonEvent): void;
    /**
     * Method called by the close upper button.
     * @param {ButtonEvent} event payload
     * @param {Action} action that triggered the close method. `Action.NORMAL` by default
     */
    onCloseGallery(event: ButtonEvent, action?: Action): void;
    /**
     * Method to close the modal gallery specifying the action.
     * It also reset the `keyboardService` to prevent multiple listeners.
     * @param {Action} action type. `Action.NORMAL` by default
     */
    closeGallery(action?: Action): void;
    /**
     * Method called when you click on an image of your plain (or inline) gallery.
     * @param {number} index of the clicked image
     */
    onShowModalGallery(index: number): void;
    /**
     * Method to show the modal gallery displaying the image with
     * the index specified as input parameter.
     * It will also register a new `keyboardService` to catch keyboard's events to download the current
     * image with keyboard's shortcuts. This service, will be removed either when modal gallery component
     * will be destroyed or when the gallery is closed invoking the `closeGallery` method.
     * @param {number} index of the image to show
     * @param {boolean} isCalledByService is true if called by gallery.service, otherwise false
     */
    showModalGallery(index: number, isCalledByService?: boolean): void;
    /**
     * Method called when the image changes and used to update the `currentImage` object.
     * @param {ImageModalEvent} event payload
     */
    onChangeCurrentImage(event: ImageModalEvent): void;
    isPlainGalleryVisible(): boolean;
    /**
     * Method called when you click 'outside' (i.e. on the semi-transparent background)
     * to close the modal gallery if `enableCloseOutside` is true.
     * @param {boolean} event payload. True to close the modal gallery, false otherwise
     */
    onClickOutside(event: boolean): void;
    /**
     * Method called when an image is loaded and the loading spinner has gone.
     * It sets the previouslyLoaded flag inside the Image to hide loading spinner when displayed again.
     * @param {ImageLoadEvent} event payload
     */
    onImageLoad(event: ImageLoadEvent): void;
    /**
     * Method called when a dot is clicked and used to update the current image.
     * @param {number} index of the clicked dot
     */
    onClickDot(index: number): void;
    /**
     * Method called when an image preview is clicked and used to update the current image.
     * @param {Image} preview image
     */
    onClickPreview(preview: Image): void;
    /**
     * Method to download the current image, only if `downloadable` is true.
     * It contains also a logic to enable downloading features also for IE11.
     */
    downloadImage(): void;
    /**
     * Method to cleanup resources. In fact, this will reset keyboard's service.
     * This is an Angular's lifecycle hook that is called when this component is destroyed.
     */
    ngOnDestroy(): void;
    /**
     * Private method to download the current image for all browsers except for IE11.
     */
    private downloadImageAllBrowsers();
    /**
     * Private method to download the current image only for IE11 using
     * custom javascript's methods available only on IE.
     */
    private downloadImageOnlyIEorEdge();
    /**
     * Private method to get the `ButtonEvent` to emit, merging the input `ButtonEvent`
     * with the current image.
     * @param {ButtonEvent} event payload to return
     * @returns {ButtonEvent} event payload with the current image included
     */
    private getButtonEventToEmit(event);
    /**
     * Private method to get the filename from an input path.
     * This is used to get the image's name from its path.
     * @param {string} path that represents the path of the image
     * @returns {string} string filename from the input path
     */
    private getFileName(path);
    /**
     * Private method to initialize `images` as array of `Image`s.
     * Also, it will emit ImageowmodaModalEvent to say that images are loaded.
     */
    private initImages();
    /**
     * Private method to emit events when either the last or the first image are visible.
     * @param action Enum of type Action that represents the source of the event that changed the
     *  current image to the first one or the last one.
     * @param indexToCheck is the index number of the image (the first or the last one).
     */
    private emitBoundaryEvent(action, indexToCheck);
    /**
     * Private method to check if this library is running on
     * Microsoft browsers or not (i.e. it detects both IE11 and Edge)
     * supporting also Server-Side Rendering.
     * Inspired by https://msdn.microsoft.com/it-it/library/hh779016(v=vs.85).aspx
     * @returns {any} the result
     */
    private isIEorEdge();
}

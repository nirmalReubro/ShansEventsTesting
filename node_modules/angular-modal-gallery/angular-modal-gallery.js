import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, HostListener, Inject, Injectable, InjectionToken, Input, NgModule, Output, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Directive to close the modal gallery clicking on the semi-transparent background.
 * In fact, it listens for a click on all elements that aren't 'inside' and it emits
 * an event using `\@Output clickOutside`.
 */
class ClickOutsideDirective {
    constructor() {
        /**
         * Output to emit an event if the clicked element class doesn't contain 'inside' or it is 'hidden'. The payload is a boolean.
         */
        this.clickOutside = new EventEmitter();
    }
    /**
     * Method called by Angular itself every click thanks to `\@HostListener`.
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        event.stopPropagation();
        const /** @type {?} */ targetElement = event.target;
        if (!this.clickOutsideEnable || !targetElement) {
            return;
        }
        let /** @type {?} */ isInside = false;
        let /** @type {?} */ isHidden = false;
        if (typeof targetElement.className !== 'string') {
            // it happens with @fortawesome/fontawesome 5
            // for some reasons className is an object with 2 empty properties inside
            isInside = true;
        }
        else {
            // in normal scenarios, use classname, because it's a simple string
            isInside = targetElement.className && targetElement.className.startsWith('inside');
            isHidden = targetElement.className.includes('hidden');
        }
        // if inside => don't close modal gallery
        // if hidden => close modal gallery
        /*
            i i' h | close
            0 1  0 |   1 => close modal gallery
            0 1  1 |   1 => close modal gallery
            1 0  0 |   0
            1 0  1 |   1 => close modal gallery
         */
        if (!isInside || isHidden) {
            // close modal gallery
            this.clickOutside.emit(true);
        }
    }
}
ClickOutsideDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ksClickOutside]'
            },] },
];
/**
 * @nocollapse
 */
ClickOutsideDirective.ctorParameters = () => [];
ClickOutsideDirective.propDecorators = {
    'clickOutsideEnable': [{ type: Input },],
    'clickOutside': [{ type: Output },],
    'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Directive to change the size of an element.
 */
class SizeDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        this.applyStyle();
    }
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    ngOnChanges() {
        this.applyStyle();
    }
    /**
     * Private method to change both width and height of an element.
     * @return {?}
     */
    applyStyle() {
        if (!this.sizeConfig) {
            return;
        }
        // apply [style.width]
        this.renderer.setStyle(this.el.nativeElement, 'width', this.sizeConfig.width);
        this.renderer.setStyle(this.el.nativeElement, 'height', this.sizeConfig.height);
    }
}
SizeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ksSize]'
            },] },
];
/**
 * @nocollapse
 */
SizeDirective.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];
SizeDirective.propDecorators = {
    'sizeConfig': [{ type: Input },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
class KeyboardNavigationDirective {
    constructor() {
        this.keyPress = new EventEmitter();
    }
    /**
     * Listener to catch keyboard's events and call the right method based on the key.
     * For instance, pressing esc, this will call `closeGallery(Action.KEYBOARD)` and so on.
     * If you passed a valid `keyboardConfig` esc, right and left buttons will be customized based on your data.
     * @param {?} e KeyboardEvent caught by the listener.
     * @return {?}
     */
    onKeyDown(e) {
        if (!this.isOpen) {
            return;
        }
        this.keyPress.emit(e.keyCode);
    }
}
KeyboardNavigationDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ksKeyboardNavigation]'
            },] },
];
/**
 * @nocollapse
 */
KeyboardNavigationDirective.ctorParameters = () => [];
KeyboardNavigationDirective.propDecorators = {
    'isOpen': [{ type: Input },],
    'keyPress': [{ type: Output },],
    'onKeyDown': [{ type: HostListener, args: ['window:keydown', ['$event'],] },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Directive to change the flex-wrap css property of an element.
 */
class WrapDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        this.applyStyle();
    }
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    ngOnChanges() {
        this.applyStyle();
    }
    /**
     * Private method to change both widht and flex-wrap css properties.
     * @return {?}
     */
    applyStyle() {
        // TODO is this right???? If wrap os false I cannot apply width and flex-wrap
        if (!this.wrap) {
            return;
        }
        this.renderer.setStyle(this.el.nativeElement, 'width', this.width);
        this.renderer.setStyle(this.el.nativeElement, 'flex-wrap', this.wrap ? 'wrap' : 'nowrap');
    }
}
WrapDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ksWrap]'
            },] },
];
/**
 * @nocollapse
 */
WrapDirective.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];
WrapDirective.propDecorators = {
    'wrap': [{ type: Input },],
    'width': [{ type: Input },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Directive to change the flex-direction of an element, based on two inputs (`direction` and `justify`).
 */
class DirectionDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        this.applyStyle();
    }
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    ngOnChanges() {
        this.applyStyle();
    }
    /**
     * Private method to change both direction and justify of an element.
     * @return {?}
     */
    applyStyle() {
        if (!this.direction || !this.justify) {
            return;
        }
        this.renderer.setStyle(this.el.nativeElement, 'flex-direction', this.direction);
        this.renderer.setStyle(this.el.nativeElement, 'justify-content', this.justify);
    }
}
DirectionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ksDirection]'
            },] },
];
/**
 * @nocollapse
 */
DirectionDirective.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];
DirectionDirective.propDecorators = {
    'direction': [{ type: Input },],
    'justify': [{ type: Input },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Directive to add an image to an `<a>` tag with some additional custom properties.
 */
class ATagBgImageDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        this.applyStyle();
    }
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    ngOnChanges() {
        this.applyStyle();
    }
    /**
     * Private method to add an image as background of an `<a>` tag.
     * @return {?}
     */
    applyStyle() {
        if (!this.image || (!this.image.plain && !this.image.modal)) {
            return;
        }
        const /** @type {?} */ imgPath = this.image.plain && this.image.plain.img ? this.image.plain.img : this.image.modal.img;
        this.renderer.setStyle(this.el.nativeElement, 'background', `url("${imgPath}") ${this.style}`);
    }
}
ATagBgImageDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ksATagBgImage]'
            },] },
];
/**
 * @nocollapse
 */
ATagBgImageDirective.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];
ATagBgImageDirective.propDecorators = {
    'image': [{ type: Input },],
    'style': [{ type: Input },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Directive to customize the description.
 */
class DescriptionDirective {
    /**
     * @param {?} renderer
     * @param {?} el
     */
    constructor(renderer, el) {
        this.renderer = renderer;
        this.el = el;
    }
    /**
     * Method ´ngOnInit´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        this.applyStyle();
    }
    /**
     * Method ´ngOnChanges´ to apply the style of this directive.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @return {?}
     */
    ngOnChanges() {
        this.applyStyle();
    }
    /**
     * Private method to change description's style.
     * @return {?}
     */
    applyStyle() {
        if (!this.description) {
            return;
        }
        if (this.description.style) {
            this.renderer.setStyle(this.el.nativeElement, 'background', this.description.style.bgColor);
            this.renderer.setStyle(this.el.nativeElement, 'color', this.description.style.textColor);
            if (this.description.style.width) {
                this.renderer.setStyle(this.el.nativeElement, 'width', this.description.style.width);
            }
            if (this.description.style.height) {
                this.renderer.setStyle(this.el.nativeElement, 'height', this.description.style.height);
            }
            if (this.description.style.position) {
                this.renderer.setStyle(this.el.nativeElement, 'position', this.description.style.position);
            }
            if (this.description.style.top) {
                this.renderer.setStyle(this.el.nativeElement, 'top', this.description.style.top);
            }
            if (this.description.style.bottom) {
                this.renderer.setStyle(this.el.nativeElement, 'bottom', this.description.style.bottom);
            }
            if (this.description.style.left) {
                this.renderer.setStyle(this.el.nativeElement, 'left', this.description.style.left);
            }
            if (this.description.style.right) {
                this.renderer.setStyle(this.el.nativeElement, 'right', this.description.style.right);
            }
            this.renderer.setStyle(this.el.nativeElement, 'margin-top', this.description.style.marginTop ? this.description.style.marginTop : '0px');
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', this.description.style.marginBottom ? this.description.style.marginBottom : '0px');
            this.renderer.setStyle(this.el.nativeElement, 'margin-left', this.description.style.marginLeft ? this.description.style.marginLeft : '0px');
            this.renderer.setStyle(this.el.nativeElement, 'margin-right', this.description.style.marginRight ? this.description.style.marginRight : '0px');
        }
    }
}
DescriptionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ksDescription]'
            },] },
];
/**
 * @nocollapse
 */
DescriptionDirective.ctorParameters = () => [
    { type: Renderer2, },
    { type: ElementRef, },
];
DescriptionDirective.propDecorators = {
    'description': [{ type: Input },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Array of all directives.
 */
const DIRECTIVES = [
    ClickOutsideDirective,
    SizeDirective,
    KeyboardNavigationDirective,
    WrapDirective,
    DirectionDirective,
    ATagBgImageDirective,
    DescriptionDirective
];

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Component with the semi-transparent background.
 */
class BackgroundComponent {
}
BackgroundComponent.decorators = [
    { type: Component, args: [{
                selector: 'ks-background',
                styles: [`
    .ng-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: black;
      opacity: 0.8;
      z-index: 9999; }
  `],
                template: `
    <div class="ng-overlay" *ngIf="isOpen"
         [attr.aria-label]="accessibilityConfig?.backgroundAriaLabel"
         [title]="accessibilityConfig?.backgroundTitle"></div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
BackgroundComponent.ctorParameters = () => [];
BackgroundComponent.propDecorators = {
    'isOpen': [{ type: Input },],
    'accessibilityConfig': [{ type: Input },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Class `Image` that represents an image with both `modal` and `plain` configurations.
 * Both image `id` and `modal` are mandatory, instead `plain` is optional.
 */
class Image {
    /**
     * @param {?} id
     * @param {?} modal
     * @param {?=} plain
     */
    constructor(id, modal, plain) {
        this.id = id;
        this.modal = modal;
        this.plain = plain;
    }
}
/**
 * Class `ImageModalEvent` that represents the event payload with the result and the triggered action.
 */
class ImageModalEvent {
    /**
     * @param {?} action
     * @param {?} result
     */
    constructor(action, result) {
        this.action = action;
        this.result = result;
    }
}

let Action = {};
Action.NORMAL = 0;
Action.CLICK = 1;
Action.KEYBOARD = 2;
Action.SWIPE = 3;
Action.LOAD = 4;
Action[Action.NORMAL] = "NORMAL";
Action[Action.CLICK] = "CLICK";
Action[Action.KEYBOARD] = "KEYBOARD";
Action[Action.SWIPE] = "SWIPE";
Action[Action.LOAD] = "LOAD";

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
// To prevent issues with angular-universal on server-side
if (typeof window !== 'undefined') {
    require('mousetrap');
}
const KEYBOARD_CONFIGURATION = new InjectionToken('KEYBOARD_CONFIGURATION');
/**
 * Service to intercept ctrl+s (or cmd+s on macOS) using a third-party library, called Mousetrap.
 */
class KeyboardService {
    /**
     * Constructor of `KeyboardService` to init `mousetrap` and `shortcuts` private variables.
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.shortcuts = this.config && this.config.shortcuts ? this.config.shortcuts : ['ctrl+s', 'meta+s'];
        // To prevent issues with angular-universal on server-side
        if (typeof window !== 'undefined') {
            this.mousetrap = new Mousetrap();
        }
    }
    /**
     * Method to add a lister for ctrl+s/cmd+s keyboard events.
     * @param {?} onBind
     * @return {?}
     */
    add(onBind) {
        // To prevent issues with angular-universal on server-side
        if (typeof window !== 'undefined') {
            this.mousetrap.bind(this.shortcuts, (event, combo) => {
                if (event.preventDefault) {
                    event.preventDefault();
                }
                else {
                    // internet explorer
                    event.returnValue = false;
                }
                onBind(event, combo);
            });
        }
    }
    /**
     * Method to reset all listeners. Please, call this function when needed
     * to free resources ad prevent leaks.
     * @return {?}
     */
    reset() {
        // To prevent issues with angular-universal on server-side
        if (typeof window !== 'undefined') {
            this.mousetrap.reset();
        }
    }
}
KeyboardService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
KeyboardService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [KEYBOARD_CONFIGURATION,] },] },
];

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
class GalleryService {
    constructor() {
        this.navigate = new EventEmitter();
    }
    /**
     * @param {?} galleryId
     * @param {?} index
     * @return {?}
     */
    openGallery(galleryId, index) {
        if (galleryId === undefined || galleryId < 0 || index < 0) {
            throw new Error('Cannot open gallery via GalleryService with either index<0 or galleryId<0 or galleryId===undefined');
        }
        this.navigate.emit({
            galleryId: galleryId,
            index: index
        });
    }
}
GalleryService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
GalleryService.ctorParameters = () => [];

/**
 * Keycode of the keyboard's key `space`
 */
const SPACE_KEY = 32;
/**
 * Keycode of the keyboard's key `enter`
 */
const ENTER_KEY = 13;
/**
 * Keycode of the main mouse button
 */
const MOUSE_MAIN_BUTTON_CLICK = 0;
/**
 * Const NEXT
 */
const NEXT = 1;
/**
 * Const PREV
 */
const PREV = -1;
/**
 * Const NOTHING to represents a situation when it isn't both NEXT and PREV
 */
const NOTHING = 0;
/**
 * Const to represent the right direction
 */
const DIRECTION_RIGHT = 'right';
/**
 * Const to represent the left direction
 */

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Provides some useful methods to add accessibility features to subclasses.
 * In particular, it exposes a method to handle navigation event with both Keyboard and Mouse
 * and another with also the direction (right or left).
 */
class AccessibleComponent {
    /**
     * Method to handle navigation events with both Keyboard and Mouse.
     * @param {?} direction
     * @param {?} event
     * @return {?}
     */
    handleNavigationEvent(direction, event) {
        if (!event) {
            return NOTHING;
        }
        if (event instanceof KeyboardEvent) {
            return this.handleKeyboardNavigationEvent(direction, event);
        }
        else if (event instanceof MouseEvent) {
            return this.handleMouseNavigationEvent(direction, event);
        }
        return NOTHING;
    }
    /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} event
     * @return {?}
     */
    handleImageEvent(event) {
        if (!event) {
            return NOTHING;
        }
        if (event instanceof KeyboardEvent) {
            return this.handleImageKeyboardEvent(event);
        }
        else if (event instanceof MouseEvent) {
            return this.handleImageMouseEvent(event);
        }
        return NOTHING;
    }
    /**
     * Private method to handle keyboard events over an image.
     * @param {?} event
     * @return {?}
     */
    handleImageKeyboardEvent(event) {
        const /** @type {?} */ key = event.keyCode;
        if (key === SPACE_KEY || key === ENTER_KEY) {
            return NEXT;
        }
        return NOTHING;
    }
    /**
     * Private method to handle mouse events over an image.
     * @param {?} event
     * @return {?}
     */
    handleImageMouseEvent(event) {
        const /** @type {?} */ mouseBtn = event.button;
        if (mouseBtn === MOUSE_MAIN_BUTTON_CLICK) {
            return NEXT;
        }
        return NOTHING;
    }
    /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} direction
     * @param {?} event
     * @return {?}
     */
    handleKeyboardNavigationEvent(direction, event) {
        const /** @type {?} */ key = event.keyCode;
        if (key === SPACE_KEY || key === ENTER_KEY) {
            return direction === DIRECTION_RIGHT ? NEXT : PREV;
        }
        return NOTHING;
    }
    /**
     * Method to handle events over an image, for instance a keypress with the Keyboard or a Mouse click.
     * @param {?} direction
     * @param {?} event
     * @return {?}
     */
    handleMouseNavigationEvent(direction, event) {
        const /** @type {?} */ mouseBtn = event.button;
        if (mouseBtn === MOUSE_MAIN_BUTTON_CLICK) {
            return direction === DIRECTION_RIGHT ? NEXT : PREV;
        }
        return NOTHING;
    }
}
AccessibleComponent.decorators = [
    { type: Component, args: [{
                selector: 'ks-accessible',
                template: ``,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
AccessibleComponent.ctorParameters = () => [];

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
let DescriptionStrategy = {};
DescriptionStrategy.ALWAYS_HIDDEN = 1;
DescriptionStrategy.ALWAYS_VISIBLE = 2;
DescriptionStrategy.HIDE_IF_EMPTY = 3;
DescriptionStrategy[DescriptionStrategy.ALWAYS_HIDDEN] = "ALWAYS_HIDDEN";
DescriptionStrategy[DescriptionStrategy.ALWAYS_VISIBLE] = "ALWAYS_VISIBLE";
DescriptionStrategy[DescriptionStrategy.HIDE_IF_EMPTY] = "HIDE_IF_EMPTY";

let Keyboard = {};
Keyboard.ESC = 27;
Keyboard.LEFT_ARROW = 37;
Keyboard.RIGHT_ARROW = 39;
Keyboard.UP_ARROW = 38;
Keyboard.DOWN_ARROW = 40;
Keyboard[Keyboard.ESC] = "ESC";
Keyboard[Keyboard.LEFT_ARROW] = "LEFT_ARROW";
Keyboard[Keyboard.RIGHT_ARROW] = "RIGHT_ARROW";
Keyboard[Keyboard.UP_ARROW] = "UP_ARROW";
Keyboard[Keyboard.DOWN_ARROW] = "DOWN_ARROW";

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
let LoadingType = {};
LoadingType.STANDARD = 1;
LoadingType.CIRCULAR = 2;
LoadingType.BARS = 3;
LoadingType.DOTS = 4;
LoadingType.CUBE_FLIPPING = 5;
LoadingType.CIRCLES = 6;
LoadingType.EXPLOSING_SQUARES = 7;
LoadingType[LoadingType.STANDARD] = "STANDARD";
LoadingType[LoadingType.CIRCULAR] = "CIRCULAR";
LoadingType[LoadingType.BARS] = "BARS";
LoadingType[LoadingType.DOTS] = "DOTS";
LoadingType[LoadingType.CUBE_FLIPPING] = "CUBE_FLIPPING";
LoadingType[LoadingType.CIRCLES] = "CIRCLES";
LoadingType[LoadingType.EXPLOSING_SQUARES] = "EXPLOSING_SQUARES";

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Utility function to get the index of the input `image` from `arrayOfImages`
 * @throws an Error if either image or arrayOfImages are not valid,
 *  or if the input image doesn't contain an 'id', or the 'id' is < 0
 * @param {?} image
 * @param {?} arrayOfImages
 * @return {?}
 */
function getIndex(image, arrayOfImages) {
    if (!image) {
        throw new Error('image must be a valid Image object');
    }
    if (!arrayOfImages) {
        throw new Error('arrayOfImages must be a valid Image[]');
    }
    if (!image.id && image.id !== 0) {
        // id = 0 is admitted
        throw new Error(`A numeric Image 'id' is mandatory`);
    }
    if (image.id < 0) {
        throw new Error(`Image 'id' must be >= 0`);
    }
    return arrayOfImages.findIndex((val) => val.id === image.id);
}

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Component with the current image with some additional elements like arrows and side previews.
 */
class CurrentImageComponent extends AccessibleComponent {
    constructor() {
        super(...arguments);
        /**
         * Output to emit an event when images are loaded. The payload contains an `ImageLoadEvent`.
         */
        this.loadImage = new EventEmitter();
        /**
         * Output to emit any changes of the current image. The payload contains an `ImageModalEvent`.
         */
        this.changeImage = new EventEmitter();
        /**
         * Output to emit an event when the modal gallery is closed. The payload contains an `ImageModalEvent`.
         */
        this.close = new EventEmitter();
        /**
         * Enum of type `Action` that represents a mouse click on a button.
         * Declared here to be used inside the template.
         */
        this.clickAction = Action.CLICK;
        /**
         * Enum of type `Action` that represents a keyboard action.
         * Declared here to be used inside the template.
         */
        this.keyboardAction = Action.KEYBOARD;
        /**
         * Boolean that it's true when you are watching the first image (currently visible).
         * False by default
         */
        this.isFirstImage = false;
        /**
         * Boolean that it's true when you are watching the last image (currently visible).
         * False by default
         */
        this.isLastImage = false;
        /**
         * Boolean that it's true if an image of the modal gallery is still loading.
         * True by default
         */
        this.loading = true;
        /**
         * Private object without type to define all swipe actions used by hammerjs.
         */
        this.SWIPE_ACTION = {
            LEFT: 'swipeleft',
            RIGHT: 'swiperight',
            UP: 'swipeup',
            DOWN: 'swipedown'
        };
    }
    /**
     * Method ´ngOnInit´ to build both `defaultLoading` and `defaultDescription` applying default values.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ defaultLoading = { enable: true, type: LoadingType.STANDARD };
        const /** @type {?} */ defaultDescription = {
            strategy: DescriptionStrategy.ALWAYS_VISIBLE,
            imageText: 'Image ',
            numberSeparator: '/',
            beforeTextDescription: ' - ',
            style: {
                bgColor: 'rgba(0, 0, 0, .5)',
                textColor: 'white',
                marginTop: '0px',
                marginBottom: '5px',
                marginLeft: '0px',
                marginRight: '0px'
            }
        };
        const /** @type {?} */ defaultCurrentImageConfig = { navigateOnClick: true };
        this.configLoading = Object.assign({}, defaultLoading, this.loadingConfig);
        const /** @type {?} */ description = Object.assign({}, defaultDescription, this.descriptionConfig);
        // TODO Improve this terrible code to apply default values
        description.style.bgColor = description.style.bgColor || defaultDescription.style.bgColor;
        description.style.textColor = description.style.textColor || defaultDescription.style.textColor;
        description.style.marginTop = description.style.marginTop || defaultDescription.style.marginTop;
        description.style.marginBottom = description.style.marginBottom || defaultDescription.style.marginBottom;
        description.style.marginLeft = description.style.marginLeft || defaultDescription.style.marginLeft;
        description.style.marginRight = description.style.marginRight || defaultDescription.style.marginRight;
        this.description = description;
        this.configCurrentImage = Object.assign({}, defaultCurrentImageConfig, this.currentImageConfig);
    }
    /**
     * Method ´ngOnChanges´ to update `loading` status and emit events.
     * If the gallery is open, then it will also manage boundary arrows and sliding.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // console.log('currentImage onChanges loading before', this.loading);
        const /** @type {?} */ simpleChange = changes.currentImage;
        if (!simpleChange) {
            return;
        }
        // const prev: InternalLibImage = simpleChange.previousValue;
        const /** @type {?} */ current = simpleChange.currentValue;
        let /** @type {?} */ index;
        try {
            index = getIndex(this.currentImage, this.images);
        }
        catch (err) {
            console.error('Cannot get the current image index in current-image');
            throw err;
        }
        // TODO why I was using this 'this.changeImage.emit(new ImageModalEvent(Action.LOAD, index))' ???
        // if not currently loaded
        // console.log('currentImage onChanges current', current);
        // if (current && !current.previouslyLoaded) {
        //   console.log('currentImage onChanges changing loading');
        //   // this.loading = !current.previouslyLoaded;
        //   this.changeImage.emit(new ImageModalEvent(Action.LOAD, index));
        //   // this.loading = false;
        //   console.log('currentImage onChanges loading changed');
        // }
        // console.log('currentImage onChanges loading after', this.loading);
        if (this.isOpen) {
            this.manageSlideConfig(index);
        }
    }
    /**
     * Method to handle keypress based on the `keyboardConfig` input. It gets the keyCode of
     * the key that triggered the keypress event to navigate between images or to close the modal gallery.
     * @param {?} keyCode
     * @return {?}
     */
    onKeyPress(keyCode) {
        const /** @type {?} */ esc = this.keyboardConfig && this.keyboardConfig.esc ? this.keyboardConfig.esc : Keyboard.ESC;
        const /** @type {?} */ right = this.keyboardConfig && this.keyboardConfig.right ? this.keyboardConfig.right : Keyboard.RIGHT_ARROW;
        const /** @type {?} */ left = this.keyboardConfig && this.keyboardConfig.left ? this.keyboardConfig.left : Keyboard.LEFT_ARROW;
        switch (keyCode) {
            case esc:
                this.close.emit(new ImageModalEvent(Action.KEYBOARD, true));
                break;
            case right:
                this.nextImage(Action.KEYBOARD);
                break;
            case left:
                this.prevImage(Action.KEYBOARD);
                break;
        }
    }
    /**
     * Method to get the image description based on the image object itself.
     * If you provide a full description this will be the visible description, otherwise,
     * it will be built using the `Description` object, concatenating its fields with a specific logic.
     * @throws an Error if description isn't available
     * @param {?=} image
     * @return {?} String description of the image (or the current image if not provided)
     */
    getDescriptionToDisplay(image = this.currentImage) {
        if (!this.description) {
            throw new Error('To show image descriptions, description input must be a valid object implementing the Description interface');
        }
        const /** @type {?} */ imageWithoutDescription = !image.modal || !image.modal.description || image.modal.description === '';
        switch (this.description.strategy) {
            case DescriptionStrategy.HIDE_IF_EMPTY:
                return imageWithoutDescription ? '' : image.modal.description + '';
            case DescriptionStrategy.ALWAYS_HIDDEN:
                return '';
            default:
                // ----------- DescriptionStrategy.ALWAYS_VISIBLE -----------------
                return this.buildTextDescription(image, imageWithoutDescription);
        }
    }
    /**
     * Method to get the title attributes based on descriptions.
     * This is useful to prevent accessibility issues, because if DescriptionStrategy is ALWAYS_HIDDEN,
     * it prevents an empty string as title.
     * @throws an Error if description isn't available
     * @param {?=} image
     * @return {?} String title of the image based on descriptions
     */
    getTitleToDisplay(image = this.currentImage) {
        if (!this.description) {
            throw new Error('To show image titles, description input must be a valid object implementing the Description interface');
        }
        const /** @type {?} */ imageWithoutDescription = !image.modal || !image.modal.description || image.modal.description === '';
        const /** @type {?} */ description = this.buildTextDescription(image, imageWithoutDescription);
        return description;
    }
    /**
     * Method to get `alt attribute`.
     * `alt` specifies an alternate text for an image, if the image cannot be displayed.
     * @param {?=} image
     * @return {?} String alt description of the image (or the current image if not provided)
     */
    getAltDescriptionByImage(image = this.currentImage) {
        if (!image) {
            return '';
        }
        return image.modal && image.modal.description ? image.modal.description : `Image ${getIndex(image, this.images) + 1}`;
    }
    /**
     * Method to get the left side preview image.
     * @return {?}
     */
    getLeftPreviewImage() {
        const /** @type {?} */ currentIndex = getIndex(this.currentImage, this.images);
        if (currentIndex === 0 && this.slideConfig.infinite) {
            // the current image is the first one,
            // so the previous one is the last image
            // because infinite is true
            return this.images[this.images.length - 1];
        }
        this.handleBoundaries(currentIndex);
        return this.images[Math.max(currentIndex - 1, 0)];
    }
    /**
     * Method to get the right side preview image.
     * @return {?}
     */
    getRightPreviewImage() {
        const /** @type {?} */ currentIndex = getIndex(this.currentImage, this.images);
        if (currentIndex === this.images.length - 1 && this.slideConfig.infinite) {
            // the current image is the last one,
            // so the next one is the first image
            // because infinite is true
            return this.images[0];
        }
        this.handleBoundaries(currentIndex);
        return this.images[Math.min(currentIndex + 1, this.images.length - 1)];
    }
    /**
     * Method called by events from both keyboard and mouse on an image.
     * This will invoke the nextImage method (except for click events, because It checks also if navigateOnClick === true).
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    onImageEvent(event, action = Action.NORMAL) {
        // check if triggered by a mouse click
        // If yes, It should block navigation when navigateOnClick is false
        if (action === Action.CLICK && !this.configCurrentImage.navigateOnClick) {
            // a user has requested to block navigation via configCurrentImage.navigateOnClick property
            return;
        }
        const /** @type {?} */ result = super.handleImageEvent(event);
        if (result === NEXT) {
            this.nextImage(action);
        }
    }
    /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param {?} direction
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    onNavigationEvent(direction, event, action = Action.NORMAL) {
        const /** @type {?} */ result = super.handleNavigationEvent(direction, event);
        if (result === NEXT) {
            this.nextImage(action);
        }
        else if (result === PREV) {
            this.prevImage(action);
        }
    }
    /**
     * Method to go back to the previous image.
     * @param {?=} action Enum of type `Action` that represents the source
     *  action that moved back to the previous image. `Action.NORMAL` by default.
     * @return {?}
     */
    prevImage(action = Action.NORMAL) {
        // check if prevImage should be blocked
        if (this.isPreventSliding(0)) {
            return;
        }
        const /** @type {?} */ prevImage = this.getPrevImage();
        this.loading = !prevImage.previouslyLoaded;
        this.changeImage.emit(new ImageModalEvent(action, getIndex(prevImage, this.images)));
    }
    /**
     * Method to go back to the previous image.
     * @param {?=} action Enum of type `Action` that represents the source
     *  action that moved to the next image. `Action.NORMAL` by default.
     * @return {?}
     */
    nextImage(action = Action.NORMAL) {
        // check if nextImage should be blocked
        if (this.isPreventSliding(this.images.length - 1)) {
            return;
        }
        const /** @type {?} */ nextImage = this.getNextImage();
        this.loading = !nextImage.previouslyLoaded;
        this.changeImage.emit(new ImageModalEvent(action, getIndex(nextImage, this.images)));
    }
    /**
     * Method to emit an event as loadImage output to say that the requested image if loaded.
     * This method is invoked by the javascript's 'load' event on an img tag.
     * @param {?} event
     * @return {?}
     */
    onImageLoad(event) {
        // console.log('currentImage onImageLoad', event);
        const /** @type {?} */ loadImageData = {
            status: true,
            index: getIndex(this.currentImage, this.images),
            id: this.currentImage.id
        };
        this.loadImage.emit(loadImageData);
        // console.log('currentImage onImageLoad loadImageData', loadImageData);
        this.loading = false;
    }
    /**
     * Method used by Hammerjs to support touch gestures.
     * @param {?=} action String that represent the direction of the swipe action. 'swiperight' by default.
     * @return {?}
     */
    swipe(action = this.SWIPE_ACTION.RIGHT) {
        switch (action) {
            case this.SWIPE_ACTION.RIGHT:
                this.nextImage(Action.SWIPE);
                break;
            case this.SWIPE_ACTION.LEFT:
                this.prevImage(Action.SWIPE);
                break;
        }
    }
    /**
     * Method used in `modal-gallery.component` to get the index of an image to delete.
     * @param {?=} image
     * @return {?}
     */
    getIndexToDelete(image = this.currentImage) {
        return getIndex(image, this.images);
    }
    /**
     * Private method to update both `isFirstImage` and `isLastImage` based on
     * the index of the current image.
     * @param {?} currentIndex
     * @return {?}
     */
    handleBoundaries(currentIndex) {
        if (this.images.length === 1) {
            this.isFirstImage = true;
            this.isLastImage = true;
            return;
        }
        switch (currentIndex) {
            case 0:
                // execute this only if infinite sliding is disabled
                this.isFirstImage = true;
                this.isLastImage = false;
                break;
            case this.images.length - 1:
                // execute this only if infinite sliding is disabled
                this.isFirstImage = false;
                this.isLastImage = true;
                break;
            default:
                this.isFirstImage = false;
                this.isLastImage = false;
                break;
        }
    }
    /**
     * Private method to manage boundary arrows and sliding.
     * This is based on the slideConfig input to enable/disable 'infinite sliding'.
     * @param {?} index
     * @return {?}
     */
    manageSlideConfig(index) {
        if (!this.slideConfig || this.slideConfig.infinite === true) {
            // enable infinite sliding
            this.isFirstImage = false;
            this.isLastImage = false;
        }
        else {
            this.handleBoundaries(index);
        }
    }
    /**
     * Private method to check if next/prev actions should be blocked.
     * It checks if slideConfig.infinite === false and if the image index is equals to the input parameter.
     * If yes, it returns true to say that sliding should be blocked, otherwise not.
     *  of images (this.images.length - 1).
     *  either the first or the last one.
     * @param {?} boundaryIndex
     * @return {?}
     */
    isPreventSliding(boundaryIndex) {
        return !!this.slideConfig && this.slideConfig.infinite === false && getIndex(this.currentImage, this.images) === boundaryIndex;
    }
    /**
     * Private method to get the next index.
     * This is necessary because at the end, when you call next again, you'll go to the first image.
     * That happens because all modal images are shown like in a circle.
     * @return {?}
     */
    getNextImage() {
        const /** @type {?} */ currentIndex = getIndex(this.currentImage, this.images);
        let /** @type {?} */ newIndex = 0;
        if (currentIndex >= 0 && currentIndex < this.images.length - 1) {
            newIndex = currentIndex + 1;
        }
        else {
            newIndex = 0; // start from the first index
        }
        return this.images[newIndex];
    }
    /**
     * Private method to get the previous index.
     * This is necessary because at index 0, when you call prev again, you'll go to the last image.
     * That happens because all modal images are shown like in a circle.
     * @return {?}
     */
    getPrevImage() {
        const /** @type {?} */ currentIndex = getIndex(this.currentImage, this.images);
        let /** @type {?} */ newIndex = 0;
        if (currentIndex > 0 && currentIndex <= this.images.length - 1) {
            newIndex = currentIndex - 1;
        }
        else {
            newIndex = this.images.length - 1; // start from the last index
        }
        return this.images[newIndex];
    }
    /**
     * Private method to build a text description.
     * This is used also to create titles.
     * @param {?} image
     * @param {?} imageWithoutDescription
     * @return {?} String description built concatenating image fields with a specific logic.
     */
    buildTextDescription(image, imageWithoutDescription) {
        // If customFullDescription use it, otherwise proceed to build a description
        if (this.description.customFullDescription && this.description.customFullDescription !== '') {
            return this.description.customFullDescription;
        }
        const /** @type {?} */ currentIndex = getIndex(image, this.images);
        // If the current image hasn't a description,
        // prevent to write the ' - ' (or this.description.beforeTextDescription)
        const /** @type {?} */ prevDescription = this.description.imageText ? this.description.imageText : '';
        const /** @type {?} */ midSeparator = this.description.numberSeparator ? this.description.numberSeparator : '';
        const /** @type {?} */ middleDescription = currentIndex + 1 + midSeparator + this.images.length;
        if (imageWithoutDescription) {
            return prevDescription + middleDescription;
        }
        const /** @type {?} */ currImgDescription = image.modal && image.modal.description ? image.modal.description : '';
        const /** @type {?} */ endDescription = this.description.beforeTextDescription + currImgDescription;
        return prevDescription + middleDescription + endDescription;
    }
}
CurrentImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'ks-current-image',
                styles: [`
    :host {
      display: -webkit-box;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
              flex-direction: column;
      -webkit-box-pack: center;
              justify-content: center; }

    .main-image-container {
      display: -webkit-box;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
              flex-direction: row;
      -webkit-box-align: center;
              align-items: center;
      -webkit-box-pack: justify;
              justify-content: space-between; }
      .main-image-container .nav, .main-image-container .nav-left, .main-image-container .nav-right {
        -webkit-animation: animatezoom 1s;
                animation: animatezoom 1s;
        cursor: pointer;
        -webkit-transition: all 0.5s;
        transition: all 0.5s; }
        .main-image-container .nav:hover, .main-image-container .nav-left:hover, .main-image-container .nav-right:hover {
          -webkit-transform: scale(1.1);
                  transform: scale(1.1); }
      .main-image-container .nav-left {
        margin-left: 15px; }
      .main-image-container .nav-right {
        margin-right: 15px; }

    #current-image {
      height: auto;
      max-width: 80vw;
      max-height: 60vh;
      cursor: pointer; }

    @media screen and (min-width: 70vw) {
      #current-image {
        height: auto;
        max-width: 70vw;
        max-height: 60vh;
        cursor: pointer; } }

    #current-figure {
      -webkit-animation: fadein-visible .8s;
              animation: fadein-visible .8s;
      text-align: center; }

    figure {
      margin: 0;
      position: relative; }
      figure img {
        max-width: 100%;
        height: auto;
        display: block; }

    figcaption {
      padding: 10px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0; }

    .description {
      font-weight: bold;
      text-align: center; }

    @-webkit-keyframes fadein-visible {
      from {
        opacity: 0; }
      to {
        opacity: 1; } }

    @keyframes fadein-visible {
      from {
        opacity: 0; }
      to {
        opacity: 1; } }

    @-webkit-keyframes fadein-semi-visible05 {
      from {
        opacity: 0; }
      to {
        opacity: 0.5; } }

    @keyframes fadein-semi-visible05 {
      from {
        opacity: 0; }
      to {
        opacity: 0.5; } }

    @-webkit-keyframes fadein-semi-visible08 {
      from {
        opacity: 0; }
      to {
        opacity: 0.8; } }

    @keyframes fadein-semi-visible08 {
      from {
        opacity: 0; }
      to {
        opacity: 0.8; } }

    @-webkit-keyframes fadein-semi-visible09 {
      from {
        opacity: 0; }
      to {
        opacity: 0.9; } }

    @keyframes fadein-semi-visible09 {
      from {
        opacity: 0; }
      to {
        opacity: 0.9; } }
    .arrow-image, .empty-arrow-image, .left-arrow-image, .right-arrow-image {
      width: 30px;
      height: 30px;
      background-size: 30px; }

    .empty-arrow-image {
      background: black;
      opacity: 0; }

    .left-arrow-image {
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMTQ1LjE4OCwyMzguNTc1bDIxNS41LTIxNS41YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xcy0xMy44LTUuMy0xOS4xLDBsLTIyNS4xLDIyNS4xYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWwyMjUuMSwyMjUgICBjMi42LDIuNiw2LjEsNCw5LjUsNHM2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xTDE0NS4xODgsMjM4LjU3NXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+");
      opacity: 0.8;
      -webkit-transition: all 0.5s;
      transition: all 0.5s; }
      .left-arrow-image:hover {
        -webkit-transform: scale(1.2);
                transform: scale(1.2); }

    .right-arrow-image {
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMzYwLjczMSwyMjkuMDc1bC0yMjUuMS0yMjUuMWMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBzLTUuMywxMy44LDAsMTkuMWwyMTUuNSwyMTUuNWwtMjE1LjUsMjE1LjUgICBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xYzIuNiwyLjYsNi4xLDQsOS41LDRjMy40LDAsNi45LTEuMyw5LjUtNGwyMjUuMS0yMjUuMUMzNjUuOTMxLDI0Mi44NzUsMzY1LjkzMSwyMzQuMjc1LDM2MC43MzEsMjI5LjA3NXogICAiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+");
      opacity: 0.8;
      -webkit-transition: all 0.5s;
      transition: all 0.5s; }
      .right-arrow-image:hover {
        -webkit-transform: scale(1.2);
                transform: scale(1.2); }
    @media only screen and (max-width: 1024px), only screen and (max-device-width: 1024px) {
      .current-image-previous {
        display: none; }
      .current-image-next {
        display: none; } }

    @media only screen and (min-device-width: 1025px) {
      .current-image-preview, .current-image-previous, .current-image-next {
        height: auto;
        cursor: pointer;
        opacity: 0.5;
        -webkit-animation: fadein-semi-visible05 .8s;
                animation: fadein-semi-visible05 .8s;
        filter: alpha(opacity=50); }
        .current-image-preview:hover, .current-image-previous:hover, .current-image-next:hover {
          opacity: 1;
          -webkit-transition-property: opacity;
          transition-property: opacity;
          -webkit-transition: all .5s ease;
          transition: all .5s ease; } }

    @-webkit-keyframes fadein-semi-visible05 {
      from {
        opacity: 0; }
      to {
        opacity: 0.5; } }

    @keyframes fadein-semi-visible05 {
      from {
        opacity: 0; }
      to {
        opacity: 0.5; } }
  `],
                template: `
    <main class="main-image-container"
          ksKeyboardNavigation [isOpen]="isOpen" (keyPress)="onKeyPress($event)"
          [attr.aria-label]="accessibilityConfig.mainContainerAriaLabel"
          [title]="accessibilityConfig.mainContainerTitle">

      <a class="nav-left"
         [attr.aria-label]="accessibilityConfig.mainPrevImageAriaLabel"
         [tabindex]="isFirstImage && !slideConfig?.infinite ? -1 : 0" role="button"
         (click)="onNavigationEvent('left', $event)" (keyup)="onNavigationEvent('left', $event)">
        <div class="inside {{isFirstImage && !slideConfig?.infinite ? 'empty-arrow-image' : 'left-arrow-image'}}"
             aria-hidden="true"
             [title]="accessibilityConfig.mainPrevImageTitle"></div>
      </a>

      <ng-container *ngIf="slideConfig?.sidePreviews?.show">
        <ng-container *ngIf="getLeftPreviewImage() as leftPreview">
          <img *ngIf="!isFirstImage || slideConfig?.infinite; else firstImage"
               class="inside current-image-previous"
               [src]="leftPreview.plain?.img ? leftPreview.plain.img : leftPreview.modal.img"
               [hidden]="loading"
               ksSize [sizeConfig]="{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}"
               [attr.aria-label]="leftPreview.modal.ariaLabel"
               [title]="leftPreview.modal.title ? leftPreview.modal.title : getTitleToDisplay(leftPreview)"
               alt="{{leftPreview.modal.alt ? leftPreview.modal.alt : getAltDescriptionByImage(leftPreview)}}"
               [tabindex]="0" role="img"
               (click)="onNavigationEvent('left', $event, clickAction)" (keyup)="onNavigationEvent('left', $event, keyboardAction)"/>
          <ng-template #firstImage>
            <div class="current-image-previous hidden"
                 ksSize [sizeConfig]="{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}"></div>
          </ng-template>
        </ng-container>
      </ng-container>


      <figure id="current-figure" [hidden]="loading">
        <img id="current-image"
             class="inside"
             [src]="currentImage.modal.img"
             [attr.aria-label]="currentImage.modal.ariaLabel"
             [title]="currentImage.modal.title ? currentImage.modal.title : getTitleToDisplay()"
             alt="{{currentImage.modal.alt ? currentImage.modal.alt : getAltDescriptionByImage()}}"
             [tabindex]="0" role="img"
             (load)="onImageLoad($event)"
             (click)="onImageEvent($event, clickAction)" (keyup)="onImageEvent($event, keyboardAction)"
             (swipeleft)="swipe($event.type)"
             (swiperight)="swipe($event.type)"/>
        <figcaption *ngIf="getDescriptionToDisplay() !== ''"
                    class="inside description"
                    ksDescription [description]="description"
                    [innerHTML]="getDescriptionToDisplay()">
        </figcaption>
      </figure>


      <ng-container *ngIf="slideConfig?.sidePreviews?.show">
        <ng-container *ngIf="getRightPreviewImage() as rightPreview">
          <img *ngIf="!isLastImage || slideConfig?.infinite; else lastImage"
               class="inside current-image-next"
               [src]="rightPreview.plain?.img ? rightPreview.plain.img : rightPreview.modal.img"
               [hidden]="loading"
               ksSize [sizeConfig]="{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}"
               [attr.aria-label]="rightPreview.modal.ariaLabel"
               [title]="rightPreview.modal.title ? rightPreview.modal.title : getTitleToDisplay(rightPreview)"
               alt="{{rightPreview.modal.alt ? rightPreview.modal.alt : getAltDescriptionByImage(rightPreview)}}"
               [tabindex]="0" role="img"
               (click)="onNavigationEvent('right', $event, clickAction)" (keyup)="onNavigationEvent('right', $event, keyboardAction)"/>
          <ng-template #lastImage>
            <div class="current-image-next hidden"
                 ksSize [sizeConfig]="{width: slideConfig.sidePreviews?.size.width, height: slideConfig.sidePreviews?.size.height}">
            </div>
          </ng-template>
        </ng-container>
      </ng-container>

      <ng-container *ngIf="loading && configLoading.enable">
        <ks-loading-spinner [loadingConfig]="configLoading"
                            [accessibilityConfig]="accessibilityConfig"></ks-loading-spinner>
      </ng-container>

      <a class="nav-right"
         [attr.aria-label]="accessibilityConfig.mainNextImageAriaLabel"
         [tabindex]="isLastImage && !slideConfig?.infinite ? -1 : 0" role="button"
         (click)="onNavigationEvent('right', $event)" (keyup)="onNavigationEvent('right', $event)">
        <div class="inside {{isLastImage && !slideConfig?.infinite ? 'empty-arrow-image' : 'right-arrow-image'}}"
             aria-hidden="true"
             [title]="accessibilityConfig.mainNextImageTitle"></div>
      </a>
    </main>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
CurrentImageComponent.ctorParameters = () => [];
CurrentImageComponent.propDecorators = {
    'currentImage': [{ type: Input },],
    'images': [{ type: Input },],
    'isOpen': [{ type: Input },],
    'currentImageConfig': [{ type: Input },],
    'loadingConfig': [{ type: Input },],
    'descriptionConfig': [{ type: Input },],
    'slideConfig': [{ type: Input },],
    'accessibilityConfig': [{ type: Input },],
    'keyboardConfig': [{ type: Input },],
    'loadImage': [{ type: Output },],
    'changeImage': [{ type: Output },],
    'close': [{ type: Output },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Class `LineLayout` to configure a linear plain gallery.
 */
class LineLayout {
    /**
     * @param {?} size
     * @param {?} breakConfig
     * @param {?} justify
     */
    constructor(size, breakConfig, justify) {
        this.size = size;
        this.breakConfig = breakConfig;
        this.justify = justify;
    }
}
/**
 * Class `GridLayout` to configure a grid plain gallery.
 */
class GridLayout {
    /**
     * @param {?} size
     * @param {?} breakConfig
     */
    constructor(size, breakConfig) {
        this.size = size;
        this.breakConfig = breakConfig;
    }
}
/**
 * Class `AdvancedLayout` to configure a fully custom plain gallery.
 */
class AdvancedLayout {
    /**
     * @param {?} modalOpenerByIndex
     * @param {?} hideDefaultPlainGallery
     */
    constructor(modalOpenerByIndex, hideDefaultPlainGallery) {
        this.modalOpenerByIndex = modalOpenerByIndex;
        this.hideDefaultPlainGallery = hideDefaultPlainGallery;
    }
}
let PlainGalleryStrategy = {};
PlainGalleryStrategy.ROW = 1;
PlainGalleryStrategy.COLUMN = 2;
PlainGalleryStrategy.GRID = 3;
PlainGalleryStrategy.CUSTOM = 4;
PlainGalleryStrategy[PlainGalleryStrategy.ROW] = "ROW";
PlainGalleryStrategy[PlainGalleryStrategy.COLUMN] = "COLUMN";
PlainGalleryStrategy[PlainGalleryStrategy.GRID] = "GRID";
PlainGalleryStrategy[PlainGalleryStrategy.CUSTOM] = "CUSTOM";

/**
 * Default accessibility configuration.
 */
const KS_DEFAULT_ACCESSIBILITY_CONFIG = {
    backgroundAriaLabel: 'Modal gallery full screen background',
    backgroundTitle: '',
    plainGalleryContentAriaLabel: 'Plain gallery content',
    plainGalleryContentTitle: '',
    modalGalleryContentAriaLabel: 'Modal gallery content',
    modalGalleryContentTitle: '',
    loadingSpinnerAriaLabel: 'The current image is loading. Please be patient.',
    loadingSpinnerTitle: 'The current image is loading. Please be patient.',
    mainContainerAriaLabel: 'Current image and navigation',
    mainContainerTitle: '',
    mainPrevImageAriaLabel: 'Previous image',
    mainPrevImageTitle: 'Previous image',
    mainNextImageAriaLabel: 'Next image',
    mainNextImageTitle: 'Next image',
    dotsContainerAriaLabel: 'Image navigation dots',
    dotsContainerTitle: '',
    dotAriaLabel: 'Navigate to image number',
    previewsContainerAriaLabel: 'Image previews',
    previewsContainerTitle: '',
    previewScrollPrevAriaLabel: 'Scroll previous previews',
    previewScrollPrevTitle: 'Scroll previous previews',
    previewScrollNextAriaLabel: 'Scroll next previews',
    previewScrollNextTitle: 'Scroll next previews'
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Main Component of this library with both the plain and modal galleries.
 */
class ModalGalleryComponent {
    /**
     * Constructor with the injection of ´KeyboardService´ and an object to support Server-Side Rendering.
     * @param {?} keyboardService
     * @param {?} galleryService
     * @param {?} platformId
     * @param {?} changeDetectorRef
     */
    constructor(keyboardService, galleryService, platformId, changeDetectorRef) {
        this.keyboardService = keyboardService;
        this.galleryService = galleryService;
        this.platformId = platformId;
        this.changeDetectorRef = changeDetectorRef;
        /**
         * Boolean to enable modal-gallery close behaviour when clicking
         * on the semi-transparent background. Enabled by default.
         */
        this.enableCloseOutside = true;
        /**
         * Boolean required to enable image download with both ctrl+s/cmd+s and download button.
         * If you want to show enable button, this is not enough. You have to use also `buttonsConfig`.
         * TODO: this will be removed in version 6.0.0 because it will be into currentImageConfig
         */
        this.downloadable = false;
        /**
         * Object of type `SlideConfig` to init side previews and `infinite sliding`.
         */
        this.slideConfig = {
            infinite: false,
            sidePreviews: { show: true, size: { width: '100px', height: 'auto' } }
        };
        /**
         * Object of type `AccessibilityConfig` to init custom accessibility features.
         * For instance, it contains titles, alt texts, aria-labels and so on.
         */
        this.accessibilityConfig = KS_DEFAULT_ACCESSIBILITY_CONFIG;
        /**
         * Output to emit an event when the modal gallery is closed.
         */
        this.close = new EventEmitter();
        /**
         * Output to emit an event when an image is changed.
         */
        this.show = new EventEmitter();
        /**
         * Output to emit an event when the current image is the first one.
         */
        this.firstImage = new EventEmitter();
        /**
         * Output to emit an event when the current image is the last one.
         */
        this.lastImage = new EventEmitter();
        /**
         * Output to emit an event when the modal gallery is closed.
         */
        this.hasData = new EventEmitter();
        /**
         * Output to emit an event when a button is clicked, but before that the action is triggered.
         */
        this.buttonBeforeHook = new EventEmitter();
        /**
         * Output to emit an event when a button is clicked, but after that the action is triggered.
         */
        this.buttonAfterHook = new EventEmitter();
        /**
         * Boolean that it is true if the modal gallery is visible. False by default.
         */
        this.opened = false;
        /**
         * Boolean to open the modal gallery. False by default.
         */
        this.showGallery = false;
    }
    /**
     * Method ´ngOnInit´ to init images calling `initImages()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        // call initImages to init images and to emit `hasData` event
        this.initImages();
        this.galleryServiceSubscription = this.galleryService.navigate.subscribe((payload) => {
            if (!payload) {
                return;
            }
            // if galleryId is not valid OR galleryId is relasted to another instance and not this one
            if (payload.galleryId < 0 || payload.galleryId !== this.id) {
                return;
            }
            // if image index is not valid
            if (payload.index < 0 || payload.index > this.images.length) {
                return;
            }
            this.showModalGallery(payload.index, true);
        });
    }
    /**
     * Method ´ngOnChanges´ to re-init images if input is changed.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called before `ngOnInit()` and whenever one or more data-bound input properties change.
     * @param {?} changes `SimpleChanges` object of current and previous property values provided by Angular.
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ imagesChange = changes.modalImages;
        const /** @type {?} */ plainGalleryConfigChange = changes.plainGalleryConfig;
        if (imagesChange && !imagesChange.firstChange && imagesChange.previousValue !== imagesChange.currentValue) {
            this.initImages();
        }
        if (plainGalleryConfigChange) {
            // const prevPlainGalleryConfigChange: any = plainGalleryConfigChange.previousValue;
            const /** @type {?} */ currPlainGalleryConfigChange = plainGalleryConfigChange.currentValue;
            if (currPlainGalleryConfigChange.layout &&
                currPlainGalleryConfigChange.layout instanceof AdvancedLayout &&
                currPlainGalleryConfigChange.layout.modalOpenerByIndex !== -1) {
                // console.log('opening modal gallery from custom plain gallery, index: ', currPlainGalleryConfigChange);
                this.showModalGallery(currPlainGalleryConfigChange.layout.modalOpenerByIndex);
            }
        }
    }
    /**
     * Method called by custom upper buttons.
     * @param {?} event
     * @return {?}
     */
    onCustomEmit(event) {
        const /** @type {?} */ eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        // console.log('on onCustomEmit', eventToEmit);
        this.buttonAfterHook.emit(eventToEmit);
    }
    /**
     * Method called by the delete upper button.
     * @param {?} event
     * @return {?}
     */
    onDelete(event) {
        const /** @type {?} */ eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        if (this.images.length === 1) {
            this.closeGallery();
        }
        const /** @type {?} */ imageIndexToDelete = this.currentImageComponent.getIndexToDelete(event.image);
        if (imageIndexToDelete === this.images.length - 1) {
            // last image
            this.currentImageComponent.prevImage();
        }
        else {
            this.currentImageComponent.nextImage();
        }
        this.buttonAfterHook.emit(eventToEmit);
    }
    /**
     * Method called by the navigate upper button.
     * @param {?} event
     * @return {?}
     */
    onNavigate(event) {
        const /** @type {?} */ eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        // To support SSR
        if (isPlatformBrowser(this.platformId)) {
            if (eventToEmit.image && eventToEmit.image.modal.extUrl) {
                // where I should open this link? The current tab or another one?
                if (eventToEmit.button && eventToEmit.button.extUrlInNewTab) {
                    window.open(eventToEmit.image.modal.extUrl, '_blank');
                }
                else {
                    window.location.href = eventToEmit.image.modal.extUrl;
                }
            }
        }
        this.buttonAfterHook.emit(eventToEmit);
    }
    /**
     * Method called by the download upper button.
     * @param {?} event
     * @return {?}
     */
    onDownload(event) {
        const /** @type {?} */ eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        this.downloadImage();
        this.buttonAfterHook.emit(eventToEmit);
    }
    /**
     * Method called by the close upper button.
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    onCloseGallery(event, action = Action.NORMAL) {
        const /** @type {?} */ eventToEmit = this.getButtonEventToEmit(event);
        this.buttonBeforeHook.emit(eventToEmit);
        this.closeGallery(action);
        this.buttonAfterHook.emit(eventToEmit);
    }
    /**
     * Method to close the modal gallery specifying the action.
     * It also reset the `keyboardService` to prevent multiple listeners.
     * @param {?=} action
     * @return {?}
     */
    closeGallery(action = Action.NORMAL) {
        this.close.emit(new ImageModalEvent(action, true));
        this.opened = false;
        this.keyboardService.reset();
        // shows scrollbar
        document.body.style.overflow = 'visible';
    }
    /**
     * Method called when you click on an image of your plain (or inline) gallery.
     * @param {?} index
     * @return {?}
     */
    onShowModalGallery(index) {
        this.showModalGallery(index);
    }
    /**
     * Method to show the modal gallery displaying the image with
     * the index specified as input parameter.
     * It will also register a new `keyboardService` to catch keyboard's events to download the current
     * image with keyboard's shortcuts. This service, will be removed either when modal gallery component
     * will be destroyed or when the gallery is closed invoking the `closeGallery` method.
     * @param {?} index
     * @param {?=} isCalledByService
     * @return {?}
     */
    showModalGallery(index, isCalledByService = false) {
        // hides scrollbar
        document.body.style.overflow = 'hidden';
        this.keyboardService.add((event, combo) => {
            if (event.preventDefault) {
                event.preventDefault();
            }
            else {
                // internet explorer
                event.returnValue = false;
            }
            this.downloadImage();
        });
        this.opened = true;
        this.currentImage = this.images[index];
        // emit a new ImageModalEvent with the index of the current image
        this.show.emit(new ImageModalEvent(Action.LOAD, index + 1));
        if (isCalledByService) {
            // the following is required, otherwise the view will not be updated
            // this happens only if called by gallery.service
            this.changeDetectorRef.markForCheck();
        }
    }
    /**
     * Method called when the image changes and used to update the `currentImage` object.
     * @param {?} event
     * @return {?}
     */
    onChangeCurrentImage(event) {
        const /** @type {?} */ newIndex = (event.result);
        // TODO add validation
        this.currentImage = this.images[newIndex];
        // emit first/last event based on newIndex value
        this.emitBoundaryEvent(event.action, newIndex);
        // emit current visible image index
        this.show.emit(new ImageModalEvent(event.action, newIndex + 1));
    }
    /**
     * @return {?}
     */
    isPlainGalleryVisible() {
        if (this.plainGalleryConfig && this.plainGalleryConfig.layout && this.plainGalleryConfig.layout instanceof AdvancedLayout) {
            return !this.plainGalleryConfig.layout.hideDefaultPlainGallery;
        }
        return true;
    }
    /**
     * Method called when you click 'outside' (i.e. on the semi-transparent background)
     * to close the modal gallery if `enableCloseOutside` is true.
     * @param {?} event
     * @return {?}
     */
    onClickOutside(event) {
        if (event && this.enableCloseOutside) {
            this.closeGallery(Action.CLICK);
        }
    }
    /**
     * Method called when an image is loaded and the loading spinner has gone.
     * It sets the previouslyLoaded flag inside the Image to hide loading spinner when displayed again.
     * @param {?} event
     * @return {?}
     */
    onImageLoad(event) {
        // console.log('modal-image onImageLoad', event);
        // console.log('modal-image onImageLoad images before', this.images);
        // sets as previously loaded the image with index specified by `event.status`
        this.images = this.images.map((img) => {
            if (img && img.id === event.id) {
                return Object.assign({}, img, { previouslyLoaded: event.status });
            }
            return img;
        });
        // console.log('modal-image onImageLoad images after', this.images);
    }
    /**
     * Method called when a dot is clicked and used to update the current image.
     * @param {?} index
     * @return {?}
     */
    onClickDot(index) {
        this.currentImage = this.images[index];
    }
    /**
     * Method called when an image preview is clicked and used to update the current image.
     * @param {?} preview
     * @return {?}
     */
    onClickPreview(preview) {
        const /** @type {?} */ imageFound = this.images.find((img) => img.id === preview.id);
        if (!!imageFound) {
            this.currentImage = /** @type {?} */ (imageFound);
        }
    }
    /**
     * Method to download the current image, only if `downloadable` is true.
     * It contains also a logic to enable downloading features also for IE11.
     * @return {?}
     */
    downloadImage() {
        if (!this.downloadable) {
            return;
        }
        // If IE11 or Microsoft Edge use msSaveBlob(...)
        if (this.isIEorEdge()) {
            // I cannot use fetch API because IE11 doesn't support it,
            // so I have to switch to XMLHttpRequest
            this.downloadImageOnlyIEorEdge();
        }
        else {
            // for all other browsers
            this.downloadImageAllBrowsers();
        }
    }
    /**
     * Method to cleanup resources. In fact, this will reset keyboard's service.
     * This is an Angular's lifecycle hook that is called when this component is destroyed.
     * @return {?}
     */
    ngOnDestroy() {
        this.keyboardService.reset();
        if (this.galleryServiceSubscription) {
            this.galleryServiceSubscription.unsubscribe();
        }
    }
    /**
     * Private method to download the current image for all browsers except for IE11.
     * @return {?}
     */
    downloadImageAllBrowsers() {
        const /** @type {?} */ link = document.createElement('a');
        link.href = this.currentImage.modal.img;
        link.setAttribute('download', this.getFileName(this.currentImage.modal.img));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    /**
     * Private method to download the current image only for IE11 using
     * custom javascript's methods available only on IE.
     * @return {?}
     */
    downloadImageOnlyIEorEdge() {
        if (isPlatformBrowser(this.platformId)) {
            const /** @type {?} */ req = new XMLHttpRequest();
            req.open('GET', this.currentImage.modal.img, true);
            req.responseType = 'arraybuffer';
            req.onload = event => {
                const /** @type {?} */ blob = new Blob([req.response], { type: 'image/png' });
                window.navigator.msSaveBlob(blob, this.getFileName(this.currentImage.modal.img));
            };
            req.send();
        }
    }
    /**
     * Private method to get the `ButtonEvent` to emit, merging the input `ButtonEvent`
     * with the current image.
     * @param {?} event
     * @return {?}
     */
    getButtonEventToEmit(event) {
        return Object.assign(event, { image: this.currentImage });
    }
    /**
     * Private method to get the filename from an input path.
     * This is used to get the image's name from its path.
     * @param {?} path
     * @return {?}
     */
    getFileName(path) {
        return path.replace(/^.*[\\\/]/, '');
    }
    /**
     * Private method to initialize `images` as array of `Image`s.
     * Also, it will emit ImageowmodaModalEvent to say that images are loaded.
     * @return {?}
     */
    initImages() {
        this.images = /** @type {?} */ (this.modalImages);
        this.hasData.emit(new ImageModalEvent(Action.LOAD, true));
        this.showGallery = this.images.length > 0;
    }
    /**
     * Private method to emit events when either the last or the first image are visible.
     * @param {?} action Enum of type Action that represents the source of the event that changed the
     *  current image to the first one or the last one.
     * @param {?} indexToCheck is the index number of the image (the first or the last one).
     * @return {?}
     */
    emitBoundaryEvent(action, indexToCheck) {
        // to emit first/last event
        switch (indexToCheck) {
            case 0:
                this.firstImage.emit(new ImageModalEvent(action, true));
                break;
            case this.images.length - 1:
                this.lastImage.emit(new ImageModalEvent(action, true));
                break;
        }
    }
    /**
     * Private method to check if this library is running on
     * Microsoft browsers or not (i.e. it detects both IE11 and Edge)
     * supporting also Server-Side Rendering.
     * Inspired by https://msdn.microsoft.com/it-it/library/hh779016(v=vs.85).aspx
     * @return {?}
     */
    isIEorEdge() {
        if (isPlatformBrowser(this.platformId)) {
            // if both Blob constructor and msSaveOrOpenBlob are supported by the current browser
            return window.Blob && window.navigator.msSaveOrOpenBlob;
        }
        if (isPlatformServer(this.platformId)) {
            // server only
            return true;
        }
    }
}
ModalGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'ks-modal-gallery',
                exportAs: 'ksModalGallery',
                styles: [`
    #modal-gallery-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 10000; }

    #flex-min-height-ie-fix {
      display: -webkit-box;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
              flex-direction: column;
      -webkit-box-pack: center;
              justify-content: center; }

    #modal-gallery-container {
      display: -webkit-box;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
              flex-direction: column;
      -webkit-box-pack: justify;
              justify-content: space-between;
      min-height: 100vh; }
  `],
                template: `
    <ks-plain-gallery [images]="images"
                      [showGallery]="showGallery && isPlainGalleryVisible()"
                      [plainGalleryConfig]="plainGalleryConfig"
                      [accessibilityConfig]="accessibilityConfig"
                      (show)="onShowModalGallery($event)"></ks-plain-gallery>

    <ks-background [isOpen]="opened"
                   [accessibilityConfig]="accessibilityConfig"></ks-background>

    <div id="modal-gallery-wrapper" *ngIf="opened"
         [attr.aria-label]="accessibilityConfig.modalGalleryContentAriaLabel"
         [title]="accessibilityConfig.modalGalleryContentTitle"
         ksClickOutside [clickOutsideEnable]="enableCloseOutside"
         (clickOutside)="onClickOutside($event)">

      <div id="flex-min-height-ie-fix">
        <div id="modal-gallery-container">

          <ks-upper-buttons [currentImage]="currentImage"
                            [buttonsConfig]="buttonsConfig"
                            (delete)="onDelete($event)"
                            (navigate)="onNavigate($event)"
                            (download)="onDownload($event)"
                            (close)="onCloseGallery($event)"
                            (customEmit)="onCustomEmit($event)"></ks-upper-buttons>

          <ks-current-image [images]="images"
                            [currentImage]="currentImage"
                            [isOpen]="opened"
                            [slideConfig]="slideConfig"
                            [descriptionConfig]="description"
                            [keyboardConfig]="keyboardConfig"
                            [loadingConfig]="loadingConfig"
                            [accessibilityConfig]="accessibilityConfig"
                            [currentImageConfig]="currentImageConfig"
                            (loadImage)="onImageLoad($event)"
                            (changeImage)="onChangeCurrentImage($event)"
                            (close)="onCloseGallery($event)"></ks-current-image>

          <div>
            <ks-dots [images]="images"
                     [currentImage]="currentImage"
                     [dotsConfig]="dotsConfig"
                     [accessibilityConfig]="accessibilityConfig"
                     (clickDot)="onClickDot($event)"></ks-dots>

            <ks-previews [images]="images"
                         [currentImage]="currentImage"
                         [previewConfig]="previewConfig"
                         [accessibilityConfig]="accessibilityConfig"
                         (clickPreview)="onClickPreview($event)"></ks-previews>
          </div>
        </div>
      </div>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
ModalGalleryComponent.ctorParameters = () => [
    { type: KeyboardService, },
    { type: GalleryService, },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    { type: ChangeDetectorRef, },
];
ModalGalleryComponent.propDecorators = {
    'id': [{ type: Input },],
    'modalImages': [{ type: Input },],
    'buttonsConfig': [{ type: Input },],
    'enableCloseOutside': [{ type: Input },],
    'currentImageConfig': [{ type: Input },],
    'downloadable': [{ type: Input },],
    'loadingConfig': [{ type: Input },],
    'description': [{ type: Input },],
    'dotsConfig': [{ type: Input },],
    'previewConfig': [{ type: Input },],
    'slideConfig': [{ type: Input },],
    'accessibilityConfig': [{ type: Input },],
    'keyboardConfig': [{ type: Input },],
    'plainGalleryConfig': [{ type: Input },],
    'close': [{ type: Output },],
    'show': [{ type: Output },],
    'firstImage': [{ type: Output },],
    'lastImage': [{ type: Output },],
    'hasData': [{ type: Output },],
    'buttonBeforeHook': [{ type: Output },],
    'buttonAfterHook': [{ type: Output },],
    'currentImageComponent': [{ type: ViewChild, args: [CurrentImageComponent,] },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
let ButtonsStrategy = {};
ButtonsStrategy.DEFAULT = 1;
ButtonsStrategy.SIMPLE = 2;
ButtonsStrategy.ADVANCED = 3;
ButtonsStrategy.FULL = 4;
ButtonsStrategy.CUSTOM = 5;
ButtonsStrategy[ButtonsStrategy.DEFAULT] = "DEFAULT";
ButtonsStrategy[ButtonsStrategy.SIMPLE] = "SIMPLE";
ButtonsStrategy[ButtonsStrategy.ADVANCED] = "ADVANCED";
ButtonsStrategy[ButtonsStrategy.FULL] = "FULL";
ButtonsStrategy[ButtonsStrategy.CUSTOM] = "CUSTOM";
let ButtonType = {};
ButtonType.DELETE = 1;
ButtonType.EXTURL = 2;
ButtonType.DOWNLOAD = 3;
ButtonType.CLOSE = 4;
ButtonType.CUSTOM = 5;
ButtonType[ButtonType.DELETE] = "DELETE";
ButtonType[ButtonType.EXTURL] = "EXTURL";
ButtonType[ButtonType.DOWNLOAD] = "DOWNLOAD";
ButtonType[ButtonType.CLOSE] = "CLOSE";
ButtonType[ButtonType.CUSTOM] = "CUSTOM";
/**
 * Array of admitted types of buttons.
 */
const WHITELIST_BUTTON_TYPES = [
    // ButtonType.REFRESH,
    ButtonType.DELETE,
    ButtonType.EXTURL,
    ButtonType.DOWNLOAD,
    ButtonType.CLOSE,
    ButtonType.CUSTOM
];

/**
 * Default button size object
 */
const KS_DEFAULT_SIZE = { height: 'auto', width: '30px' };
/**
 * Default close button object
 */
const KS_DEFAULT_BTN_CLOSE = {
    className: 'close-image',
    size: KS_DEFAULT_SIZE,
    type: ButtonType.CLOSE,
    title: 'Close this modal image gallery',
    ariaLabel: 'Close this modal image gallery'
};
/**
 * Default download button object
 */
const KS_DEFAULT_BTN_DOWNLOAD = {
    className: 'download-image',
    size: KS_DEFAULT_SIZE,
    type: ButtonType.DOWNLOAD,
    title: 'Download the current image',
    ariaLabel: 'Download the current image'
};
/**
 * Default exturl button object
 */
const KS_DEFAULT_BTN_EXTURL = {
    className: 'ext-url-image',
    size: KS_DEFAULT_SIZE,
    type: ButtonType.EXTURL,
    title: 'Navigate the current image',
    ariaLabel: 'Navigate the current image'
};
/**
 * Default delete button object
 */
const KS_DEFAULT_BTN_DELETE = {
    className: 'delete-image',
    size: KS_DEFAULT_SIZE,
    type: ButtonType.DELETE,
    title: 'Delete the current image',
    ariaLabel: 'Delete the current image'
};

/*
 The MIT License (MIT)

 Copyright (c) 2017 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Component with all upper buttons.
 * Also it emits click events as outputs.
 */
class UpperButtonsComponent extends AccessibleComponent {
    constructor() {
        super(...arguments);
        /**
         * Output to emit clicks on refresh button. The payload contains a `ButtonEvent`.
         */
        this.refresh = new EventEmitter();
        /**
         * Output to emit clicks on delete button. The payload contains a `ButtonEvent`.
         */
        this.delete = new EventEmitter();
        /**
         * Output to emit clicks on navigate button. The payload contains a `ButtonEvent`.
         */
        this.navigate = new EventEmitter();
        /**
         * Output to emit clicks on download button. The payload contains a `ButtonEvent`.
         */
        this.download = new EventEmitter();
        /**
         * Output to emit clicks on close button. The payload contains a `ButtonEvent`.
         */
        this.close = new EventEmitter();
        /**
         * Output to emit clicks on all custom buttons. The payload contains a `ButtonEvent`.
         */
        this.customEmit = new EventEmitter();
        /**
         * Default buttons array for standard configuration
         */
        this.defaultButtonsDefault = [KS_DEFAULT_BTN_CLOSE];
        /**
         * Default buttons array for simple configuration
         */
        this.simpleButtonsDefault = [KS_DEFAULT_BTN_DOWNLOAD, ...this.defaultButtonsDefault];
        /**
         * Default buttons array for advanced configuration
         */
        this.advancedButtonsDefault = [KS_DEFAULT_BTN_EXTURL, ...this.simpleButtonsDefault];
        /**
         * Default buttons array for full configuration
         */
        this.fullButtonsDefault = [/*KS_DEFAULT_BTN_REFRESH, */ KS_DEFAULT_BTN_DELETE, ...this.advancedButtonsDefault];
    }
    /**
     * Method ´ngOnInit´ to build `configButtons` applying a default value and also to
     * init the `buttons` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ defaultConfig = { visible: true, strategy: ButtonsStrategy.DEFAULT };
        this.configButtons = Object.assign(defaultConfig, this.buttonsConfig);
        switch (this.configButtons.strategy) {
            case ButtonsStrategy.SIMPLE:
                this.buttons = this.addButtonIds(this.simpleButtonsDefault);
                break;
            case ButtonsStrategy.ADVANCED:
                this.buttons = this.addButtonIds(this.advancedButtonsDefault);
                break;
            case ButtonsStrategy.FULL:
                this.buttons = this.addButtonIds(this.fullButtonsDefault);
                break;
            case ButtonsStrategy.CUSTOM:
                this.buttons = this.addButtonIds(this.validateCustomButtons(this.configButtons.buttons));
                break;
            case ButtonsStrategy.DEFAULT:
            default:
                this.buttons = this.addButtonIds(this.defaultButtonsDefault);
                break;
        }
    }
    /**
     * Method called by events from both keyboard and mouse on a button.
     * This will call a private method to trigger an output with the right payload.
     * @throws an error if the button type is unknown
     * @param {?} button
     * @param {?} event
     * @param {?=} action
     * @return {?}
     */
    onEvent(button, event, action = Action.CLICK) {
        if (!event) {
            return;
        }
        const /** @type {?} */ dataToEmit = {
            button: button,
            // current image initialized as null
            // (I'll fill this value inside the parent of this component
            image: null,
            action: action
        };
        switch (button.type) {
            // case ButtonType.REFRESH:
            //   this.triggerOnMouseAndKeyboard(this.refresh, event, dataToEmit);
            //   break;
            case ButtonType.DELETE:
                this.triggerOnMouseAndKeyboard(this.delete, event, dataToEmit);
                break;
            case ButtonType.EXTURL:
                if (!this.currentImage || !this.currentImage.modal || !this.currentImage.modal.extUrl) {
                    return;
                }
                this.triggerOnMouseAndKeyboard(this.navigate, event, dataToEmit);
                break;
            case ButtonType.DOWNLOAD:
                this.triggerOnMouseAndKeyboard(this.download, event, dataToEmit);
                break;
            case ButtonType.CLOSE:
                this.triggerOnMouseAndKeyboard(this.close, event, dataToEmit);
                break;
            case ButtonType.CUSTOM:
                this.triggerOnMouseAndKeyboard(this.customEmit, event, dataToEmit);
                break;
            default:
                throw new Error(`Unknown button's type into ButtonConfig`);
        }
    }
    /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackById(index, item) {
        return item ? item.id : undefined;
    }
    /**
     * Private method to emit an event using the specified output as an `EventEmitter`.
     * @param {?} emitter
     * @param {?} event
     * @param {?} dataToEmit
     * @return {?}
     */
    triggerOnMouseAndKeyboard(emitter, event, dataToEmit) {
        if (!emitter) {
            throw new Error(`UpperButtonsComponent unknown emitter in triggerOnMouseAndKeyboard`);
        }
        const /** @type {?} */ result = super.handleImageEvent(event);
        if (result === NEXT) {
            emitter.emit(dataToEmit);
        }
    }
    /**
     * Private method to add ids to the array of buttons.
     * It adds ids in a reverse way, to be sure that the last button will always have id = 0.
     * This is really useful in unit testing to be sure that close button always have id = 0, download 1 and so on...
     * It's totally transparent to the user.
     * @param {?} buttons
     * @return {?}
     */
    addButtonIds(buttons) {
        return buttons.map((val, i) => Object.assign(val, { id: buttons.length - 1 - i }));
    }
    /**
     * Private method to validate custom buttons received as input.
     * @throws an error is exists a button with an unknown type
     * @param {?=} buttons
     * @return {?}
     */
    validateCustomButtons(buttons = []) {
        buttons.forEach((val) => {
            const /** @type {?} */ indexOfButtonType = WHITELIST_BUTTON_TYPES.findIndex((type) => type === val.type);
            if (indexOfButtonType === -1) {
                throw new Error(`Unknown ButtonType. For custom types use ButtonType.CUSTOM`);
            }
        });
        return buttons;
    }
}
UpperButtonsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ks-upper-buttons',
                styles: [`
    .buttons-container {
      display: -webkit-box;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
              flex-direction: row;
      -webkit-box-pack: end;
              justify-content: flex-end; }
      .buttons-container > .upper-button {
        align-self: center;
        margin-right: 30px;
        margin-top: 28px;
        font-size: 50px;
        text-decoration: none;
        cursor: pointer;
        -webkit-animation: animatezoom 0.6s;
                animation: animatezoom 0.6s;
        color: white; }

    @-webkit-keyframes animatezoom {
      from {
        -webkit-transform: scale(0);
                transform: scale(0); }
      to {
        -webkit-transform: scale(1);
                transform: scale(1); } }

    @keyframes animatezoom {
      from {
        -webkit-transform: scale(0);
                transform: scale(0); }
      to {
        -webkit-transform: scale(1);
                transform: scale(1); } }

    .base-btn, .delete-image, .ext-url-image, .download-image, .close-image, .refresh-image, .copy {
      width: 30px;
      height: 30px;
      background-size: 30px;
      opacity: 0.8;
      -webkit-transition: all 0.5s;
      transition: all 0.5s; }
      .base-btn:hover, .delete-image:hover, .ext-url-image:hover, .download-image:hover, .close-image:hover, .refresh-image:hover, .copy:hover {
        -webkit-transform: scale(1.2);
                transform: scale(1.2); }

    .delete-image {
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4Ni40IDQ4Ni40IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODYuNCA0ODYuNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTQ0Niw3MEgzNDQuOFY1My41YzAtMjkuNS0yNC01My41LTUzLjUtNTMuNWgtOTYuMmMtMjkuNSwwLTUzLjUsMjQtNTMuNSw1My41VjcwSDQwLjRjLTcuNSwwLTEzLjUsNi0xMy41LDEzLjUgICAgUzMyLjksOTcsNDAuNCw5N2gyNC40djMxNy4yYzAsMzkuOCwzMi40LDcyLjIsNzIuMiw3Mi4yaDIxMi40YzM5LjgsMCw3Mi4yLTMyLjQsNzIuMi03Mi4yVjk3SDQ0NmM3LjUsMCwxMy41LTYsMTMuNS0xMy41ICAgIFM0NTMuNSw3MCw0NDYsNzB6IE0xNjguNiw1My41YzAtMTQuNiwxMS45LTI2LjUsMjYuNS0yNi41aDk2LjJjMTQuNiwwLDI2LjUsMTEuOSwyNi41LDI2LjVWNzBIMTY4LjZWNTMuNXogTTM5NC42LDQxNC4yICAgIGMwLDI0LjktMjAuMyw0NS4yLTQ1LjIsNDUuMkgxMzdjLTI0LjksMC00NS4yLTIwLjMtNDUuMi00NS4yVjk3aDMwMi45djMxNy4ySDM5NC42eiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0yNDMuMiw0MTFjNy41LDAsMTMuNS02LDEzLjUtMTMuNVYxNTguOWMwLTcuNS02LTEzLjUtMTMuNS0xMy41cy0xMy41LDYtMTMuNSwxMy41djIzOC41ICAgIEMyMjkuNyw0MDQuOSwyMzUuNyw0MTEsMjQzLjIsNDExeiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0xNTUuMSwzOTYuMWM3LjUsMCwxMy41LTYsMTMuNS0xMy41VjE3My43YzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MjA4LjkgICAgQzE0MS42LDM5MC4xLDE0Ny43LDM5Ni4xLDE1NS4xLDM5Ni4xeiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0zMzEuMywzOTYuMWM3LjUsMCwxMy41LTYsMTMuNS0xMy41VjE3My43YzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MjA4LjkgICAgQzMxNy44LDM5MC4xLDMyMy44LDM5Ni4xLDMzMS4zLDM5Ni4xeiIgZmlsbD0iI0ZGRkZGRiIvPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+"); }

    .ext-url-image {
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPjxnPjxnPjxnPjxwYXRoIGQ9Ik00ODAsMjg4djExMmMwLDQ0LjE4My0zNS44MTcsODAtODAsODBIMTEyYy00NC4xODMsMC04MC0zNS44MTctODAtODBWMTEyYzAtNDQuMTgzLDM1LjgxNy04MCw4MC04MGg5NlYwaC05NiAgICAgQzUwLjE0NCwwLDAsNTAuMTQ0LDAsMTEydjI4OGMwLDYxLjg1Niw1MC4xNDQsMTEyLDExMiwxMTJoMjg4YzYxLjg1NiwwLDExMi01MC4xNDQsMTEyLTExMlYyODhINDgweiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik0xNzYsNDE2aDMyVjI4OGMwLTEyNS43NiwxMDcuNTItMTI4LDExMi0xMjhoMTA1LjQ0bC04NC42NCw4NC42NGwyMi41NiwyMi41NmwxMTItMTEyYzYuMjA0LTYuMjQxLDYuMjA0LTE2LjMxOSwwLTIyLjU2ICAgICBsLTExMi0xMTJsLTIyLjcyLDIyLjcybDg0LjgsODQuNjRIMzIwYy0xLjQ0LDAtMTQ0LDEuNzYtMTQ0LDE2MFY0MTZ6IiBmaWxsPSIjRkZGRkZGIi8+PC9nPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+"); }

    .download-image {
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3MS4yIDQ3MS4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzEuMiA0NzEuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTQ1Ny43LDIzMC4xNWMtNy41LDAtMTMuNSw2LTEzLjUsMTMuNXYxMjIuOGMwLDMzLjQtMjcuMiw2MC41LTYwLjUsNjAuNUg4Ny41Yy0zMy40LDAtNjAuNS0yNy4yLTYwLjUtNjAuNXYtMTI0LjggICAgYzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MTI0LjhjMCw0OC4zLDM5LjMsODcuNSw4Ny41LDg3LjVoMjk2LjJjNDguMywwLDg3LjUtMzkuMyw4Ny41LTg3LjV2LTEyMi44ICAgIEM0NzEuMiwyMzYuMjUsNDY1LjIsMjMwLjE1LDQ1Ny43LDIzMC4xNXoiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMjI2LjEsMzQ2Ljc1YzIuNiwyLjYsNi4xLDQsOS41LDRzNi45LTEuMyw5LjUtNGw4NS44LTg1LjhjNS4zLTUuMyw1LjMtMTMuOCwwLTE5LjFjLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwbC02Mi43LDYyLjggICAgVjMwLjc1YzAtNy41LTYtMTMuNS0xMy41LTEzLjVzLTEzLjUsNi0xMy41LDEzLjV2MjczLjlsLTYyLjgtNjIuOGMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xICAgIEwyMjYuMSwzNDYuNzV6IiBmaWxsPSIjRkZGRkZGIi8+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4="); }

    .close-image {
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3NS4yIDQ3NS4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzUuMiA0NzUuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTQwNS42LDY5LjZDMzYwLjcsMjQuNywzMDEuMSwwLDIzNy42LDBzLTEyMy4xLDI0LjctMTY4LDY5LjZTMCwxNzQuMSwwLDIzNy42czI0LjcsMTIzLjEsNjkuNiwxNjhzMTA0LjUsNjkuNiwxNjgsNjkuNiAgICBzMTIzLjEtMjQuNywxNjgtNjkuNnM2OS42LTEwNC41LDY5LjYtMTY4UzQ1MC41LDExNC41LDQwNS42LDY5LjZ6IE0zODYuNSwzODYuNWMtMzkuOCwzOS44LTkyLjcsNjEuNy0xNDguOSw2MS43ICAgIHMtMTA5LjEtMjEuOS0xNDguOS02MS43Yy04Mi4xLTgyLjEtODIuMS0yMTUuNywwLTI5Ny44QzEyOC41LDQ4LjksMTgxLjQsMjcsMjM3LjYsMjdzMTA5LjEsMjEuOSwxNDguOSw2MS43ICAgIEM0NjguNiwxNzAuOCw0NjguNiwzMDQuNCwzODYuNSwzODYuNXoiIGZpbGw9IiNGRkZGRkYiLz48cGF0aCBkPSJNMzQyLjMsMTMyLjljLTUuMy01LjMtMTMuOC01LjMtMTkuMSwwbC04NS42LDg1LjZMMTUyLDEzMi45Yy01LjMtNS4zLTEzLjgtNS4zLTE5LjEsMGMtNS4zLDUuMy01LjMsMTMuOCwwLDE5LjEgICAgbDg1LjYsODUuNmwtODUuNiw4NS42Yy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWMyLjYsMi42LDYuMSw0LDkuNSw0czYuOS0xLjMsOS41LTRsODUuNi04NS42bDg1LjYsODUuNmMyLjYsMi42LDYuMSw0LDkuNSw0ICAgIGMzLjUsMCw2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xbC04NS40LTg1LjZsODUuNi04NS42QzM0Ny42LDE0Ni43LDM0Ny42LDEzOC4yLDM0Mi4zLDEzMi45eiIgZmlsbD0iI0ZGRkZGRiIvPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+"); }

    .refresh-image {
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4OS43MTEgNDg5LjcxMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDg5LjcxMSA0ODkuNzExOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48Zz48cGF0aCBkPSJNMTEyLjE1Niw5Ny4xMTFjNzIuMy02NS40LDE4MC41LTY2LjQsMjUzLjgtNi43bC01OC4xLDIuMmMtNy41LDAuMy0xMy4zLDYuNS0xMywxNGMwLjMsNy4zLDYuMywxMywxMy41LDEzICAgIGMwLjIsMCwwLjMsMCwwLjUsMGw4OS4yLTMuM2M3LjMtMC4zLDEzLTYuMiwxMy0xMy41di0xYzAtMC4yLDAtMC4zLDAtMC41di0wLjFsMCwwbC0zLjMtODguMmMtMC4zLTcuNS02LjYtMTMuMy0xNC0xMyAgICBjLTcuNSwwLjMtMTMuMyw2LjUtMTMsMTRsMi4xLDU1LjNjLTM2LjMtMjkuNy04MS00Ni45LTEyOC44LTQ5LjNjLTU5LjItMy0xMTYuMSwxNy4zLTE2MCw1Ny4xYy02MC40LDU0LjctODYsMTM3LjktNjYuOCwyMTcuMSAgICBjMS41LDYuMiw3LDEwLjMsMTMuMSwxMC4zYzEuMSwwLDIuMS0wLjEsMy4yLTAuNGM3LjItMS44LDExLjctOS4xLDkuOS0xNi4zQzM2LjY1NiwyMTguMjExLDU5LjA1NiwxNDUuMTExLDExMi4xNTYsOTcuMTExeiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGQ9Ik00NjIuNDU2LDE5NS41MTFjLTEuOC03LjItOS4xLTExLjctMTYuMy05LjljLTcuMiwxLjgtMTEuNyw5LjEtOS45LDE2LjNjMTYuOSw2OS42LTUuNiwxNDIuNy01OC43LDE5MC43ICAgIGMtMzcuMywzMy43LTg0LjEsNTAuMy0xMzAuNyw1MC4zYy00NC41LDAtODguOS0xNS4xLTEyNC43LTQ0LjlsNTguOC01LjNjNy40LTAuNywxMi45LTcuMiwxMi4yLTE0LjdzLTcuMi0xMi45LTE0LjctMTIuMmwtODguOSw4ICAgIGMtNy40LDAuNy0xMi45LDcuMi0xMi4yLDE0LjdsOCw4OC45YzAuNiw3LDYuNSwxMi4zLDEzLjQsMTIuM2MwLjQsMCwwLjgsMCwxLjItMC4xYzcuNC0wLjcsMTIuOS03LjIsMTIuMi0xNC43bC00LjgtNTQuMSAgICBjMzYuMywyOS40LDgwLjgsNDYuNSwxMjguMyw0OC45YzMuOCwwLjIsNy42LDAuMywxMS4zLDAuM2M1NS4xLDAsMTA3LjUtMjAuMiwxNDguNy01Ny40ICAgIEM0NTYuMDU2LDM1Ny45MTEsNDgxLjY1NiwyNzQuODExLDQ2Mi40NTYsMTk1LjUxMXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjwvc3ZnPg=="); }

    .copy {
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4OC4zIDQ4OC4zIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0ODguMyA0ODguMzsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+PGc+PGc+PHBhdGggZD0iTTMxNC4yNSw4NS40aC0yMjdjLTIxLjMsMC0zOC42LDE3LjMtMzguNiwzOC42djMyNS43YzAsMjEuMywxNy4zLDM4LjYsMzguNiwzOC42aDIyN2MyMS4zLDAsMzguNi0xNy4zLDM4LjYtMzguNlYxMjQgICAgQzM1Mi43NSwxMDIuNywzMzUuNDUsODUuNCwzMTQuMjUsODUuNHogTTMyNS43NSw0NDkuNmMwLDYuNC01LjIsMTEuNi0xMS42LDExLjZoLTIyN2MtNi40LDAtMTEuNi01LjItMTEuNi0xMS42VjEyNCAgICBjMC02LjQsNS4yLTExLjYsMTEuNi0xMS42aDIyN2M2LjQsMCwxMS42LDUuMiwxMS42LDExLjZWNDQ5LjZ6IiBmaWxsPSIjRkZGRkZGIi8+PHBhdGggZD0iTTQwMS4wNSwwaC0yMjdjLTIxLjMsMC0zOC42LDE3LjMtMzguNiwzOC42YzAsNy41LDYsMTMuNSwxMy41LDEzLjVzMTMuNS02LDEzLjUtMTMuNWMwLTYuNCw1LjItMTEuNiwxMS42LTExLjZoMjI3ICAgIGM2LjQsMCwxMS42LDUuMiwxMS42LDExLjZ2MzI1LjdjMCw2LjQtNS4yLDExLjYtMTEuNiwxMS42Yy03LjUsMC0xMy41LDYtMTMuNSwxMy41czYsMTMuNSwxMy41LDEzLjVjMjEuMywwLDM4LjYtMTcuMywzOC42LTM4LjYgICAgVjM4LjZDNDM5LjY1LDE3LjMsNDIyLjM1LDAsNDAxLjA1LDB6IiBmaWxsPSIjRkZGRkZGIi8+PC9nPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4="); }
  `],
                template: `
    <header class="buttons-container">

      <ng-container *ngIf="!configButtons || configButtons?.visible">
        <a *ngFor="let btn of buttons; trackBy: trackById; let index = index"
           class="upper-button"
           ksSize [sizeConfig]="{width: btn.size?.width, height: btn.size?.height}"
           [ngStyle]="{'font-size': btn.fontSize}"
           [attr.aria-label]="btn.ariaLabel"
           [tabindex]="0" role="button"
           (click)="onEvent(btn, $event)" (keyup)="onEvent(btn, $event)">
          <div class="inside {{btn.className}}" aria-hidden="true" title="{{btn.title}}"></div>
        </a>
      </ng-container>
    </header>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
UpperButtonsComponent.ctorParameters = () => [];
UpperButtonsComponent.propDecorators = {
    'currentImage': [{ type: Input },],
    'buttonsConfig': [{ type: Input },],
    'refresh': [{ type: Output },],
    'delete': [{ type: Output },],
    'navigate': [{ type: Output },],
    'download': [{ type: Output },],
    'close': [{ type: Output },],
    'customEmit': [{ type: Output },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Component with clickable dots (small circles) to navigate between images inside the modal gallery.
 */
class DotsComponent extends AccessibleComponent {
    constructor() {
        super(...arguments);
        /**
         * Object of type `DotsConfig` to init DotsComponent's features.
         * For instance, it contains a param to show/hide this component.
         */
        this.dotsConfig = { visible: true };
        /**
         * Output to emit clicks on dots. The payload contains a number that represent
         * the index of the clicked dot.
         */
        this.clickDot = new EventEmitter();
    }
    /**
     * Method ´ngOnInit´ to build `configDots` applying a default value.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ defaultConfig = { visible: true };
        this.configDots = Object.assign(defaultConfig, this.dotsConfig);
    }
    /**
     * Method to check if an image is active (i.e. the current image).
     * It checks currentImage and images to prevent errors.
     * @param {?} index
     * @return {?}
     */
    isActive(index) {
        if (!this.currentImage || !this.images || this.images.length === 0) {
            return false;
        }
        let /** @type {?} */ imageIndex;
        try {
            imageIndex = getIndex(this.currentImage, this.images);
        }
        catch (err) {
            console.error(`Internal error while trying to show the active 'dot'`, err);
            return false;
        }
        return index === imageIndex;
    }
    /**
     * Method called by events from keyboard and mouse.
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    onDotEvent(index, event) {
        const /** @type {?} */ result = super.handleImageEvent(event);
        if (result === NEXT) {
            this.clickDot.emit(index);
        }
    }
    /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackById(index, item) {
        return item.id;
    }
}
DotsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ks-dots',
                styles: [`
    .dots-container {
      display: -webkit-box;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
              flex-direction: row;
      -webkit-box-pack: center;
              justify-content: center;
      margin-bottom: 30px; }
      .dots-container > .dot {
        background: #fff;
        border-radius: 5px;
        height: 10px;
        margin-left: 4px;
        margin-right: 4px;
        width: 10px;
        cursor: pointer;
        opacity: 0.5; }
        .dots-container > .dot:hover {
          opacity: 0.9;
          -webkit-transition: all .5s ease;
          transition: all .5s ease;
          -webkit-transition-property: opacity;
          transition-property: opacity; }
        .dots-container > .dot.active {
          cursor: pointer;
          opacity: 0.9; }

    @-webkit-keyframes fadein-semi-visible05 {
      from {
        opacity: 0; }
      to {
        opacity: 0.5; } }

    @keyframes fadein-semi-visible05 {
      from {
        opacity: 0; }
      to {
        opacity: 0.5; } }

    @-webkit-keyframes fadein-semi-visible09 {
      from {
        opacity: 0; }
      to {
        opacity: 0.9; } }

    @keyframes fadein-semi-visible09 {
      from {
        opacity: 0; }
      to {
        opacity: 0.9; } }
  `],
                template: `
    <nav class="dots-container" [attr.aria-label]="accessibilityConfig?.dotsContainerAriaLabel"
         [title]="accessibilityConfig?.dotsContainerTitle">
      <ng-container *ngIf="!configDots || configDots?.visible">
        <div class="inside dot"
             *ngFor="let img of images; trackBy: trackById; let index = index"
             [ngClass]="{'active': isActive(index)}"
             [attr.aria-label]="accessibilityConfig?.dotAriaLabel + ' ' + (index + 1)"
             [tabindex]="0" role="navigation"
             (click)="onDotEvent(index, $event)" (keyup)="onDotEvent(index, $event)"></div>
      </ng-container>
    </nav>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
DotsComponent.ctorParameters = () => [];
DotsComponent.propDecorators = {
    'currentImage': [{ type: Input },],
    'images': [{ type: Input },],
    'dotsConfig': [{ type: Input },],
    'accessibilityConfig': [{ type: Input },],
    'clickDot': [{ type: Output },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Component with image previews
 */
class PreviewsComponent extends AccessibleComponent {
    constructor() {
        super(...arguments);
        /**
         * Output to emit the clicked preview. The payload contains the `InternalLibImage` associated to the clicked preview.
         */
        this.clickPreview = new EventEmitter();
        /**
         * Array of `InternalLibImage` exposed to the template. This field is initialized
         * applying transformations, default values and so on to the input of the same type.
         */
        this.previews = [];
        /**
         * Default preview's size object, also used in the template to apply default sizes to ksSize's directive.
         */
        this.defaultPreviewSize = { height: '50px', width: 'auto' };
        /**
         * Default preview's config object
         */
        this.defaultPreviewConfig = {
            visible: true,
            number: 3,
            arrows: true,
            clickable: true,
            // alwaysCenter: false, // TODO still not implemented
            size: this.defaultPreviewSize
        };
    }
    /**
     * Method ´ngOnInit´ to build `configPreview` applying a default value and also to
     * init the `previews` array.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        this.configPreview = Object.assign({}, this.defaultPreviewConfig, this.previewConfig);
        // if number is <= 0 reset to default
        if (this.configPreview.number <= 0) {
            this.configPreview.number = this.defaultPreviewConfig.number;
        }
        // init previews based on currentImage and the full array of images
        this.initPreviews(this.currentImage, this.images);
    }
    /**
     * Method to check if an image is active (i.e. a preview image).
     * @param {?} preview
     * @return {?}
     */
    isActive(preview) {
        if (!preview || !this.currentImage) {
            return false;
        }
        return preview.id === this.currentImage.id;
    }
    /**
     * Method ´ngOnChanges´ to update `previews` array.
     * Also, both `start` and `end` local variables will be updated accordingly.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ simpleChange = changes.currentImage;
        if (!simpleChange) {
            return;
        }
        const /** @type {?} */ prev = simpleChange.previousValue;
        const /** @type {?} */ current = simpleChange.currentValue;
        if (current && changes.images && changes.images.previousValue && changes.images.currentValue) {
            // I'm in this if statement, if input images are changed (for instance, because I removed one of them with the 'delete button',
            // or because users changed the images array while modal gallery is still open).
            // In this case, I have to re-init previews, because the input array of images is changed.
            this.initPreviews(current, changes.images.currentValue);
        }
        if (prev && current && prev.id !== current.id) {
            // to manage infinite sliding I have to reset both `start` and `end` at the beginning
            // to show again previews from the first image.
            // This happens when you navigate over the last image to return to the first one
            let /** @type {?} */ prevIndex;
            let /** @type {?} */ currentIndex;
            try {
                prevIndex = getIndex(prev, this.images);
                currentIndex = getIndex(current, this.images);
            }
            catch (err) {
                console.error('Cannot get previous and current image indexes in previews');
                throw err;
            }
            if (prevIndex === this.images.length - 1 && currentIndex === 0) {
                // first image
                this.setBeginningIndexesPreviews();
                this.previews = this.images.filter((img, i) => i >= this.start && i < this.end);
                return;
            }
            // the same for the opposite case, when you navigate back from the fist image to go to the last one.
            if (prevIndex === 0 && currentIndex === this.images.length - 1) {
                // last image
                this.setEndIndexesPreviews();
                this.previews = this.images.filter((img, i) => i >= this.start && i < this.end);
                return;
            }
            // otherwise manage standard scenarios
            if (prevIndex > currentIndex) {
                this.previous();
            }
            else if (prevIndex < currentIndex) {
                this.next();
            }
        }
    }
    /**
     * Method called by events from both keyboard and mouse on a preview.
     * This will trigger the `clickpreview` output with the input preview as its payload.
     * @param {?} preview
     * @param {?} event
     * @return {?}
     */
    onImageEvent(preview, event) {
        if (!this.configPreview || !this.configPreview.clickable) {
            return;
        }
        const /** @type {?} */ result = super.handleImageEvent(event);
        if (result === NEXT) {
            this.clickPreview.emit(preview);
        }
        else if (result === PREV) {
            this.clickPreview.emit(preview);
        }
    }
    /**
     * Method called by events from both keyboard and mouse on a navigation arrow.
     * @param {?} direction
     * @param {?} event
     * @return {?}
     */
    onNavigationEvent(direction, event) {
        const /** @type {?} */ result = super.handleNavigationEvent(direction, event);
        if (result === NEXT) {
            this.next();
        }
        else if (result === PREV) {
            this.previous();
        }
    }
    /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackById(index, item) {
        return item.id;
    }
    /**
     * Private method to init previews based on the currentImage and the full array of images.
     * The current image in mandatory to show always the current preview (as highlighted).
     * @param {?} currentImage
     * @param {?} images
     * @return {?}
     */
    initPreviews(currentImage, images) {
        let /** @type {?} */ index;
        try {
            index = getIndex(currentImage, images);
        }
        catch (err) {
            throw err;
        }
        switch (index) {
            case 0:
                // first image
                this.setBeginningIndexesPreviews();
                break;
            case images.length - 1:
                // last image
                this.setEndIndexesPreviews();
                break;
            default:
                // other images
                this.setIndexesPreviews();
                break;
        }
        this.previews = images.filter((img, i) => i >= this.start && i < this.end);
    }
    /**
     * Private method to init both `start` and `end` to the beginning.
     * @return {?}
     */
    setBeginningIndexesPreviews() {
        this.start = 0;
        this.end = Math.min(/** @type {?} */ (this.configPreview.number), this.images.length);
    }
    /**
     * Private method to init both `start` and `end` to the end.
     * @return {?}
     */
    setEndIndexesPreviews() {
        this.start = this.images.length - 1 - ((this.configPreview.number) - 1);
        this.end = this.images.length;
    }
    /**
     * Private method to update both `start` and `end` based on the currentImage.
     * @return {?}
     */
    setIndexesPreviews() {
        this.start = getIndex(this.currentImage, this.images) - Math.floor(/** @type {?} */ (this.configPreview.number) / 2);
        this.end = getIndex(this.currentImage, this.images) + Math.floor(/** @type {?} */ (this.configPreview.number) / 2) + 1;
    }
    /**
     * Private method to update the visible previews navigating to the right (next).
     * @return {?}
     */
    next() {
        // check if nextImage should be blocked
        if (this.isPreventSliding(this.images.length - 1)) {
            return;
        }
        if (this.end === this.images.length) {
            return;
        }
        this.start++;
        this.end = Math.min(this.end + 1, this.images.length);
        this.previews = this.images.filter((img, i) => i >= this.start && i < this.end);
    }
    /**
     * Private method to update the visible previews navigating to the left (previous).
     * @return {?}
     */
    previous() {
        // check if prevImage should be blocked
        if (this.isPreventSliding(0)) {
            return;
        }
        if (this.start === 0) {
            return;
        }
        this.start = Math.max(this.start - 1, 0);
        this.end = Math.min(this.end - 1, this.images.length);
        this.previews = this.images.filter((img, i) => i >= this.start && i < this.end);
    }
    /**
     * Private method to block/permit sliding between previews.
     * @param {?} boundaryIndex
     * @return {?}
     */
    isPreventSliding(boundaryIndex) {
        return !!this.slideConfig && this.slideConfig.infinite === false && getIndex(this.currentImage, this.previews) === boundaryIndex;
    }
}
PreviewsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ks-previews',
                styles: [`
    @media only screen and (max-width: 767px), only screen and (max-device-width: 767px) {
      .previews-container {
        display: none; }
        .previews-container > .preview-image {
          display: none; }
        .previews-container > .nav-left {
          display: none; }
        .previews-container > .nav-right {
          display: none; } }

    @media only screen and (min-device-width: 768px) {
      .previews-container {
        -webkit-box-align: center;
                align-items: center;
        -webkit-animation: fadein-semi-visible08 0.8s;
                animation: fadein-semi-visible08 0.8s;
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
                flex-direction: row;
        -webkit-box-pack: center;
                justify-content: center;
        margin-bottom: 15px; }
        .previews-container > .preview-image {
          cursor: pointer;
          margin-left: 2px;
          margin-right: 2px;
          opacity: 0.7;
          height: 50px; }
          .previews-container > .preview-image.active {
            opacity: 1; }
          .previews-container > .preview-image.unclickable {
            cursor: not-allowed; }
          .previews-container > .preview-image:hover {
            opacity: 1;
            -webkit-transition: all .5s ease;
            transition: all .5s ease;
            -webkit-transition-property: opacity;
            transition-property: opacity; }
        .previews-container .nav, .previews-container > .nav-left, .previews-container > .nav-right {
          color: #919191;
          cursor: pointer;
          -webkit-transition: all 0.5s;
          transition: all 0.5s; }
          .previews-container .nav:hover, .previews-container > .nav-left:hover, .previews-container > .nav-right:hover {
            -webkit-transform: scale(1.1);
                    transform: scale(1.1); }
        .previews-container > .nav-left {
          margin-right: 10px; }
        .previews-container > .nav-right {
          margin-left: 10px; } }

    @-webkit-keyframes fadein-visible {
      from {
        opacity: 0; }
      to {
        opacity: 1; } }

    @keyframes fadein-visible {
      from {
        opacity: 0; }
      to {
        opacity: 1; } }

    @-webkit-keyframes fadein-semi-visible05 {
      from {
        opacity: 0; }
      to {
        opacity: 0.5; } }

    @keyframes fadein-semi-visible05 {
      from {
        opacity: 0; }
      to {
        opacity: 0.5; } }

    @-webkit-keyframes fadein-semi-visible08 {
      from {
        opacity: 0; }
      to {
        opacity: 0.8; } }

    @keyframes fadein-semi-visible08 {
      from {
        opacity: 0; }
      to {
        opacity: 0.8; } }

    @-webkit-keyframes fadein-semi-visible09 {
      from {
        opacity: 0; }
      to {
        opacity: 0.9; } }

    @keyframes fadein-semi-visible09 {
      from {
        opacity: 0; }
      to {
        opacity: 0.9; } }
    .arrow-preview-image, .empty-arrow-preview-image, .left-arrow-preview-image, .right-arrow-preview-image {
      width: 15px;
      height: 15px;
      opacity: 0.5; }

    .empty-arrow-preview-image {
      background: black;
      opacity: 0; }

    .left-arrow-preview-image {
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMTQ1LjE4OCwyMzguNTc1bDIxNS41LTIxNS41YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xcy0xMy44LTUuMy0xOS4xLDBsLTIyNS4xLDIyNS4xYy01LjMsNS4zLTUuMywxMy44LDAsMTkuMWwyMjUuMSwyMjUgICBjMi42LDIuNiw2LjEsNCw5LjUsNHM2LjktMS4zLDkuNS00YzUuMy01LjMsNS4zLTEzLjgsMC0xOS4xTDE0NS4xODgsMjM4LjU3NXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+");
      background-size: 15px;
      -webkit-transition: all 0.5s;
      transition: all 0.5s; }
      .left-arrow-preview-image:hover {
        -webkit-transform: scale(1.2);
                transform: scale(1.2); }

    .right-arrow-preview-image {
      background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ3Ny4xNzUgNDc3LjE3NSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc3LjE3NSA0NzcuMTc1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij48Zz48cGF0aCBkPSJNMzYwLjczMSwyMjkuMDc1bC0yMjUuMS0yMjUuMWMtNS4zLTUuMy0xMy44LTUuMy0xOS4xLDBzLTUuMywxMy44LDAsMTkuMWwyMTUuNSwyMTUuNWwtMjE1LjUsMjE1LjUgICBjLTUuMyw1LjMtNS4zLDEzLjgsMCwxOS4xYzIuNiwyLjYsNi4xLDQsOS41LDRjMy40LDAsNi45LTEuMyw5LjUtNGwyMjUuMS0yMjUuMUMzNjUuOTMxLDI0Mi44NzUsMzY1LjkzMSwyMzQuMjc1LDM2MC43MzEsMjI5LjA3NXogICAiIGZpbGw9IiNGRkZGRkYiLz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+");
      background-size: 15px;
      -webkit-transition: all 0.5s;
      transition: all 0.5s; }
      .right-arrow-preview-image:hover {
        -webkit-transform: scale(1.2);
                transform: scale(1.2); }
  `],
                template: `
    <nav class="previews-container"
         [attr.aria-label]="accessibilityConfig?.previewsContainerAriaLabel"
         [title]="accessibilityConfig?.previewsContainerTitle">

      <ng-container *ngIf="configPreview?.visible">
        <a class="nav-left"
           [attr.aria-label]="accessibilityConfig?.previewScrollPrevAriaLabel"
           [tabindex]="configPreview.arrows && start > 0 ? 0 : -1" role="button"
           (click)="onNavigationEvent('left', $event)" (keyup)="onNavigationEvent('left', $event)">
          <div class="inside {{configPreview.arrows && start > 0 ? 'left-arrow-preview-image' : 'empty-arrow-preview-image'}}"
               aria-hidden="true"
               [title]="accessibilityConfig?.previewScrollPrevTitle"></div>
        </a>

        <ng-container *ngFor="let preview of previews; trackBy: trackById; let index = index">
          <img *ngIf="preview?.modal?.img"
               class="inside preview-image {{isActive(preview) ? 'active' : ''}}{{!configPreview.clickable ? ' unclickable' : ''}}"
               [src]="preview.plain?.img ? preview.plain.img : preview.modal.img"
               ksSize [sizeConfig]="{width: configPreview.size ? configPreview.size.width : defaultPreviewSize.width,
                                     height: configPreview.size ? configPreview.size.height : defaultPreviewSize.height}"
               [attr.aria-label]="preview.modal.ariaLabel ? preview.modal.ariaLabel : ''"
               [title]="preview.modal.title ? preview.modal.title : ''"
               alt="{{preview.modal.alt ? preview.modal.alt : ''}}"
               [tabindex]="0" role="img"
               (click)="onImageEvent(preview, $event)" (keyup)="onImageEvent(preview, $event)"/>
        </ng-container>


        <a class="nav-right"
           [attr.aria-label]="accessibilityConfig?.previewScrollNextAriaLabel"
           [tabindex]="configPreview.arrows && end < images.length ? 0 : -1" role="button"
           (click)="onNavigationEvent('right', $event)" (keyup)="onNavigationEvent('right', $event)">
          <div class="inside {{configPreview.arrows && end < images.length ? 'right-arrow-preview-image' : 'empty-arrow-preview-image'}}"
               aria-hidden="true"
               [title]="accessibilityConfig?.previewScrollNextTitle"></div>
        </a>
      </ng-container>

    </nav>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
PreviewsComponent.ctorParameters = () => [];
PreviewsComponent.propDecorators = {
    'currentImage': [{ type: Input },],
    'images': [{ type: Input },],
    'slideConfig': [{ type: Input },],
    'previewConfig': [{ type: Input },],
    'accessibilityConfig': [{ type: Input },],
    'clickPreview': [{ type: Output },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Component with the loading spinner
 */
class LoadingSpinnerComponent {
    constructor() {
        /**
         * Enum of type `LoadingType` to choose the standard loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingStandard = LoadingType.STANDARD;
        /**
         * Enum of type `LoadingType` to choose the bars loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingBars = LoadingType.BARS;
        /**
         * Enum of type `LoadingType` to choose the circular loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingCircular = LoadingType.CIRCULAR;
        /**
         * Enum of type `LoadingType` to choose the dots loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingDots = LoadingType.DOTS;
        /**
         * Enum of type `LoadingType` to choose the cube flipping loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingCubeFlipping = LoadingType.CUBE_FLIPPING;
        /**
         * Enum of type `LoadingType` to choose the circles loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingCircles = LoadingType.CIRCLES;
        /**
         * Enum of type `LoadingType` to choose the explosing squares loading spinner.
         * Declared here to be used inside the template.
         */
        this.loadingExplosingSquares = LoadingType.EXPLOSING_SQUARES;
    }
}
LoadingSpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ks-loading-spinner',
                styles: [`
    /* taken from https://codepen.io/martinvd/pen/xbQJom */

    .cssload-loader {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      -o-border-radius: 50%;
      -ms-border-radius: 50%;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      -webkit-perspective: 800px;
              perspective: 800px;
    }

    .cssload-inner {
      position: absolute;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      border-radius: 50%;
      -o-border-radius: 50%;
      -ms-border-radius: 50%;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
    }

    .cssload-inner.cssload-one {
      left: 0%;
      top: 0%;
      animation: cssload-rotate-one 0.6s linear infinite;
      -o-animation: cssload-rotate-one 0.6s linear infinite;
      -ms-animation: cssload-rotate-one 0.6s linear infinite;
      -webkit-animation: cssload-rotate-one 0.6s linear infinite;
      -moz-animation: cssload-rotate-one 0.6s linear infinite;
      border-bottom: 3px solid rgba(255, 255, 255, 0.99);
    }

    .cssload-inner.cssload-two {
      right: 0%;
      top: 0%;
      animation: cssload-rotate-two 0.6s linear infinite;
      -o-animation: cssload-rotate-two 0.6s linear infinite;
      -ms-animation: cssload-rotate-two 0.6s linear infinite;
      -webkit-animation: cssload-rotate-two 0.6s linear infinite;
      -moz-animation: cssload-rotate-two 0.6s linear infinite;
      border-right: 3px solid rgb(255, 255, 255);
    }

    .cssload-inner.cssload-three {
      right: 0%;
      bottom: 0%;
      animation: cssload-rotate-three 0.6s linear infinite;
      -o-animation: cssload-rotate-three 0.6s linear infinite;
      -ms-animation: cssload-rotate-three 0.6s linear infinite;
      -webkit-animation: cssload-rotate-three 0.6s linear infinite;
      -moz-animation: cssload-rotate-three 0.6s linear infinite;
      border-top: 3px solid rgb(255, 255, 255);
    }

    @keyframes cssload-rotate-one {
      0% {
        -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
                transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
      }
      100% {
        -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
                transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
      }
    }

    @-webkit-keyframes cssload-rotate-one {
      0% {
        -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
      }
      100% {
        -webkit-transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
      }
    }

    @keyframes cssload-rotate-two {
      0% {
        -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
                transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
      }
      100% {
        -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
                transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
      }
    }

    @-webkit-keyframes cssload-rotate-two {
      0% {
        -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
      }
      100% {
        -webkit-transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
      }
    }

    @keyframes cssload-rotate-three {
      0% {
        -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
                transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
      }
      100% {
        -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
                transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
      }
    }

    @-webkit-keyframes cssload-rotate-three {
      0% {
        -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
      }
      100% {
        -webkit-transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
      }
    }/* Taken from https://projects.lukehaas.me/css-loaders/ */

    .loader-dots {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fefcff;
      font-size: 10px;
      margin: auto;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      text-indent: -9999em;
      -webkit-animation: load4 1.3s infinite linear;
      animation: load4 1.3s infinite linear;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }

    @-webkit-keyframes load4 {
      0%,
      100% {
        -webkit-box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
                box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
      }
      12.5% {
        -webkit-box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
      }
      25% {
        -webkit-box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
      }
      37.5% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
      }
      50% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
      }
      62.5% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
      }
      75% {
        -webkit-box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
                box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
      }
      87.5% {
        -webkit-box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
                box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
      }
    }

    @keyframes load4 {
      0%,
      100% {
        -webkit-box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
                box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
      }
      12.5% {
        -webkit-box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
      }
      25% {
        -webkit-box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
      }
      37.5% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
      }
      50% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
      }
      62.5% {
        -webkit-box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
                box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
      }
      75% {
        -webkit-box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
                box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
      }
      87.5% {
        -webkit-box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
                box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
      }
    }
    /* Taken from https://projects.lukehaas.me/css-loader-barss/ */

    .loader-bars,
    .loader-bars:before,
    .loader-bars:after {
      background: #fefcff;
      -webkit-animation: load1 1s infinite ease-in-out;
      animation: load1 1s infinite ease-in-out;
      width: 1em;
      height: 4em;
    }
    .loader-bars {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fefcff;
      text-indent: -9999em;
      margin: auto;
      font-size: 11px;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
    .loader-bars:before,
    .loader-bars:after {
      position: absolute;
      top: 0;
      content: '';
    }
    .loader-bars:before {
      left: -1.5em;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
    .loader-bars:after {
      left: 1.5em;
    }
    @-webkit-keyframes load1 {
      0%,
      80%,
      100% {
        -webkit-box-shadow: 0 0;
                box-shadow: 0 0;
        height: 4em;
      }
      40% {
        -webkit-box-shadow: 0 -2em;
                box-shadow: 0 -2em;
        height: 5em;
      }
    }
    @keyframes load1 {
      0%,
      80%,
      100% {
        -webkit-box-shadow: 0 0;
                box-shadow: 0 0;
        height: 4em;
      }
      40% {
        -webkit-box-shadow: 0 -2em;
                box-shadow: 0 -2em;
        height: 5em;
      }
    }
    /* Taken from https://projects.lukehaas.me/css-loaders/ */

    .loader-circular,
    .loader-circular:after {
      border-radius: 50%;
      width: 10em;
      height: 10em;
    }
    .loader-circular {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
      font-size: 10px;
      text-indent: -9999em;
      border-top: 1.1em solid rgba(255, 255, 255, 0.2);
      border-right: 1.1em solid rgba(255, 255, 255, 0.2);
      border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
      border-left: 1.1em solid #ffffff;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation: load8 1.1s infinite linear;
      animation: load8 1.1s infinite linear;
    }
    @-webkit-keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    /* Based on https://codepen.io/nikhil8krishnan/pen/dMEzGx */

    .cube-folding {
      width: 50px;
      height: 50px;
      display: inline-block;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      font-size: 0;
    }
    .cube-folding span {
      position: relative;
      width: 25px;
      height: 25px;
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
      display: inline-block;
    }
    .cube-folding span::before {
      content: '';
      background-color: white;
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: 25px;
      height: 25px;
      -webkit-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
      -webkit-animation: folding 2.5s infinite linear both;
      animation: folding 2.5s infinite linear both;
    }
    .cube-folding .leaf2 {
      -webkit-transform: rotateZ(90deg) scale(1.1);
      transform: rotateZ(90deg) scale(1.1);
    }
    .cube-folding .leaf2::before {
      -webkit-animation-delay: 0.3s;
      animation-delay: 0.3s;
      background-color: #f2f2f2;
    }
    .cube-folding .leaf3 {
      -webkit-transform: rotateZ(270deg) scale(1.1);
      transform: rotateZ(270deg) scale(1.1);
    }
    .cube-folding .leaf3::before {
      -webkit-animation-delay: 0.9s;
      animation-delay: 0.9s;
      background-color: #f2f2f2;
    }
    .cube-folding .leaf4 {
      -webkit-transform: rotateZ(180deg) scale(1.1);
      transform: rotateZ(180deg) scale(1.1);
    }
    .cube-folding .leaf4::before {
      -webkit-animation-delay: 0.6s;
      animation-delay: 0.6s;
      background-color: #e6e6e6;
    }
    @-webkit-keyframes folding {
      0%, 10% {
        -webkit-transform: perspective(140px) rotateX(-180deg);
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0;
      }
      25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
      }
      90%, 100% {
        -webkit-transform: perspective(140px) rotateY(180deg);
        transform: perspective(140px) rotateY(180deg);
        opacity: 0;
      }
    }
    @keyframes folding {
      0%, 10% {
        -webkit-transform: perspective(140px) rotateX(-180deg);
        transform: perspective(140px) rotateX(-180deg);
        opacity: 0;
      }
      25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
      }
      90%, 100% {
        -webkit-transform: perspective(140px) rotateY(180deg);
        transform: perspective(140px) rotateY(180deg);
        opacity: 0;
      }
    }
    .cube-wrapper {
      position: fixed;
      left: 50%;
      top: 50%;
      margin-top: -50px;
      margin-left: -50px;
      width: 100px;
      height: 100px;
      text-align: center;
    }
    @-webkit-keyframes text {
      100% {
        top: 35px;
      }
    }
    @keyframes text {
      100% {
        top: 35px;
      }
    }
    @-webkit-keyframes shadow {
      100% {
        bottom: -18px;
        width: 100px;
      }
    }
    @keyframes shadow {
      100% {
        bottom: -18px;
        width: 100px;
      }
    }
    /* Taken from https://codepen.io/WebSonata/pen/bRaONB */

    #preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    #loader {
      display: block;
      position: relative;
      left: 50%;
      top: 50%;
      width: 100px;
      height: 100px;
      margin: -75px 0 0 -75px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #B4B4B4;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
    }
    #loader:before {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #D9D9D9;
      -webkit-animation: spin 3s linear infinite;
      animation: spin 3s linear infinite;
    }
    #loader:after {
      content: "";
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #FFF;
      -webkit-animation: spin 1.5s linear infinite;
      animation: spin 1.5s linear infinite;
    }
    @-webkit-keyframes spin {
      0%   {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes spin {
      0%   {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    /* Taken from https://codepen.io/WebSonata/pen/bRaONB */
    @-webkit-keyframes loader {
      0%, 10%, 100% {
        width: 60px;
        height: 60px; }
      65% {
        width: 150px;
        height: 150px; } }
    @keyframes loader {
      0%, 10%, 100% {
        width: 60px;
        height: 60px; }
      65% {
        width: 150px;
        height: 150px; } }

    @-webkit-keyframes loaderBlock {
      0%, 30% {
        -webkit-transform: rotate(0);
                transform: rotate(0); }
      55% {
        background-color: #B4B4B4; }
      100% {
        -webkit-transform: rotate(90deg);
                transform: rotate(90deg); } }

    @keyframes loaderBlock {
      0%, 30% {
        -webkit-transform: rotate(0);
                transform: rotate(0); }
      55% {
        background-color: #B4B4B4; }
      100% {
        -webkit-transform: rotate(90deg);
                transform: rotate(90deg); } }

    @-webkit-keyframes loaderBlockInverse {
      0%, 20% {
        -webkit-transform: rotate(0);
                transform: rotate(0); }
      55% {
        background-color: #D9D9D9; }
      100% {
        -webkit-transform: rotate(-90deg);
                transform: rotate(-90deg); } }

    @keyframes loaderBlockInverse {
      0%, 20% {
        -webkit-transform: rotate(0);
                transform: rotate(0); }
      55% {
        background-color: #D9D9D9; }
      100% {
        -webkit-transform: rotate(-90deg);
                transform: rotate(-90deg); } }

    .loader {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 60px;
      height: 60px;
      -webkit-transform: translate(-50%, -50%) rotate(45deg) translate3d(0, 0, 0);
              transform: translate(-50%, -50%) rotate(45deg) translate3d(0, 0, 0);
      -webkit-animation: loader 1.2s infinite ease-in-out;
              animation: loader 1.2s infinite ease-in-out; }
      .loader span {
        position: absolute;
        display: block;
        width: 40px;
        height: 40px;
        background-color: #FFF;
        -webkit-animation: loaderBlock 1.2s infinite ease-in-out both;
                animation: loaderBlock 1.2s infinite ease-in-out both; }
        .loader span:nth-child(1) {
          top: 0;
          left: 0; }
        .loader span:nth-child(2) {
          top: 0;
          right: 0;
          -webkit-animation: loaderBlockInverse 1.2s infinite ease-in-out both;
                  animation: loaderBlockInverse 1.2s infinite ease-in-out both; }
        .loader span:nth-child(3) {
          bottom: 0;
          left: 0;
          -webkit-animation: loaderBlockInverse 1.2s infinite ease-in-out both;
                  animation: loaderBlockInverse 1.2s infinite ease-in-out both; }
        .loader span:nth-child(4) {
          bottom: 0;
          right: 0; }
  `],
                template: `
    <div [attr.aria-label]="accessibilityConfig?.loadingSpinnerAriaLabel"
         [title]="accessibilityConfig?.loadingSpinnerTitle">

      <ng-container [ngSwitch]="loadingConfig.type">
        <ng-container *ngSwitchCase="loadingStandard">
          <div class="cssload-loader">
            <div class="cssload-inner cssload-one"></div>
            <div class="cssload-inner cssload-two"></div>
            <div class="cssload-inner cssload-three"></div>
          </div>
        </ng-container>
        <ng-container *ngSwitchCase="loadingBars">
          <div class="loader-bars">
          </div>
        </ng-container>
        <ng-container *ngSwitchCase="loadingCircular">
          <div class="loader-circular">
          </div>
        </ng-container>
        <ng-container *ngSwitchCase="loadingDots">
          <div class="loader-dots">
          </div>
        </ng-container>
        <ng-container *ngSwitchCase="loadingCubeFlipping">
          <div class="cube-wrapper">
            <div class="cube-folding">
              <span class="leaf1"></span>
              <span class="leaf2"></span>
              <span class="leaf3"></span>
              <span class="leaf4"></span>
            </div>
          </div>
        </ng-container>
        <ng-container *ngSwitchCase="loadingCircles">
          <div id="preloader">
            <div id="loader"></div>
          </div>
        </ng-container>
        <ng-container *ngSwitchCase="loadingExplosingSquares">
          <div class="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </ng-container>
        <!--<ng-container *ngSwitchDefault>-->
        <!---->
        <!--</ng-container>-->
      </ng-container>
    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
LoadingSpinnerComponent.ctorParameters = () => [];
LoadingSpinnerComponent.propDecorators = {
    'loadingConfig': [{ type: Input },],
    'accessibilityConfig': [{ type: Input },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Component with the gallery of thumbs.
 * In receives an array of Images, a boolean to show/hide
 * the gallery (feature used by imagePointer) and a config
 * object to customize the behaviour of this component.
 * Also, it emits click events as outputs.
 */
class PlainGalleryComponent {
    constructor() {
        /**
         * Output to emit an event when an image is changed.
         */
        this.show = new EventEmitter();
        /**
         * Bi-dimensional array of `Image` object to store images to display as plain gallery.
         * [] by default.
         */
        this.imageGrid = [];
        /**
         * Boolean passed as input to `ks-wrap` directive to configure flex-wrap css property.
         * However it's not enough, because you need to limit the width using `widthStyle` public variable.
         * For more info check https://developer.mozilla.org/it/docs/Web/CSS/flex-wrap
         */
        this.wrapStyle = false;
        /**
         * String passed as input to `ks-wrap` directive to set width to be able to force overflow.
         * In this way, `wrapStyle` (flex-wrap css property) will be used as requested.
         */
        this.widthStyle = '';
        /**
         * Default image size object
         */
        this.defaultSize = { width: '50px', height: 'auto' };
        /**
         * Default layout config object
         * Note that length=-1 means infinity
         */
        this.defaultLayout = new LineLayout(this.defaultSize, { length: -1, wrap: false }, 'flex-start');
        /**
         * Default plain gallery config object
         */
        this.defaultPlainConfig = {
            strategy: PlainGalleryStrategy.ROW,
            layout: this.defaultLayout,
            advanced: { aTags: false, additionalBackground: '50% 50%/cover' }
        };
    }
    /**
     * Method ´ngOnInit´ to init both `configPlainGallery` calling `initPlainGalleryConfig()`
     * and `imageGrid invoking `initImageGrid()`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called only one time!!!
     * @return {?}
     */
    ngOnInit() {
        this.configPlainGallery = this.initPlainGalleryConfig();
        this.initImageGrid();
    }
    /**
     * Method ´ngOnChanges´ to update both `imageGrid` and`configPlainGallery`.
     * This is an Angular's lifecycle hook, so its called automatically by Angular itself.
     * In particular, it's called when any data-bound property of a directive changes!!!
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ imagesChange = changes.images;
        const /** @type {?} */ configChange = changes.plainGalleryConfig;
        // I'm using !change.firstChange because the first time will be called both onInit and onChange and I don't
        // want to execute initialization two times.
        if (configChange &&
            !configChange.firstChange &&
            (configChange.previousValue !== configChange.currentValue || (!configChange.previousValue && !configChange.currentValue))) {
            this.configPlainGallery = this.initPlainGalleryConfig();
        }
        if (imagesChange && !imagesChange.firstChange && imagesChange.previousValue !== imagesChange.currentValue) {
            this.initImageGrid();
        }
    }
    /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the index number as payload.
     * @param {?} index
     * @return {?}
     */
    showModalGallery(index) {
        this.show.emit(index);
    }
    /**
     * Method called when you click on an image of the plain (or inline) gallery.
     * This will emit the show event with the image as payload.
     * @param {?} img
     * @return {?}
     */
    showModalGalleryByImage(img) {
        const /** @type {?} */ index = this.images.findIndex((val) => val && img && val.id === img.id);
        this.showModalGallery(index);
    }
    /**
     * Method to get `alt attribute`.
     * `alt` specifies an alternate text for an image, if the image cannot be displayed.
     * @param {?} image
     * @return {?}
     */
    getAltPlainDescriptionByImage(image) {
        if (!image) {
            return '';
        }
        return image.plain && image.plain.description ? image.plain.description : `Image ${getIndex(image, this.images) + 1}`;
    }
    /**
     * Method to get the title for an image.
     * @param {?} image
     * @return {?}
     */
    getTitleDisplay(image) {
        let /** @type {?} */ description = '';
        if (image.plain && image.plain.description) {
            description = image.plain.description;
        }
        else if (image.modal && image.modal.description) {
            description = image.modal.description;
        }
        const /** @type {?} */ currentIndex = getIndex(image, this.images);
        const /** @type {?} */ prevDescription = 'Image ' + (currentIndex + 1) + '/' + this.images.length;
        let /** @type {?} */ currImgDescription = description ? description : '';
        if (currImgDescription !== '') {
            currImgDescription = ' - ' + currImgDescription;
        }
        return prevDescription + currImgDescription;
    }
    /**
     * Method used in the template to track ids in ngFor.
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackById(index, item) {
        return item.id;
    }
    /**
     * Private method to build and return a `PlainGalleryConfig` object, proving also default values.
     * @throws an Error if layout and strategy aren't compatible
     * @return {?}
     */
    initPlainGalleryConfig() {
        const /** @type {?} */ config = Object.assign({}, this.defaultPlainConfig, this.plainGalleryConfig);
        if (config.layout instanceof LineLayout) {
            if (config.strategy !== PlainGalleryStrategy.ROW && config.strategy !== PlainGalleryStrategy.COLUMN) {
                throw new Error('LineLayout requires either ROW or COLUMN strategy');
            }
            if (!config.layout || !config.layout.breakConfig) {
                throw new Error('Both layout and breakConfig must be valid');
            }
        }
        if (config.layout instanceof GridLayout) {
            if (config.strategy !== PlainGalleryStrategy.GRID) {
                throw new Error('GridLayout requires GRID strategy');
            }
            if (!config.layout || !config.layout.breakConfig) {
                throw new Error('Both layout and breakConfig must be valid');
            }
            // force wrap for grid layout
            config.layout.breakConfig.wrap = true;
        }
        if (config.layout instanceof AdvancedLayout) {
            if (config.strategy !== PlainGalleryStrategy.CUSTOM) {
                throw new Error('AdvancedLayout requires CUSTOM strategy');
            }
        }
        return config;
    }
    /**
     * Private method to init both `imageGrid` and other style variables,
     * based on the layout type.
     * @return {?}
     */
    initImageGrid() {
        const /** @type {?} */ config = this.configPlainGallery;
        // reset the array to prevent issues in case of GridLayout
        this.imageGrid = [];
        if (config.layout instanceof LineLayout) {
            const /** @type {?} */ layout = config.layout;
            const /** @type {?} */ row = this.images.filter((val, i) => i < layout.breakConfig.length || layout.breakConfig.length === -1);
            this.imageGrid = [row];
            this.size = config.layout.size;
            switch (config.strategy) {
                case PlainGalleryStrategy.ROW:
                    this.directionStyle = 'row';
                    break;
                case PlainGalleryStrategy.COLUMN:
                    this.directionStyle = 'column';
                    this.wrapStyle = layout.breakConfig.wrap;
                    break;
            }
            this.justifyStyle = layout.justify;
        }
        if (config.layout instanceof GridLayout) {
            const /** @type {?} */ layout = config.layout;
            const /** @type {?} */ count = Math.ceil(this.images.length / layout.breakConfig.length);
            let /** @type {?} */ start = 0;
            let /** @type {?} */ end = layout.breakConfig.length - 1;
            for (let /** @type {?} */ j = 0; j < count; j++) {
                const /** @type {?} */ row = this.images.filter((val, i) => i >= start && i <= end);
                this.imageGrid.push(row);
                start = end + 1;
                end = start + layout.breakConfig.length - 1;
            }
            this.size = config.layout.size;
            const /** @type {?} */ pixels = +layout.size.width.replace('px', '');
            this.widthStyle = pixels * layout.breakConfig.length + pixels / 2 + 'px';
            this.wrapStyle = layout.breakConfig.wrap;
            this.directionStyle = 'row';
        }
        if (config.layout instanceof AdvancedLayout) {
            this.imageGrid = [this.images];
        }
    }
}
PlainGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'ks-plain-gallery',
                styles: [`
    .plain-container {
      -webkit-box-align: center;
              align-items: center;
      display: -webkit-box;
      display: flex; }
      .plain-container .image {
        cursor: pointer;
        height: auto;
        margin-left: 2px;
        margin-right: 2px;
        width: 50px; }
      .plain-container .a-tag-image {
        cursor: pointer;
        margin-left: 2px;
        margin-right: 2px; }
  `],
                template: `
    <div *ngIf="showGallery"
         class="plain-container"
         ksWrap [wrap]="wrapStyle" [width]="widthStyle"
         ksDirection [direction]="directionStyle" [justify]="justifyStyle"
         [attr.aria-label]="accessibilityConfig?.plainGalleryContentAriaLabel"
         [title]="accessibilityConfig?.plainGalleryContentTitle">

      <ng-container *ngFor="let imgRow of imageGrid; let i = index">
        <ng-container *ngFor="let imgCol of imgRow; let j = index">

          <ng-container *ngIf="!configPlainGallery.advanced?.aTags; else aTags">
            <img *ngIf="imgCol?.modal?.img"
                 [src]="imgCol.plain?.img ? imgCol.plain.img : imgCol.modal.img"
                 class="image"
                 ksSize [sizeConfig]="{width: size?.width, height: size?.height}"
                 [attr.aria-label]="imgCol.plain?.ariaLabel"
                 [title]="imgCol.plain?.title ? imgCol.plain.title : getTitleDisplay(imgCol)"
                 alt="{{imgCol.plain?.alt ? imgCol.plain.alt : getAltPlainDescriptionByImage(imgCol)}}"
                 [tabindex]="0" role="img"
                 (click)="showModalGalleryByImage(imgCol)" (keyup)="showModalGalleryByImage(imgCol)"/>
          </ng-container>

          <!-- Add directive to set background with the image url as param to pass thumb or img-->
          <!-- to do something like this <a style="background: url('path to image') 50% 50%/cover">.-->
          <ng-template #aTags>
            <a *ngIf="imgCol?.modal?.img"
               class="a-tag-image"
               ksATagBgImage [image]="imgCol" [style]="configPlainGallery.advanced?.additionalBackground"
               ksSize [sizeConfig]="{width: size?.width, height: size?.height}"
               [attr.aria-label]="imgCol.plain?.ariaLabel"
               [title]="imgCol.plain?.title ? imgCol.plain.title : getTitleDisplay(imgCol)"
               [tabindex]="0"
               (click)="showModalGallery(j)" (keyup)="showModalGallery(j)"></a>
          </ng-template>

        </ng-container>
      </ng-container>

    </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
PlainGalleryComponent.ctorParameters = () => [];
PlainGalleryComponent.propDecorators = {
    'images': [{ type: Input },],
    'showGallery': [{ type: Input },],
    'plainGalleryConfig': [{ type: Input },],
    'accessibilityConfig': [{ type: Input },],
    'show': [{ type: Output },],
};

/*
 The MIT License (MIT)

 Copyright (c) 2017 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Array of all components.
 */
const COMPONENTS = [
    BackgroundComponent,
    PlainGalleryComponent,
    ModalGalleryComponent,
    UpperButtonsComponent,
    DotsComponent,
    PreviewsComponent,
    CurrentImageComponent,
    LoadingSpinnerComponent,
    AccessibleComponent
];

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Module with `forRoot` method to import it in the root module of your application.
 */
class ModalGalleryModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: ModalGalleryModule,
            providers: [
                {
                    provide: KEYBOARD_CONFIGURATION,
                    useValue: config ? config : {}
                },
                {
                    provide: KeyboardService,
                    useFactory: setupKeyboardService,
                    deps: [KEYBOARD_CONFIGURATION]
                },
                {
                    provide: GalleryService,
                    useFactory: setupGalleryService
                }
            ]
        };
    }
}
ModalGalleryModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [COMPONENTS, DIRECTIVES],
                exports: [ModalGalleryComponent]
            },] },
];
/**
 * @nocollapse
 */
ModalGalleryModule.ctorParameters = () => [];
/**
 * Function to setup the keyboard service inside the `forRoot` method.
 * @param {?} injector
 * @return {?}
 */
function setupKeyboardService(injector) {
    return new KeyboardService(injector);
}
/**
 * @return {?}
 */
function setupGalleryService() {
    return new GalleryService();
}

/*
 The MIT License (MIT)

 Copyright (c) 2017-2018 Stefano Cappa (Ks89)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/**
 * Index file to export all interfaces, enums, classes and so on.
 * This file represents the public apis.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ModalGalleryModule, Action, Image, ImageModalEvent, DescriptionStrategy, ButtonsStrategy, ButtonType, GalleryService, KS_DEFAULT_ACCESSIBILITY_CONFIG, KS_DEFAULT_BTN_CLOSE, KS_DEFAULT_BTN_DELETE, KS_DEFAULT_BTN_DOWNLOAD, KS_DEFAULT_BTN_EXTURL, KS_DEFAULT_SIZE, LineLayout, GridLayout, AdvancedLayout, PlainGalleryStrategy, AccessibleComponent as ɵh, BackgroundComponent as ɵe, COMPONENTS as ɵc, CurrentImageComponent as ɵg, LoadingSpinnerComponent as ɵo, DotsComponent as ɵm, ModalGalleryComponent as ɵd, PlainGalleryComponent as ɵf, PreviewsComponent as ɵn, UpperButtonsComponent as ɵl, ATagBgImageDirective as ɵv, ClickOutsideDirective as ɵq, DescriptionDirective as ɵw, DirectionDirective as ɵu, DIRECTIVES as ɵp, KeyboardNavigationDirective as ɵs, SizeDirective as ɵr, WrapDirective as ɵt, setupGalleryService as ɵb, setupKeyboardService as ɵa, KEYBOARD_CONFIGURATION as ɵi, KeyboardService as ɵj };
//# sourceMappingURL=angular-modal-gallery.js.map

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ibcommon-lib')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'ibcommon-lib'], factory) :
	(factory((global['plugin-image'] = {}),global.core,global.ibcommonLib));
}(this, (function (exports,core,ibcommonLib) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}





function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var ImageComponent = /** @class */ (function (_super) {
    __extends(ImageComponent, _super);
    function ImageComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageComponent.prototype.ngOnInit = function () {
    };
    ImageComponent = __decorate([
        core.Component({
            selector: 'lib-board-image',
            template: "<img style=\"background-size:contain;width:100%;height:100%\" [src]=\"context.src\">",
            styles: [""]
        })
    ], ImageComponent);
    return ImageComponent;
}(ibcommonLib.DynamicComponent));

var IbImageElementModule = /** @class */ (function () {
    function IbImageElementModule() {
    }
    IbImageElementModule = __decorate([
        core.NgModule({
            declarations: [ImageComponent],
            imports: [],
            exports: [ImageComponent],
            entryComponents: [ImageComponent],
            providers: [{
                    provide: 'plugins',
                    useValue: [{
                            name: 'plugin-image-component',
                            component: ImageComponent
                        }],
                    multi: true
                }]
        })
    ], IbImageElementModule);
    return IbImageElementModule;
}());

exports.IbImageElementModule = IbImageElementModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));

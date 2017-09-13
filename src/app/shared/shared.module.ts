// ./app/shared/shared.module.ts
import { NgModule } from '@angular/core';

import { HiddenDirective } from './hidden.directive';
import { GlidejsDirective } from './glidejs.directive';

@NgModule({
    declarations: [
        HiddenDirective,
        GlidejsDirective
    ],
    exports: [
        HiddenDirective,
        GlidejsDirective
    ]
})
export class SharedModule{}
import { CommonModule  } from '@angular/common'
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
//import { HttpModule } from '@angular/http';
import { InlineEditComponent } from './inlineEdit.component'


@NgModule({
    imports: [
        CommonModule, FormsModule
        //,BrowserModule, FormsModule, HttpModule
     ],
    declarations: [
        InlineEditComponent
    ],
    exports: [
        InlineEditComponent
    ]
})

export class AppInlineEditModule {
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: AppInlineEditModule
        };
      }
}

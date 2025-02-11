import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitleSizeDirective } from './directives/title-size.directive';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    FullNamePipe,
    TitleSizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FullNamePipe,
    TitleSizeDirective,
    MatListModule
  ]
})
export class SharedModule { }

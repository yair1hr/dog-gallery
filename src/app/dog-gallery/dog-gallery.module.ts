import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogGalleryComponent } from './dog-gallery/dog-gallery.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { DogDetailsComponent } from './dog-details/dog-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    DogGalleryComponent,
    DogDetailsComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [DogGalleryComponent]
})
export class DogGalleryModule { }

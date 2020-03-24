import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Component libraries
import { MaterialModule } from './material.module';
// import { KendoModule } from './kendo.module';

// Generic Components

// import { HourPipe } from './pipes/pipes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [
    // HourPipe
  ],
  providers: [
    // HourPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // LayoutModule,
    // FlexLayoutModule,
    // Material
    MaterialModule,
    // Components
    // HourPipe
  ]
})
export class SharedModule { }

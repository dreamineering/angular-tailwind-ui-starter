import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Component libraries
import { MaterialModule } from './material.module';

// Generic Components
import { ButtonComponent } from './components/button.component';

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
    ButtonComponent
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
    ButtonComponent
    // HourPipe
  ]
})
export class SharedModule { }

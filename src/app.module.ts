import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ImpactMapComponent } from './impactMap/impactMap.component';
import { QuestionComponent } from './question/question.component';
import { DocumentService } from './services/documentService';
 
@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    ImpactMapComponent,
    QuestionComponent
  ],
  bootstrap: [ ImpactMapComponent, QuestionComponent ],
  providers: [ DocumentService ],
  exports: [
    ReactiveFormsModule
  ]
})
export class AppModule { }
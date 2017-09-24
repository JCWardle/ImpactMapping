import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ImpactMapComponent } from './impactMap/impactMap.component';
import { QuestionComponent } from './question/question.component';
import { MasterComponent } from './master/master.component';
import { DocumentService } from './services/documentService';
 
const appRoutes: Routes = [
  { path: 'map', component: ImpactMapComponent},
  { path: '', component: QuestionComponent },
  { path: '**', component: QuestionComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  declarations: [
    ImpactMapComponent,
    QuestionComponent,
    MasterComponent
  ],
  bootstrap: [ MasterComponent ],
  providers: [ DocumentService ],
  exports: [
    ReactiveFormsModule
  ]
})
export class AppModule { }
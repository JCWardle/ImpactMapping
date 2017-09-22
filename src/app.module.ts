import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
 
import { ImpactMapComponent } from './impactMap/impactMap.component';
import { QuestionComponent } from './question/question.component';
 
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ImpactMapComponent,
    QuestionComponent
  ],
  bootstrap: [ ImpactMapComponent ]
})
export class AppModule { }
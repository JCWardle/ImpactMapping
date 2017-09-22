import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
 
import { ImpactMapComponent } from './impactMap/impactMap.component';
 
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ImpactMapComponent
  ],
  bootstrap: [ ImpactMapComponent ]
})
export class AppModule { }
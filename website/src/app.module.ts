import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ImpactMapComponent } from './impactMap/impactMap.component';
import { CardComponent } from './card/card.component';
import { MasterComponent } from './master/master.component';
import { DocumentService } from './services/documentService';
import { HomeComponent } from './home/home.component';
import { ImpactColumnComponent } from './impactColumn/impactColumn.component';
 
const appRoutes: Routes = [
  { path: 'map', component: ImpactMapComponent},
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true, enableTracing: true }),
    HttpClientModule
  ],
  declarations: [
    ImpactMapComponent,
    CardComponent,
    MasterComponent,
    ImpactColumnComponent,
    HomeComponent
  ],
  bootstrap: [ MasterComponent ],
  providers: [ DocumentService, CardComponent ],
  exports: [
    ReactiveFormsModule
  ],
  entryComponents: [ CardComponent ]
})
export class AppModule { }
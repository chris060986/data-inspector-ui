import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {CompleteMaterialModule} from './complete-material/complete-material.module';
import {DataInspectorComponent} from './data-inspector.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FullListComponent } from './components/full-list/full-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {FullListService} from './components/full-list/full-list.service';
import { HttpClientModule } from '@angular/common/http';
import {WebsocketService} from './websocket/websocket.service';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormLevelComponent } from './components/dynamic-form/form-level/form-level.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormElementComponent } from './components/dynamic-form/form-level/form-element/form-element.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CompleteMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  declarations: [
    DataInspectorComponent,
    NavigationComponent,
    FullListComponent,
    PageNotFoundComponent,
    DynamicFormComponent,
    FormLevelComponent,
    FormElementComponent
  ],
  exports: [DataInspectorComponent],
  providers: [
    FullListService,
    WebsocketService
  ]
})
export class DataInspectorModule { }

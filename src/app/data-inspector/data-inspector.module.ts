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

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    CompleteMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  declarations: [
    DataInspectorComponent,
    NavigationComponent,
    FullListComponent,
    PageNotFoundComponent
  ],
  exports: [DataInspectorComponent],
  providers: [
    FullListService,
    WebsocketService
  ]
})
export class DataInspectorModule { }

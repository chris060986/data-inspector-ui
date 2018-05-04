import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {DataInspectorModule} from './data-inspector/data-inspector.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DataInspectorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CompleteMaterialModule } from './complete-material/complete-material.module';
import { DataInspectorComponent } from './data-inspector.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormLevelComponent } from './components/dynamic-form/form-level/form-level.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormElementComponent } from './components/dynamic-form/form-level/form-element/form-element.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataViewComponent } from './components/data-view/data-view.component';
import { TableViewComponent } from './components/data-view/table-view/table-view.component';
import { SendDialogComponent } from './components/send-dialog/send-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CompleteMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  declarations: [
    DataInspectorComponent,
    NavigationComponent,
    DynamicFormComponent,
    FormLevelComponent,
    FormElementComponent,
    ListViewComponent,
    DataViewComponent,
    TableViewComponent,
    SendDialogComponent,
  ],
  entryComponents: [
    SendDialogComponent
  ],
  exports: [
    DataInspectorComponent
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }, {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    }
  ]
})
export class DataInspectorModule { }

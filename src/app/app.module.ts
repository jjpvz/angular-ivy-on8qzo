import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [NgSelectModule, BrowserModule, FormsModule, ReactiveFormsModule, DragDropModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

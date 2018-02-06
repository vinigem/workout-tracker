import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { CreateWorkoutComponent } from './workout/create-workout.component';
import { EditWorkoutComponent } from './workout/edit-workout.component';
//import { StartWorkoutComponent } from './workout/start-workout.component';
//import { EndWorkoutComponent } from './workout/end-workout.component';
import { CreateCategoryComponent } from './category/create-category.component';
import { TrackComponent } from './track/track.component';

import { HttpService } from './http.service';

import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';

import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent, ViewComponent, CreateWorkoutComponent, EditWorkoutComponent,
      /*StartWorkoutComponent, EndWorkoutComponent,*/ CreateCategoryComponent,
      TrackComponent, AlertComponent, ModalComponent
  ],
  imports: [
    BrowserModule, RoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [ HttpService, AlertService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

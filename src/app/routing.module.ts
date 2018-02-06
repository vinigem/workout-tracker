import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewComponent } from './view/view.component';
import { CreateWorkoutComponent } from './workout/create-workout.component';
import { EditWorkoutComponent } from './workout/edit-workout.component';
import { StartWorkoutComponent } from './workout/start-workout.component';
import { EndWorkoutComponent } from './workout/end-workout.component';
import { CreateCategoryComponent } from './category/create-category.component';
import { TrackComponent } from './track/track.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: ViewComponent },
    { path: 'view', component: ViewComponent },
    { path: 'create-workout', component: CreateWorkoutComponent },
    { path: 'edit-workout/:workout', component: EditWorkoutComponent },
    { path: 'create-category', component: CreateCategoryComponent },
    { path: 'track', component: TrackComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }

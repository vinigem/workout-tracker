import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Workout } from '../workout/workout';

@Component({
  templateUrl: './view.component.html'
})
export class ViewComponent {

  workouts: Array<Workout>;

  constructor(private httpService: HttpService) {
    this.workouts = this.httpService.getWorkouts();
  }

  filterWorkouts(search: string): void {
    this.workouts = this.httpService.getWorkouts().filter(workout => {
      return workout.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }
  
}
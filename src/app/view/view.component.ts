import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { AlertService } from '../alert/alert.service';
import { Workout } from '../workout/workout';

@Component({
  templateUrl: './view.component.html'
})
export class ViewComponent {

  workouts: Array<Workout>;
  workoutStarted: number;

  constructor(private httpService: HttpService, private alertService: AlertService) {
    this.workouts = this.httpService.getWorkouts();
  }

  filterWorkouts(search: string): void {
    this.workouts = this.httpService.getWorkouts().filter(workout => {
      return workout.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }

  deleteWorkout(idx: number): void {
    const status = this.httpService.deleteWorkout(idx);
    if(status) {
      this.alertService.addAlert('Workout deleted successfully..!!', 'success');
      this.workouts = this.httpService.getWorkouts();
    }
  }

  startWorkout(idx: number): void {
    this.workoutStarted = idx;
  }

  endWorkout(idx: number): void {
    this.workoutStarted = null;
  }
  
}
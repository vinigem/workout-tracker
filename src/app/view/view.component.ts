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
  workoutEnded: number;
  openStartWorkout: boolean;
  openEndWorkout: boolean;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  currentWorkout: Workout;

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

  openStartPopup(idx: number): void {
    this.workoutStarted = idx;
    this.currentWorkout = this.workouts[idx];
    this.startDate = new Date();
    this.startTime = new Date();
    this.openStartWorkout = true;
  }

  startWorkout(): void {
        
  }

  cancelStartWorkout(): void {
    this.openStartWorkout = false;
    this.workoutStarted = null;
    this.currentWorkout = null;
    this.startDate = null;
    this.startTime = null;
  }

  openEndPopup(idx: number): void {
    this.workoutEnded = idx;
    this.currentWorkout = this.workouts[idx];
    this.endDate = new Date();
    this.endTime = new Date();
    this.openEndWorkout = true;
  }

  endWorkout(): void {
        
  }

  cancelEndWorkout(): void {
    this.openEndWorkout = false;
    this.workoutStarted = null;
    this.currentWorkout = null;
    this.endDate = null;
    this.endTime = null;
  }
  
}
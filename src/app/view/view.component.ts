import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { AlertService } from '../alert/alert.service';
import { Workout } from '../workout/workout';
import { DateUtil } from '../utils/date-util';

@Component({
  templateUrl: './view.component.html'
})
export class ViewComponent {

  workouts: Array<Workout>;
  workoutStarted: number;
  workoutEnded: number;
  openStartWorkout: boolean;
  openEndWorkout: boolean;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  currentWorkout: Workout;
  workoutEntry: any;

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
    this.startDate = DateUtil.getCurrentDate();
    this.startTime = DateUtil.getCurrentTime();
    this.openStartWorkout = true;
  }

  startWorkout(): void {
    this.workoutEntry = {
      title: this.currentWorkout.title,
      note: this.currentWorkout.note,
      startDate: this.startDate,
      startTime: this.startTime
    }

    this.httpService.saveWorkoutEntry(this.workoutEntry);
    this.openStartWorkout = false;      
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
    this.endDate = DateUtil.getCurrentDate();
    this.endTime = DateUtil.getCurrentTime();
    this.openEndWorkout = true;
  }

  endWorkout(): void {
    this.workoutEntry = {
      ...this.workoutEntry,
      endDate: this.endDate,
      endTime: this.endTime,
      calories: this.currentWorkout.calories
    }

    this.httpService.updateWorkoutEntry(this.workoutEntry);

    this.openEndWorkout = true;
    this.resetWorkoutEntry();      
  }

  cancelEndWorkout(): void {
    this.openEndWorkout = false;
    this.workoutStarted = null;
    this.currentWorkout = null;
    this.endDate = null;
    this.endTime = null;
  }

  resetWorkoutEntry(): void{
    this.openStartWorkout = false;
    this.workoutStarted = null;
    this.currentWorkout = null;
    this.startDate = null;
    this.startTime = null;
    this.openEndWorkout = false;
    this.workoutStarted = null;
    this.endDate = null;
    this.endTime = null;
    this.workoutEntry = null;
  }
  
}
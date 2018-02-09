import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { DateUtil } from '../utils/date-util';

@Component({
  templateUrl: './track.component.html'
})
export class TrackComponent {

  workoutEntries: Array<any>;
  lastDayWorkoutTime: number;
  lastWeekWorkoutTime: number;
  lastMonthWorkoutTime: number;

  constructor(private httpService: HttpService) {
    this.workoutEntries = this.httpService.getWorkoutEntries();
    this.calculateWorkoutTime();
  }
  
  calculateWorkoutTime(): void {
    const lastDay = DateUtil.getLastDay();
    
    this.lastDayWorkoutTime = this.workoutEntries.reduce((total, workoutEntry) => {
      if(workoutEntry.startDate === lastDay) {
        total += DateUtil.substractTime(workoutEntry.endTime, workoutEntry.startTime);
      }
      return total;
    }, 0);

    const lastMonth = DateUtil.getLastMonth();
    this.lastMonthWorkoutTime = this.workoutEntries.reduce((total, workoutEntry) => {
      if(workoutEntry.startDate.split('-')[1] === lastMonth) {
        total += DateUtil.substractTime(workoutEntry.endTime, workoutEntry.startTime);
      }
      return total;
    }, 0);

    const now = new Date();
    const lastWeekEnd = now.getDay() === 0 ? 7 : now.getDay();
    let lastWeekEndDate = new Date(now);
    lastWeekEndDate.setDate(now.getDate() - lastWeekEnd);
    
    this.lastWeekWorkoutTime = 0;
    for(let i = 0; i <= 6; i++) {
      let formattedDate = DateUtil.formatDate(lastWeekEndDate);
      this.lastWeekWorkoutTime = this.workoutEntries.reduce((total, workoutEntry) => {
        if(workoutEntry.startDate === formattedDate) {
          total += DateUtil.substractTime(workoutEntry.endTime, workoutEntry.startTime);
        }
        return total;
      }, this.lastWeekWorkoutTime); 
      lastWeekEndDate = DateUtil.getDateBefore(lastWeekEndDate); 
    }
  }

  


}

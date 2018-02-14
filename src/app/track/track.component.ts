import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { DateUtil } from '../utils/date-util';
import { ChartData } from '../chart/chart-data';

@Component({
  templateUrl: './track.component.html'
})
export class TrackComponent {

  workoutEntries: Array<any>;
  dayWorkoutTime: number;
  weekWorkoutTime: number;
  monthWorkoutTime: number;
  weekChartData: ChartData;
  monthChartData: ChartData;
  yearChartData: ChartData

  constructor(private httpService: HttpService) {
    this.workoutEntries = this.httpService.getWorkoutEntries();
    this.calculateWorkoutTime();
  }

  calculateWorkoutTime(): void {
    // calculate day workout time
    this.calculateDayWorkout();

    // calculate week workout time
    this.calculateWeekWorkout();

    // calculate month workout time
    this.calculateMonthWorkout();

    this.prepareWeekChartData();
    this.prepareMonthChartData();
    this.prepareYearChartData();
  }

  /**
   * calculate day workout time in minutes
   */
  calculateDayWorkout(): void {
    const today = DateUtil.getCurrentDate();
    this.dayWorkoutTime = this.workoutEntries.reduce((total, workoutEntry) => {
      if (workoutEntry.startDate === today) {
        total += DateUtil.getTimeDiffInMinute(workoutEntry.endTime, workoutEntry.startTime);
      }
      return total;
    }, 0);
  }

  /**
   * calculate week workout time in minutes
   */
  calculateWeekWorkout(): void {
    const now = new Date();
    const monday = DateUtil.getMonday(now);
    const sunday = DateUtil.getSunday(now);

    this.weekWorkoutTime = 0;

    this.weekWorkoutTime = this.workoutEntries.reduce((total, workoutEntry) => {
      let workoutStartDate = new Date(workoutEntry.startDate);
      let workoutEndDate = new Date(workoutEntry.endDate);
      if (workoutStartDate >= monday && workoutStartDate <= sunday) {
        total += DateUtil.getDiffInMinutes(workoutEntry.endDate, workoutEntry.startDate, workoutEntry.endTime, workoutEntry.startTime);
      }
      return total;
    }, this.weekWorkoutTime);
  }

  /**
   * calculate last month workout time in minutes
   */
  calculateMonthWorkout(): void {
    const currentMonth = DateUtil.getCurrentMonth();
    this.monthWorkoutTime = this.workoutEntries.reduce((total, workoutEntry) => {
      if (workoutEntry.startDate.split('-')[1] === currentMonth) {
        total += DateUtil.getDiffInMinutes(workoutEntry.endDate, workoutEntry.startDate, workoutEntry.endTime, workoutEntry.startTime);
      }
      return total;
    }, 0);
  }

  prepareWeekChartData(): void {
    let caloriesBurnt = 0;
    this.weekChartData = {
      id: 'weekChart',
      label: '',
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [0, 0, 0, 0, 0, 0, 0],
      height: 200,
      width: 400
    };

    const now = new Date();
    const startDate = DateUtil.getMonday(now);

    for (let i = 0; i < 7; i++) {
      let date = DateUtil.formatDate(startDate); 
      this.workoutEntries.forEach(workout => {
        if(workout.startDate === date){
          caloriesBurnt += (DateUtil.getTimeDiffInMinute(workout.endTime, workout.startTime ) * workout.calories);
          this.weekChartData.data[i] += (DateUtil.getTimeDiffInMinute(workout.endTime, workout.startTime ) * workout.calories);
        }
      });
      startDate.setDate(startDate.getDate() + 1);
    }
    this.weekChartData.label = 'Week Total Calories Burnt: ' + caloriesBurnt;
  }

  prepareMonthChartData(): void {
    let caloriesBurnt = 0;
    this.monthChartData = {
      id: 'monthChart',
      label: '',
      labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5'],
      data: [0, 0, 0, 0, 0],
      height: 200,
      width: 400
    };

    const now = new Date();
    const weeks = DateUtil.getWeeksStartAndEndInMonth(now.getMonth(), now.getFullYear(), 'monday');

    for (let i = 0; i < weeks.length; i++) {
      const startDate = weeks[i].start;
      const endDate = weeks[i].end;
      this.workoutEntries.forEach(workout => {
        const workoutStartDate = parseInt(workout.startDate.split('-')[2]);
        if( workoutStartDate >= startDate && workoutStartDate <= endDate){
          caloriesBurnt += (DateUtil.getTimeDiffInMinute(workout.endTime, workout.startTime ) * workout.calories);
          this.monthChartData.data[i] += (DateUtil.getTimeDiffInMinute(workout.endTime, workout.startTime ) * workout.calories);;
        }
      });
    }
    this.monthChartData.label = 'Month Total Calories Burnt: ' + caloriesBurnt;
  }

  prepareYearChartData(): void {
    let caloriesBurnt = 0;
    this.yearChartData = {
      id: 'yearChart',
      label: '',
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      height: 200,
      width: 400
    };

    for (let i = 1; i <= 12; i++) {
      let month = ("0" + i).slice(-2);
      this.workoutEntries.forEach(workout => {
        if(workout.startDate.split('-')[1] === month){
          caloriesBurnt += (DateUtil.getTimeDiffInMinute(workout.endTime, workout.startTime ) * workout.calories);
          this.yearChartData.data[i-1] += (DateUtil.getTimeDiffInMinute(workout.endTime, workout.startTime ) * workout.calories);
        }
      });
    }
    this.yearChartData.label = 'Year Total Calories Burnt: ' + caloriesBurnt;
  }


}

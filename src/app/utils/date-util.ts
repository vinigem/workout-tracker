const MINUTES_PER_DAY = 60 * 24;

export class DateUtil {

    /**
     * difference of two time of hh:mm format in minutes
     * @param endTime the end time in hh:mm
     * @param startTime the start time in hh:mm
     */
    public static getTimeDiffInMinute(endTime: string, startTime: string): number {
        const endHour = parseInt(endTime.split(':')[0]);
        const endMinutes = parseInt(endTime.split(':')[1]);
        const startHour = parseInt(startTime.split(':')[0]);
        const startMinutes = parseInt(startTime.split(':')[1]);
        return (endMinutes - startMinutes) + ((endHour - startHour) * 60);
    }

    /** 
     * get current date in yyyy-mm-dd format
     */
    public static getCurrentDate(): string {
        const now = new Date();
        const day = ("0" + now.getDate()).slice(-2);
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        return now.getFullYear() + "-" + (month) + "-" + (day);
    }

    /**
     * get current time in hh:mm format
     */
    public static getCurrentTime(): string {
        const now = new Date();
        return ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2);
    }

    /**
     * get current month number
     */
    public static getCurrentMonth(): string {
        const now = new Date();
        return ("0" + (now.getMonth() + 1)).slice(-2)
    }

    /**
     * from date in yyyy-mm-dd fromat
     * @param date the date to format
     */
    public static formatDate(date: Date): string {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        return date.getFullYear() + "-" + (month) + "-" + (day);
    }

    /**
     * get date and time difference in minutes
     * @param endDate the end date in yyyy-mm-dd
     * @param startDate the start date in yyyy-mm-dd
     * @param endTime the end time in hh:mm
     * @param startTime the start time in hh:mm
     */
    public static getDiffInMinutes(endDate: string, startDate: string, endTime: string, startTime: string): number {
        const timeDifferenceInMinutes = DateUtil.getTimeDiffInMinute(endTime, startTime);
        const dateDifferenceInDays = DateUtil.dateDiffInDays(new Date(startDate), new Date(endDate));
        return Math.floor(dateDifferenceInDays * MINUTES_PER_DAY) + timeDifferenceInMinutes;
    }

    /**
     * get date difference in days
     * @param startDate the start date
     * @param endDate the end date
     */
    public static dateDiffInDays(startDate: Date, endDate: Date) {
        const utcStartDate = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const utcEndDate = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        return utcEndDate - utcStartDate;
    }

    /**
     * get date of monday's date of week
     * @param date the date
     */
    public static getMonday(date: Date) {
        const day = date.getDay()
        const diff = date.getDate() - day + (day == 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    }

    /**
     * get date of sunday's date of week
     * @param date the date
     */
    public static getSunday(date: Date) {
        const day = date.getDay()
        const diff = date.getDate() - day + (day == 0 ? 0 : 7);
        return new Date(date.setDate(diff));
    }

    public static getWeeksStartAndEndInMonth(month, year, startDay) {
        let weeks = [],
            firstDate = new Date(year, month, 1),
            lastDate = new Date(year, month + 1, 0),
            numDays = lastDate.getDate();

        let start = 1;
        let end = 7 - firstDate.getDay();
        if (startDay === 'monday') {
            if (firstDate.getDay() === 0) {
                end = 1;
            } else {
                end = 7 - firstDate.getDay() + 1;
            }
        }
        while (start <= numDays) {
            weeks.push({ start: start, end: end });
            start = end + 1;
            end = end + 7;
            end = start === 1 && end === 8 ? 1 : end;
            if (end > numDays) {
                end = numDays;
            }
        }
        return weeks;
    }


}
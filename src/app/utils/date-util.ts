export class DateUtil {

    /**
     * subtract two time of hh:mm format and return difference in minutes
     * @param endTime the end time in hh:mm
     * @param startTime the start time in hh:mm
     */
    public static substractTime(endTime: string, startTime: string): number {
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
        return now.getFullYear()+"-"+(month)+"-"+(day);
    }

    /**
     * get current time in hh:mm format
     */
    public static getCurrentTime(): string {
        const now = new Date();
        return ("0" + now.getHours()).slice(-2) + ":" +  ("0" + now.getMinutes()).slice(-2);
    }

    /**
     * get yesterday's date in yyyy-mm-dd format
     */
    public static getLastDay(): string {
        const now = new Date();
        const day = ("0" + (now.getDate() - 1)).slice(-2);
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        return now.getFullYear()+"-"+(month)+"-"+(day);
    }

    /**
     * get last month number
     */
    public static getLastMonth(): string {
        const now = new Date();
        return ("0" + (now.getMonth())).slice(-2)
    }

    /**
     * get the date before given date in yyyy-mm-dd format
     * @param date the date
     */
    public static getDateBefore(date: Date): Date {
        const beforeDate = new Date(date);
        beforeDate.setDate(date.getDate() - 1);
        return beforeDate;
    }

    /**
     * from date in yyyy-mm-dd fromat
     * @param date the date to format
     */
    public static formatDate(date: Date): string {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        return date.getFullYear()+"-"+(month)+"-"+(day);
    }
    
}
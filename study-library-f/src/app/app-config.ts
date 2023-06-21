import { environment } from "src/environments/environment"

export class AppConfig {
    static endpoints = {
        Login: environment.baseApiUrl + "login",
        Register: environment.baseApiUrl + "register",
        User_profile: environment.baseApiUrl +  "user-profile/",
        // Student Enrollments
        StudentList: environment.baseApiUrl + "enrollments/",
        SaveStudent: environment.baseApiUrl + "enrollments/" + "add",
        GetStudent: environment.baseApiUrl + "enrollments/",
        // Seat Allotment
        SeatAllotmentList: environment.baseApiUrl + "allotment/" + "seats",
        createSeatAllotment: environment.baseApiUrl + "allotment/" + "create/",
    }
}
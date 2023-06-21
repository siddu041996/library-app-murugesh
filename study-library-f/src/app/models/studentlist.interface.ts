export interface User {
    _id: number;
    name: String;
    username: string;
    email: String;
    password: String;
    role: string;
}
export type UserType = User[]

export interface ResponseStatus {
    code: number,
    ststusCode: number
}
export interface ResponseObject {
    successResponse: SuccessResponseObject,
    errorResponse: object | any
}
export interface SuccessResponseObject {
    studentList: StudentList[]
}
export interface MonthlyPayment {
    due_month: string;
    paid_amount: number;
    paid_date: string;
    paid_status: boolean;
}
export interface StudentList {
    student_id: number;
    student_status: boolean;
    student_fname: string;
    student_lname: string;
    student_seatnumber: number;
    student_email: string;
    student_mobilenumber: string;
    student_address: string;
    student_city: string;
    student_state: string;
    student_zipcode: string;
    student_termsandcondition: boolean;
    student_branch: string;
    student_joining_date: string;
    student_end_date: string;
    student_monthly_paid: MonthlyPayment[]
}
export interface FetchStudentlist {
    responseStatus: ResponseStatus,
    responseObject: ResponseObject,
}
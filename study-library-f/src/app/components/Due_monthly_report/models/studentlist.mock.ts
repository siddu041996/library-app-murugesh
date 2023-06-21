import { FetchStudentlist } from "../models/studentlist.interface"

export const All_StudentsList: FetchStudentlist = {
    responseObject: {
        successResponse: {
            studentList: [
                { 
                    student_id:1,
                    student_status: true,
                    student_fname:"Aksha1",
                    student_lname: "lname",
                    student_seatnumber: 1,
                    student_email:"Raj@gmail.com", 
                    student_mobilenumber: "876543211234",
                    student_address: "aTHANI",
                    student_city: "Atn",
                    student_state: "Kar",
                    student_zipcode: "654367",
                    student_termsandcondition: true,
                    student_branch: "Branch1",
                    student_joining_date: "22-03-2023",
                    student_end_date: "null",
                    student_unpaid_count: 1
                },
                { 
                    student_id:2,
                    student_status: true,
                    student_fname:"Aksha2",
                    student_lname: "lname",
                    student_seatnumber: 2,
                    student_email:"Raj@gmail.com", 
                    student_mobilenumber: "876543211234",
                    student_address: "aTHANI",
                    student_city: "Atn",
                    student_state: "Kar",
                    student_zipcode: "654367",
                    student_termsandcondition: true,
                    student_branch: "Branch1",
                    student_joining_date: "22-03-2023",
                    student_end_date: "null",
                    student_unpaid_count: 0
                },
            ]
        },
        errorResponse: null
    },
    responseStatus: {
        code: 0,
        ststusCode: 200
    }
}
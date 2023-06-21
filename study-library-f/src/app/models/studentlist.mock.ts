import { FetchStudentlist, UserType } from "../models/studentlist.interface"

export const FetchUser: UserType = [
    {
        _id: 1,
        name: "murugesh",
        username: "Admin",
        email: "murugesh@gmail.com",
        password: "12345",
        role: "admin",
    },
    {
        _id: 2,
        name: "murugesh",
        username: "Admin",
        email: "murugesh@gmail.com",
        password: "12345",
        role: "user",
    },
]

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
                    student_monthly_paid: [
                        {
                            due_month: "22-01-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: false
                        },
                        {
                            due_month: "22-02-2023",
                            paid_amount: 0,
                            paid_date: "paid date",
                            paid_status: false
                        },
                        {
                            due_month: "22-03-2023",
                            paid_amount: 0,
                            paid_date: "paid date",
                            paid_status: false
                        }
                    ],
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
                    student_monthly_paid:[
                        {
                            due_month: "22-02-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        },
                        {
                            due_month: "22-03-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        }
                    ],
                },
                {
                    student_id:3,
                    student_status: false,
                    student_fname:"Aksha3",
                    student_lname: "lname",
                    student_seatnumber: 3,
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
                    student_monthly_paid:[
                        {
                            due_month: "22-02-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        },
                        {
                            due_month: "22-03-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        }
                    ],
                },
                {
                    student_id:4,
                    student_status: true,
                    student_fname:"Aksha4",
                    student_lname: "lname",
                    student_seatnumber: 3,
                    student_email:"Raj@gmail.com", 
                    student_mobilenumber: "876543211234",
                    student_address: "aTHANI",
                    student_city: "Atn",
                    student_state: "Kar",
                    student_zipcode: "654367",
                    student_termsandcondition: false,
                    student_branch: "Branch1",
                    student_joining_date: "22-03-2023",
                    student_end_date: "null",
                    student_monthly_paid:[
                        {
                            due_month: "22-02-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        },
                        {
                            due_month: "22-03-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        }
                    ],
                },
                {
                    student_id:6,
                    student_status: true,
                    student_fname:"Aksha6",
                    student_lname: "lname",
                    student_seatnumber: 3,
                    student_email:"Raj@gmail.com", 
                    student_mobilenumber: "876543211234",
                    student_address: "aTHANI",
                    student_city: "Atn",
                    student_state: "Kar",
                    student_zipcode: "654367",
                    student_termsandcondition: true,
                    student_branch: "Branch1",
                    student_joining_date: "25-04-2023",
                    student_end_date: "null",
                    student_monthly_paid:[
                        {
                            due_month: "22-02-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        },
                        {
                            due_month: "22-03-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        }
                    ],
                },
                {
                    student_id:7,
                    student_status: true,
                    student_fname:"Aksha7",
                    student_lname: "lname",
                    student_seatnumber: 7,
                    student_email:"Raj@gmail.com", 
                    student_mobilenumber: "876543211234",
                    student_address: "aTHANI",
                    student_city: "Atn",
                    student_state: "Kar",
                    student_zipcode: "654367",
                    student_termsandcondition: true,
                    student_branch: "Branch1",
                    student_joining_date: "24-03-2023",
                    student_end_date: "null",
                    student_monthly_paid:[
                        {
                            due_month: "22-02-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        },
                        {
                            due_month: "22-03-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        }
                    ],
                },
                {
                    student_id:8,
                    student_status: true,
                    student_fname:"Aksha8",
                    student_lname: "lname",
                    student_seatnumber: 8,
                    student_email:"Raj@gmail.com", 
                    student_mobilenumber: "876543211234",
                    student_address: "aTHANI",
                    student_city: "Atn",
                    student_state: "Kar",
                    student_zipcode: "654367",
                    student_termsandcondition: true,
                    student_branch: "Branch1",
                    student_joining_date: "23-01-2023",
                    student_end_date: "null",
                    student_monthly_paid:[
                        {
                            due_month: "22-02-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        },
                        {
                            due_month: "22-03-2023",
                            paid_amount: 500,
                            paid_date: "paid date",
                            paid_status: true
                        }
                    ],
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
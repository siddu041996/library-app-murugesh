package com.lms.websvc.db.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class StudentEntity {
    public static final String SID = "studentId";
    @Id
    private String studentId;

    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private Address address;
    private String joiningDate;
    private Boolean subscriptionStatus;
    private Boolean studentStatus;

    @Data
    public static class Address {
        private String addressLine1;
        private String addressLine2;
        private String city;
        private String state;
        private int pinCode;
    }
}

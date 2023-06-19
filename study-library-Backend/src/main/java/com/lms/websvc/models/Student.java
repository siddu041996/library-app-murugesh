
package com.lms.websvc.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Student {
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
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Address {
        private String addressLine1;
        private String addressLine2;
        private String city;
        private String state;
        private int pinCode;
    }
}

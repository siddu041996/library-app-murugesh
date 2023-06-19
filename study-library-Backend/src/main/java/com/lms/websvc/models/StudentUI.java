
package com.lms.websvc.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.ALWAYS)
public class StudentUI {

    private String studentId;
    private String studentFirstName;
    private String studentLastName;
    private String studentJoiningDate;

    @Data
    @JsonInclude(JsonInclude.Include.ALWAYS)
    public static class SeatAllocation {
        private String branchCode;
        private String branchName;
        private int seatNumber;
    }

    @Data
    @JsonInclude(JsonInclude.Include.ALWAYS)
    public static class Payment {
        private String lastPaymentDate;
        private String paymentMode;
        private String subscriptionCycle;
        private String subscriptionStartDate;
        private String subscriptionEndDate;
        private String subscriptionStatus;
    }
}

package com.lms.websvc.models;

import lombok.Data;

@Data
public class Payment {
    private String studentId;
    private String paymentMode;
    private String paymentState;
    private String subscriptionCycle;
    private String subscriptionStartDate;
    private String subscriptionEndDate;
    private String subscriptionStatus;
}

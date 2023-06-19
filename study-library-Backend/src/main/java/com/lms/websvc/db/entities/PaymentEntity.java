package com.lms.websvc.db.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class PaymentEntity {

    public static final String PID = "paymentId";
    public static final String SID = "studentId";
    @Id
    private String paymentId;
    private String studentId;
    private String paymentMode;
    private String paymentStatus;
    private String subscriptionCycle;
    private String subscriptionStartDate;
    private String subscriptionEndDate;
    private String subscriptionStatus;
}

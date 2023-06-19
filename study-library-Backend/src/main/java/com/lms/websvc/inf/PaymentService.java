package com.lms.websvc.inf;

import com.lms.websvc.models.Payment;

public interface PaymentService {
    Payment getPaymentDetails(String pid);

    Payment makePayment(String sid, Payment payment);

}

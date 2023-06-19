package com.lms.websvc.scheduled;

import com.lms.websvc.db.dao.PaymentDAO;
import com.lms.websvc.db.dao.StudentDAO;
import com.lms.websvc.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class LMSScheduledTask {
    @Autowired
    private PaymentDAO paymentDAO;
    @Autowired
    private StudentDAO studentDAO;

    @Scheduled(cron = "0 0 9 * * ?")
    public void updateSubscriptionStatus() {
        paymentDAO.getPaymentList().forEach(payment -> {
            LocalDate sbinDate = LocalDate.parse(payment.getSubscriptionEndDate());
            if (sbinDate.isBefore(LocalDate.now().minusDays(2))) {
                payment.setPaymentStatus(Constants.Payment.PRE_DUE);
                paymentDAO.updatePayment(payment.getPaymentId(), payment);
            }
            if (sbinDate.isEqual(LocalDate.now())) {
                payment.setPaymentStatus(Constants.Payment.DUE);
                payment.setSubscriptionStatus(Constants.SubscriptionStatus.IN_ACTIVE);
                paymentDAO.updatePayment(payment.getPaymentId(), payment);
            }
        });
    }
}
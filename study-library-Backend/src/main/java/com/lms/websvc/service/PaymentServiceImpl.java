package com.lms.websvc.service;

import com.lms.websvc.db.dao.PaymentDAO;
import com.lms.websvc.db.dao.StudentDAO;
import com.lms.websvc.db.entities.PaymentEntity;
import com.lms.websvc.db.entities.StudentEntity;
import com.lms.websvc.inf.PaymentService;
import com.lms.websvc.models.LMSException;
import com.lms.websvc.models.Payment;
import com.lms.websvc.utils.Constants;
import com.lms.websvc.utils.NullAwareBeanUtils;
import com.lms.websvc.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentDAO paymentDAO;
    @Autowired
    private StudentDAO studentDAO;

    public Payment getPaymentDetails(String pid) {
        PaymentEntity paymentEntity = paymentDAO.getPaymentById(pid);
        Payment payment = new Payment();
        if (null == paymentEntity) {
            throw new LMSException(Constants.CODE.NOT_FOUND,
                    Constants.CATEGORY.NOT_FOUND,
                    Constants.SOURCE.REST,
                    "payment not found with given pid!");
        }
        Utils.copyNonNullProperties(paymentEntity, payment);
        return payment;
    }

    @Override
    public Payment makePayment(String sid, Payment payment) {
        StudentEntity studentEntity = studentDAO.getStudentById(sid);
        PaymentEntity paymentEntity = new PaymentEntity();
        NullAwareBeanUtils.copyProperties(payment, paymentEntity);
        if (null != studentEntity && null != payment) {
            paymentEntity.setStudentId(sid);
            paymentEntity.setPaymentStatus(Constants.Payment.PAID);
            paymentEntity.setSubscriptionStatus(Constants.SubscriptionStatus.ACTIVE);
            paymentEntity.setSubscriptionEndDate(getNextDate(payment));
            paymentDAO.savePayment(paymentEntity);
            NullAwareBeanUtils.copyProperties(paymentEntity, payment);
            return payment;
        }
        throw new LMSException(Constants.CODE.DOES_NOT_EXISTS,
                Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                Constants.SOURCE.REST,
                "payment failed!");
    }

    private String getNextDate(Payment payment) {
        LocalDate startDate = LocalDate.parse(payment.getSubscriptionStartDate());
        LocalDate nextDate = null;
        switch (payment.getSubscriptionCycle()) {
            case Constants.SubscriptionCycle.TWO_WEEKS -> nextDate = startDate.plusDays(14);
            case Constants.SubscriptionCycle.ONE_MONTH -> nextDate = startDate.plusDays(29);
            case Constants.SubscriptionCycle.TWO_MONTHS -> nextDate = startDate.plusDays(59);
            case Constants.SubscriptionCycle.THREE_MONTHS -> nextDate = startDate.plusDays(89);
            case Constants.SubscriptionCycle.SIX_MONTHS -> nextDate = startDate.plusDays(179);
            case Constants.SubscriptionCycle.ANNUAL -> nextDate = startDate.plusDays(364);
            default -> System.out.println("Invalid Date");
        }
        assert nextDate != null;
        return nextDate.toString();
    }
}

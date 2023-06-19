package com.lms.websvc.db.dao;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lms.websvc.db.entities.PaymentEntity;
import com.lms.websvc.models.LMSException;
import com.lms.websvc.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Component
public class PaymentDAO {

    @Autowired
    private PaymentRepository repository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    MongoTemplate db;

    public List<PaymentEntity> getPaymentList() {
        return repository.findAll();
    }

    public PaymentEntity getPaymentById(String pid) {
        return repository.findById(pid).orElse(null);
    }

    public PaymentEntity savePayment(PaymentEntity payment) {
        payment.setPaymentId(generateId());
        return repository.save(payment);
    }

    public PaymentEntity updatePayment(String pid, PaymentEntity paymentEntity) {
        if (!exists(pid)) {
            throw new LMSException(Constants.CODE.EXISTS,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.DB,
                    String.format("payment details does not exist with Id: %s", pid));
        }
        PaymentEntity existingDocument = db.findById(pid, PaymentEntity.class);
        try {
            objectMapper.updateValue(existingDocument, paymentEntity);
        } catch (JsonMappingException e) {
            throw new LMSException(Constants.CODE.EXISTS,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.DB,
                    String.format("failed to update payment for id: %s", pid));
        }
        assert existingDocument != null;
        return repository.save(paymentEntity);
    }

    public boolean exists(String sid, String pid) {
        return db.exists(query(where(PaymentEntity.PID).is(sid).and(PaymentEntity.SID).is(pid)), PaymentEntity.class);
    }

    public boolean exists(String pid) {
        return db.exists(query(where(PaymentEntity.PID).is(pid)), PaymentEntity.class);
    }

    private String generateId() {
        Query query = new Query();
        long count = db.count(query, PaymentEntity.class);
        return String.format("PID@%06d", count + 1);
    }
}

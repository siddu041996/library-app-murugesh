package com.lms.websvc.db.dao;

import com.lms.websvc.db.entities.PaymentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends MongoRepository<PaymentEntity, String> {
}
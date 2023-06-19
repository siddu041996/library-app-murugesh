package com.lms.websvc.db.dao;

import com.lms.websvc.db.entities.StudentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentEnrollmentRepository extends MongoRepository<StudentEntity, String> {
}
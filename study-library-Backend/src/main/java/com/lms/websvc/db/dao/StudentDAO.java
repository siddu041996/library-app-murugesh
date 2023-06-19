package com.lms.websvc.db.dao;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lms.websvc.db.entities.StudentEntity;
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
public class StudentDAO {

    @Autowired
    StudentEnrollmentRepository repository;

    @Autowired
    MongoTemplate db;

    @Autowired
    private ObjectMapper objectMapper;

    public List<StudentEntity> getStudentList() {
        return repository.findAll();
    }

    public StudentEntity getStudentById(String sid) {
        return repository.findById(sid).orElse(null);
    }

    public StudentEntity createStudentEnrollment(StudentEntity studentEntity) {
        studentEntity.setStudentId(generateId());
        return repository.save(studentEntity);
    }

    public StudentEntity updateStudentDetails(String id, StudentEntity studentEntity) throws JsonMappingException {
        if (!exists(id)) {
            throw new LMSException(Constants.CODE.EXISTS,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.DB,
                    String.format("Student details does not exist with Id: %s", id));
        }
        StudentEntity existingDocument = db.findById(id, StudentEntity.class);
        objectMapper.updateValue(existingDocument, studentEntity);
        assert existingDocument != null;
        return repository.save(existingDocument);

    }

    public void deleteStudentDetails(String id) {
        repository.deleteById(id);
    }

    public boolean exists(String sid) {
        return db.exists(query(where(StudentEntity.
                SID).is(sid)), StudentEntity.class);
    }

    private String generateId() {
        Query query = new Query();
        long count = db.count(query, StudentEntity.class);
        return String.format("EID_@%06d", count + 1);
    }
}

package com.lms.websvc.db.dao;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lms.websvc.db.entities.SeatAllocationEntity;
import com.lms.websvc.db.entities.StudentEntity;
import com.lms.websvc.models.LMSException;
import com.lms.websvc.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Component
public class AllotmentDAO {

    @Autowired
    SeatAllocationRepository repository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    MongoTemplate db;

    public List<SeatAllocationEntity> getAllAllotments() {
        return repository.findAll();
    }

    public List<SeatAllocationEntity> findByBranchCode(String branchCode) {
        Query query = new Query();
        query.addCriteria(Criteria.where("branchCode").is(branchCode));
        return repository.findByBranchCode(branchCode);
    }

    public SeatAllocationEntity getStudentById(String sid) {
        return repository.findByStudentId(sid);
    }

    public SeatAllocationEntity createAllotment(String sid, SeatAllocationEntity entity) {
        return repository.save(entity);
    }

    public SeatAllocationEntity updateAllotment(String id, SeatAllocationEntity entity) {
        if (!exists(id)) {
            throw new LMSException(Constants.CODE.EXISTS,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.DB,
                    String.format("Student details does not exist with Id: %s", id));
        }
        try {
            SeatAllocationEntity existingDocument = repository.findByStudentId(id);
            objectMapper.updateValue(existingDocument, entity);
            assert existingDocument != null;
            return repository.save(existingDocument);
        } catch (JsonMappingException e) {
            throw new LMSException(Constants.CODE.EXISTS,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.DB,
                    String.format("failed to update allotment for Id: %s", id));
        }
    }

    public boolean exists(String sid) {
        return db.exists(query(where(SeatAllocationEntity.SID).is(sid)), SeatAllocationEntity.class);
    }

    public boolean exists(String sid, SeatAllocationEntity entity) {
        return db.exists(query(where(SeatAllocationEntity.SID).is(sid).and("seatNumber").is(entity.getSeatNumber())), SeatAllocationEntity.class);
    }

    public void deleteAllotment(String id) {
        repository.deleteById(id);
    }
}

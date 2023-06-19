package com.lms.websvc.db.dao;

import com.lms.websvc.db.entities.SeatAllocationEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatAllocationRepository extends MongoRepository<SeatAllocationEntity, String> {
    SeatAllocationEntity findByStudentId(String studentId);
    List<SeatAllocationEntity> findByBranchCode(String branchCode);
}
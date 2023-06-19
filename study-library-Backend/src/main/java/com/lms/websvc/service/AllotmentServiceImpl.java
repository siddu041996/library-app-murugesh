package com.lms.websvc.service;

import com.lms.websvc.db.dao.AllotmentDAO;
import com.lms.websvc.db.entities.SeatAllocationEntity;
import com.lms.websvc.inf.AllotmentService;
import com.lms.websvc.models.LMSException;
import com.lms.websvc.models.ResponseModel;
import com.lms.websvc.models.SeatAllocation;
import com.lms.websvc.utils.Constants;
import com.lms.websvc.utils.NullAwareBeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;

@Service
public class AllotmentServiceImpl implements AllotmentService {

    @Autowired
    AllotmentDAO dao;


    @Override
    public ResponseModel<List<SeatAllocation>> getAllAllotments() {
        ResponseModel<List<SeatAllocation>> model = new ResponseModel<>();
        List<SeatAllocationEntity> allAllotments = dao.getAllAllotments();
        if (allAllotments.isEmpty()) {
            throw new LMSException(Constants.CODE.DOES_NOT_EXISTS,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.REST,
                    "No Allotments Yet!");
        }
        model.setData(allAllotments);
        return model;
    }

    @Override
    public ResponseModel<List<SeatAllocation>> getAllAllotmentsByBranch(String branchCode) {
        List<SeatAllocationEntity> seatAllocationList = dao.findByBranchCode(branchCode);
        if (seatAllocationList.isEmpty()) {
            throw new LMSException(Constants.CODE.DOES_NOT_EXISTS,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.REST,
                    String.format("Allotment list is empty for given branch: %s", branchCode));
        }
        ResponseModel<List<SeatAllocation>> responseModel = new ResponseModel<>();
        responseModel.setData(seatAllocationList);
        responseModel.setStatus(HttpStatus.OK);
        return responseModel;
    }

    @Override
    public ResponseModel<SeatAllocation> getAllotmentDetails(String sid) {
        SeatAllocationEntity studentById = dao.getStudentById(sid);
        ResponseModel<SeatAllocation> model = new ResponseModel<>();
        if (null == studentById) {
            throw new LMSException(Constants.CODE.DOES_NOT_EXISTS,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.REST,
                    "Student does not exists");
        }
        model.setData(studentById);
        return model;
    }


    @Override
    public ResponseModel<SeatAllocation> create(String sid, SeatAllocation allocation) {
        SeatAllocationEntity allocationEntity = checkAllocationStatus(sid, allocation, false);
        SeatAllocationEntity savedAllotment = dao.createAllotment(sid, allocationEntity);
        ResponseModel<SeatAllocation> responseModel = new ResponseModel<>();
        responseModel.setStatus(HttpStatus.OK);
        responseModel.setData(savedAllotment);
        return responseModel;

    }


    @Override
    public ResponseModel<SeatAllocation> update(String sid, SeatAllocation allocation) {
        SeatAllocationEntity allocationEntity = checkAllocationStatus(sid, allocation, true);
        SeatAllocationEntity updatedAllotment = dao.updateAllotment(sid, allocationEntity);
        ResponseModel<SeatAllocation> responseModel = new ResponseModel<>();
        responseModel.setStatus(HttpStatus.OK);
        responseModel.setData(updatedAllotment);
        return responseModel;
    }


    @Override
    public ResponseModel<String> delete(String sid) {
        ResponseModel<String> responseModel = new ResponseModel<>();
        SeatAllocationEntity studentById = dao.getStudentById(sid);
        if (null == studentById) {
            throw new LMSException(Constants.CODE.DOES_NOT_EXISTS,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.REST,
                    "deletion failed! given id not found.");
        }
        dao.deleteAllotment(sid);
        responseModel.setStatus(HttpStatus.OK);
        responseModel.setData("record deleted!");
        return responseModel;
    }

    private SeatAllocationEntity checkAllocationStatus(String sid, SeatAllocation allocation, Boolean isUpdate) {
        SeatAllocationEntity entity = new SeatAllocationEntity();
        NullAwareBeanUtils.copyProperties(allocation, entity);
        entity.setStudentId(sid);
        SeatAllocationEntity allocatedSeat = dao.getStudentById(sid);
        if (allocatedSeat != null && !isUpdate) {
            handleException();
        }
        if (dao.exists(sid, entity)) {
            handleException();
        }
        if (!getAvailableSeats().isEmpty() && getAvailableSeats().stream().noneMatch(integer -> integer.equals(allocation.getSeatNumber()))) {
            handleException();
        }
        return entity;
    }

    @Override
    public List<Integer> getAvailableSeats() {
        List<SeatAllocationEntity> reservedSeats = dao.getAllAllotments();
        return !reservedSeats.isEmpty() ? IntStream.rangeClosed(101, 200)
                .filter(seat -> reservedSeats.stream().noneMatch(reservedSeat -> reservedSeat.getSeatNumber() == seat))
                .boxed()
                .toList() : Collections.emptyList();
    }

    private void handleException() {
        throw new LMSException(Constants.CODE.UNKNOWN,
                Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                Constants.SOURCE.REST,
                "selected seat is un-available to allocate");
    }
}

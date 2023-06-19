package com.lms.websvc.inf;

import com.lms.websvc.models.ResponseModel;
import com.lms.websvc.models.SeatAllocation;
import org.springframework.stereotype.Service;

import java.util.List;


public interface AllotmentService {
    ResponseModel<List<SeatAllocation>> getAllAllotments();

    ResponseModel<List<SeatAllocation>> getAllAllotmentsByBranch(String branchCode);

    ResponseModel<SeatAllocation> getAllotmentDetails(String sid);

    ResponseModel<SeatAllocation> create(String sid, SeatAllocation allocation);


    ResponseModel<SeatAllocation> update(String sid, SeatAllocation allocation);


    ResponseModel<String> delete(String sid);

    List<Integer> getAvailableSeats();
}

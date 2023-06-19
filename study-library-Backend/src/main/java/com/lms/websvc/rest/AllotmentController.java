package com.lms.websvc.rest;

import com.lms.websvc.inf.AllotmentService;
import com.lms.websvc.models.ResponseModel;
import com.lms.websvc.models.SeatAllocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/allotment")
public class AllotmentController {

    @Autowired
    private AllotmentService allotmentService;

    @GetMapping("/list")
    public ResponseModel<List<SeatAllocation>> getAllEnrollments() {
        return allotmentService.getAllAllotments();
    }

    @GetMapping("/branch")
    public ResponseModel<List<SeatAllocation>> getAllEnrollments(@RequestParam String branchCode) {
        return allotmentService.getAllAllotmentsByBranch(branchCode);
    }

    @GetMapping("/{sid}")
    public ResponseModel<SeatAllocation> getAllotmentDetails(@PathVariable("sid") String sid) {
        return allotmentService.getAllotmentDetails(sid);
    }

    @PostMapping("/create/{sid}")
    public ResponseModel<SeatAllocation> createAllotment(@PathVariable String sid, @RequestBody SeatAllocation allocation) {
        return allotmentService.create(sid, allocation);
    }

    @GetMapping("/seats")
    public ResponseModel<List<Integer>> getAvailableSeats() {
        List<Integer> availableSeats = allotmentService.getAvailableSeats();
        ResponseModel<List<Integer>> responseModel = new ResponseModel<>();
        responseModel.setStatus(HttpStatus.OK);
        responseModel.setData(availableSeats);
        responseModel.setTotalCount(availableSeats.size());
        return responseModel;
    }

    @PatchMapping("/update/{sid}")
    public ResponseModel<SeatAllocation> updateAllotment(@PathVariable("sid") String sid, @RequestBody SeatAllocation allocation) {
        ResponseModel<SeatAllocation> responseModel = new ResponseModel<>();
        responseModel.setData(allotmentService.update(sid, allocation));
        return responseModel;
    }

    @DeleteMapping("/delete/{sid}")
    public ResponseModel<String> delete(@PathVariable String sid) {
        return allotmentService.delete(sid);
    }
}

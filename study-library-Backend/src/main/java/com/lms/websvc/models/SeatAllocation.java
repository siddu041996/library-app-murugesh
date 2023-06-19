
package com.lms.websvc.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
public class SeatAllocation {
    private String studentId;
    private String branchCode;
    private String branchName;
    private Integer seatNumber;
}


package com.lms.websvc.db.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Document
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SeatAllocationEntity {
    public static final String SID = "studentId";


    @Id
    private String id;
    private Integer seatNumber;
    private String studentId;
    private String branchCode;
    private String branchName;
}

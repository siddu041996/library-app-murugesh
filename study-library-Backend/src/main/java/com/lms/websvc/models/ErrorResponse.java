package com.lms.websvc.models;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ErrorResponse {

    private String message;
    private String status;
    private Date timestamp;


}
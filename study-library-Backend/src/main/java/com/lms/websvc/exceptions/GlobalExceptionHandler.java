package com.lms.websvc.exceptions;

import com.lms.websvc.models.ErrorResponse;
import com.lms.websvc.models.LMSException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(LMSException.class)
    public ResponseEntity<ErrorResponse> handleException(LMSException ex) {
        ErrorResponse error = new ErrorResponse();
        error.setMessage("An error occurred: " + ex.getMessage());
        error.setStatus(ex.getCategory().toString());
        error.setTimestamp(new Date());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

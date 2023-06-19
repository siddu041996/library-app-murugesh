/*
package com.lms.websvc.exceptions;

import com.lms.websvc.models.LMSException;
import lombok.Generated;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ExceptionHandlerExceptionResolver;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.xml.sax.ErrorHandler;

@ControllerAdvice
public class LMSExceptionHandler extends ResponseEntityExceptionHandler {
    @Generated
    private static final Logger log = LoggerFactory.getLogger(ErrorHandler.class);

    public LMSExceptionHandler() {
    }

    public ResponseEntity<Object> handleExceptions(Exception exception, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
        if (HttpStatus.INTERNAL_SERVER_ERROR.equals(status)) {
            request.setAttribute("javax error or exception", exception, 0);
        }
        if (null != headers) {
            headers = new HttpHeaders();
        }
        LMSException lmsException = this.resolve(exception, status);
        this.log(request,exception);
        headers.set("Content-Type", "application/json");
        return this.convert(exception, headers, status);
    }
}
*/

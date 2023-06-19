package com.lms.websvc.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseModel<T> {
    private HttpStatus status;
    private Object data;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private Integer totalCount;

    private LMSException lmsExceptions;

    public ResponseModel() {
    }

    public ResponseModel(HttpStatus status) {
        this.status = status;
    }

    public ResponseModel(HttpStatus status, Object data) {
        this.status = status;
        this.data = data;
    }

    public ResponseModel(LMSException lmsException) {
        this.lmsExceptions.setCode((LMSException.ICode) lmsException.getCode());
        this.lmsExceptions.setCategory((LMSException.ICategory) lmsException.getCategory());
        this.lmsExceptions.setSource((LMSException.ISource) lmsException.getSource());
        this.lmsExceptions.setMsg(lmsException.getMsg());
    }
}
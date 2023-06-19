package com.lms.websvc.models;

import com.lms.websvc.utils.Constants;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LMSException extends RuntimeException {

    private Enum code;
    private Enum category;
    private Enum source;
    private String msg;

    public LMSException(String msg) {
        this(Constants.CODE.UNKNOWN, Constants.CATEGORY.UNKNOWN, Constants.SOURCE.UNKNOWN, msg);
    }

    public LMSException(ICode code, String msg) {
        this(code, Constants.CATEGORY.UNKNOWN, Constants.SOURCE.UNKNOWN, msg);
    }

    public LMSException(ICode code, ICategory category, String msg) {
        this(code, category, Constants.SOURCE.UNKNOWN, msg);
    }

    public LMSException(ICode code, ICategory category, ISource source, String msg) {
        super(msg);
        this.setCode(code);
        this.setCategory(category);
        this.setSource(source);
        this.setMsg(msg);
    }

    @Override
    public Throwable fillInStackTrace() {
        return this;
    }


    public interface ICode {
        Enum valueOf();
    }

    public interface ICategory {
        Enum valueOf();
    }

    public interface ISource {
        Enum valueOf();
    }

    public Enum getCode() {
        return code;
    }

    public void setCode(ICode code) {
        if (null != code && null != code.valueOf()) {
            this.code = code.valueOf();
        }
    }

    public Enum getCategory() {
        return this.category;
    }

    public void setCategory(ICategory category) {
        if (null != category && null != category.valueOf()) {
            this.category = category.valueOf();
        }
    }

    public Enum getSource() {
        return source;
    }

    public void setSource(ISource source) {
        if (null != code && null != source.valueOf()) {
            this.source = source.valueOf();
        }
    }

    public String getMsg() {
        return this.toString();
    }

    @Override
    public String toString() {
        return "LMSException{" +
                "code=" + code +
                ", category=" + category +
                ", source=" + source +
                ", msg='" + msg + '\'' +
                '}';
    }
}

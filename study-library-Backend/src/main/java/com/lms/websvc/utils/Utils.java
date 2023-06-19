package com.lms.websvc.utils;

import com.fasterxml.jackson.databind.util.BeanUtil;
import org.springframework.beans.BeanUtils;

public class Utils {

    public static void copyNonNullProperties(Object source, Object target){
        BeanUtils.copyProperties(source, target);
    }
}

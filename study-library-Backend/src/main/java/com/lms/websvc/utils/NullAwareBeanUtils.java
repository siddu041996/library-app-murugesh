package com.lms.websvc.utils;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.beans.PropertyDescriptor;
import java.util.HashSet;
import java.util.Set;

public abstract class NullAwareBeanUtils {

    /**
     * Returns an array containing the name of all the null properties of an object
     *
     * @param object
     * @return String[]
     */
    public static String[] getNullPropertyNames(Object object) {
        BeanWrapper source = new BeanWrapperImpl(object);
        PropertyDescriptor[] objectProperties = source.getPropertyDescriptors();

        Set<String> emptyProperties = new HashSet<>();
        for (PropertyDescriptor property : objectProperties) {
            Object sourceValue = source.getPropertyValue(property.getName());
            if (sourceValue == null) {
                emptyProperties.add(property.getName());
            }
        }

        return emptyProperties.toArray(new String[emptyProperties.size()]);
    }


    /**
     * Copy properties from an source object to an target object.
     * Ignores all null property descriptors.
     *
     * @param source, target
     */
    public static void copyProperties(Object source, Object target) {
        BeanUtils.copyProperties(source, target, getNullPropertyNames(source));
    }
}
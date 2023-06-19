package com.lms.websvc.transformer;

import com.lms.websvc.db.entities.StudentEntity;
import com.lms.websvc.models.Student;
import org.springframework.stereotype.Component;

@Component
public class LMSTransformer {

    public StudentEntity toDomainStudentEntity(Student student) {
        if (null == student) {
            return null;
        }
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setFirstName(student.getFirstName());
        studentEntity.setLastName(student.getLastName());
        studentEntity.setEmail(student.getEmail());
        studentEntity.setMobileNumber(student.getMobileNumber());
        studentEntity.setJoiningDate(student.getJoiningDate());
        studentEntity.setSubscriptionStatus(student.getSubscriptionStatus());
        studentEntity.setStudentStatus(student.getStudentStatus());

        StudentEntity.Address studentAddress = new StudentEntity.Address();
        studentAddress.setAddressLine1(student.getAddress().getAddressLine1());
        studentAddress.setAddressLine2(student.getAddress().getAddressLine2());
        studentAddress.setCity(student.getAddress().getCity());
        studentAddress.setState(student.getAddress().getState());
        studentAddress.setPinCode(student.getAddress().getPinCode());

        studentEntity.setAddress(studentAddress);
        return studentEntity;
    }

    public Student toDomainStudent(StudentEntity studentEntity) {
        if (null == studentEntity) {
            return null;
        }
        Student student = new Student();
        student.setFirstName(studentEntity.getFirstName());
        student.setLastName(studentEntity.getLastName());
        student.setEmail(studentEntity.getEmail());
        student.setMobileNumber(studentEntity.getMobileNumber());
        student.setJoiningDate(studentEntity.getJoiningDate());
        student.setSubscriptionStatus(studentEntity.getSubscriptionStatus());
        student.setStudentStatus(studentEntity.getStudentStatus());

        Student.Address studentAddress = new Student.Address();
        studentAddress.setAddressLine1(studentEntity.getAddress().getAddressLine1());
        studentAddress.setAddressLine2(studentEntity.getAddress().getAddressLine2());
        studentAddress.setCity(studentEntity.getAddress().getCity());
        studentAddress.setState(studentEntity.getAddress().getState());
        studentAddress.setPinCode(studentEntity.getAddress().getPinCode());

        student.setAddress(studentAddress);
        return student;
    }
}

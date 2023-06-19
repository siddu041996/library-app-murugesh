package com.lms.websvc.inf;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.lms.websvc.models.ResponseModel;
import com.lms.websvc.models.Student;

import java.util.List;

public interface StudentEnrollmentService {

    ResponseModel<List<Student>> getAllEnrollments();

    ResponseModel<Student> getEnrollmentById(String id);

    ResponseModel<Student> createEnrollment(Student enrollment);

    ResponseModel<Student> updateEnrollment(String id, Student enrollment) throws JsonMappingException;

    ResponseModel<String> deleteEnrollment(String id);
}
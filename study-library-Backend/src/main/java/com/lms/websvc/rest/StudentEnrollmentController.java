package com.lms.websvc.rest;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.lms.websvc.inf.StudentEnrollmentService;
import com.lms.websvc.models.ResponseModel;
import com.lms.websvc.models.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class StudentEnrollmentController {

    @Autowired
    private StudentEnrollmentService enrollmentService;

    // Get all enrollments
    @GetMapping("/")
    public ResponseModel<List<Student>> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    // Get enrollment by ID
    @GetMapping("/{id}")
    public ResponseModel<Student> getEnrollmentById(@PathVariable("id") String id) {
        return enrollmentService.getEnrollmentById(id);
    }

    // Create new enrollment
    @PostMapping(value = "/add", consumes = "application/json")
    public ResponseModel<Student> createEnrollment(@RequestBody Student enrollment) {
        return enrollmentService.createEnrollment(enrollment);
    }

    // Update enrollment by ID
    @PatchMapping(value = "/update/{id}", consumes = "application/json")
    public ResponseModel<Student> updateEnrollment(@PathVariable("id") String id, @RequestBody Student enrollment) throws JsonMappingException {
        return enrollmentService.updateEnrollment(id, enrollment);
    }

    // Delete enrollment by ID
    @DeleteMapping("/{id}")
    public ResponseModel<String> deleteEnrollment(@PathVariable("id") String id) {
       return enrollmentService.deleteEnrollment(id);
    }
}

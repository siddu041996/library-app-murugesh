package com.lms.websvc.service;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.lms.websvc.db.dao.StudentDAO;
import com.lms.websvc.db.entities.StudentEntity;
import com.lms.websvc.inf.StudentEnrollmentService;
import com.lms.websvc.models.LMSException;
import com.lms.websvc.models.ResponseModel;
import com.lms.websvc.models.Student;
import com.lms.websvc.transformer.LMSTransformer;
import com.lms.websvc.utils.Constants;
import com.lms.websvc.utils.NullAwareBeanUtils;
import com.lms.websvc.utils.Utils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.JobKOctets;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentEnrollmentServiceImpl implements StudentEnrollmentService {

    @Autowired
    private LMSTransformer transformer;
    @Autowired
    private StudentDAO dao;


    public ResponseModel<List<Student>> getAllEnrollments() {
        List<Student> studentList = new ArrayList<>();
        List<StudentEntity> enrollments = dao.getStudentList();
        ResponseModel<List<Student>> listResponseModel = new ResponseModel<>();
        if (enrollments.isEmpty()){
             listResponseModel.setStatus(HttpStatus.NOT_FOUND);
             listResponseModel.setData("NO DATA");
             return listResponseModel;
        }
        Utils.copyNonNullProperties(enrollments, studentList);
        enrollments.forEach(studentEntity -> studentList.add(transformer.toDomainStudent(studentEntity)));
        listResponseModel.setStatus(HttpStatus.OK);
        listResponseModel.setData(studentList);
        return listResponseModel;
    }


    public ResponseModel<Student> getEnrollmentById(String id) {
        StudentEntity enrollment = dao.getStudentById(id);
        ResponseModel<Student> responseModel = new ResponseModel<>();
        if (null == enrollment) {
            throw new LMSException(Constants.CODE.DOES_NOT_EXISTS,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.REST,
                    "Student does not exists");
        }
        transformer.toDomainStudent(enrollment);
        responseModel.setStatus(HttpStatus.OK);
        responseModel.setData(enrollment);
        return responseModel;
    }

    public ResponseModel<Student> createEnrollment(Student enrollment) {
        StudentEntity studentEntity = transformer.toDomainStudentEntity(enrollment);
        StudentEntity savedStudent = dao.createStudentEnrollment(studentEntity);
        if(savedStudent == null){
            throw new LMSException(Constants.CODE.UNKNOWN,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.REST,
                    "failed to add enrollment!");
        }
        ResponseModel<Student> responseModel = new ResponseModel<>();
        responseModel.setStatus(HttpStatus.OK);
        responseModel.setData(savedStudent);
        return responseModel;
    }


    public ResponseModel<Student> updateEnrollment(String id, Student student) throws JsonMappingException {
        StudentEntity entity = dao.getStudentById(id);
        if(null == entity){
           throw new LMSException(Constants.CODE.DOES_NOT_EXISTS,
                   Constants.CATEGORY.NOT_FOUND,
                   Constants.SOURCE.REST,
                   "update failed! enrollment not found.");
        }
        StudentEntity studentEntity = transformer.toDomainStudentEntity(student);
        StudentEntity updatedEntity = dao.updateStudentDetails(id, studentEntity);
        ResponseModel<Student> responseModel = new ResponseModel<>();
        responseModel.setStatus(HttpStatus.OK);
        responseModel.setData(updatedEntity);
        return responseModel;
    }

    public ResponseModel<String> deleteEnrollment(String id) {
        ResponseModel<String> responseModel = new ResponseModel<>();
        StudentEntity student = dao.getStudentById(id);
        if (null == student){
            throw new LMSException(Constants.CODE.DOES_NOT_EXISTS,
                    Constants.CATEGORY.INTERNAL_SERVER_ERROR,
                    Constants.SOURCE.REST,
                    "deletion failed! given id not found.");
        }
        dao.deleteStudentDetails(id);
        responseModel.setStatus(HttpStatus.OK);
        responseModel.setData("record deleted!");
        return responseModel;
    }
}

package com.lms.websvc.rest;

import com.lms.websvc.inf.PaymentService;
import com.lms.websvc.models.Payment;
import com.lms.websvc.models.ResponseModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/{pid}")
    public ResponseModel<Payment> getPaymentDetails(@PathVariable("pid") String pid) {
        ResponseModel<Payment> responseModel = new ResponseModel<>();
        responseModel.setData(paymentService.getPaymentDetails(pid));
        return responseModel;
    }

    @PostMapping("/doPayment/{sid}")
    public ResponseModel<Payment> makePayment(@PathVariable("sid") String sid, @RequestBody Payment payment) {
        ResponseModel<Payment> responseModel = new ResponseModel<>();
        responseModel.setData(paymentService.makePayment(sid, payment));
        return responseModel;
    }
}

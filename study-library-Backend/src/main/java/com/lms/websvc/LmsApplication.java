package com.lms.websvc;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@OpenAPIDefinition(info = @Info(title = "Study Library Service", version = "2.0", description = "Study Library API Documentation"))
public class LmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(LmsApplication.class, args);
	}

}

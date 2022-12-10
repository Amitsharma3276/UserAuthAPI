package com.assignment.UserAuthAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan("com.assignment.UserAuthAPI")
@EnableJpaRepositories(basePackages = "com.assignment.UserAuthAPI" )
@SpringBootApplication
public class UserAuthApiApplication {

	public static void main(String[] args) {

		SpringApplication.run(UserAuthApiApplication.class, args);
	}

}

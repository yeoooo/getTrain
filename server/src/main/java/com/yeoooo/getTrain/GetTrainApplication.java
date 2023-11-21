package com.yeoooo.getTrain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GetTrainApplication {
	public static void main(String[] args){
		SpringApplication.run(GetTrainApplication.class, args);
	}
}

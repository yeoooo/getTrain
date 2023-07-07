package com.yeoooo.getTrain;

import com.yeoooo.getTrain.util.RequestTimer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@SpringBootApplication
public class GetTrainApplication {
	public static void main(String[] args){
//		SpringApplication.run(GetTrainApplication.class, args);
		RequestTimer requestTimer = new RequestTimer(3000);
		requestTimer.startTimer();

	}
}

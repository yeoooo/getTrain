package com.yeoooo.getTrain.util;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class ApiResponse<T> {

    private T data ;
    private HttpStatus code;
    private LocalDateTime timeStamp;
    public ApiResponse(HttpStatus code, T data) {
        this.code = code;
        this.data = data;
        this.timeStamp = LocalDateTime.now();
    }

    public ApiResponse(HttpStatus code) {
        this.code = code;
        this.timeStamp = LocalDateTime.now();
    }

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(HttpStatus.OK, data);
    }

    public static <T> ApiResponse fail(HttpStatus code, T errData) {
        return new ApiResponse<>(code, errData);
    }

}

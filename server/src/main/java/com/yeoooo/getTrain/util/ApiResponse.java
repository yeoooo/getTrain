package com.yeoooo.getTrain.util;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@ToString
public class ApiResponse<T> {

    private T data ;
    private HttpStatus status;
    private LocalDateTime timeStamp;
    public ApiResponse(HttpStatus status, T data) {
        this.status = status;
        this.data = data;
        this.timeStamp = LocalDateTime.now();
    }

    public ApiResponse(HttpStatus status) {
        this.status = status;
        this.timeStamp = LocalDateTime.now();
    }

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(HttpStatus.OK, data);
    }

    public static <T> ApiResponse fail(HttpStatus code, T errData) {
        return new ApiResponse<>(code, errData);
    }


}

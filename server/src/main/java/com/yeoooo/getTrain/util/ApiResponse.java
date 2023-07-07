package com.yeoooo.getTrain.util;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class ApiResponse<T> {

    private T data ;
    private int code;
    private LocalDateTime timeStamp;
    public ApiResponse(int code, T data) {
        this.code = code;
        this.data = data;
        this.timeStamp = LocalDateTime.now();
    }

    public ApiResponse(int code) {
        this.code = code;
        this.timeStamp = LocalDateTime.now();
    }

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(200, data);
    }

    public static <T> ApiResponse fail(int code, T errData) {
        return new ApiResponse<>(code, errData);
    }

}

package com.yeoooo.getTrain.controller;

import com.yeoooo.getTrain.exception.LoginFailedException;
import com.yeoooo.getTrain.exception.ReserveFailedException;
import com.yeoooo.getTrain.exception.UserAlreadyInUseException;
import com.yeoooo.getTrain.util.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class ExceptionHandlerController {
    @ExceptionHandler({UserAlreadyInUseException.class, LoginFailedException.class})
    public ApiResponse<String> loginExceptionHandler(Throwable e) {
        if (e instanceof UserAlreadyInUseException) {
            return ApiResponse.fail(HttpStatus.CONFLICT, (e.getMessage()));
        } else {
            return ApiResponse.fail(HttpStatus.UNAUTHORIZED, (e.getMessage()));
        }
    }

    @ExceptionHandler(ReserveFailedException.class)
    public ApiResponse<String> reserveExceptionHandler(ReserveFailedException reserveFailedException) {
        return ApiResponse.fail(HttpStatus.CONFLICT, reserveFailedException.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ApiResponse<String> unknownExceptionHandler(Exception e) {
        String errMsg = "알수없는 오류가 발생했습니다.";
        e.printStackTrace();
        return ApiResponse.fail(HttpStatus.INTERNAL_SERVER_ERROR, errMsg);
    }
}

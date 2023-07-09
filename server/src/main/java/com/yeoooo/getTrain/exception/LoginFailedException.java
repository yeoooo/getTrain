package com.yeoooo.getTrain.exception;

public class LoginFailedException extends Throwable {

    public LoginFailedException(String message) {
        super(message);
    }

    public LoginFailedException() {
        super("코레일 로그인에 실패했습니다.");
    }
}

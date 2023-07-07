package com.yeoooo.getTrain.exception;

public class LoginFailedException extends RuntimeException {
    private String msg;
    public LoginFailedException(String msg) {
        this.msg = msg;
    }

    public LoginFailedException() {
        msg = "로그인에 실패했습니다. 아이디나 비밀번호를 확인해주세요.";
    }
}

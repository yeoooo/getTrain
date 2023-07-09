package com.yeoooo.getTrain.exception;

public class UserAlreadyInUseException extends Exception {
    public UserAlreadyInUseException(String message) {
        super(message);
    }

    public UserAlreadyInUseException() {
        super("이미 사용중인 유저입니다.");
    }
}

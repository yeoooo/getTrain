package com.yeoooo.getTrain.exception;

public class ReserveFailedException extends Exception{

    public ReserveFailedException(String message) {
        super(message);
    }

    public ReserveFailedException() {
        super("예약에 실패했습니다.");
    }
}

package com.yeoooo.getTrain.exception;

public class ReserveFailedException extends Throwable{
    private String msg;
    public ReserveFailedException(String msg) {
        this.msg = msg;
    }

    public ReserveFailedException() {
        msg = "예약에 실패 했습니다. 다시 시도해 주세요.";
    }
}

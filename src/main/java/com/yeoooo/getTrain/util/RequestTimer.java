package com.yeoooo.getTrain.util;

import java.util.Timer;
import java.util.TimerTask;

public class RequestTimer {
    private Timer timer;
    private long delay;  // 요청이 없을 때 타이머가 만료되기까지의 대기 시간 (밀리초)
    private boolean isRequestReceived;

    public RequestTimer(long delay) {
        this.timer = new Timer();
        this.delay = delay;
        this.isRequestReceived = false;
    }

    public void startTimer() {
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                if (!isRequestReceived) {
                    // 요청이 없는 경우에 대한 처리 로직을 여기에 작성
                    System.out.println("요청이 없습니다.");
                }
                isRequestReceived = false;  // 타이머 만료 후 다시 초기화
            }
        }, delay);
    }

    public void resetTimer() {
        isRequestReceived = true;
    }
}

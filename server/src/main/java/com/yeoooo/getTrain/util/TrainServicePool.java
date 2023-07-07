package com.yeoooo.getTrain.util;

import com.yeoooo.getTrain.crawling.TrainService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Component
@ToString
@RequiredArgsConstructor
@Slf4j
public class TrainServicePool {

    private final MailUtil mailUtil;
    private final long MAX_IDLE_TIME_IN_SECONDS = 1800; //sec , 30분 후 인스턴스 파기

    @Getter
    private Map<String, TrainService> pool = new HashMap<>();

    public TrainService getInstanceByEmail(String email) {
        return pool.get(email);
    }

    public TrainService putInstanceByEmail(String email) {
        if (pool.containsKey(email)) {
            return pool.get(email);
        }
        TrainService service = new TrainService(email, mailUtil);
        pool.put(email, service);
        return service;
    }

    public void dispose(String email) throws Exception {
        TrainService service = getInstanceByEmail(email);
        service.setStop(false);
        service.logout();
        log.info("[TrainServicePool] {} [driver] 로그아웃.", email);
        log.info("[TrainServicePool] {} [driver] 종료.", email);
        service.quit();
        service.destroy();
        log.info("[TrainServicePool] {} [service] 파기.", email);
        pool.remove(email);
    }

    /**
     * 매 분 인스턴스에 요청이 들어왔는지 확인한 후
     * 요청이 들어오지 않았다면 인스턴스를 파기하는 함수
     */
    @Scheduled(fixedRate = 60000) // 60000 Check every minute
    public void checkIdleTrainServices() {
        log.info("[TrainServicePool] : {}", pool);
        Iterator<Map.Entry<String, TrainService>> iterator = pool.entrySet().iterator();
        LocalDateTime currentDateTime = LocalDateTime.now();

        while (iterator.hasNext()) {
            Map.Entry<String, TrainService> entry = iterator.next();
            TrainService trainService = entry.getValue();
            LocalDateTime lastRequestTime = trainService.getLastRequestTime();
            Duration idleDuration = Duration.between(lastRequestTime, currentDateTime);

            if (idleDuration.getSeconds() > MAX_IDLE_TIME_IN_SECONDS) {
                try {
                    dispose(entry.getKey());
                    log.info("[TrainService] 인스턴스 파기: {}", entry.getKey());
                } catch (Exception e) {
                    log.info("[TrainService] 인스턴스 파기 실패 : {} ", entry.getKey());
                    e.printStackTrace();
                }
            }
        }
    }

}

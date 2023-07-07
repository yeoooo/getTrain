package com.yeoooo.getTrain.util;

import com.yeoooo.getTrain.crawling.TrainService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@ToString
@RequiredArgsConstructor
public class TrainServicePool {

    private final MailUtil mailUtil;

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
        service.destroy();
    }

}

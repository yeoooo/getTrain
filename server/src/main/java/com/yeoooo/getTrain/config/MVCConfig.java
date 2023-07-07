package com.yeoooo.getTrain.config;

import com.yeoooo.getTrain.crawling.TrainService;
import com.yeoooo.getTrain.util.MailUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MVCConfig {
    @Bean
    public MailUtil mailUtil() {
        return new MailUtil();
    }
}

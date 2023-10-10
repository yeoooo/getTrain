package com.yeoooo.getTrain.config;

import com.yeoooo.getTrain.util.MailUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableScheduling
public class MVCConfig implements WebMvcConfigurer {
    @Bean
    public MailUtil mailUtil() {
        return new MailUtil();
    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .maxAge(3600);
    }
}

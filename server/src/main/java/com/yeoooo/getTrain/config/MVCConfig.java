package com.yeoooo.getTrain.config;

import com.yeoooo.getTrain.util.MailUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MVCConfig implements WebMvcConfigurer {
    @Bean
    public MailUtil mailUtil() {
        return new MailUtil();
    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //배포 시 클라이언트의 도메인으로 변경되어야 함
        registry.addMapping("/api/**").allowedOrigins("http://ec2-13-125-250-57.ap-northeast-2.compute.amazonaws.com:3000")
                .maxAge(3600);
    }
}

package com.yeoooo.getTrain.util;

import com.yeoooo.getTrain.Train;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;


public class MailUtil {
    /**
     * Email을 보내는 함수
     *
     * @param email
     */
    @Autowired
    private JavaMailSender mailSender;


    public void sendEmail(String email, Train train) {
        String subject = train.getDepart_time() + " 출발 " + "[" + train.getFrom() + " -> " + train.getTo() + "]" + " 열차 예약 알림";
        String content = "10분 내로 결제를 진행해 주세요 !";
        String from = "Get Your Train ! <devyeooo@gmail.com>";
        String to = "받는 이 <" + email + ">";

        try{
            MimeMessage mail = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mail, true, "UTF-8");

            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(mail);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }


    }
}

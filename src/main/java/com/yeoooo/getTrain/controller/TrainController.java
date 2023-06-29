package com.yeoooo.getTrain.controller;

import com.yeoooo.getTrain.Train;
import com.yeoooo.getTrain.TrainDTO;
import com.yeoooo.getTrain.crawling.LoginType;
import com.yeoooo.getTrain.crawling.TrainService;
import com.yeoooo.getTrain.exception.LoginFailedException;
import com.yeoooo.getTrain.exception.ReserveFailedException;
import com.yeoooo.getTrain.util.ApiResponse;
import com.yeoooo.getTrain.util.MailUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class TrainController {
    private final TrainService trainService;
    private final MailUtil mailUtil;
    private boolean stop = false;

    @GetMapping("api/v1/reserve/stop")
    public ApiResponse<String> stop(){
        stop = false;
        return ApiResponse.ok("stopped");
    }

    @GetMapping("api/v1/reserve/quit")
    public ApiResponse<String> quit(){
        trainService.quit();
        return ApiResponse.ok("quit");
    }

    @RequestMapping("/api/v1/login")
    public ApiResponse<Map> login(@RequestBody Map<String, Object> req) {
        Map<String, Object> data = (Map) req.get("data");
        Map<String, String> user = (Map) data.get("user");
        if (trainService.login(LoginType.valueOf(user.get("type")), user.get("id"), user.get("pw"))) {
            return ApiResponse.ok(user);
        }else{
            return ApiResponse.fail(400, new LoginFailedException());
        }

    }

    @RequestMapping("/api/v1/reserve")
    public ApiResponse<Train> reserve(@RequestBody Map<String, Object> req, @RequestParam("email") String email) throws InterruptedException, ReserveFailedException {
        stop = true;

        /**
         * 로그인이 되어있는지 확인한 후 되어 있다면 진행,
         * 되어 있지 않다면 다른 컨트롤러 함수로 보내는 작업이 필요
         */

        Map<String, Object> data = (Map) req.get("data");


        ModelMapper modelMapper = new ModelMapper();
        TrainDTO req_train = modelMapper.map(data.get("req"), TrainDTO.class);

        /**
         * 추후 Exception Handler를 통해 처리 되어야 하는 로그인 실패 예외
         */


        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        while (stop) {
            ArrayList<Train> arrivals = trainService.get_arrivals(req_train.getFrom(), req_train.getTo(), LocalDateTime.parse(req_train.getTime_from(), dateTimeFormatter), LocalDateTime.parse(req_train.getTime_until(), dateTimeFormatter));
            if (!arrivals.isEmpty()) {
                if (trainService.reserve(arrivals.get(0))) {
                    mailUtil.sendEmail(email, arrivals.get(0));
                    return ApiResponse.ok(arrivals.get(0));
                }

            }else{
                System.out.println("\r예약중..");
            }
            Thread.sleep(1000);
        }

        return ApiResponse.fail(300, new Exception());
    }
}

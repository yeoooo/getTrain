package com.yeoooo.getTrain.controller;

import com.yeoooo.getTrain.Train;
import com.yeoooo.getTrain.TrainDTO;
import com.yeoooo.getTrain.crawling.LoginType;
import com.yeoooo.getTrain.crawling.TrainService;
import com.yeoooo.getTrain.exception.LoginFailedException;
import com.yeoooo.getTrain.exception.ReserveFailedException;
import com.yeoooo.getTrain.util.ApiResponse;
import com.yeoooo.getTrain.util.MailUtil;
import com.yeoooo.getTrain.util.TrainServicePool;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TrainController {

    private final TrainServicePool trainServicePool;

    @GetMapping("api/v1/reserve/stop")
    public ApiResponse<Boolean> stop(@RequestParam("email") String email){
        TrainService trainService = trainServicePool.getInstanceByEmail(email);
        trainService.setStop(false);
        log.info("[ TrainController ] TrainService {} 종료", trainService);
        return ApiResponse.ok(Boolean.TRUE);
    }

    @RequestMapping("/api/v1/login")
    public ApiResponse<Map> login(@RequestBody Map<String, Object> req, @RequestParam("email") String email) {
        TrainService trainService = trainServicePool.putInstanceByEmail(email);

        Map<String, Object> data = (Map) req.get("data");
        Map<String, String> user = (Map) data.get("user");

        if (trainService.login(LoginType.valueOf(user.get("type")), user.get("id"), user.get("pw"))) {
            return ApiResponse.ok(user);
        }else{
            return ApiResponse.fail(400, new LoginFailedException());
        }

    }

    @RequestMapping("/api/v1/reserve")
    public ApiResponse<Train> reserve(@RequestBody Map<String, Object> req) throws InterruptedException, ReserveFailedException {

        /**
         * 로그인이 되어있는지 확인한 후 되어 있다면 진행,
         * 되어 있지 않다면 다른 컨트롤러 함수로 보내는 작업이 필요
         */

        Map<String, Object> data = (Map) req.get("data");
        String email = (String) data.get("email");

        TrainService trainService = trainServicePool.getInstanceByEmail(email);


        ModelMapper modelMapper = new ModelMapper();
        TrainDTO req_train = modelMapper.map(data.get("req"), TrainDTO.class);
        Train res = trainService.reserve_pipeLine(req_train)
                            .orElseThrow(() -> new ReserveFailedException("예약이 취소 되었습니다."));

        /**
         * 추후 Exception Handler를 통해 처리 되어야 하는 로그인 실패 예외
         */

        return ApiResponse.ok(res);
    }
}

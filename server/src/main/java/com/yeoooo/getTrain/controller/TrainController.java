package com.yeoooo.getTrain.controller;

import com.yeoooo.getTrain.train.Train;
import com.yeoooo.getTrain.train.TrainDTO;
import com.yeoooo.getTrain.train.LoginType;
import com.yeoooo.getTrain.train.TrainService;
import com.yeoooo.getTrain.exception.LoginFailedException;
import com.yeoooo.getTrain.exception.ReserveFailedException;
import com.yeoooo.getTrain.exception.UserAlreadyInUseException;
import com.yeoooo.getTrain.util.ApiResponse;
import com.yeoooo.getTrain.train.TrainServicePool;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TrainController {

    private final TrainServicePool trainServicePool;

    @GetMapping("api/v1/reserve/stop")
    public ApiResponse<Boolean> stop(@RequestParam("email") String email) {
        TrainService trainService = trainServicePool.getInstanceByEmail(email);
        trainService.setStop(false);
        log.info("[ TrainController ] TrainService {} 종료", trainService);
        return ApiResponse.ok(Boolean.TRUE);
    }

    @RequestMapping("/api/v1/login")
    public ApiResponse<Map> login(@RequestBody Map<String, Object> req, HttpServletRequest servletRequest) throws UserAlreadyInUseException, LoginFailedException {
        Map<String, Object> data = (Map) req.get("data");
        Map<String, String> user = (Map) data.get("user");

        String email = user.get("email");
        String client_ip = servletRequest.getRemoteAddr();

        if (!TrainServicePool.is_using(client_ip)) {
            TrainService trainService = trainServicePool.putInstanceByEmail(email, servletRequest.getRemoteAddr());
            if (trainService.login(LoginType.valueOf(user.get("type")), user.get("id"), user.get("pw"))) {
                return ApiResponse.ok(user);
            }
        } else {
            throw new UserAlreadyInUseException("이미 사용중인 유저입니다.");
        }

        throw new LoginFailedException("로그인에 실패했습니다.");
    }

    @RequestMapping("/api/v1/reserve")
    public ApiResponse<Train> reserve(@RequestBody Map<String, Object> req) throws InterruptedException, ReserveFailedException, LoginFailedException {
        Map<String, Object> data = (Map) req.get("data");
        String email = (String) data.get("email");

        TrainService trainService = trainServicePool.getInstanceByEmail(email);

        if (trainService.chk_login()) {
            ModelMapper modelMapper = new ModelMapper();
            TrainDTO req_train = modelMapper.map(data.get("req"), TrainDTO.class);
            Train res = trainService.reserve_pipeLine(req_train)
                    .orElseThrow(() -> new ReserveFailedException("예약이 취소 되었습니다."));
            return ApiResponse.ok(res);
        } else {
            throw new LoginFailedException("코레일 로그인에 실패했습니다.");
        }
    }

    @RequestMapping("/api/v1/logout")
    public ApiResponse<String> logout(@RequestBody Map<String, Object> req) {
        Map<String, Object> data = (Map) req.get("data");
        String email = (String) data.get("email");

        TrainService trainService = trainServicePool.getInstanceByEmail(email);
        trainService.logout();
        return ApiResponse.ok("success");
    }


}

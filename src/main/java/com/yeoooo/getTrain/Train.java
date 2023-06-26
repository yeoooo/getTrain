package com.yeoooo.getTrain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class Train {
    private String from;
    private String to;
    private LocalDateTime arrival;
}

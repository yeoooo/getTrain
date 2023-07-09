package com.yeoooo.getTrain.train;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@ToString
@Builder
public class Train {
    private int train_id;
    private String division;
    private TrainType trainType;
    private String from;
    private String depart_time;
    private String to;
    private String arrival_time;
    private String cost;
    private String time_cost;
    private String reserve;
}
